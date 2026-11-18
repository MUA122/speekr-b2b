import { useLayoutEffect, useRef, useState } from "react";
import "./HowItWorks.css";

// Fit the artwork, excluding only transparent asset margins, into the same frame.
const artworkBounds = {
  scenario: { viewBox: "80 47 971 976", width: 1080, height: 1080 },
  roleplay: { viewBox: "37 178 1007 779", width: 1080, height: 1080 },
  feedback: { viewBox: "0 104 1080 933", width: 1080, height: 1080 },
  analytics: { viewBox: "4 89 1207 998", width: 1353, height: 1080 },
};

export default function PracticeTimeline({ steps, images }) {
  const track = useRef(null);
  const geometry = useRef({ start: 0, travel: 1 });
  const [active, setActive] = useState(0);
  const labels = ["CREATE", "PRACTICE", "IMPROVE", "MEASURE"];

  useLayoutEffect(() => {
    const node = track.current;
    const list = node.querySelector(".practice-steps");
    const cards = [...list.querySelectorAll(".practice-step")];
    const surfaces = [...list.querySelectorAll(".practice-surface")];
    const windows = [...node.querySelectorAll(".practice-window")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let positions = [];
    let previous = -1;
    let frame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      const { start, travel } = geometry.current;
      const phase = (window.scrollY - start) / travel * cards.length;
      // Keep a reading interval on each side of a short, reversible handoff.
      const boundary = Math.round(phase);
      const t = Math.max(0, Math.min(1, (phase - boundary + 0.22) / 0.44));
      const blend = motion.matches ? Number(t >= 0.5) : t * t * (3 - 2 * t);
      const position = Math.max(0, Math.min(cards.length - 1, boundary - 1 + blend));
      if (position === previous) return;
      previous = position;
      const from = Math.floor(position);
      const to = Math.min(from + 1, cards.length - 1);
      const fraction = position - from;
      const tops = positions[from].map((top, i) => top + (positions[to][i] - top) * fraction);

      cards.forEach((card, i) => {
        const weight = Math.max(0, 1 - Math.abs(position - i));
        const shift = `translateY(${tops[i]}px)`;
        card.style.transform = shift;
        surfaces[i].style.transform = shift;
        surfaces[i].style.opacity = weight;
        surfaces[i].style.setProperty("--weight", weight);
        card.style.setProperty("--weight", weight);
        if (i + 1 < cards.length) {
          const length = tops[i + 1] - tops[i];
          card.style.setProperty("--segment", length);
          card.style.setProperty("--completed", Math.max(0, Math.min(1, position - i)));
        }
        const depth = i - position;
        windows[i].style.setProperty("--depth", Math.max(0, depth));
        windows[i].style.setProperty("--passed", Math.max(0, Math.min(1, -depth)));
        windows[i].style.visibility = depth <= -1 ? "hidden" : "visible";
      });
      setActive(Math.round(position));
    };

    const measure = () => {
      const pinTop = parseFloat(getComputedStyle(node).getPropertyValue("--pin-top"));
      geometry.current = {
        start: window.scrollY + node.getBoundingClientRect().top - pinTop,
        travel: Math.max(1, node.offsetHeight - node.firstElementChild.offsetHeight),
      };
      const sizes = cards.map(card => {
        const padding = parseFloat(getComputedStyle(card).paddingTop);
        const closed = card.querySelector("button").offsetHeight + 2 * padding;
        return { closed, extra: card.querySelector("p").offsetHeight + 10 };
      });
      const closedTotal = sizes.reduce((sum, size) => sum + size.closed, 0);
      const height = Math.max(list.clientHeight, closedTotal + Math.max(...sizes.map(size => size.extra)));
      positions = sizes.map((open, selected) => {
        const gap = (height - closedTotal - open.extra) / (cards.length - 1);
        let top = 0;
        return sizes.map((size, i) => {
          const y = top;
          top += size.closed + gap + (selected === i ? size.extra : 0);
          return y;
        });
      });
      sizes.forEach(({ closed, extra }, i) => {
        surfaces[i].style.setProperty("--open-height", `${closed + extra}px`);
        surfaces[i].style.setProperty("--closed-ratio", closed / (closed + extra));
      });
      list.style.setProperty("--min-height", `${closedTotal + Math.max(...sizes.map(size => size.extra))}px`);
      previous = -1;
      update();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    measure();
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    motion.addEventListener("change", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [steps]);

  const select = (index) => {
    const { start, travel } = geometry.current;
    window.scrollTo({ top: start + travel * (index + .5) / steps.length, behavior: "instant" });
  };

  return (
    <section ref={track} className="practice-track" aria-label="From practice to performance">
      <div className="practice-pin">
        <div className="practice-layout">
          <div className="practice-steps">
            {steps.map(step => <div key={step.number} className="practice-surface" aria-hidden />)}
            {steps.map((step, index) => (
              <div className={`practice-step ${active === index ? "is-active" : ""}`} key={step.number}>
                <span className={`practice-dot ${index <= active ? "is-complete" : ""}`} aria-hidden />
                {index < steps.length - 1 && <span className="practice-segment" aria-hidden />}
                <button type="button" onClick={() => select(index)} aria-expanded={active === index} aria-controls={`practice-copy-${index}`}>
                  <span className="practice-label">{labels[index]}</span>
                  <span className="practice-title">{step.title}</span>
                </button>
                <div id={`practice-copy-${index}`} className="practice-copy" aria-hidden={active !== index}>
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="practice-preview">
            {steps.map((step, index) => {
              return (
                <div key={step.number} className={`practice-window ${index === active ? "is-front" : ""}`} aria-hidden={index !== active}
                  style={{ zIndex: steps.length - index }}>
                  <div className="practice-bar"><span aria-hidden><i /><i /><i /></span><span>{step.title}</span></div>
                  <div className="practice-visuals">
                    <svg viewBox={artworkBounds[step.type].viewBox} role="img" aria-label={step.title} preserveAspectRatio="xMidYMid meet">
                      <image href={images[step.type]} width={artworkBounds[step.type].width} height={artworkBounds[step.type].height} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
