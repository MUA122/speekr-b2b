import { useEffect, useRef } from 'react';

// Each envelope is sampled from its own recording. Blend it into live FFT levels
// on play, and let the bars settle back onto the envelope when the voice stops.
export default function VoiceWave({ peaks, playing, controller, progress }) {
  const canvas = useRef(null);
  const playback = useRef({ playing, progress });
  const redraw = useRef(null);

  useEffect(() => {
    playback.current = { playing, progress };
    redraw.current?.();
  }, [playing, progress]);

  useEffect(() => {
    const node = canvas.current;
    const ctx = node.getContext('2d');
    if (!ctx || !peaks?.length) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const levels = Float32Array.from(peaks, value => value / 100);
    const spectrum = new Uint8Array(256);
    let frame = 0;
    let width = 0;
    let height = 0;
    let lastDraw = 0;
    let wasLive = false;

    function draw(now) {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const { playing: live, progress: fraction } = playback.current;
      const analyser = live && !motion.matches && controller.current?.getAnalyser();
      if (analyser) analyser.getByteFrequencyData(spectrum);
      const easing = motion.matches ? 1 : Math.min(1, Math.max(8, now - lastDraw) / 75);
      lastDraw = now;
      let settling = false;
      const pitch = width / peaks.length;
      for (let i = 0; i < peaks.length; i++) {
        const at = (i + .5) / peaks.length;
        let target = peaks[i] / 100;
        if (analyser) {
          const hz = 90 * Math.pow(80, at);
          const bin = Math.min(spectrum.length - 2, hz * analyser.fftSize / analyser.context.sampleRate);
          const low = Math.floor(bin);
          target = (spectrum[low] + (spectrum[low + 1] - spectrum[low]) * (bin - low)) / 255;
        }
        levels[i] += (target - levels[i]) * easing;
        if (Math.abs(target - levels[i]) > .012) settling = true;
        const bar = Math.max(2, height * (.075 + levels[i] * .88));
        ctx.fillStyle = at <= fraction ? '#e9ffbc' : '#a5d85a';
        ctx.fillRect(i * pitch + pitch * .18, (height - bar) / 2, Math.max(1, pitch * .58), bar);
      }
      // The analyser may become available just after the media starts playing.
      if (!motion.matches && (live || (wasLive && settling))) frame = requestAnimationFrame(draw);
      wasLive = live || (wasLive && settling);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function resize() {
      const rect = node.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.max(1, Math.round(width * scale));
      node.height = Math.max(1, Math.round(height * scale));
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      schedule();
    }
    redraw.current = schedule;
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    motion.addEventListener('change', schedule);
    return () => {
      redraw.current = null;
      observer.disconnect();
      motion.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
    };
  }, [peaks, controller]);

  return <canvas ref={canvas} className="atlas-wave" aria-hidden="true" />;
}
