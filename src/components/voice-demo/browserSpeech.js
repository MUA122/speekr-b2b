import { sameVoice } from './voiceSelection.js';

// One browser operation owns the native handlers and its watchdog. Invalidate it
// before calling cancel/abort: some engines dispatch their last events inline.
export function createBrowserSpeech(host, trace, sessionActive) {
  const synth = host.speechSynthesis;
  let current, timer, ownsOutput = false;

  function stop(reason) {
    const previous = current;
    current = null;
    host.clearTimeout(timer);
    previous?.release?.(reason);
    if (ownsOutput && reason !== 'complete' && (previous || reason !== 'handoff')) {
      ownsOutput = false;
      try { synth.cancel(); } catch { trace('synthesis.error', 'cancel-failed'); }
    }
  }

  function operation() {
    stop('handoff');
    const job = {
      release: null,
      active: () => current === job && sessionActive(),
      after(ms, callback) {
        host.clearTimeout(timer);
        timer = host.setTimeout(() => { if (job.active()) callback(); }, ms);
      },
      finish(callback) {
        stop('complete');
        callback();
      },
    };
    current = job;
    return job;
  }

  // Leave a short acoustic tail after playback and give native cancellation time to drain.
  function whenSilent(job, initialDelay, callback, onBusy) {
    const deadline = host.performance.now() + initialDelay + 1200;
    function check() {
      if (!synth.speaking && !synth.pending) { ownsOutput = false; callback(); }
      else if (host.performance.now() >= deadline) onBusy();
      else job.after(60, check);
    }
    if (initialDelay) job.after(initialDelay, check);
    else check();
  }

  function play({ text, voice, profile, delay, onStart, onEnd, onError }) {
    const job = operation();
    let started = false, nextWord = 0;
    function fail(code) {
      if (!job.active()) return;
      trace('synthesis.error', code);
      stop(code);
      // Only replay the full line if it never started. A word boundary lets us
      // resume a partially played line without getting stuck on its first word.
      const remaining = started ? (nextWord ? text.slice(nextWord).trimStart() : '') : text;
      onError(code, remaining);
    }
    function speak() {
      try {
        const utterance = new host.SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.lang = voice.lang.replaceAll('_', '-');
        if (!sameVoice(utterance.voice, voice)) { fail('voice-unavailable'); return; }
        utterance.rate = profile.rate;
        utterance.pitch = profile.pitch;
        utterance.volume = profile.volume;
        job.release = reason => {
          utterance.onstart = utterance.onend = utterance.onerror = utterance.onboundary = null;
          if (reason !== 'complete') trace('synthesis.cancel', reason);
        };
        function armPlayback() {
          const wordsLeft = text.slice(nextWord).trim().split(/\s+/u).length;
          const msPerWord = profile.locale.startsWith('ar') ? 850 : 500;
          const budget = Math.min(22000, 4000 + wordsLeft * msPerWord / profile.rate);
          job.after(budget, () => fail('playback-timeout'));
        }
        utterance.onstart = () => {
          if (!job.active() || started) return;
          started = true;
          trace('synthesis.start');
          armPlayback();
          onStart();
        };
        utterance.onboundary = event => {
          if (!job.active() || !started || event.name !== 'word' || !Number.isInteger(event.charIndex)) return;
          const index = event.charIndex;
          if (index < nextWord || index < 0 || index >= text.length) return;
          const word = /^\S+/.exec(text.slice(index));
          if (word) { nextWord = index + word[0].length; armPlayback(); }
        };
        utterance.onend = () => {
          if (!job.active()) return;
          if (!started) { fail('ended-before-start'); return; }
          trace('synthesis.end');
          ownsOutput = Boolean(synth.speaking || synth.pending);
          job.finish(onEnd);
        };
        utterance.onerror = event => fail(event?.error || 'synthesis-failed');
        if (synth.paused) synth.resume();
        job.after(4500, () => fail('start-timeout'));
        trace('synthesis.request');
        ownsOutput = true;
        synth.speak(utterance);
      } catch { fail('synthesis-failed'); }
    }
    whenSilent(job, delay, speak, () => fail('queue-busy'));
  }

  function listen({ locale, onStart, onResult, onEnd, onError }) {
    const job = operation();
    let rec, openedAt, speechBegan, started = false, stopping = false, gotResult = false;
    let audioEnded = false, disconnected = false, unclear = false;
    function fail(code) {
      if (!job.active()) return;
      trace('recognition.error', code);
      stop(code);
      onError(code);
    }
    function finish() {
      if (!job.active()) return;
      job.finish(() => onEnd(unclear));
    }
    // A final result can precede audioend/end, or arrive after audioend. Keep it
    // through either ordering. If capture never confirms release, fall back to text.
    function requestStop() {
      if (stopping || disconnected || !job.active()) return;
      stopping = true;
      job.after(650, () => {
        trace('recognition.abort', 'stop-timeout');
        job.after(500, () => { if (audioEnded) finish(); else fail('release-timeout'); });
        try { rec.abort(); } catch { /* The service may already be disconnected. */ }
      });
      try { rec.stop(); } catch { /* The watchdog still verifies release. */ }
    }
    function start() {
      try {
        const Recognition = host.SpeechRecognition || host.webkitSpeechRecognition;
        rec = new Recognition();
        rec.lang = locale;
        rec.continuous = false;
        rec.interimResults = false;
        job.release = reason => {
          rec.onstart = rec.onend = rec.onresult = rec.onerror = rec.onnomatch = null;
          rec.onspeechstart = rec.onspeechend = rec.onaudioend = null;
          if (reason !== 'complete') {
            trace('recognition.abort', reason);
            try { rec.abort(); } catch { /* The recognizer may never have opened. */ }
          }
        };
        rec.onstart = () => {
          if (!job.active() || started || stopping || disconnected) return;
          started = true;
          openedAt = host.performance.now();
          trace('recognition.start');
          job.after(9000, requestStop);
          onStart();
        };
        rec.onspeechstart = () => {
          if (!job.active() || stopping || disconnected) return;
          speechBegan ??= host.performance.now();
          job.after(14000, requestStop);
        };
        rec.onspeechend = () => { if (job.active() && !stopping && !disconnected) job.after(3500, requestStop); };
        rec.onaudioend = () => {
          if (!job.active()) return;
          audioEnded = true;
          trace('recognition.audioend');
          if (!stopping && !disconnected) job.after(3500, requestStop);
        };
        rec.onresult = event => {
          if (!job.active() || gotResult) return;
          const results = Array.from(event.results || []).slice(event.resultIndex || 0).filter(r => r?.isFinal);
          if (!results.length) return;
          const words = results.map(r => r[0]?.transcript).filter(t => typeof t === 'string').join(' ').trim().slice(0, 500);
          if (/[\p{L}\p{N}]/u.test(words)) {
            gotResult = true;
            trace('recognition.final');
            onResult(words, (speechBegan ?? host.performance.now()) - openedAt < 650);
          } else {
            unclear = true;
            trace('recognition.empty-final');
          }
          if (job.active()) requestStop();
        };
        rec.onnomatch = () => {
          if (!job.active()) return;
          unclear = true;
          trace('recognition.nomatch');
          requestStop();
        };
        rec.onerror = event => {
          if (!job.active() || disconnected) return;
          const code = event.error;
          if (code === 'no-speech' || (code === 'aborted' && stopping)) {
            trace('recognition.error', code);
            requestStop();
          } else { fail(code); }
        };
        rec.onend = () => {
          if (!job.active() || disconnected) return;
          disconnected = true;
          trace('recognition.end');
          // Drain the native event queue before the speaker takes over. Some
          // providers dispatch the final result immediately after disconnecting.
          job.after(100, () => {
            if (!started && !gotResult && !stopping) fail('ended-before-start');
            else finish();
          });
        };
        job.after(4500, () => fail('start-timeout'));
        trace('recognition.request');
        rec.start();
      } catch { fail('start-failed'); }
    }
    whenSilent(job, 220, start, () => fail('output-busy'));
  }

  return { play, listen, stop };
}
