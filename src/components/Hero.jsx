import { useRef, useState } from 'react';
import { AudioLines, BriefcaseBusiness, Check, Clock3, CodeXml, Headset, Phone, SlidersHorizontal, TrendingUp, Users } from 'lucide-react';
import { languageName, scenarios } from '../data/voice-demo/scenarios.js';
import './voice-demo/hero.css';

const icons = { sales: TrendingUp, care: Headset, leadership: Users, technical: CodeXml, screening: BriefcaseBusiness };
const labels = {
  en: {
    eyebrow: 'AI Roleplays', title: 'Practice real conversations', titleAccent: 'with AI.',
    subtitle: 'Choose a scenario, meet your coach, and try a free 30-second voice conversation.',
    scenario: 'Choose your scenario', coach: 'Choose your coach', goals: 'Practice goals',
    duration: '30 seconds', start: 'Start a free call', free: 'No sign-up required',
    loading: 'Opening your call…', loadError: 'The call could not load. Please try again.',
  },
  ar: {
    eyebrow: 'محاكاة بالذكاء الاصطناعي', title: 'تدرّب على محادثات واقعية', titleAccent: 'بالذكاء الاصطناعي',
    subtitle: 'اختار سيناريو، واتعرّف على مدربك، وجرّب محادثة صوتية مجانية لمدة ٣٠ ثانية.',
    scenario: 'اختار السيناريو', coach: 'اختار مدربك', goals: 'أهداف التدريب',
    duration: '٣٠ ثانية', start: 'ابدأ مكالمة مجانية', free: 'من غير تسجيل',
    loading: 'جاري فتح المكالمة…', loadError: 'تعذّر تحميل المكالمة. حاول مرة تانية.',
  },
};

export default function Hero({ locale = 'en' }) {
  const ui = labels[locale];
  const [scenario, setScenario] = useState(scenarios[0]);
  const [language, setLanguage] = useState(locale);
  const [CallDialog, setCallDialog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [call, setCall] = useState(null);
  const scenarioGroup = useRef(null);
  const dial = useRef(null);
  const persona = scenario.personas.find(item => item.language === language);

  function closeCall(chooseScenario = false) {
    setCall(null);
    requestAnimationFrame(() => {
      const control = chooseScenario ? scenarioGroup.current?.querySelector('input:checked') : dial.current;
      control?.focus();
    });
  }

  async function openCall() {
    setLoadError(false);
    if (!CallDialog) {
      setLoading(true);
      try {
        const module = await import('./voice-demo/CallDialog.jsx');
        setCallDialog(() => module.default);
      } catch {
        setLoadError(true);
        return;
      } finally {
        setLoading(false);
      }
    }
    setCall(persona.id);
  }

  return (
    <main id="home-hero" className="vd-hero" data-no-translate="true" lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="vd-layout">
        <div className="vd-intro">
          <div className="vd-eyebrow"><SlidersHorizontal size={17} aria-hidden="true" />{ui.eyebrow}</div>
          <h1>{ui.title} <span>{ui.titleAccent}</span></h1>
          <p>{ui.subtitle}</p>
          <fieldset className="vd-group vd-scenarios" ref={scenarioGroup} disabled={loading}>
            <legend>{ui.scenario}</legend>
            <div className="vd-options">
              {scenarios.map(option => {
                const Icon = icons[option.id];
                return (
                  <label className="vd-option" key={option.id}>
                    <input type="radio" name="demo-scenario" checked={scenario.id === option.id} onChange={() => setScenario(option)} />
                    <span><Icon size={16} aria-hidden="true" />{option.name[locale]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <section className="vd-card" aria-labelledby="vd-roleplay-title">
          <div className="vd-cover">
            <div className="vd-cover-copy">
              <span className="vd-category">{scenario.name[locale]}</span>
              <h2 id="vd-roleplay-title">{persona.title[locale]}</h2>
              <span className="vd-duration"><Clock3 size={15} aria-hidden="true" />{ui.duration}</span>
            </div>
            <div className="vd-photo" aria-hidden="true">
              <img key={persona.id} src={persona.portrait} width="200" height="200" alt="" />
            </div>
          </div>

          <div className="vd-card-body">
            <p className="vd-brief" aria-live="polite" aria-atomic="true">{persona.description[locale]}</p>
            <div className="vd-goals">
              <h3>{ui.goals}</h3>
              <ul>{scenario.goals.map(goal => (
                <li key={goal.en}><span><Check size={10} strokeWidth={3} aria-hidden="true" /></span>{goal[locale]}</li>
              ))}</ul>
            </div>
            <fieldset className="vd-group vd-coaches" disabled={loading}>
              <legend>{ui.coach}</legend>
              <div className="vd-personas">
                {scenario.personas.map(option => (
                  <label className="vd-persona" key={option.id}>
                    <input type="radio" name="demo-coach" checked={language === option.language} onChange={() => setLanguage(option.language)} />
                    <span className="vd-persona-body">
                      <img src={option.portrait} width="40" height="40" alt="" />
                      <span className="vd-persona-copy"><strong>{option.name[locale]}</strong><small lang={option.language}>{languageName[option.language]}</small></span>
                      <span className="vd-choice-mark" aria-hidden="true"><Check size={10} strokeWidth={3} /></span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="vd-card-footer">
            <span className="vd-free"><AudioLines size={18} aria-hidden="true" />{ui.free}</span>
            <button ref={dial} className="vd-dial" type="button" aria-haspopup="dialog" disabled={loading} onClick={openCall}>
              <Phone size={17} aria-hidden="true" />{loading ? ui.loading : ui.start}
            </button>
            {loadError && <span className="vd-error" role="alert">{ui.loadError}</span>}
          </div>
        </section>
      </div>
      {call && CallDialog && <CallDialog key={call} personaId={call} locale={locale}
        onClose={() => closeCall()} onChooseScenario={() => closeCall(true)} />}
    </main>
  );
}
