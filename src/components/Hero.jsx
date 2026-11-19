import { useRef, useState } from 'react';
import { AudioLines, BriefcaseBusiness, Check, Clock3, CodeXml, Globe2, Headset, Lightbulb, Phone, TrendingUp, Users } from 'lucide-react';
import { languageName, scenarios } from '../data/voice-demo/scenarios.js';
import './voice-demo/hero.css';

const icons = { sales: TrendingUp, care: Headset, leadership: Users, technical: CodeXml, screening: BriefcaseBusiness };
const labels = {
  en: {
    title: 'Practice real conversations', titleAccent: 'with AI',
    subtitle: 'Choose a scenario, meet your coach, and try a free 30-second voice conversation.',
    scenario: 'Choose your scenario', coach: 'Choose your coach', expect: 'What to expect',
    preview: 'Coach preview', duration: '30 seconds', start: 'Start a Free Call', free: 'No sign-up required',
    loading: 'Opening your call…', loadError: 'The call could not load. Please try again.',
  },
  ar: {
    title: 'تدرّب على محادثات واقعية', titleAccent: 'بالذكاء الاصطناعي',
    subtitle: 'اختار سيناريو، واتعرّف على مدربك، وجرّب محادثة صوتية مجانية لمدة ٣٠ ثانية.',
    scenario: 'اختار السيناريو', coach: 'اختار مدربك', expect: 'إيه اللي هتتدرّب عليه؟',
    preview: 'معاينة المدرب', duration: '٣٠ ثانية', start: 'ابدأ مكالمة مجانية', free: 'من غير تسجيل',
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
      <div className="vd-intro">
        <h1>{ui.title} <span className="vd-title-accent">{ui.titleAccent}</span></h1>
        <p>{ui.subtitle}</p>
      </div>
      <div className="vd-studio">
        <div className="vd-setup">
          <fieldset className="vd-group" ref={scenarioGroup} disabled={loading}>
            <legend><span className="vd-step" aria-hidden="true">{locale === 'ar' ? '١' : '1'}</span>{ui.scenario}</legend>
            <div className="vd-options">
              {scenarios.map(option => {
                const Icon = icons[option.id];
                return (
                  <label className="vd-option" key={option.id}>
                    <input type="radio" name="demo-scenario" checked={scenario.id === option.id} onChange={() => setScenario(option)} />
                    <span className="vd-option-body"><span className="vd-option-icon"><Icon size={19} aria-hidden="true" /></span>{option.name[locale]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="vd-group" disabled={loading}>
            <legend><span className="vd-step" aria-hidden="true">{locale === 'ar' ? '٢' : '2'}</span>{ui.coach}</legend>
            <div className="vd-personas">
              {scenario.personas.map(option => (
                <label className="vd-persona" key={option.id}>
                  <input type="radio" name="demo-coach" checked={language === option.language} onChange={() => setLanguage(option.language)} />
                  <span className="vd-persona-body">
                    <img src={option.portrait} width="52" height="58" alt="" />
                    <span className="vd-persona-copy"><strong>{option.name[locale]}</strong><small lang={option.language}>{languageName[option.language]}</small></span>
                    <span className="vd-check" aria-hidden="true"><Check size={10} strokeWidth={3} /></span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="vd-brief" aria-live="polite" aria-atomic="true">
            <div><Lightbulb size={16} aria-hidden="true" />{ui.expect}</div>
            <p>{persona.description[locale]}</p>
          </div>
        </div>
        <section className="vd-stage" aria-label={ui.preview}>
          <div className="vd-stage-top">
            <span><AudioLines size={17} aria-hidden="true" />{ui.preview}</span>
            <span><Clock3 size={14} aria-hidden="true" />{ui.duration}</span>
          </div>
          <div className="vd-profile" key={persona.id}>
            <div className="vd-portrait">
              <img src={persona.portrait} width="260" height="260" alt={persona.name[locale]} />
              <span className="vd-language" lang={persona.language}><Globe2 size={13} aria-hidden="true" />{languageName[persona.language]}</span>
            </div>
            <h2>{persona.name[locale]}</h2>
            <p>{persona.role[locale]}</p>
          </div>
          <div className="vd-stage-action">
            <button ref={dial} className="vd-dial" type="button" aria-haspopup="dialog" disabled={loading} onClick={openCall}>
              <Phone size={18} aria-hidden="true" />{loading ? ui.loading : ui.start}
            </button>
            <small>{ui.free}</small>
            {loadError && <span role="alert">{ui.loadError}</span>}
          </div>
        </section>
      </div>
      {call && CallDialog && <CallDialog key={call} personaId={call} locale={locale}
        onClose={() => closeCall()} onChooseScenario={() => closeCall(true)} />}
    </main>
  );
}
