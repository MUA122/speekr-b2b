import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { AudioLines, ChartNoAxesCombined, ListChecks, PencilRuler } from "lucide-react";
import { translateUiValue } from "../utils/arabicTranslations.js";
import "./HowItWorks.css";

const chapters = {
  scenario: {
    icon: PencilRuler, label: { en: "Create", ar: "صمّم" },
    image: "/images/walkthrough/create.webp",
    alt: { en: "Scenario builder with difficulty, industry and language settings", ar: "منشئ السيناريوهات مع إعدادات الصعوبة والقطاع واللغة" },
  },
  roleplay: {
    icon: AudioLines, label: { en: "Practice", ar: "تدرّب" },
    image: "/images/walkthrough/practice.webp",
    alt: { en: "An AI roleplay partner on a video call with a voice waveform", ar: "شريك محاكاة بالذكاء الاصطناعي في مكالمة فيديو مع عرض الموجة الصوتية" },
  },
  feedback: {
    icon: ListChecks, label: { en: "Improve", ar: "طوّر" },
    image: "/images/walkthrough/improve.webp",
    alt: { en: "Coaching feedback alongside the recorded conversation", ar: "ملاحظات التدريب بجانب تسجيل المحادثة" },
  },
  analytics: {
    icon: ChartNoAxesCombined, label: { en: "Measure", ar: "قِس" },
    image: "/images/walkthrough/measure.webp",
    alt: { en: "Team reporting dashboard with a leaderboard and an engagement chart", ar: "لوحة تقارير الفريق مع ترتيب المشاركين ورسم بياني للتفاعل" },
  },
};

export default function PracticeTimeline({ steps, locale = "en" }) {
  const track = useRef(null);
  const frame = useRef(null);
  const tabs = useRef([]);
  const glideFrame = useRef(0);
  const [active, setActive] = useState(0);
  const pinned = useMediaQuery("(min-width: 820px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)");
  const isArabic = locale === "ar";
  const step = steps[active];
  const digits = new Intl.NumberFormat(isArabic ? "ar-EG" : "en", { minimumIntegerDigits: 2 });

  // The sticky frame's available travel is split into equal reading intervals.
  function scrollRange() {
    const rect = track.current.getBoundingClientRect();
    // WebKit may report "auto" before the sticky layout is applied.
    const stickyTop = Number.parseFloat(getComputedStyle(frame.current).top) || 0;
    return {
      start: rect.top + window.scrollY - stickyTop,
      travel: rect.height - frame.current.offsetHeight,
    };
  }

  useEffect(() => {
    if (!pinned) return undefined;
    const section = track.current;
    let paintFrame = 0;
    let position;
    let target = 0;
    let lastPaint = 0;

    function paint() {
      const index = Math.max(0, Math.min(steps.length - 1, Math.floor(position)));
      section.style.setProperty("--chapter-fill", String(position - index));
      setActive(index);
    }

    // Ease the visible progress between wheel events, independent of the display refresh rate.
    function followScroll(now) {
      // The first frame timestamp can precede a scroll event from the same frame.
      const elapsed = Math.max(0, now - lastPaint);
      lastPaint = now;
      position += (target - position) * (1 - Math.exp(-elapsed / 105));
      if (Math.abs(target - position) < 0.001) position = target;
      paint();
      paintFrame = position === target ? 0 : requestAnimationFrame(followScroll);
    }

    function measure() {
      const { start, travel } = scrollRange();
      if (travel <= 0) return;
      target = Math.max(0, Math.min(steps.length, (window.scrollY - start) / travel * steps.length));
      if (position === undefined) {
        position = target;
        paint();
      } else if (!paintFrame && position !== target) {
        lastPaint = performance.now();
        paintFrame = requestAnimationFrame(followScroll);
      }
    }

    function stopGlide() {
      cancelAnimationFrame(glideFrame.current);
      glideFrame.current = 0;
    }
    const interrupts = ["wheel", "touchstart", "pointerdown", "keydown", "resize"];
    for (const event of interrupts) window.addEventListener(event, stopGlide, { capture: true, passive: true });
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      stopGlide();
      cancelAnimationFrame(paintFrame);
      section.style.removeProperty("--chapter-fill");
      for (const event of interrupts) window.removeEventListener(event, stopGlide, true);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [pinned, steps.length]);

  function select(index) {
    if (pinned) {
      const { start, travel } = scrollRange();
      if (travel > 0) {
        cancelAnimationFrame(glideFrame.current);
        const from = window.scrollY;
        const distance = start + travel * (index + 0.5) / steps.length - from;
        const duration = Math.min(1150, 450 + Math.abs(distance) * 0.48);
        const began = performance.now();
        function glide(now) {
          const t = Math.min(1, Math.max(0, (now - began) / duration));
          const eased = (1 - Math.cos(Math.PI * t)) / 2;
          window.scrollTo({ top: from + distance * eased, behavior: "instant" });
          glideFrame.current = t < 1 ? requestAnimationFrame(glide) : 0;
        }
        glideFrame.current = requestAnimationFrame(glide);
        return;
      }
    }
    setActive(index);
  }

  function handleTabKey(event, index) {
    const forward = isArabic ? "ArrowLeft" : "ArrowRight";
    const backward = isArabic ? "ArrowRight" : "ArrowLeft";
    let next;
    switch (event.key) {
      case forward: next = (index + 1) % steps.length; break;
      case backward: next = (index - 1 + steps.length) % steps.length; break;
      case "Home": next = 0; break;
      case "End": next = steps.length - 1; break;
      default: return;
    }
    event.preventDefault();
    tabs.current[next]?.focus({ preventScroll: true });
    select(next);
  }

  const walkthrough = isArabic ? "جولة في منصة Speekr" : "Speekr walkthrough";
  return (
    <section ref={track} id="product-walkthrough" aria-label={walkthrough} className="practice-track"
      lang={locale} dir={isArabic ? "rtl" : "ltr"} data-no-translate="true" data-pinned={pinned}>
      <div className="practice-frame" ref={frame}>
        <div className="practice-chapters" role="tablist" aria-label={isArabic ? "خطوات التدريب" : "Practice steps"}>
          {steps.map(({ type }, index) => {
            const { icon: Icon, label } = chapters[type];
            return (
              <button type="button" role="tab" key={type} id={`practice-tab-${type}`}
                ref={node => { tabs.current[index] = node; }}
                aria-controls="practice-panel" aria-selected={active === index}
                data-complete={index < active}
                tabIndex={active === index ? 0 : -1}
                onClick={() => select(index)} onKeyDown={event => handleTabKey(event, index)}>
                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                <span>{label[locale]}</span>
              </button>
            );
          })}
        </div>
        <div className="practice-stage" id="practice-panel" role="tabpanel" tabIndex={0}
          aria-labelledby={`practice-tab-${step.type}`}>
          <div className="practice-caption">
            <div className="practice-caption-line">
              <span>{walkthrough}</span>
              <span className="practice-count" dir="ltr" aria-label={isArabic
                ? `الخطوة ${active + 1} من ${steps.length}` : `Step ${active + 1} of ${steps.length}`}>
                {digits.format(active + 1)} <span>/</span> {digits.format(steps.length)}
              </span>
            </div>
            <div className="practice-descriptions">
              {steps.map(({ type, title, copy }) => (
                <div key={type} className="practice-description" data-current={type === step.type}
                  aria-hidden={type !== step.type}>
                  <h2>{translateUiValue(title, locale)}</h2>
                  <p>{translateUiValue(copy, locale)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="practice-mac">
            <div className="practice-display">
              <div className="practice-screen">
                <div className="practice-toolbar" aria-hidden="true">
                  <span className="practice-window-controls"><i /><i /><i /></span>
                  <span>Speekr.ai</span>
                </div>
                <div className="practice-exhibit">
                  {steps.map(({ type }) => (
                    <img key={type} className="practice-art" data-current={type === step.type}
                      src={chapters[type].image} loading="lazy" decoding="async" aria-hidden={type !== step.type}
                      alt={chapters[type].alt[locale]} />
                  ))}
                </div>
              </div>
            </div>
            <div className="practice-stand" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
