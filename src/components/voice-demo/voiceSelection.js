const tag = value => typeof value === 'string' ? value.trim().toLowerCase().replaceAll('_', '-') : '';
const name = value => typeof value === 'string' ? value.trim().toLowerCase() : '';

function matches(voice, candidate) {
  const locale = tag(candidate.locale);
  if (tag(voice.lang) !== locale) return false;
  const identity = name(candidate.name);
  const uri = name(voice.voiceURI);
  const label = name(voice.name);
  const apple = /^com\.apple\.voice\.(?:compact|super-compact|enhanced|premium)\.([\w-]+)\.([a-z]+)$/;
  const neural = /^([a-z]{2}-[a-z0-9]{2,3})-([a-z]+?)neural$/;
  const sameName = value => value === identity || (locale === 'ar-001' && ['majed', 'maged'].includes(identity) && ['majed', 'maged'].includes(value));
  let verifiedId = false;
  for (const value of [uri, label]) {
    const match = apple.exec(value) || neural.exec(value) || /^microsoft server speech text to speech voice \(([^,]+), ([a-z]+?)neural\)$/.exec(value);
    if (!match) continue;
    if (tag(match[1]) !== locale || !sameName(match[2])) return false;
    verifiedId = true;
  }
  const microsoft = /^microsoft ([a-z]+?)(?:neural)?(?: (?:online|desktop|mobile|multilingual|\(natural\)))*(?: - .+)?$/.exec(label);
  const displayName = microsoft?.[1] || label.replace(/ \((premium|enhanced|compact)\)$/, '');
  return /^[a-z]+$/.test(displayName) ? sameName(displayName) : verifiedId;
}

function inventory(synth) {
  try { return Array.from(synth.getVoices()).filter(v => v && tag(v.lang) && name(v.name)); }
  catch { return []; }
}

export function chooseVoice(voices, profile) {
  const quality = v => /premium|enhanced|natural|neural/i.test(v.name) ? 0 : 1;
  const sorted = voices.filter(v => v && name(v.name) && tag(v.lang).split('-')[0] === tag(profile.locale).split('-')[0])
    .sort((a, b) => quality(a) - quality(b) || name(a.voiceURI || a.name).localeCompare(name(b.voiceURI || b.name)));
  for (const candidate of profile.candidates) {
    const voice = sorted.find(v => matches(v, candidate));
    if (voice) return voice;
  }
  return null;
}

// A fresh native object can represent the same installed voice after voiceschanged.
export function sameVoice(voice, pinned) {
  return Boolean(voice && pinned && tag(voice.lang) === tag(pinned.lang)
    && name(voice.voiceURI || voice.name) === name(pinned.voiceURI || pinned.name)
    && name(voice.name) === name(pinned.name));
}

export function currentVoice(synth, pinned) {
  return inventory(synth).find(v => sameVoice(v, pinned));
}

/** Also poll because some browsers publish a new list without firing voiceschanged. */
export function waitForVoice(host, profile, signal, pinned = null) {
  const synth = host.speechSynthesis;
  const read = () => pinned ? currentVoice(synth, pinned) : chooseVoice(inventory(synth), profile);
  return new Promise(resolve => {
    let timer, poll, settled = false;
    function finish(voice) {
      if (settled) return;
      settled = true;
      host.clearTimeout(timer);
      host.clearInterval(poll);
      try { synth.removeEventListener?.('voiceschanged', inspect); } catch { /* Some engines only support polling. */ }
      signal.removeEventListener('abort', cancel);
      resolve(voice);
    }
    function inspect() {
      const voice = read();
      if (voice && (pinned || tag(voice.lang) === tag(profile.locale))) finish(voice);
    }
    function cancel() { finish(null); }
    if (signal.aborted) { cancel(); return; }
    signal.addEventListener('abort', cancel, { once: true });
    timer = host.setTimeout(() => finish(read() || null), 2200);
    poll = host.setInterval(inspect, 180);
    try { synth.addEventListener?.('voiceschanged', inspect); } catch { /* The poll still runs. */ }
    inspect();
  });
}
