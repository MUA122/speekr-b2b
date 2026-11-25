import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { ArrowRight, Check } from "lucide-react";
import { brand } from "../theme.js";
import { landingCopy } from "../utils/i18n.js";
import "./SpeekrDifference.css";

const DURATION = 5000;

function useTrainingProgress() {
  const target = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let started = false;
    let observer;
    const finish = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      setProgress(100);
    };
    const start = () => {
      if (started) return;
      started = true;
      observer?.disconnect();
      const startTime = performance.now();
      const tick = (now) => {
        const next = Math.min(100, ((now - startTime) / DURATION) * 100);
        setProgress(next);
        if (next < 100) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const onMotionChange = () => { if (motion.matches) finish(); };
    if (motion.matches || !("IntersectionObserver" in window)) {
      finish();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
      }, { threshold: 0.25 });
      observer.observe(target.current);
    }
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return [target, progress];
}

export default function SpeekrDifference({ locale = "en" }) {
  const copy = landingCopy[locale].difference;
  const [target, progress] = useTrainingProgress();
  const complete = progress === 100;
  const training = locale === "ar" ? "أنت تتدرّب مع سبيكر" : "You're training with Speekr";
  const ready = locale === "ar" ? "خطوتك التالية تبدأ هنا" : "Your next step starts here";

  return (
    <Box component="section" id="the-difference" className="speekr-difference"
      lang={locale} aria-labelledby="difference-title" data-no-translate="true"
      sx={{
        "--difference-paper": brand.ivory,
        "--difference-forest": brand.forest,
        "--difference-orange": brand.orange,
        "--difference-muted": alpha(brand.ink, 0.77),
        "--difference-line": brand.line,
        "--difference-light-line": alpha(brand.ivory, 0.19),
        bgcolor: "background.default",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        pt: { xs: 3, md: 5 }, pb: { xs: 5, md: 8 },
      }}>
      <div className="difference-layout">
        <header className="difference-intro">
          <h2 id="difference-title">{copy.title} <span>{copy.accent}</span></h2>
          <p>{copy.intro}</p>
        </header>
        <div className="difference-journey" data-complete={complete}>
          <div className="difference-before">
            <h3>{copy.before}</h3>
            <ul>{copy.rows.map(([before]) => <li key={before}><span>{before}</span><span className="difference-minus" aria-hidden="true">−</span></li>)}</ul>
          </div>
          <div className="difference-progress" ref={target}>
            <div className="difference-dial" role="progressbar" aria-label={training}
              aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(progress)}>
              <svg viewBox="0 0 240 240" aria-hidden="true">
                <circle className="difference-ring-track" cx="120" cy="120" r="108" />
                <circle className="difference-ring-fill" cx="120" cy="120" r="108" pathLength="100"
                  strokeDasharray="100" strokeDashoffset={100 - progress} />
              </svg>
              <div className="difference-dial-value" aria-hidden="true">
                <img src="/images/green.png" alt="" width="32" height="32" />
                <span className="difference-number">{Math.floor(progress)}<span>%</span></span>
              </div>
            </div>
            <p className="difference-training">{training}</p>
            <p className="difference-status" role="status">{complete ? ready : '\u00a0'}</p>
          </div>
          <div className="difference-after">
            <h3>{copy.after}<img src="/images/off-green.png" alt="" width="28" height="28" /></h3>
            <ul>{copy.rows.map(([before, after], index) => (
              <li key={before} data-revealed={progress >= ((index + 1) / copy.rows.length) * 85}>
                <Check size={17} strokeWidth={1.8} aria-hidden="true" /><span>{after}</span>
              </li>
            ))}</ul>
          </div>
        </div>
        <a className="difference-cta" href="#home-hero">
          <span>{copy.cta}</span><span className="difference-cta-icon" aria-hidden="true"><ArrowRight size={17} strokeWidth={2} /></span>
        </a>
      </div>
    </Box>
  );
}
