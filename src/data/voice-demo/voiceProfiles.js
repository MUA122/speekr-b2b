// Sources: Microsoft Speech language support and Windows Narrator's voice catalog.
// Apple names/locales here were checked against AVSpeechSynthesisVoice metadata.
// The browser receives no credentials and only uses voices it already exposes.
const catalog = {
  female: {
    'ar-EG': ['Salma', 'Hoda'], 'ar-JO': ['Sana'], 'ar-SA': ['Zariyah'], 'ar-AE': ['Fatima'], ar: ['Hoda'],
    'en-US': ['Jenny', 'Aria', 'Jane', 'Samantha', 'Zira'], 'en-GB': ['Sonia', 'Hazel', 'Susan'], 'en-AU': ['Karen'],
  },
  male: {
    'ar-EG': ['Shakir'], 'ar-JO': ['Taim'], 'ar-SA': ['Hamed', 'Naayf'], 'ar-AE': ['Hamdan'],
    'ar-001': ['Majed', 'Maged'],
    'en-US': ['Guy', 'Davis', 'Jason', 'David', 'Mark'], 'en-GB': ['Ryan', 'Daniel', 'George'], 'en-IN': ['Rishi'],
  },
};

/** @param {'male'|'female'} presentation @param {string} locale @param {string[]} names */
function profile(presentation, locale, names, rate) {
  const verified = Object.entries(catalog[presentation])
    .filter(([tag]) => tag.split('-')[0] === locale.split('-')[0])
    .flatMap(([tag, voices]) => voices.map(name => ({ name, locale: tag })));
  const rank = ({ name }) => names.includes(name) ? names.indexOf(name) : names.length;
  verified.sort((a, b) => Number(b.locale === locale) - Number(a.locale === locale) || rank(a) - rank(b));
  return { locale, presentation, candidates: verified, rate, pitch: 1, volume: 1 };
}

export const voiceProfiles = {
  emma: profile('female', 'en-US', ['Jenny', 'Samantha'], 1),
  james: profile('male', 'en-US', ['Guy', 'Daniel'], 0.98),
  olivia: profile('female', 'en-US', ['Aria', 'Samantha'], 0.98),
  daniel: profile('male', 'en-US', ['Davis', 'Ryan'], 0.98),
  sophia: profile('female', 'en-US', ['Jane', 'Samantha'], 1),
  omar: profile('male', 'ar-EG', ['Shakir', 'Majed', 'Maged', 'Taim'], 0.94),
  sara: profile('female', 'ar-EG', ['Salma', 'Sana', 'Fatima'], 0.95),
  ahmed: profile('male', 'ar-EG', ['Shakir', 'Hamed', 'Majed'], 0.93),
  leila: profile('female', 'ar-EG', ['Salma', 'Fatima', 'Zariyah'], 0.93),
  youssef: profile('male', 'ar-EG', ['Shakir', 'Taim', 'Majed'], 0.95),
};
