import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { scenarios } from '../src/data/voice-demo/scenarios.js';
import { conversations } from '../src/data/voice-demo/conversations.js';
import { createConversation } from '../src/components/voice-demo/conversationEngine.js';
import { speechText } from '../src/components/voice-demo/speechText.js';
import { chooseVoice } from '../src/components/voice-demo/voiceSelection.js';
import { createCallSession } from '../src/components/voice-demo/callSession.js';

const personas = scenarios.flatMap(scenario => scenario.personas);
const voices = [{ name: 'Samantha', lang: 'en-US' }, { name: 'Salma', lang: 'ar-EG' },
  { name: 'Guy', lang: 'en-US' }, { name: 'Shakir', lang: 'ar-EG' }];

function finalResult(transcript) {
  return Object.assign([{ transcript }], { isFinal: true });
}

function setup(persona = personas[0], options = {}) {
  let time = 0;
  let id = 0;
  const timers = new Map();
  const schedule = (cb, delay, repeat = false) => {
    timers.set(++id, { cb, due: time + delay, delay, repeat });
    return id;
  };
  const voiceEvents = new EventTarget();
  const recs = [], speeches = [], snapshots = [];
  let stopped = 0, canceled = 0, micRequests = 0;
  const host = {
    performance: { now: () => time },
    setTimeout: (cb, ms) => schedule(cb, ms),
    setInterval: (cb, ms) => schedule(cb, ms, true),
    clearTimeout: key => timers.delete(key), clearInterval: key => timers.delete(key),
    navigator: { mediaDevices: { getUserMedia() {
      micRequests++;
      if (options.request) return options.request();
      return Promise.resolve({ getTracks: () => [{ stop() { stopped++; } }] });
    } } },
    speechSynthesis: {
      getVoices: () => options.voices || voices,
      addEventListener: (...args) => voiceEvents.addEventListener(...args),
      removeEventListener: (...args) => voiceEvents.removeEventListener(...args),
      speak: utterance => speeches.push(utterance), cancel() { canceled++; },
    },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    webkitSpeechRecognition: options.unsupported ? undefined : class {
      constructor() { recs.push(this); }
      start() { if (options.startError) throw new Error(); if (!options.missingStart) this.onstart(); }
      stop() { this.stopped = true; }
      abort() { this.aborted = true; }
    },
  };
  const session = createCallSession({ personaId: persona.id, host, onChange: s => snapshots.push(s) });
  function advance(ms) {
    const target = time + ms;
    let next;
    while ((next = [...timers].sort((a, b) => a[1].due - b[1].due)[0]) && next[1].due <= target) {
      const [key, timer] = next;
      time = timer.due;
      if (timer.repeat) timer.due += timer.delay;
      else timers.delete(key);
      timer.cb();
    }
    time = target;
  }
  return {
    session, host, recs, speeches, snapshots, timers, advance, voiceEvents, state: session.getState,
    counts: () => ({ stopped, canceled, micRequests }),
    async begin() {
      await session.requestMic();
      session.startVoice();
      speeches[0].onstart();
    },
    finishPlayback() {
      speeches.at(-1).onend();
      advance(220);
    },
    answer(text) {
      const rec = recs.at(-1);
      rec.onresult({ resultIndex: 0, results: [finalResult(text)] });
      rec.onend();
      advance(100);
    },
  };
}

test('five scenarios each have one English and one Arabic coach with a unique local portrait', async () => {
  assert.equal(scenarios.length, 5);
  assert.equal(new Set(personas.map(p => p.id)).size, 10);
  assert.equal(new Set(personas.map(p => p.portrait)).size, 10);
  for (const scenario of scenarios) {
    assert.deepEqual(scenario.personas.map(p => p.language), ['en', 'ar']);
    for (const p of scenario.personas) await access(new URL('../public' + p.portrait, import.meta.url));
  }
});

for (const persona of personas) {
  test(persona.id + ' plays the configured intro, listens in the persona locale and responds to the chosen intent', async () => {
    const s = setup(persona);
    await s.begin();
    assert.equal(s.speeches[0].text, speechText(conversations[persona.id].intro, persona.language, persona.voice.locale));
    assert.equal(s.state().turns[0].text, conversations[persona.id].intro);
    assert.equal(s.speeches[0].lang, persona.voice.locale);
    s.finishPlayback();
    assert.equal(s.recs[0].lang, persona.voice.locale);
    const branch = conversations[persona.id].topics[2][persona.language];
    s.answer(branch.patterns[0]);
    assert.equal(s.speeches[1].text, speechText(branch.replies[0], persona.language, persona.voice.locale));
    s.session.dispose();
  });
}

test('screening offers distinct admission and employment branches in both languages', () => {
  for (const [id, study, work] of [['sophia', 'degree', 'job'], ['youssef', 'جامعة', 'وظيفة']]) {
    const reply = createConversation(conversations[id]);
    assert.notEqual(reply(study).text, reply(work).text);
  }
});

test('a male Egyptian profile uses only verified male Arabic voices across locales', () => {
  const config = personas[1].voice;
  const fallback = { name: 'Hamed', lang: 'ar_SA' };
  assert.equal(chooseVoice([...voices, fallback], config), voices[3]);
  assert.equal(chooseVoice([voices[1], fallback], config), fallback);
  assert.equal(chooseVoice([voices[0], voices[1]], config), null);
});

test('one permission request, immediate release, clock starts on playback and cancels speech at 30 seconds', async () => {
  const s = setup();
  assert.equal(s.counts().micRequests, 0);
  await Promise.all([s.session.requestMic(), s.session.requestMic()]);
  assert.deepEqual(s.counts(), { stopped: 1, canceled: 0, micRequests: 1 });
  s.advance(45_000);
  assert.equal(s.state().remaining, 30);
  s.session.startVoice();
  s.session.startVoice();
  s.advance(3_000);
  assert.equal(s.state().remaining, 30);
  assert.equal(s.speeches.length, 1);
  s.speeches[0].onstart();
  s.finishPlayback();
  s.answer("I'm good, thanks.");
  s.speeches[1].onstart();
  s.finishPlayback();
  s.advance(8000);
  s.answer('yes');
  s.speeches[2].onstart();
  s.finishPlayback();
  s.advance(8000);
  s.answer('cost');
  s.speeches[3].onstart();
  s.finishPlayback();
  s.advance(8000);
  s.answer('example');
  const last = s.speeches.at(-1);
  last.onstart();
  const lateEnd = last.onend;
  s.advance(4719);
  assert.equal(s.state().remaining, 1);
  s.advance(1);
  assert.equal(s.state().duration, 30);
  assert.equal(s.state().phase, 'ended');
  assert.equal(s.timers.size, 0);
  assert.equal(s.counts().canceled, 1);
  lateEnd();
  assert.equal(s.recs.length, 4);
});

test('deadline is checked against elapsed time even when browser timers have stalled', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  s.host.performance.now = () => 61_000;
  s.recs[0].onresult({ resultIndex: 0, results: [[{ transcript: 'too late' }]] });
  assert.equal(s.state().phase, 'ended');
  assert.equal(s.state().duration, 30);
  assert.ok(s.recs[0].aborted);
});

test('manual end, navigation and disposal detach callbacks and stop recognition', async () => {
  for (const action of ['end', 'leavePage', 'dispose']) {
    const s = setup();
    await s.begin();
    s.finishPlayback();
    s.advance(2_500);
    const late = s.recs[0].onend;
    s.session[action]();
    assert.ok(s.recs[0].aborted);
    assert.equal(s.timers.size, 0);
    late();
    assert.equal(s.recs.length, 1);
    if (action !== 'dispose') {
      assert.deepEqual(s.state().turns, []);
      assert.equal(s.state().duration, 2);
    }
  }
});

test('late microphone permission grants still release every track after unmount', async () => {
  let resolve, stopped = 0;
  const s = setup(personas[0], { request: () => new Promise(r => { resolve = r; }) });
  const pending = s.session.requestMic();
  s.session.dispose();
  const updates = s.snapshots.length;
  resolve({ getTracks: () => [1, 2].map(() => ({ stop: () => { stopped++; } })) });
  await pending;
  assert.equal(stopped, 2);
  assert.equal(s.snapshots.length, updates);
  assert.equal(s.speeches.length, 0);
});

test('denied permission, unavailable recognition, missing voices and a playback stall allow typed practice', async () => {
  const denied = setup(personas[0], { request: () => Promise.reject({ name: 'NotAllowedError' }) });
  await denied.session.requestMic();
  const unsupported = setup(personas[0], { unsupported: true });
  const noVoice = setup(personas[1], { voices: [voices[0]] });
  const pending = noVoice.session.requestMic();
  await Promise.resolve();
  noVoice.advance(2200);
  await pending;
  const stalled = setup();
  await stalled.session.requestMic();
  stalled.session.startVoice();
  stalled.advance(10_000);
  for (const [s, issue] of [[denied, 'denied'], [unsupported, 'unsupported'], [noVoice, 'noVoice'], [stalled, 'voice']]) {
    assert.equal(s.state().issue, issue);
    s.session.startText();
    assert.equal(s.state().phase, 'text');
    assert.equal(s.state().remaining, 30);
    s.session.sendText('test');
    assert.equal(s.state().turns.length, 3);
    s.advance(30_000);
    assert.equal(s.state().phase, 'ended');
  }
});

test('silence restarts at most once and text fallback keeps the remaining time', async () => {
  const s = setup();
  await s.begin();
  s.advance(3_000);
  s.finishPlayback();
  for (let i = 0; i < 2; i++) {
    s.recs[i].onerror({ error: 'no-speech' });
    s.recs[i].onend();
    s.advance(100);
    if (i === 0) {
      assert.equal(s.recs.length, 1);
      s.speeches[1].onstart();
      s.finishPlayback();
    }
  }
  assert.equal(s.state().phase, 'quiet');
  assert.equal(s.recs.length, 2);
  s.session.retryListening();
  s.advance(220);
  s.recs[2].onend();
  s.advance(100);
  assert.equal(s.state().phase, 'quiet');
  s.session.startText();
  assert.equal(s.state().remaining, 27);
  s.advance(27_000);
  assert.equal(s.state().phase, 'ended');
  assert.equal(s.state().duration, 30);
});

test('a rejected recognition locale offers text and never changes the configured language', async () => {
  const s = setup(personas[1]);
  await s.begin();
  s.finishPlayback();
  const rec = s.recs[0];
  assert.equal(rec.lang, 'ar-EG');
  const lateEnd = rec.onend;
  rec.onerror({ error: 'language-not-supported' });
  lateEnd();
  assert.equal(s.state().issue, 'recognition');
  assert.equal(s.recs.length, 1);
  s.session.startText();
  assert.equal(s.state().turns[0].text, conversations.omar.intro);
  s.session.dispose();
});

test('a voice failure between turns preserves the scripted reply in text mode', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  s.answer('cost');
  s.speeches[1].onerror({ error: 'voice-unavailable' });
  s.session.startText();
  assert.equal(s.state().turns.at(-1).text, conversations.emma.topics.find(x => x.id === 'price').en.replies[0]);
  assert.equal(s.state().phase, 'text');
  s.session.dispose();
});

test('late Egyptian voice beats a provisional regional fallback and stays pinned across turns', async () => {
  const fallback = { name: 'Hamed', lang: 'ar-SA' };
  const options = { voices: [fallback, voices[1]] };
  const s = setup(personas[1], options);
  const pending = s.session.requestMic();
  await Promise.resolve();
  assert.equal(s.state().phase, 'checkingVoice');
  s.advance(200);
  options.voices.push(voices[3]);
  s.voiceEvents.dispatchEvent(new Event('voiceschanged'));
  await pending;
  s.session.startVoice();
  assert.equal(s.speeches[0].voice, voices[3]);
  options.voices = [voices[1], fallback, voices[3]];
  s.voiceEvents.dispatchEvent(new Event('voiceschanged'));
  s.speeches[0].onstart();
  s.finishPlayback();
  s.answer('السعر');
  assert.equal(s.speeches[1].voice, voices[3]);
  assert.equal(s.state().remaining, 30);
  s.session.dispose();
});

test('an empty list can populate asynchronously and a compatible fallback can win at timeout', async () => {
  for (const fallback of [false, true]) {
    const options = { voices: [] };
    const s = setup(personas[1], options);
    const pending = s.session.requestMic();
    await Promise.resolve();
    const selected = fallback ? {name: 'Majed', lang: 'ar-001'} : voices[3];
    options.voices.push(selected);
    s.voiceEvents.dispatchEvent(new Event('voiceschanged'));
    if (fallback) s.advance(2200);
    await pending;
    assert.equal(s.state().phase, 'ready');
    s.session.startVoice();
    assert.equal(s.speeches[0].voice, selected);
    s.session.dispose();
  }
});

test('closing or switching to text during voice discovery never leaves a timer or starts late audio', async () => {
  for (const action of ['dispose', 'end', 'startText']) {
    const options = {voices: []};
    const s = setup(personas[0], options);
    const pending = s.session.requestMic();
    await Promise.resolve();
    assert.equal(s.state().phase, 'checkingVoice');
    s.session[action]();
    options.voices.push(voices[0]);
    s.voiceEvents.dispatchEvent(new Event('voiceschanged'));
    await pending;
    s.session.startVoice();
    assert.equal(s.speeches.length, 0);
    if (action === 'startText') assert.equal(s.state().phase, 'text');
    s.session.dispose();
    assert.equal(s.timers.size, 0);
  }
});

test('unrecognized audio receives one repair, then waits for an explicit retry', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  s.recs[0].onnomatch();
  s.recs[0].onend();
  s.advance(100);
  assert.match(s.speeches[1].text, /couldn’t make that out/);
  assert.equal(s.recs.length, 1);
  s.speeches[1].onstart();
  s.finishPlayback();
  s.recs[1].onnomatch();
  s.recs[1].onend();
  s.advance(100);
  assert.equal(s.state().phase, 'quiet');
  s.session.dispose();
});

test('removing the pinned voice between turns offers text without playing a replacement', async () => {
  const options = { voices: [...voices] };
  const s = setup(personas[1], options);
  await s.begin();
  s.finishPlayback();
  options.voices = [voices[1], {name: 'Hamed', lang: 'ar-SA'}];
  s.answer('السعر');
  s.advance(2200);
  await Promise.resolve();
  assert.equal(s.state().issue, 'noVoice');
  assert.equal(s.speeches.length, 1);
  s.session.startText();
  assert.match(s.state().turns.at(-1).text, /العرض التاني/);
  s.session.dispose();
});

for (const [id, words, intro, ready] of [
  ['emma', "I'm good, thanks.", "Hi! I'm Emma, your Speekr Sales Coach. How are you today?", 'Great to hear! Ready to practice a sales conversation?'],
  ['omar', 'الحمد لله، كويس.', 'أهلاً بيك! أنا عمر، مدرب المبيعات من Speekr. عامل إيه النهارده؟', 'دايمًا يا رب! تحب نبدأ تدريب المبيعات؟'],
]) {
  test(id + ' completes the specified Sales exchange and proceeds to the practice question', async () => {
    const { persona, opening } = conversations[id];
    const s = setup(persona);
    await s.begin();
    assert.equal(s.state().turns[0].text, intro);
    s.finishPlayback();
    s.answer(words);
    s.speeches[1].onstart();
    assert.deepEqual(s.state().turns.map(t => t.text), [intro, words, ready]);
    assert.equal(s.speeches[1].text, speechText(ready, persona.language, persona.voice.locale));
    s.finishPlayback();
    s.answer(id === 'omar' ? 'أيوة' : 'yes');
    s.speeches[2].onstart();
    assert.ok(s.state().turns.at(-1).text.includes(opening));
    s.session.dispose();
  });
}

test('English → Arabic → English replaces the owner, isolates its context, and ignores old native callbacks', async () => {
  const s = setup();
  await s.begin();
  const staleSpeech = s.speeches[0].onend;
  const omar = createCallSession({ personaId: 'omar', onChange() {}, host: s.host });
  assert.equal(s.state().phase, 'ended');
  const ar = omar.getState();
  assert.notEqual(ar.sessionId, s.state().sessionId);
  assert.deepEqual([ar.personaId, ar.scenarioId, ar.language, ar.recognitionLocale], ['omar', 'sales', 'ar', 'ar-EG']);
  await omar.requestMic();
  omar.startVoice();
  const speech = s.speeches[1];
  speech.onstart();
  staleSpeech();
  s.session.dispose();
  assert.equal(omar.getState().phase, 'speaking');
  assert.equal(s.counts().canceled, 1);
  s.finishPlayback();
  const rec = s.recs[0], staleResult = rec.onresult, staleEnd = rec.onend;
  const james = createCallSession({ personaId: 'james', onChange() {}, host: s.host });
  assert.ok(rec.aborted);
  assert.equal(omar.getState().phase, 'ended');
  await james.requestMic();
  james.startVoice();
  s.speeches.at(-1).onstart();
  staleResult({ results: [finalResult('السعر')] });
  staleEnd();
  omar.dispose();
  assert.equal(james.getState().voice, voices[2]);
  assert.deepEqual(james.getState().turns.map(t => t.text), [conversations.james.intro]);
  james.dispose();
  assert.equal(s.timers.size, 0);
});

test('late voice catalogs work without an event and recover a temporary disappearance using the same identity', async () => {
  const options = { voices: [] };
  const s = setup(personas[0], options);
  const preparing = s.session.requestMic();
  await Promise.resolve();
  options.voices = [voices[0]];
  s.advance(180);
  await preparing;
  s.session.startVoice();
  s.speeches[0].onstart();
  s.finishPlayback();
  options.voices = [];
  s.answer('budget');
  assert.equal(s.state().phase, 'connecting');
  const fresh = { ...voices[0] };
  options.voices = [voices[3], fresh];
  s.advance(180);
  await Promise.resolve();
  assert.equal(s.speeches[1].voice, fresh);
  s.session.dispose();
  assert.equal(s.timers.size, 0);
});

test('an unavailable voice can be checked again after installation without asking for the microphone twice', async () => {
  const options = { voices: [] };
  const s = setup(personas[1], options);
  const preparing = s.session.requestMic();
  await Promise.resolve();
  s.advance(2200);
  await preparing;
  options.voices = [voices[3]];
  await s.session.retryVoice();
  assert.equal(s.state().phase, 'ready');
  assert.equal(s.counts().micRequests, 1);
  s.session.dispose();
});

test('a transient synthesis failure retries once with a fresh utterance and suppresses stale playback events', async () => {
  const s = setup();
  await s.session.requestMic();
  s.session.startVoice();
  const old = s.speeches[0], lateStart = old.onstart, lateEnd = old.onend;
  old.onerror({ error: 'synthesis-failed' });
  lateStart();
  lateEnd();
  s.advance(180);
  const retry = s.speeches[1];
  assert.notEqual(retry, old);
  assert.equal(retry.voice, old.voice);
  assert.equal(retry.text, old.text);
  retry.onstart();
  retry.onstart();
  assert.equal(s.state().turns.length, 1);
  assert.equal(s.recs.length, 0);
  retry.onerror({ error: 'synthesis-failed' });
  assert.equal(s.state().issue, 'voice');
  s.session.startText();
  assert.equal(s.state().turns.length, 1);
  s.session.dispose();
});

test('repeated word-boundary events cannot hide stalled playback or replay the same word', async () => {
  const s = setup();
  await s.begin();
  const intro = s.speeches[0];
  const boundary = intro.onboundary;
  boundary({ name: 'word', charIndex: 0 });
  for (let i = 0; i < 10; i++) { s.advance(1000); boundary({ name: 'word', charIndex: 0 }); }
  const retry = s.speeches.at(-1);
  assert.notEqual(retry, intro);
  assert.equal(retry.text, intro.text.slice(intro.text.indexOf(' ') + 1));
  retry.onstart();
  assert.equal(s.state().turns.length, 1);
  s.advance(13000);
  assert.equal(s.state().issue, 'voice');
  assert.equal(s.speeches.length, 2);
  s.session.dispose();
});

test('microphone waits for actual output drain; busy output never starts recognition', async () => {
  for (const drains of [true, false]) {
    const s = setup();
    await s.begin();
    s.host.speechSynthesis.speaking = true;
    s.finishPlayback();
    assert.equal(s.recs.length, 0);
    s.advance(300);
    s.host.speechSynthesis.speaking = !drains;
    s.advance(1000);
    assert.equal(s.recs.length, drains ? 1 : 0);
    if (!drains) {
      assert.equal(s.state().issue, 'voice');
      assert.equal(s.counts().canceled, 1);
    }
    s.session.dispose();
  }
});

test('interim, repeated and late finals are processed once, after native input releases', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  const rec = s.recs[0], result = rec.onresult, end = rec.onend;
  result({ results: [Object.assign([{ transcript: 'wrong guess' }], { isFinal: false })] });
  assert.equal(s.state().phase, 'listening');
  end();
  result({ resultIndex: 1, results: [finalResult('ignored'), finalResult("I'm good,"), finalResult('thanks.')] });
  result({ results: [finalResult('duplicate')] });
  rec.onstart();
  assert.equal(s.state().phase, 'processing');
  assert.equal(s.speeches.length, 1);
  s.advance(100);
  end();
  result({ results: [finalResult('stale')] });
  assert.equal(s.speeches.length, 2);
  assert.deepEqual(s.state().turns.filter(t => t.speaker === 'visitor').map(t => t.text), ["I'm good, thanks."]);
  assert.match(s.speeches[1].text, /Great to hear/);
  s.session.dispose();
});

test('a lost end event preserves the final reply and requires capture release before speaking', async () => {
  for (const audioEnded of [true, false]) {
    const s = setup();
    await s.begin();
    s.finishPlayback();
    const rec = s.recs[0];
    if (audioEnded) rec.onaudioend();
    rec.onresult({ results: [finalResult("I'm good, thanks.")] });
    assert.ok(rec.stopped);
    s.advance(650);
    assert.ok(rec.aborted);
    assert.equal(s.speeches.length, 1);
    s.advance(500);
    if (audioEnded) {
      assert.equal(s.speeches.length, 2);
      assert.match(s.speeches[1].text, /Ready to practice a sales conversation/);
    } else {
      assert.equal(s.speeches.length, 1);
      assert.equal(s.state().issue, 'recognition');
      s.session.startText();
      assert.equal(s.state().turns.at(-1).text, conversations.emma.ready);
    }
    s.session.dispose();
    assert.equal(s.timers.size, 0);
  }
});

test('unresponsive recognition startup, silent input, service failures and queued handoffs are bounded', async () => {
  for (const condition of ['missingStart', 'startError', 'silence', 'network', 'denied', 'close']) {
    const s = setup(personas[0], { [condition]: true });
    await s.begin();
    s.speeches[0].onend();
    if (condition === 'close') {
      s.session.dispose();
      s.advance(8000);
      assert.equal(s.recs.length, 0);
      continue;
    }
    s.advance(220);
    if (condition === 'missingStart') s.advance(4500);
    if (condition === 'silence') s.advance(10150);
    if (condition === 'network' || condition === 'denied') {
      s.recs[0].onerror({ error: condition === 'network' ? 'network' : 'not-allowed' });
    }
    assert.equal(s.state().phase, 'problem', condition);
    assert.ok(s.recs[0].aborted);
    s.session.dispose();
    assert.equal(s.timers.size, 0);
  }
});

test('late microphone grants, hidden permission prompts and abandoned discovery cannot restart a call', async () => {
  let grant, released = 0;
  const s = setup(personas[0], { request: () => new Promise(r => { grant = r; }) });
  const preparing = s.session.requestMic();
  s.session.hide();
  assert.equal(s.state().phase, 'preparing');
  s.advance(25000);
  assert.equal(s.state().issue, 'permissionTimeout');
  s.session.startText();
  grant({ getTracks: () => [{ stop() { released++; } }] });
  await preparing;
  assert.equal(released, 1);
  assert.equal(s.state().phase, 'text');
  s.session.hide();
  assert.equal(s.state().phase, 'ended');
  assert.equal(s.timers.size, 0);
});

test('a browser that ignores an explicit voice assignment cannot play its default voice', async () => {
  const s = setup(personas[1]);
  s.host.SpeechSynthesisUtterance = class {
    set voice(value) { this.requested = value; }
    get voice() { return voices[0]; }
  };
  await s.session.requestMic();
  s.session.startVoice();
  assert.equal(s.state().issue, 'noVoice');
  assert.equal(s.speeches.length, 0);
  s.session.dispose();
});

test('an immediate acoustic copy of the last question is discarded, and a later genuine repetition is accepted', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  const question = 'How are you today?';
  s.recs[0].onspeechstart();
  s.answer(question);
  s.advance(220);
  assert.equal(s.recs.length, 2);
  assert.equal(s.speeches.length, 1);
  assert.equal(s.state().turns.length, 1);
  s.advance(800);
  s.recs[1].onspeechstart();
  s.answer(question);
  assert.deepEqual(s.state().turns.at(-1), { speaker: 'visitor', text: question });
  assert.equal(s.speeches.length, 2);
  s.session.dispose();
});

test('a permission denial during listening keeps the conversation and releases native capture', async () => {
  const s = setup();
  await s.begin();
  s.finishPlayback();
  s.recs[0].onerror({ error: 'not-allowed' });
  assert.ok(s.recs[0].aborted);
  s.session.startText();
  s.session.sendText("I'm good, thanks.");
  assert.equal(s.state().turns.at(-1).text, conversations.emma.ready);
  s.session.dispose();
});

test('a regional Arabic engine can finish a slowly spoken intro without word-boundary events', async () => {
  const s = setup(conversations.youssef.persona, { voices: [{ name: 'Majed', lang: 'ar-001' }] });
  const prepared = s.session.requestMic();
  await Promise.resolve();
  s.advance(2200);
  await prepared;
  s.session.startVoice();
  s.speeches[0].onstart();
  s.advance(12000);
  assert.equal(s.state().phase, 'speaking');
  s.finishPlayback();
  assert.equal(s.recs[0].lang, 'ar-EG');
  s.session.dispose();
});

test('native empty final results produce one repair and an actionable fallback without a fictitious visitor turn', async () => {
  const s = setup();
  await s.begin();
  for (let i = 0; i < 2; i++) {
    s.finishPlayback();
    s.answer('');
    if (i === 0) s.speeches.at(-1).onstart();
  }
  assert.equal(s.state().phase, 'quiet');
  assert.equal(s.state().issue, 'unclear');
  assert.ok(s.state().turns.every(t => t.speaker === 'coach'));
  s.session.startText();
  s.session.sendText("I'm good, thanks.");
  assert.equal(s.state().turns.at(-1).text, conversations.emma.ready);
  s.session.dispose();
});
