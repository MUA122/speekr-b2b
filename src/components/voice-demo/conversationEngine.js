import { contextualTurns } from '../../data/voice-demo/contextualTurns.js';
import { repairs, requests, social } from '../../data/voice-demo/sharedIntents.js';
import { topicExamples } from '../../data/voice-demo/topicExamples.js';

export function normalizeIntent(text) {
  return text.normalize('NFKD').toLowerCase().replace(/[\p{M}ـ'’]/gu, '')
    .replace(/[ىی]/g, 'ي').replace(/ک/g, 'ك').replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function compile(intents, lang) {
  return intents.map(rule => {
    const entry = rule[lang];
    return { ...entry, id: rule.id, patterns: entry.patterns.map(term => ({
      exact: term.startsWith('='), text: normalizeIntent(term),
    })) };
  });
}

function match(entries, input, previousTopic) {
  let best, bestScore = 0;
  const padded = ' ' + input + ' ';
  for (const entry of entries) {
    for (const { exact, text } of entry.patterns) {
      const whole = input === text;
      if (!whole && (exact || !padded.includes(' ' + text + ' '))) continue;
      const score = (whole ? 1000 : 0) + text.length + (entry === previousTopic ? 0.5 : 0);
      if (score > bestScore) { best = entry; bestScore = score; }
    }
  }
  return best;
}

function lastQuestion(text) {
  const matches = text.match(/[^.!?؟。]+[?؟]/gu);
  return matches?.at(-1)?.trim();
}

/** Creates an isolated turn handler shared by voice and text. Only goodbye ends practice early. */
export function createConversation(script) {
  const { persona, opening } = script;
  const lang = persona.language;
  const ar = lang === 'ar';
  const explicit = compile(requests, lang);
  const topics = compile(script.topics, lang);
  const common = compile(social, lang);
  const contextualRule = contextualTurns[script.scenario];
  const contextual = compile([{ ...contextualRule, id: 'context.' + script.scenario }], lang);
  let stage = script.wellbeing ? 'wellbeing' : 'practice';
  let question = script.wellbeing || opening, practice = opening;
  let topic = null, previousAnswer = '', followedUp = false;
  let path = null; // Keep the applicant's chosen interview track through social detours.
  const recent = [];
  const counts = new Map();

  function pick(key, pool) {
    const offset = counts.get(key) || 0;
    const options = pool.map((_, i) => pool[(offset + i) % pool.length]);
    const chosen = options.find(line => !recent.includes(line)) || options[0];
    counts.set(key, pool.indexOf(chosen) + 1);
    recent.push(chosen);
    if (recent.length > 8) recent.shift();
    return chosen;
  }

  function deliver(text, isPractice = false, done = false) {
    const asked = lastQuestion(text);
    if (asked) {
      question = asked;
      if (isPractice) practice = asked;
    }
    return { text, done };
  }

  function nextQuestion() {
    return pick('next', script.followups);
  }

  function respond(entry) {
    const key = entry.id;
    const activeTopic = topic || path;
    const example = topicExamples[script.scenario][activeTopic?.id]?.[ar ? 1 : 0] || script.example;
    const fields = {
      name: persona.name[lang], role: ar ? persona.role.ar : persona.role.en.toLowerCase(),
      opening, question, practice, hint: activeTopic?.followup || script.hint, example,
    };
    if (key === 'continue' && stage === 'practice' && previousAnswer) {
      fields.practice = activeTopic && !followedUp ? activeTopic.followup : nextQuestion();
      followedUp = true;
    }
    if (key === 'change') {
      fields.next = nextQuestion();
      topic = null;
      followedUp = false;
    }
    const text = pick(key, entry.replies).replace(/\{(\w+)\}/g, (_, field) => fields[field]);
    if (['greeting', 'wellbeing'].includes(key)) stage = 'wellbeing';
    else if (['positive', 'uneasy'].includes(key)) stage = 'ready';
    else if (!['repeat', 'thanks', 'name', 'brand', 'time', 'silence', 'unclear', 'notReady'].includes(key)) stage = 'practice';
    return deliver(text, ['start', 'continue', 'change', 'capabilities', 'introduce', 'userTurn'].includes(key), key === 'goodbye');
  }

  return function reply(input, signal) {
    if (signal === 'silence' || signal === 'unclear' || !input.trim()) {
      const key = signal || 'silence';
      return respond({ id: key, replies: repairs[key][lang] });
    }
    const normalized = normalizeIntent(input);
    if (!normalized) return respond({ id: 'unclear', replies: repairs.unclear[lang] });
    const name = normalizeIntent(persona.name[lang]);
    // Keep direct addresses such as “hello Emma” and “إزيك يا عمر” out of the intent.
    const addressed = normalized.endsWith(' ' + name) ? normalized.slice(0, -(name.length + 1)).replace(/ يا$/, '') : normalized;
    const general = match(common, addressed);
    const request = match(explicit, normalized) || (addressed !== normalized && match(explicit, addressed));

    if (!request && stage === 'wellbeing' && ['positive', 'uneasy'].includes(general?.id)) {
      if (general.id === 'positive' && script.ready) {
        stage = 'ready';
        return deliver(script.ready);
      }
      return respond(general);
    }
    if (!request && stage === 'ready') {
      if (['yes', 'positive'].includes(general?.id)) return respond(explicit.find(e => e.id === 'start'));
      if (general?.id === 'no') return respond({ id: 'notReady', replies: ar
        ? ['خد راحتك. لما تحب تبدأ قول لي نبدأ.', 'ممكن تطلب مثال الأول، أو تنهي التدريب وقت ما تحب.']
        : ['Take your time. Say “start” whenever you’re ready.', 'You can ask for an example first or finish whenever you like.'] });
    }
    if (!request && stage === 'practice' && question === practice && contextualRule.after.includes(topic?.id)) {
      const answer = match(contextual, normalized);
      if (answer && previousAnswer !== normalized) {
        previousAnswer = normalized;
        followedUp = true;
        return deliver(pick(answer.id, answer.replies), true);
      }
    }
    if (request) return respond(request);

    const subject = match(topics, normalized, topic);
    if (subject) {
      const previous = previousAnswer;
      previousAnswer = normalized;
      topic = subject;
      if (subject.id === 'admissions' || subject.id === 'employment') path = subject;
      stage = 'practice';
      followedUp = false;
      if (subject.id === 'product' && practice === opening && !previous && !ar && normalized === 'software') {
        return deliver('What problem would your software solve for my team?', true);
      }
      const prompt = pick('topic.' + subject.id, [...subject.replies, subject.followup]);
      followedUp = prompt === subject.followup;
      return deliver(prompt, true);
    }
    if (general?.id === 'positive' && stage === 'practice' && previousAnswer) {
      return respond(common.find(entry => entry.id === 'yes'));
    }
    if (general) return respond(general);
    if (previousAnswer === normalized) {
      return respond({ id: 'unclear', replies: repairs.unclear[lang] });
    }

    // A visitor can answer a question without using any of the original keywords.
    // Follow the active thread once before advancing to a fresh practice question.
    const activeTopic = topic || path;
    if (activeTopic && !followedUp && previousAnswer !== normalized) {
      followedUp = true;
      previousAnswer = normalized;
      stage = 'practice';
      return deliver(activeTopic.followup, true);
    }
    previousAnswer = normalized;
    stage = 'practice';
    return deliver(nextQuestion(), true);
  };
}
