import test from 'node:test';
import assert from 'node:assert/strict';
import { createConversation, normalizeIntent } from '../src/components/voice-demo/conversationEngine.js';
import { conversations } from '../src/data/voice-demo/conversations.js';
import { requests, social } from '../src/data/voice-demo/sharedIntents.js';
import { topicExamples } from '../src/data/voice-demo/topicExamples.js';
import { chooseVoice } from '../src/components/voice-demo/voiceSelection.js';

for (const [id, script] of Object.entries(conversations)) {
  const lang = script.persona.language;
  test(id + ' handles every scenario intent, provides its own examples and rotates relevant replies', () => {
    assert.ok(script.topics.length >= 8);
    for (const topic of script.topics) {
      const entry = topic[lang];
      assert.ok(entry.patterns.length >= 3);
      assert.ok(new Set(entry.replies).size >= 2);
      const reply = createConversation(script);
      // Use a complete sample phrase, as a person would in a short answer.
      const sample = entry.patterns.at(-1).replace(/^=/, '');
      assert.equal(reply(sample).text, entry.replies[0], id + '/' + topic.id + '/' + sample);
      assert.equal(reply(sample).text, entry.replies[1]);
      const example = reply(lang === 'en' ? 'Give me an example' : 'ممكن مثال؟').text;
      assert.ok(example.includes(topicExamples[script.scenario][topic.id][lang === 'en' ? 0 : 1]));
      assert.ok(!example.includes('{'));
    }
  });
  test(id + ' identifies itself in its own language and selects only its configured voice presentation', () => {
    const reply = createConversation(script);
    const { persona } = script;
    const identity = reply(lang === 'en' ? 'What is your name?' : 'اسمك إيه؟').text;
    assert.ok(identity.includes(persona.name[lang]));
    assert.ok(identity.includes('Speekr'));
    const preferred = persona.voice.candidates[0];
    const voice = { name: preferred.name, lang: preferred.locale };
    const wrong = lang === 'ar' ? ['Salma', 'Shakir'] : ['Jenny', 'Guy'];
    const opposite = { name: wrong[persona.voice.presentation === 'male' ? 0 : 1], lang: persona.voice.locale };
    assert.equal(chooseVoice([opposite], persona.voice), null);
    assert.equal(chooseVoice([opposite, voice], persona.voice), voice);
  });
}

test('each shared intent has bilingual recognition patterns and two usable response variants', () => {
  const shared = [...requests, ...social];
  assert.equal(new Set(shared.map(x => x.id)).size, shared.length);
  assert.ok(shared.length >= 20);
  for (const [lang, script] of [['en', conversations.james], ['ar', conversations.sara]]) {
    for (const entry of shared) {
      assert.ok(entry[lang].patterns.length >= 2);
      const reply = createConversation(script);
      const sample = entry[lang].patterns[0].replace(/^=/, '');
      const result = reply(sample);
      const prefix = entry[lang].replies[0].split('{')[0];
      assert.ok(result.text.startsWith(prefix), entry.id + ': ' + result.text);
      assert.equal(result.done, entry.id === 'goodbye');
      assert.doesNotMatch(result.text, /[{}]|undefined/);
    }
  }
});

test('small talk can be interrupted and practice resumes in either language', () => {
  for (const [script, hello, wellbeing, good, yes, product] of [
    [conversations.emma, 'Hello Emma!', 'How are you?', "I'm good.", 'Yes', 'Software'],
    [conversations.omar, 'أهلاً يا عمر!', 'إزّيك؟', 'الحمد لله.', 'أيوة', 'برنامج'],
  ]) {
    const reply = createConversation(script);
    assert.match(reply(hello).text, /today|النهارده/);
    assert.match(reply(wellbeing).text, /asking|بخير/);
    assert.match(reply(good).text, /Ready|نبدأ/);
    assert.ok(reply(yes).text.includes(script.opening));
    assert.match(reply(product).text, /problem.*software|المنتج ده/);
  }
});

test('identifiable responses get priority over an isolated keyword and repair requests use the current prompt', () => {
  const reply = createConversation(conversations.emma);
  assert.match(reply('budget').text, /budget is tight/);
  assert.equal(reply('say that again').text, 'Of course. Which cost would your offer help me reduce first?');
  assert.match(reply('give me an example about cost').text, /what you spend doing this by hand/);
  assert.match(reply('what do you mean').text, /evidence.*finance/);
  assert.match(reply('It would be forty per month').text, /per month|seat|price|evidence/i);
});

test('a short answer to the preceding question can have different meanings in different sessions', () => {
  for (const [script, first, short, expected] of [
    [conversations.emma, 'cost', 'twenty per month', /seat/],
    [conversations.sara, 'أنا آسف', 'بعد ساعة', /هتكلّمني/],
    [conversations.olivia, 'deadline', 'on Friday', /check-in/],
    [conversations.leila, 'خلل', 'رسالة تأكيد', /أحاول تاني/],
    [conversations.sophia, 'project', 'we built an app', /personally/],
  ]) {
    const reply = createConversation(script);
    reply(first);
    assert.match(reply(short).text, expected);
    assert.doesNotMatch(createConversation(script)(short).text, expected);
  }
});

test('a scenario can continue past two unexpected answers, with a fresh history in every call', () => {
  const reply = createConversation(conversations.omar);
  for (const input of ['بطاطس', 'موسيقى', 'النهارده جمعة', 'بنفكّر', 'واحد', 'يمكن بعدين']) {
    assert.equal(reply(input).done, false);
  }
  assert.equal(reply('مع السلامة').done, true);
  const fresh = createConversation(conversations.omar);
  assert.equal(fresh('ممكن تعيد؟').text, 'حاضر. ' + conversations.omar.wellbeing);
});

test('whole words, Egyptian spelling, polite mixed intents, unclear input and silence', () => {
  const en = createConversation(conversations.emma);
  assert.equal(en('costume').text, conversations.emma.followups[0]);
  assert.match(en('hello, what is your name?').text, /I’m Emma/);
  assert.doesNotMatch(en('This is a good solution').text, /Ready to practice/);
  assert.match(en('??').text, /make that out/);
  assert.match(en('', 'silence').text, /didn’t catch/);
  assert.match(en('', 'unclear').text, /short sentence|make that out/);
  assert.equal(normalizeIntent('عَامْلَة إيـه؟'), normalizeIntent('عامله ايه'));
  for (const phrase of ['عاملة إيه؟', 'إزيّك؟', 'ازيك', 'أخبارك إيه؟', 'إيه الأخبار؟']) {
    assert.match(createConversation(conversations.sara)(phrase).text, /بخير/);
  }
});

test('verified voice IDs and browser names match regardless of list order and reject misleading partial names', () => {
  const p = conversations.omar.persona.voice;
  for (const name of ['Shakir', 'ar-EG-ShakirNeural', 'Microsoft Shakir Online (Natural) - Arabic (Egypt)',
    'Microsoft Server Speech Text to Speech Voice (ar-EG, ShakirNeural)']) {
    const good = {name, lang:'ar_EG'};
    const fallback = {name:'Hamed', lang:'ar-SA'};
    assert.equal(chooseVoice([good, fallback], p), good);
    assert.equal(chooseVoice([fallback, good], p), good);
  }
  for (const pair of [['Not Shakir', 'ar-EG'], ['Shakira','ar-EG'], ['Shakir','en-US'], ['Hamed','ar-EG'], ['Arabic Male','ar-EG']]) {
    assert.equal(chooseVoice([{name:pair[0], lang:pair[1]}], p), null);
  }
  const desktop = { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' };
  assert.equal(chooseVoice([desktop], conversations.james.persona.voice), desktop);
  assert.equal(chooseVoice([desktop], conversations.emma.persona.voice), null);
  const arabic = { name: 'Microsoft Hoda', lang: 'ar-EG' };
  assert.equal(chooseVoice([arabic], conversations.sara.persona.voice), arabic);
  assert.equal(chooseVoice([arabic], p), null);
  const localized = { name: 'ماجد', lang: 'ar-001', voiceURI: 'com.apple.voice.super-compact.ar-001.Maged' };
  assert.equal(chooseVoice([localized], p), localized);
});

test('contradictory locale and voice identifiers never authorize a fallback voice', () => {
  const p = conversations.omar.persona.voice;
  for (const v of [
    { name: 'Shakir', lang: 'ar-EG', voiceURI: 'en-US-GuyNeural' },
    { name: 'Salma', lang: 'ar-EG', voiceURI: 'ar-EG-ShakirNeural' },
    { name: 'ar-EG-SalmaNeural', lang: 'ar-EG', voiceURI: 'ar-EG-ShakirNeural' },
    { name: 'Microsoft Server Speech Text to Speech Voice (en-US, ShakirNeural)', lang: 'ar-EG' },
    { name: 'Shakir', lang: 'ar-EG', voiceURI: 'com.apple.voice.compact.ar-001.Maged' },
    {}, null,
  ]) assert.equal(chooseVoice([v], p), null);
});

test('Sales wellbeing accepts common English and Arabic dictation spellings', () => {
  for (const [script, inputs] of [
    [conversations.emma, ['I am good, thanks.', "I'm good, thank you.", 'Good, thank you.']],
    [conversations.omar, ['الحمدلله كويس', 'الحمد لله، كويس.', 'أنا كويس الحمد لله']],
  ]) {
    for (const text of inputs) assert.equal(createConversation(script)(text).text, script.ready);
  }
});
