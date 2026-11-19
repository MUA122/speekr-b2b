import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dialog } from '@mui/material';
import { ArrowRight, Check, Clock3, Keyboard, Mic, MicOff, Phone, PhoneOff, Send, X } from 'lucide-react';
import { conversations } from '../../data/voice-demo/conversations.js';
import { languageName, scenarios } from '../../data/voice-demo/scenarios.js';
import { localizedPath } from '../../utils/i18n.js';
import { createCallSession } from './callSession.js';
import { callLabels } from './callLabels.js';
import './call.css';

export default function CallDialog({ personaId, locale, onClose, onChooseScenario }) {
  const script = conversations[personaId];
  const { persona } = script;
  const scenario = scenarios.find(item => item.id === script.scenario);
  const ui = callLabels[locale];
  const controller = useRef(null);
  const transcript = useRef(null);
  const heading = useRef(null);
  const [state, setState] = useState(null);
  const [draft, setDraft] = useState('');
  const phase = state?.phase;
  const ended = phase === 'ended';
  const textMode = state?.mode === 'text';
  const name = persona.name[locale];
  const digits = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');

  useLayoutEffect(() => {
    const session = createCallSession({ personaId, onChange: setState });
    controller.current = session;
    setState(session.getState());
    const leave = () => session.leavePage();
    const visibility = () => { if (document.hidden) session.hide(); };
    window.addEventListener('pagehide', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      session.dispose();
      controller.current = null;
      window.removeEventListener('pagehide', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [personaId]);

  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [state?.turns]);
  useEffect(() => {
    if (ended) heading.current?.focus();
  }, [ended]);

  const close = () => {
    controller.current?.dispose();
    onClose();
  };
  function submit(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    controller.current.sendText(draft);
    setDraft('');
  }
  const exampleVoice = persona.voice.candidates[0];
  const issue = ui.issues[state?.issue]?.replace('{voice}', `${exampleVoice.name} (${exampleVoice.locale})`);
  const unclear = phase === 'quiet' && state.issue === 'unclear';
  const messages = { consent: ui.detail, preparing: ui.wait, ready: ui.readyHint, quiet: unclear ? ui.unclearHint : ui.quietHint, problem: issue };
  const hasClock = !ended && (state?.mode === 'text' || state?.turns.length > 0);
  const voiceActive = ['connecting', 'speaking', 'openingMic', 'listening', 'processing', 'quiet'].includes(phase);
  const micLabel = phase === 'listening' ? ui.micOn : phase === 'openingMic' ? ui.micStarting : ui.micOff;
  return (
    <Dialog open onClose={close} aria-labelledby="vd-call-title" maxWidth="xs" fullWidth
      PaperProps={{ className: 'vd-dialog', dir: locale === 'ar' ? 'rtl' : 'ltr', lang: locale, 'data-no-translate': 'true' }}>
      <div className="vd-room">
        <button className="vd-close" type="button" onClick={close} aria-label={ui.close}><X size={19} /></button>
        <div className="vd-room-photo">
          <img src={persona.portrait} alt="" />
          {ended && <span><Check size={15} /></span>}
        </div>
        <h2 id="vd-call-title" ref={heading} tabIndex={-1}>{ended ? (state.mode ? ui.complete : ui.canceled) : `${ui.with} ${name}`}</h2>
        <p className="vd-room-meta">{scenario.name[locale]}<span aria-hidden="true"> · </span><bdi lang={persona.language}>{languageName[persona.language]}</bdi></p>
      </div>
      <div className="vd-dialog-body">
        {ended ? <>
          <p>{ui.completedCopy}</p>
          <div className="vd-summary"><span>{ui.elapsed}</span><strong>{digits.format(state.duration)} {ui.seconds}</strong></div>
          <a className="vd-primary" href={localizedPath('/platform', locale)}>{ui.explore}<ArrowRight size={17} /></a>
          <button className="vd-secondary" type="button" onClick={onChooseScenario}>{ui.again}</button>
        </> : <>
          <div className="vd-call-status">
            <strong role="status">{unclear ? ui.unclear : ui[phase] || ui.loading}</strong>
            {hasClock && <span role="timer" aria-label={ui.timer}><Clock3 size={15} /><bdi dir="ltr">{Math.floor(state.remaining / 60)}:{String(state.remaining % 60).padStart(2, '0')}</bdi></span>}
          </div>
          {messages[phase] && <p>{messages[phase]}</p>}
          {voiceActive && <div className="vd-audio">
            <div className="vd-meter" data-phase={phase} aria-hidden="true">
              {[12, 20, 28, 16, 32, 23, 12].map((height, i) => <i key={i} style={/** @type {import('react').CSSProperties} */ ({ '--bar': height + 'px', '--delay': i * -97 + 'ms' })} />)}
            </div>
            <small>{phase === 'listening' || phase === 'openingMic' ? <Mic size={13} /> : <MicOff size={13} />}{micLabel}</small>
          </div>}
          {state?.turns.length > 0 && <div ref={transcript} role="log" aria-label={ui.transcript} className="vd-transcript">
            {state.turns.map((turn, index) => <div key={index} data-speaker={turn.speaker}>
              <small>{turn.speaker === 'coach' ? name : ui.you}</small>
              <p lang={persona.language} dir={persona.language === 'ar' ? 'rtl' : 'ltr'}>{turn.text}</p>
            </div>)}
          </div>}
          {phase === 'consent' && <button className="vd-primary" onClick={() => controller.current.requestMic()}><Mic size={18} />{ui.permission}</button>}
          {phase === 'ready' && <button className="vd-primary" onClick={() => controller.current.startVoice()}><Phone size={17} />{ui.begin}</button>}
          {phase === 'quiet' && <button className="vd-primary" onClick={() => controller.current.retryListening()}><Mic size={18} />{ui.retry}</button>}
          {state?.issue === 'noVoice' && !state.mode &&
            <button className="vd-secondary" onClick={() => controller.current.retryVoice()}>{ui.retryVoice}</button>}
          {['consent', 'preparing', 'problem', 'quiet', 'ready', 'checkingVoice'].includes(phase) &&
            <button className={phase === 'problem' ? 'vd-primary' : 'vd-secondary'} onClick={() => controller.current.startText()}>
              <Keyboard size={18} />{hasClock ? ui.textContinue : ui.textStart}
            </button>}
          {phase === 'text' && <form className="vd-input" onSubmit={submit}>
            <input autoFocus aria-label={ui.input} placeholder={ui.input} value={draft} maxLength={500} lang={persona.language}
              dir={persona.language === 'ar' ? 'rtl' : 'ltr'} onChange={event => setDraft(event.target.value)} />
            <button type="submit" disabled={!draft.trim()} aria-label={ui.send}><Send size={17} /></button>
          </form>}
          {(voiceActive || textMode || hasClock) && <button className="vd-secondary vd-end" onClick={() => controller.current.end()}>
            {textMode ? <Check size={16} /> : <PhoneOff size={16} />}{textMode ? ui.endText : ui.end}
          </button>}
        </>}
      </div>
    </Dialog>
  );
}
