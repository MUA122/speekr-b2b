// Keep one audible clip. Retire its handlers before stopping it, since queued media
// events and play() promises can finish after another country has been selected.
export const initialVoiceState = { id: null, status: 'idle', elapsed: 0, duration: 0 };

export function createVoicePlayer(onChange, host = window) {
  let clip = null;
  let context = null;
  let state = initialVoiceState;
  let request = 0;

  function publish(status) {
    const audio = clip?.audio;
    state = {
      ...state,
      status,
      elapsed: audio?.currentTime || 0,
      duration: Number.isFinite(audio?.duration) ? audio.duration : state.duration,
    };
    onChange(state);
  }

  function release() {
    request++;
    if (!clip) return;
    const { audio, source, analyser } = clip;
    clip = null;
    audio.onplaying = audio.onpause = audio.onended = audio.onerror = null;
    audio.ontimeupdate = audio.onloadedmetadata = audio.onwaiting = null;
    audio.pause();
    source?.disconnect();
    analyser?.disconnect();
    audio.removeAttribute('src');
    audio.load();
  }

  async function connectMeter(current) {
    const AudioContext = host.AudioContext || host.webkitAudioContext;
    if (!AudioContext) return;
    try {
      context ??= new AudioContext();
      if (context.state !== 'running') await context.resume();
      if (clip !== current || current.source || context.state !== 'running') return;
      const analyser = context.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.73;
      const source = context.createMediaElementSource(current.audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      Object.assign(current, { source, analyser });
    } catch {
      // Native media playback remains available when Web Audio is unavailable.
    }
  }

  function pause() {
    request++;
    if (!clip || !['playing', 'loading'].includes(state.status)) return;
    clip.audio.pause();
    publish('paused');
  }

  function toggle(id, sample) {
    if (state.id === id && ['playing', 'loading'].includes(state.status)) {
      pause();
      return;
    }
    if (!clip || state.id !== id || state.status === 'error') {
      release();
      state = { ...initialVoiceState, id, duration: sample?.duration || 0 };
      if (!sample?.src) { publish('unavailable'); return; }
      const audio = new host.Audio();
      const current = { audio };
      clip = current;
      audio.preload = 'auto';
      audio.onplaying = () => { if (clip === current && !audio.paused) publish('playing'); };
      audio.onwaiting = () => { if (clip === current && !audio.paused) publish('loading'); };
      audio.onpause = () => {
        if (clip === current && audio.paused && !audio.ended && state.status !== 'error') publish('paused');
      };
      audio.onended = () => { if (clip === current) publish('ended'); };
      audio.onerror = () => { if (clip === current) publish('error'); };
      audio.ontimeupdate = audio.onloadedmetadata = () => { if (clip === current) publish(state.status); };
      audio.src = sample.src;
    }
    const current = clip;
    if (state.status === 'ended' || current.audio.ended) current.audio.currentTime = 0;
    const attempt = ++request;
    publish('loading');
    // Both operations are initiated directly by the visitor's play gesture.
    connectMeter(current);
    try {
      Promise.resolve(current.audio.play()).catch(() => {
        if (clip === current && attempt === request) publish('error');
      });
    } catch {
      if (clip === current && attempt === request) publish('error');
    }
  }

  return {
    toggle, pause,
    getAnalyser: () => clip?.analyser,
    dispose() {
      release();
      if (context && context.state !== 'closed') context.close().catch(() => {});
    },
  };
}
