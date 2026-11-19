const unit = ['صفر', 'واحد', 'اتنين', 'تلاتة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'تمانية', 'تسعة'];
const teens = ['عشرة', 'حداشر', 'اتناشر', 'تلتاشر', 'أربعتاشر', 'خمستاشر', 'ستاشر', 'سبعتاشر', 'تمنتاشر', 'تسعتاشر'];
const tens = ['', '', 'عشرين', 'تلاتين', 'أربعين', 'خمسين', 'ستين', 'سبعين', 'تمانين', 'تسعين'];
const hundreds = ['', 'مية', 'ميتين', 'تلتمية', 'ربعمية', 'خمسمية', 'ستمية', 'سبعمية', 'تمنمية', 'تسعمية'];

function numberWords(digits) {
  const n = Number(digits);
  if (digits.length > 3 || (digits.length > 1 && digits.startsWith('0'))) return [...digits].map(d => unit[Number(d)]).join(' ');
  if (n < 10) return unit[n];
  if (n < 20) return teens[n - 10];
  if (n < 100) return (n % 10 ? unit[n % 10] + ' و' : '') + tens[Math.floor(n / 10)];
  return hundreds[Math.floor(n / 100)] + (n % 100 ? ' و' + numberWords(String(n % 100)) : '');
}

function halfDuration(digits, noun, egyptian) {
  const isMinute = noun === 'دقيقة';
  const count = Number(digits);
  const half = egyptian ? 'نُصّ' : 'نصف';
  if (!count) return half + ' ' + noun;
  let whole = numberWords(digits) + ' ' + noun;
  if (count === 1) whole = noun;
  else if (count === 2) whole = isMinute ? 'دقيقتين' : 'ثانيتين';
  else if (count <= 10) whole = numberWords(digits) + ' ' + (isMinute ? 'دقايق' : 'ثواني');
  return whole + ' و' + half;
}

const spokenNames = { speekr: 'سبيكَر', ai: 'الذكاء الاصطناعي', api: 'إيه بي آي', crm: 'سي آر إم', hr: 'الموارد البشرية', pdf: 'بي دي إف' };
const coachNames = { عمر: 'عُمَر', أحمد: 'أَحْمَد', يوسف: 'يُوسُف', ليلى: 'لَيْلى', سارة: 'سارَة' };
// Regional voices can struggle with colloquial "how". Rephrase the whole
// question where a word-for-word substitution would change its meaning.
const regionalPhrases = new Map([
  ['يومك ماشي إزاي', 'أخبار يومك إيه'],
  ['هتبدأ الكلام معانا إزاي', 'إيه أول جملة هتقولها لنا'],
  ['نتأكد إزاي إننا فاهمين بعض', 'إيه اللي يخلّينا نتأكد إننا فاهمين بعض'],
  ['هتتأكد من عندك إزاي إن الخدمة رجعت عندي', 'إيه اللي يبيّن لك إن الخدمة رجعت عندي'],
  ['أعرف من عندي إن الإصلاح نجح إزاي', 'إيه العلامة اللي تبيّن لي إن الإصلاح نجح'],
  ['أشرح تأثير المشكلة في جملة إزاي', 'ممكن تساعدني أشرح تأثير المشكلة في جملة'],
  ['أشرح لهم التوفير بكلام بسيط إزاي', 'أقول لهم إيه عن التوفير بكلام بسيط'],
  ['ممكن تحوّل الاهتمام ده لنشاط مع زملائك إزاي', 'إيه النشاط اللي ممكن تعمله مع زملائك في المجال ده'],
]);

function arabicSpeech(text, egyptian) {
  let spoken = text;
  if (!egyptian) {
    for (const [phrase, alternative] of regionalPhrases) spoken = spoken.replaceAll(phrase, alternative);
  }
  return spoken
    .replace(/(أنا |اسمي )(عمر|أحمد|يوسف|ليلى|سارة)(?![\p{L}\p{M}])/gu, (_, prefix, name) => prefix + coachNames[name])
    .replace(/\b(Speekr|AI|API|CRM|HR|PDF)\b/gi, word => spokenNames[word.toLowerCase()])
    .replace(/[٠-٩۰-۹]/g, digit => String(digit.charCodeAt(0) % 16))
    .replace(/(\d+)[.٫]5\s+(دقيقة|ثانية)(?![\p{L}\p{M}])/gu, (_, n, noun) => halfDuration(n, noun, egyptian))
    .replace(/(\d+)[.٫](\d+)/g, (_, a, b) => numberWords(a) + ' فاصلة ' + [...b].map(d => unit[Number(d)]).join(' '))
    .replace(/\d+/g, numberWords)
    .replace(/[%٪]/g, egyptian ? ' في المية' : ' في المئة')
    .replace(/(^|[^\p{L}\p{M}])(إزاي|ازاي)(?![\p{L}\p{M}])/gu, (_, prefix) => prefix + (egyptian ? 'إِزّاي' : 'بأيّ طريقة'))
    .replace(/إزيك|ازيك/g, egyptian ? 'إزّيّك' : 'أخبارك إيه')
    .replace(/[;؛]/g, '،').replace(/\?/g, '؟').replace(/\s+/g, ' ').trim();
}

/** Returns an empty string when a line cannot safely be spoken in the selected language. */
export function speechText(text, language, voiceLocale) {
  const locale = voiceLocale?.toLowerCase().replaceAll('_', '-');
  if (typeof text !== 'string' || !['en', 'ar'].includes(language) || locale?.split('-')[0] !== language) return '';
  if (/[{}<>[\]]|\b(?:undefined|null|NaN)\b|%[sd]\b/i.test(text)) return '';

  let spoken = text.normalize('NFC').replace(/\p{Cf}/gu, '')
    .replace(/(?:\.\s*){2,}|…+/gu, ' ');
  spoken = language === 'ar' ? arabicSpeech(spoken, locale === 'ar-eg') : spoken.replace(/\bSpeekr\b/gi, 'Speaker');
  const letters = spoken.match(/\p{L}/gu);
  const script = language === 'ar' ? /\p{Script=Arabic}/u : /\p{Script=Latin}/u;
  if (!letters?.length || !letters.every(letter => script.test(letter))) return '';

  return spoken.replace(/[^\p{L}\p{M}\p{N}\s.,،!?؟'’-]/gu, ' ')
    .replace(/([.,،!?؟])(?:[.,،!?؟])+/gu, '$1')
    .replace(/(?:^|\s)[.,،!?؟'’-]+(?=\s|$)/gu, ' ')
    .replace(/\s+/gu, ' ').trim();
}
