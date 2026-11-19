import test from 'node:test';
import assert from 'node:assert/strict';
import { speechText } from '../src/components/voice-demo/speechText.js';
import { conversations } from '../src/data/voice-demo/conversations.js';
import { topicExamples } from '../src/data/voice-demo/topicExamples.js';
import { requests, social, repairs } from '../src/data/voice-demo/sharedIntents.js';
import { contextualTurns } from '../src/data/voice-demo/contextualTurns.js';

// Listening fixtures as well as text regressions. Audition each line with the
// persona's Egyptian voice and a compatible regional voice on a target device.
const phrases = [
  ['أنا عمر من Speekr.', 'أنا عُمَر من سبيكَر.'],
  ['أنا سارة من Speekr.', 'أنا سارَة من سبيكَر.'],
  ['اسمك إيه؟ عامل إيه؟', 'اسمك إيه؟ عامل إيه؟'],
  ['الحمد لله، نبدأ؟', 'الحمد لله، نبدأ؟'],
  ['هتشرح ده إزاي؟', 'هتشرح ده إِزّاي؟'],
  ['جرّبت نظام CRM قبل كده؟', 'جرّبت نظام سي آر إم قبل كده؟'],
  ['الخصم ٢٠٪؛ والتجربة ٧ أيام؟', 'الخصم عشرين في المية، والتجربة سبعة أيام؟'],
  ['وقت الانتظار ٢٫٥ دقيقة.', 'وقت الانتظار دقيقتين ونُصّ.'],
  ['رقم الطلب ۰۰۷.', 'رقم الطلب صفر صفر سبعة.'],
  ['ممكن تبعت الدليل PDF?', 'ممكن تبعت الدليل بي دي إف؟'],
];
test('Egyptian pronunciation fixtures preserve dialect, expand notation, and render the brand phonetically', () => {
  for (const [display, spoken] of phrases) assert.equal(speechText(display, 'ar', 'ar-EG'), spoken);
  assert.equal(speechText('هتشرح ده إزاي؟', 'ar', 'ar-001'), 'هتشرح ده بأيّ طريقة؟');
  assert.equal(speechText('يومك ماشي إزاي؟', 'ar', 'ar-001'), 'أخبار يومك إيه؟');
  assert.equal(speechText('Welcome to Speekr.', 'en', 'en-US'), 'Welcome to Speaker.');
});

for (const [id, s] of Object.entries(conversations)) {
  test(id + ' has speakable text in the persona language across the full conversation library', () => {
    const lang = s.persona.language, ar = lang === 'ar';
    assert.ok(s.intro.includes('Speekr'));
    const corpus = [s.intro, s.opening, s.hint, s.example, ...s.followups,
      ...s.topics.flatMap(t => [...t[lang].replies, t[lang].followup]),
      ...Object.values(topicExamples[s.scenario]).map(ex => ex[ar ? 1 : 0]),
      ...[...requests, ...social].flatMap(t => t[lang].replies), ...repairs.silence[lang],
      ...repairs.unclear[lang], ...contextualTurns[s.scenario][lang].replies];
    for (const locale of ar ? ['ar-EG', 'ar-001'] : ['en-US', 'en-GB']) {
      for (const display of corpus) {
        const spoken = speechText(display.replace(/\{\w+\}/g, s.opening), lang, locale);
        assert.match(spoken, ar ? /\p{Script=Arabic}/u : /\p{Script=Latin}/u, display);
        assert.doesNotMatch(spoken, ar ? /[A-Za-z{}0-9٠-٩]|undefined/ : /\p{Script=Arabic}|[{}]|undefined/u);
      }
    }
  });
}

test('speech rejects placeholders, empty input, incorrect scripts and incompatible voice locales', () => {
  for (const text of ['', '   ', '…', '. . .', '?!', '---', '{}', 'Try {opening}.', '[object Object]', '<break/>', 'undefined', null, 4]) {
    assert.equal(speechText(text, 'en', 'en-US'), '');
    assert.equal(speechText(text, 'ar', 'ar-EG'), '');
  }
  assert.equal(speechText('مرحبا', 'en', 'en-US'), '');
  assert.equal(speechText('Hello مرحبا', 'en', 'en-US'), '');
  assert.equal(speechText('Hello', 'ar', 'ar-EG'), '');
  assert.equal(speechText('تمام Hello', 'ar', 'ar-EG'), '');
  assert.equal(speechText('Hello', 'en', 'ar-EG'), '');
  assert.equal(speechText('ابدأ', 'ar', 'en-US'), '');
  assert.equal(speechText('Hello...  Shall we start???', 'en', 'en-US'), 'Hello Shall we start?');
  assert.equal(speechText('أهلًا… نبدأ؟؟', 'ar', 'ar-EG'), 'أهلًا نبدأ؟');
});
