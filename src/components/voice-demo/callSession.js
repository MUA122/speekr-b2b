import { conversations } from '../../data/voice-demo/conversations.js';
import { createBrowserSpeech } from './browserSpeech.js';
import { createConversation, normalizeIntent } from './conversationEngine.js';
import { speechText } from './speechText.js';
import { currentVoice, waitForVoice } from './voiceSelection.js';

export const CALL_SECONDS = 30;
const LIMIT = CALL_SECONDS * 1000;
const owners = new WeakMap();
let sequence = 0;

const transitions = {
  consent: ['preparing', 'text'], preparing: ['checkingVoice', 'text'], checkingVoice: ['ready', 'text'],
  ready: ['connecting', 'text'], connecting: ['speaking'], speaking: ['openingMic', 'connecting'],
  openingMic: ['listening', 'processing', 'connecting', 'quiet'], listening: ['openingMic', 'processing', 'connecting', 'quiet'],
  processing: ['connecting'], quiet: ['openingMic', 'text'], problem: ['checkingVoice', 'text', 'textClosing'],
  text: ['textClosing'], textClosing: [], ended: [],
};

export function createCallSession({ personaId, onChange, host = window }) {
  const script = conversations[personaId];
  if (!Object.hasOwn(conversations, personaId)) throw new Error('Unknown voice demo persona');
  const { persona } = script;
  owners.get(host)?.('replaced');
  owners.set(host, end);
  const reply = createConversation(script);
  const synth = host.speechSynthesis;
  const supported = Boolean((host.SpeechRecognition || host.webkitSpeechRecognition) &&
    synth && host.SpeechSynthesisUtterance && host.navigator.mediaDevices?.getUserMedia);
  let state = {
    sessionId: ++sequence, personaId, scenarioId: script.scenario, language: persona.language,
    recognitionLocale: persona.voice.locale, voice: null,
    phase: supported ? 'consent' : 'problem', issue: supported ? null : 'unsupported',
    remaining: CALL_SECONDS, duration: 0, turns: [], mode: null,
  };
  const audio = createBrowserSpeech(host, trace, active);
  const discovery = new AbortController();
  let started = null, clock, permissionTimer, disposed = false;
  let pending = null;

  function trace(event, reason = undefined) {
    if (import.meta.env?.DEV) {
      const { sessionId, personaId, scenarioId, language, recognitionLocale, phase, voice } = state;
      console.debug('[Speekr voice]', { sessionId, personaId, scenarioId, language, recognitionLocale,
        voice: voice?.name, voiceLocale: voice?.lang, phase, event, reason });
    }
  }
  function publish(patch) {
    state = { ...state, ...patch };
    onChange(state);
  }
  function transition(phase, patch = {}) {
    if (disposed || state.phase === 'ended') return false;
    if (phase !== 'ended' && phase !== 'problem' && !transitions[state.phase].includes(phase)) {
      trace('transition.ignored', phase);
      return false;
    }
    publish({ ...patch, phase });
    trace('state');
    return true;
  }
  function release(reason) {
    host.clearTimeout(clock);
    host.clearTimeout(permissionTimer);
    discovery.abort();
    audio.stop(reason);
    if (owners.get(host) === end) owners.delete(host);
  }
  function elapsed() {
    return started === null ? 0 : Math.max(0, Math.min(LIMIT, host.performance.now() - started));
  }
  function end(reason = 'visitor-ended') {
    if (disposed || state.phase === 'ended') return;
    trace('session.end', reason);
    release(reason);
    pending = null;
    const duration = Math.floor(elapsed() / 1000);
    transition('ended', { issue: null, duration, remaining: CALL_SECONDS - duration, turns: [] });
  }
  function active() {
    if (disposed || state.phase === 'ended' || owners.get(host) !== end) return false;
    if (elapsed() >= LIMIT) { end('timeout'); return false; }
    return true;
  }
  function startClock() {
    if (started !== null) return;
    started = host.performance.now();
    function tick() {
      if (!active()) return;
      const left = LIMIT - elapsed();
      const remaining = Math.ceil(left / 1000);
      if (remaining !== state.remaining) publish({ remaining });
      clock = host.setTimeout(tick, Math.max(1, left - (remaining - 1) * 1000));
    }
    tick();
  }
  function problem(issue) {
    if (!active()) return;
    audio.stop(issue);
    transition('problem', { issue });
  }
  function addTurn(speaker, text) {
    publish({ turns: [...state.turns, { speaker, text }].slice(-16) });
  }

  async function checkVoice() {
    if (!active() || !transition('checkingVoice', { issue: null })) return;
    const voice = await waitForVoice(host, persona.voice, discovery.signal);
    if (!active() || state.phase !== 'checkingVoice') return;
    if (!voice) { problem('noVoice'); return; }
    transition('ready', { voice });
  }
  async function requestMic() {
    if (!active() || !transition('preparing')) return;
    permissionTimer = host.setTimeout(() => problem('permissionTimeout'), 25000);
    try {
      const stream = await host.navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      if (!active() || state.phase !== 'preparing') return;
      host.clearTimeout(permissionTimer);
      await checkVoice();
    } catch (error) {
      if (!active() || state.phase !== 'preparing') return;
      host.clearTimeout(permissionTimer);
      problem(['NotAllowedError', 'SecurityError'].includes(error?.name) ? 'denied' : 'mic');
    }
  }

  function playPending(silenceRetries = 1) {
    if (!active() || !pending || !transition('connecting')) return;
    const line = pending;
    const spoken = speechText(line.text, state.language, state.voice.lang);
    if (!spoken) { pending = null; problem('voice'); return; }

    function attempt(text, retry) {
      if (!active() || pending !== line || state.phase !== 'connecting') return;
      function play(voice) {
        if (!active() || pending !== line || state.phase !== 'connecting') return;
        if (!voice) { problem('noVoice'); return; }
        audio.play({ text, voice, profile: persona.voice, delay: retry ? 180 : 0,
          onStart() {
            if (!active() || !transition('speaking')) return;
            startClock();
            if (!line.shown) { addTurn('coach', line.text); line.shown = true; }
          },
          onEnd() {
            if (!active()) return;
            pending = null;
            if (line.done) end('goodbye');
            else listen(silenceRetries, spoken);
          },
          onError(code, remainder) {
            if (!active()) return;
            if (code === 'voice-unavailable' || code === 'language-unavailable') { problem('noVoice'); return; }
            if (retry || !remainder || code === 'not-allowed') { problem('voice'); return; }
            if (state.phase === 'speaking') transition('connecting');
            attempt(remainder, true);
          },
        });
      }
      const voice = currentVoice(synth, state.voice);
      // Stay in the original user gesture on the first, normal speak(). If the
      // inventory is incomplete, wait specifically for the already pinned voice.
      if (voice) play(voice);
      else waitForVoice(host, persona.voice, discovery.signal, state.voice).then(play);
    }
    attempt(spoken, false);
  }

  function listen(silenceRetries, previousSpeech = '') {
    if (!active() || !transition('openingMic', { issue: null })) return;
    let echo = false;
    audio.listen({ locale: state.recognitionLocale,
      onStart() { if (active()) transition('listening'); },
      onResult(text, immediate) {
        if (!active()) return;
        // A room echo can reach the device just as input opens. Only discard a
        // matching phrase from the coach, leaving short and later answers intact.
        const phrase = normalizeIntent(text);
        if (immediate && phrase.split(' ').length >= 4 && (' ' + normalizeIntent(previousSpeech)).endsWith(' ' + phrase)) {
          echo = true;
          trace('recognition.echo');
          return;
        }
        if (!transition('processing')) return;
        addTurn('visitor', text);
        pending = reply(text);
      },
      onEnd(unclear) {
        if (!active()) return;
        if (echo && silenceRetries > 0) listen(0, previousSpeech);
        else if (echo) transition('quiet');
        else if (pending) playPending();
        else if (silenceRetries > 0) {
          pending = reply('', unclear ? 'unclear' : 'silence');
          playPending(silenceRetries - 1);
        } else transition('quiet', { issue: unclear ? 'unclear' : null });
      },
      onError(code) {
        const issues = { 'not-allowed': 'denied', 'audio-capture': 'mic', 'network': 'network', 'output-busy': 'voice' };
        problem(issues[code] || 'recognition');
      },
    });
  }
  function startVoice() {
    if (!active() || state.phase !== 'ready') return;
    publish({ mode: 'voice' });
    pending = { text: script.intro, done: false };
    playPending();
  }
  function startText() {
    if (!active() || !transitions[state.phase].includes('text')) return;
    discovery.abort();
    host.clearTimeout(permissionTimer);
    audio.stop('text-mode');
    startClock();
    if (pending && !pending.shown) addTurn('coach', pending.text);
    else if (!state.turns.length) addTurn('coach', script.intro);
    transition(pending?.done ? 'textClosing' : 'text', { mode: 'text', issue: null });
    pending = null;
  }
  function sendText(input) {
    if (!active() || state.phase !== 'text' || typeof input !== 'string' || !input.trim()) return;
    const text = input.trim().slice(0, 500);
    addTurn('visitor', text);
    const next = reply(text);
    addTurn('coach', next.text);
    if (next.done) transition('textClosing');
  }
  trace('session.open');
  try { synth?.getVoices(); } catch { /* User-triggered discovery retries this. */ }
  return {
    getState: () => state, requestMic, startVoice, startText, sendText, end,
    retryVoice() { if (state.phase === 'problem' && state.issue === 'noVoice' && !state.mode) return checkVoice(); },
    retryListening() { if (state.phase === 'quiet') listen(0); },
    leavePage() { end('pagehide'); },
    hide() { if (state.mode) end('page-hidden'); },
    dispose(reason = 'closed') {
      if (disposed) return;
      disposed = true;
      trace('session.dispose', reason);
      release(reason);
      pending = null;
    },
  };
}
