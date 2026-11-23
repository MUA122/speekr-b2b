import { memo, useEffect, useRef, useState } from 'react';
import { AudioLines, Headphones, Info, LoaderCircle, Pause, Play, RotateCcw, UserRound } from 'lucide-react';
import { europeanVoiceSamples } from '../data/europeanVoiceSamples.js';
import { regionalVoiceSamples } from '../data/regionalVoiceSamples.js';
import { voiceMapPlaces } from '../data/voiceMapPlaces.js';
import { projectVoiceLocation, voiceMapSize } from '../data/voiceMapProjection.js';
import { voiceMapPeaks } from '../data/voiceMapPeaks.js';
import { createVoicePlayer, initialVoiceState } from './voice-atlas/voicePlayer.js';
import VoiceWave from './voice-atlas/VoiceWave.jsx';
import './voice-atlas/atlas.css';

const samples = { ...europeanVoiceSamples, ...regionalVoiceSamples };
const places = voiceMapPlaces.map(place => ({
  ...place, pin: projectVoiceLocation(...place.coords), sample: samples[place.id],
}));
const uiCopy = {
  en: {
    title: 'Built for the Way MENA', accent: 'Teams Communicate',
    guide: 'Choose a voice to hear its language or dialect.',
    synthetic: 'Synthesized voice',
    play: 'Play', pause: 'Pause', resume: 'Resume', replay: 'Replay', retry: 'Retry',
    loading: 'Loading', playing: 'Playing', paused: 'Paused', ended: 'Finished',
    unavailable: 'Recording unavailable', error: 'Audio could not load. Select the voice to retry.',
    mapLabel: 'World map of regional voice samples', voices: 'Voice samples',
  },
  ar: {
    title: 'مصمّمة لطريقة', accent: 'تواصل فرق المنطقة',
    guide: 'اختر صوتًا لتستمع إلى اللغة أو اللهجة المحلية.',
    synthetic: 'صوت اصطناعي',
    play: 'تشغيل', pause: 'إيقاف مؤقت', resume: 'متابعة', replay: 'إعادة التشغيل', retry: 'إعادة المحاولة',
    loading: 'جارٍ التحميل', playing: 'جارٍ التشغيل', paused: 'متوقف مؤقتًا', ended: 'انتهى التسجيل',
    unavailable: 'التسجيل غير متاح', error: 'تعذّر تحميل التسجيل. اختار الصوت للمحاولة مرة أخرى.',
    mapLabel: 'خريطة العالم للعينات الصوتية', voices: 'عينات صوتية',
  },
};

function actionFor(status) {
  if (status === 'paused') return 'resume';
  if (status === 'ended') return 'replay';
  if (status === 'error') return 'retry';
  return status === 'playing' || status === 'loading' ? 'pause' : 'play';
}

function timeLabel(seconds) {
  const total = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function VoiceBubble({ place, playback, controller, onToggle, locale }) {
  const ui = uiCopy[locale];
  const selected = playback.id === place.id;
  const status = selected ? playback.status : 'idle';
  const action = actionFor(status);
  const Icon = !place.sample?.src ? Info : status === 'loading' ? LoaderCircle
    : action === 'pause' ? Pause : action === 'replay' || action === 'retry' ? RotateCcw : Play;
  const progress = selected && playback.duration ? playback.elapsed / playback.duration : 0;
  const [x, y] = place.slot;
  const showingElapsed = status === 'playing' || status === 'paused';
  const clock = showingElapsed ? Math.floor(playback.elapsed) : Math.ceil(place.sample?.duration || 0);
  const name = place.dialect[locale];
  const qualifier = place.sample?.synthetic ? ` · ${ui.synthetic}` : '';
  const AvatarIcon = place.sample?.synthetic ? AudioLines : UserRound;
  return (
    <button type="button" className="atlas-bubble" data-selected={selected} data-state={status} data-action={place.sample?.src ? action : 'info'} data-tail={place.tail}
      style={{ '--place-x': `${100 * x / voiceMapSize.width}%`, '--place-y': `${100 * y / voiceMapSize.height}%` }}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      title={`${name}${qualifier}`}
      aria-label={`${place.sample?.src ? ui[action] : ui.unavailable} · ${name} · ${place.country[locale]}${qualifier}`}
      aria-controls="atlas-listening" onClick={() => onToggle(place)}>
      <span className="atlas-bubble-copy">
        <span className="atlas-country">{place.country[locale]}{qualifier}</span>
        <span className="atlas-phrase" lang={place.sample?.src ? place.lang : locale} dir="auto">
          {place.sample?.transcript || name}
        </span>
      </span>
      <span className="atlas-avatar" aria-hidden="true">
        {place.sample?.avatarSrc
          ? <img src={place.sample.avatarSrc} alt="" width="44" height="44" loading="lazy" />
          : <AvatarIcon strokeWidth={1.6} />}
      </span>
      <span className="atlas-bubble-controls">
        <span className="atlas-control-icon"><Icon aria-hidden="true" size={12} /></span>
        {place.sample?.src && <VoiceWave peaks={voiceMapPeaks[place.id]} playing={status === 'playing'} controller={controller} progress={progress} />}
        <span className="atlas-time" dir="ltr">
          {place.sample?.src ? timeLabel(clock) : '—'}
          {showingElapsed && ` / ${timeLabel(Math.ceil(playback.duration))}`}
        </span>
      </span>
    </button>
  );
}

const VoiceMap = memo(function VoiceMap({ selected, locale }) {
  const active = places.find(p => p.id === selected);
  const ordered = active ? [...places.filter(p => p !== active), active] : places;
  return (
    <svg className="atlas-geography" viewBox={`0 0 ${voiceMapSize.width} ${voiceMapSize.height}`} role="img" aria-label={uiCopy[locale].mapLabel}>
      <image href="/images/voice-atlas/world.svg" width={voiceMapSize.width} height={voiceMapSize.height} />
      {ordered.map(({ id, slot: [x, y], pin, tail }) => {
        // Route the first leg through the speech-bubble tip before approaching the pin.
        const bend = tail === 'top' ? `V ${y - 68}` : `H ${x + (tail === 'left' ? -119 : 119)}`;
        const line = `M ${x} ${y} ${bend} L ${pin.x} ${pin.y}`;
        return (
          <g key={id} data-active={selected === id} className="atlas-location">
            <path className="atlas-leader-halo" d={line} />
            <path className="atlas-leader" d={line} />
            <circle className="atlas-pin-halo" cx={pin.x} cy={pin.y} r="9" />
            <circle className="atlas-pin" cx={pin.x} cy={pin.y} r="3.8" />
          </g>
        );
      })}
      {active && <text className="atlas-map-caption" x={active.pin.x + 15} y={active.pin.y - 16}
        direction={locale === 'ar' ? 'rtl' : 'ltr'} textAnchor={locale === 'ar' ? 'end' : 'start'}>
        {active.country[locale]}
      </text>}
    </svg>
  );
});

export default function MenaNative({ locale = 'en' }) {
  const controller = useRef(null);
  const [playback, setPlayback] = useState(initialVoiceState);
  const ui = uiCopy[locale];
  const selected = places.find(p => p.id === playback.id);

  useEffect(() => {
    const player = createVoicePlayer(setPlayback);
    controller.current = player;
    const hide = () => { if (document.hidden) player.pause(); };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', player.pause);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', player.pause);
      controller.current = null;
      player.dispose();
    };
  }, []);

  function toggle(place) { controller.current?.toggle(place.id, place.sample); }

  return (
    <section id="mena-native" aria-labelledby="atlas-heading" className="voice-atlas" lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'} data-no-translate="true">
      <header className="atlas-intro">
        <h2 id="atlas-heading">{ui.title} <span>{ui.accent}</span></h2>
        <p><Headphones size={18} aria-hidden="true" />{ui.guide}</p>
      </header>
      <div className="atlas-stage">
        <div className="atlas-map-window"><VoiceMap selected={playback.id} locale={locale} /></div>
        <div className="atlas-voices" role="group" aria-label={ui.voices}>
          {places.map(place => <VoiceBubble key={place.id} place={place} locale={locale} playback={playback}
            onToggle={toggle} controller={controller} />)}
        </div>
      </div>
      <div id="atlas-listening" className="atlas-listening" role="status" aria-atomic="true">
        {selected && <>
          <span className="atlas-listening-label">{selected.dialect[locale]}{selected.sample?.synthetic && ` · ${ui.synthetic}`}</span>
          <span className="atlas-transcript" lang={selected.lang} dir="auto">{selected.sample?.transcript}</span>
          <span className="atlas-status">{ui[playback.status]}</span>
        </>}
      </div>
    </section>
  );
}
