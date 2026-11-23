import test from 'node:test';
import assert from 'node:assert/strict';
import { createVoicePlayer } from '../src/components/voice-atlas/voicePlayer.js';

const egypt = { src: '/egypt.mp3', duration: 4 };
const france = { src: '/france.m4a', duration: 3 };

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function setup(audioContext) {
  const tracks = [];
  const changes = [];
  class Audio {
    paused = true;
    ended = false;
    currentTime = 0;
    duration = NaN;
    plays = [];

    constructor() { tracks.push(this); }
    play() {
      assert.ok(tracks.every(other => other === this || other.paused), 'overlapping tracks');
      this.paused = false;
      this.ended = false;
      const attempt = deferred();
      this.plays.push(attempt);
      return attempt.promise;
    }
    pause() { this.paused = true; }
    removeAttribute(name) { delete this[name]; }
    load() {}
  }
  const host = { Audio, AudioContext: audioContext };
  const player = createVoicePlayer(value => changes.push(value), host);
  return { player, tracks, changes, state: () => changes.at(-1) };
}

test('pause and resume keep position, and replay starts the finished recording at zero', () => {
  const { player, tracks, state } = setup();
  player.toggle('eg', egypt);
  const [audio] = tracks;
  assert.deepEqual(state(), { id: 'eg', status: 'loading', elapsed: 0, duration: 4 });
  audio.duration = 4.3;
  audio.onloadedmetadata();
  audio.onplaying();
  audio.currentTime = 1.25;
  audio.ontimeupdate();
  assert.deepEqual(state(), { id: 'eg', status: 'playing', elapsed: 1.25, duration: 4.3 });

  player.toggle('eg', egypt);
  assert.equal(state().status, 'paused');
  assert.ok(audio.paused);
  player.toggle('eg', egypt);
  assert.equal(audio.currentTime, 1.25);
  audio.onwaiting();
  assert.equal(state().status, 'loading');
  audio.onplaying();
  audio.currentTime = audio.duration;
  audio.ended = audio.paused = true;
  audio.onpause();
  audio.onended();
  assert.equal(state().status, 'ended');

  player.toggle('eg', egypt);
  assert.equal(audio.currentTime, 0);
  audio.onplaying();
  assert.equal(state().status, 'playing');
  assert.equal(tracks.length, 1);
  assert.equal(audio.plays.length, 3);
});

test('switching countries immediately silences the old track and ignores its queued events and promise', async () => {
  const { player, tracks, state, changes } = setup();
  player.toggle('eg', egypt);
  const [old] = tracks;
  old.onplaying();
  const queued = [old.onpause, old.onended, old.onerror, old.ontimeupdate, old.onplaying];

  player.toggle('fr', france);
  assert.ok(old.paused);
  assert.equal(old.src, undefined);
  tracks[1].onplaying();
  const count = changes.length;
  for (const deliver of queued) deliver();
  old.plays[0].reject(new Error('interrupted'));
  await Promise.resolve();
  assert.equal(changes.length, count);
  assert.deepEqual(state(), { id: 'fr', status: 'playing', elapsed: 0, duration: 3 });
  player.dispose();
});

test('a rejected play request after pause or resume cannot overwrite the latest state', async () => {
  const { player, tracks, state } = setup();
  player.toggle('eg', egypt);
  const [audio] = tracks;
  player.pause();
  audio.onplaying();
  audio.plays[0].reject(new Error('interrupted during loading'));
  await Promise.resolve();
  assert.equal(state().status, 'paused');

  player.toggle('eg', egypt);
  player.pause();
  player.toggle('eg', egypt);
  audio.onplaying();
  audio.plays[1].reject(new Error('previous play was interrupted'));
  await Promise.resolve();
  assert.equal(state().status, 'playing');
  assert.equal(tracks.length, 1);
  player.dispose();
});

test('a rejected play request or media error can be retried with a new track', async () => {
  const { player, tracks, state } = setup();
  player.toggle('fr', france);
  tracks[0].plays[0].reject(new Error('play denied'));
  await Promise.resolve();
  assert.equal(state().status, 'error');

  player.toggle('fr', france);
  assert.ok(tracks[0].paused);
  tracks[1].onerror();
  assert.equal(state().status, 'error');
  player.toggle('fr', france);
  tracks[2].onplaying();
  assert.equal(tracks.length, 3);
  assert.equal(state().status, 'playing');
  player.dispose();
});

test('selecting a missing sample stops the previous track and never attempts a substitute', () => {
  const { player, tracks, state } = setup();
  player.toggle('eg', egypt);
  player.toggle('fr', null);
  assert.ok(tracks[0].paused);
  assert.equal(tracks.length, 1);
  assert.deepEqual(state(), { id: 'fr', status: 'unavailable', elapsed: 0, duration: 0 });
  player.dispose();
});

test('dispose releases playback and a pending audio context cannot reconnect or publish afterwards', async () => {
  const resume = deferred();
  let closed = false;
  let analysers = 0;
  class AudioContext {
    state = 'suspended';
    async resume() { await resume.promise; this.state = 'running'; }
    async close() { this.state = 'closed'; closed = true; }
    createAnalyser() { analysers++; }
  }
  const { player, tracks, changes } = setup(AudioContext);
  player.toggle('eg', egypt);
  const [audio] = tracks;
  const queued = audio.onended;
  const count = changes.length;
  player.dispose();
  queued();
  audio.plays[0].reject(new Error('unmounted'));
  resume.resolve();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(changes.length, count);
  assert.equal(analysers, 0);
  assert.ok(closed);
  assert.ok(audio.paused);
  assert.equal(audio.src, undefined);
  assert.equal(player.getAnalyser(), undefined);
});

test('switch and dispose disconnect the active audio graph and close the shared context once', () => {
  const sources = [];
  const analysers = [];
  let closes = 0;
  class VoiceNode {
    connect(destination) { this.output = destination; }
    disconnect() { this.output = null; }
  }
  class AudioContext {
    state = 'running';
    destination = new VoiceNode();
    createAnalyser() {
      const analyser = new VoiceNode();
      analysers.push(analyser);
      return analyser;
    }
    createMediaElementSource() {
      const source = new VoiceNode();
      sources.push(source);
      return source;
    }
    async close() { this.state = 'closed'; closes++; }
  }
  const { player } = setup(AudioContext);
  player.toggle('eg', egypt);
  assert.equal(player.getAnalyser(), analysers[0]);
  assert.equal(sources[0].output, analysers[0]);
  assert.ok(analysers[0].output);
  player.toggle('fr', france);
  assert.equal(sources[0].output, null);
  assert.equal(analysers[0].output, null);
  assert.equal(player.getAnalyser(), analysers[1]);
  player.dispose();
  player.dispose();
  assert.equal(sources[1].output, null);
  assert.equal(analysers[1].output, null);
  assert.equal(closes, 1);
});
