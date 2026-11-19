import { sales } from './topics/sales.js';
import { care } from './topics/care.js';
import { leadership } from './topics/leadership.js';
import { technical } from './topics/technical.js';
import { screening } from './topics/screening.js';
import { scenarios } from './scenarios.js';

const topics = { sales, care, leadership, technical, screening };
const scripts = {
  emma: {
    greeting: "Hi! I'm Emma, your Speekr Sales Coach.",
    wellbeing: 'How are you today?',
    ready: 'Great to hear! Ready to practice a sales conversation?',
    opening: 'What product are you selling?',
    hint: 'What would a customer use your product to do?',
    example: 'We help small teams keep track of customer follow-ups.',
    followups: ['What would you ask about my team before quoting a price?', 'How would you handle a buyer who already has a supplier?', 'What would you suggest as a small first step?',
      'Who else at my company would need to be involved?', 'What is one claim about your product I could verify this week?', 'If I only had half the budget, what would you offer?'],
  },
  omar: {
    greeting: 'أهلاً بيك! أنا عمر، مدرب المبيعات من Speekr.',
    wellbeing: 'عامل إيه النهارده؟',
    ready: 'دايمًا يا رب! تحب نبدأ تدريب المبيعات؟',
    opening: 'بتقدّم لي منتج إيه؟',
    hint: 'قول لي منتجك بيساعدني أعمل إيه.',
    example: 'برنامجنا بيفكّرك تتابع مع كل عميل في ميعاده.',
    followups: ['تحب تعرف إيه عن فريقي قبل ما تعرض السعر؟', 'لو عندي مورد بالفعل، إيه اللي يخلّيني أجرّب معاك؟', 'إيه أصغر خطوة نقدر نبدأ بيها؟',
      'مين محتاج يحضر من عندنا عشان التجربة تبقى مفيدة؟', 'إيه حاجة أقدر أقيسها بنفسي قبل ما أشتري؟', 'لو الميزانية نص المبلغ، ممكن نغيّر إيه في الاتفاق؟'],
  },
  james: {
    greeting: 'Hi, I’m James from Speekr. I’ve called twice about the same issue.',
    opening: 'What would you say when you pick up my call?',
    hint: 'What could you say to show me you understand why I’m upset?',
    example: 'I’m sorry you’ve had to call twice. Let me pull up your ticket.',
    followups: ['What would you need to know before offering a refund?', 'How would you introduce me to a supervisor?', 'When should I expect to hear back from you?',
      'What information would you pass on so I can avoid repeating myself?', 'What choice can you offer if this takes another day?', 'How would you check whether I am happy with the outcome?'],
  },
  sara: {
    greeting: 'أهلًا، أنا سارة من Speekr. طلبي متأخر، ودي تاني مرة أتصل.',
    opening: 'هتقول لي إيه أول ما ترد؟',
    hint: 'إيه جملة تحسّسني إنك واخد شكوتي بجد؟',
    example: 'من حقك تعرفي طلبك فين. خلّيني أراجع آخر تحديث.',
    followups: ['لو محتاجة الطلب بكرة، إيه البديل المتاح؟', 'مين أتابع معاه لو احتجت أرجّع الطلب؟', 'هتطمنّي في آخر المكالمة بإيه؟',
      'تقدر تساعدني بإيه دلوقتي وأنا مستنية التوصيل؟', 'لو بيتصل حد من عندكم، هيبقى معاه تفاصيل الشكوى؟', 'ممكن نتفق على طريقة أتابع بيها من غير مكالمة جديدة؟'],
  },
  olivia: {
    greeting: 'Hi, I’m Olivia from Speekr. I missed a deadline on your team.',
    opening: 'How would you open our feedback conversation?',
    hint: 'Which part of the missed delivery do you want to discuss first?',
    example: 'The report arrived after the review. What got in the way?',
    followups: ['What would you ask to understand my workload?', 'How would you give me ownership of the next delivery?', 'How should we check progress next week?',
      'If another priority arrives today, which task should move?', 'What decision could I make without waiting for your approval?', 'What would good communication look like from me tomorrow?'],
  },
  ahmed: {
    greeting: 'أهلًا، أنا أحمد من Speekr. أنا في فريقك واتأخرت في التسليم.',
    opening: 'هتبدأ كلامك معايا بإيه؟',
    hint: 'اسألني عن اللي حصل من غير ما تفترض السبب.',
    example: 'التقرير اتأخر عن الاجتماع. تحب تحكي لي إيه اللي عطّلك؟',
    followups: ['لو عندي تسليمين في نفس اليوم، نرتّبهم على أي أساس؟', 'إيه قرار ممكن تسيبه لي المرة الجاية؟', 'تحب نراجع التقدّم إمتى؟',
      'لو الأولويات اتغيّرت بكرة، أبلّغ مين الأول؟', 'إيه تصرّف واحد تحب تشوفه في الاجتماع الجاي؟', 'نعرف منين إن توزيع الشغل بيني وبين زميلي مناسب؟'],
  },
  daniel: {
    greeting: 'Hi, I’m Daniel from Speekr. My client’s checkout page is slow.',
    opening: 'How would you explain the problem without jargon?',
    hint: 'What will the customer actually see or have to wait for?',
    example: 'Orders are arriving faster than we can process them, like a queue at a till.',
    followups: ['What could my client try while we investigate?', 'How would you demonstrate that a fix worked?', 'What update should I give the director today?',
      'Which customer action is most affected?', 'How can I explain the trade-off between the quick fix and the permanent one?', 'What is one thing I can test without technical help?'],
  },
  leila: {
    greeting: 'أهلًا، أنا ليلى من Speekr. صفحة الدفع عندي بطيئة.',
    opening: 'ممكن تشرح لي السبب بكلام بسيط؟',
    hint: 'إيه اللي بيحصل من أول ما أدوس على زر الدفع؟',
    example: 'الطلبات كتير، فكل طلب بيستنى دوره زي الطابور.',
    followups: ['ممكن أكمّل الشراء دلوقتي بطريقة تانية؟', 'بعد التحديث، أتأكد منين إن المشكلة اتحلّت؟', 'إيه المعلومة اللي أبعتها لفريق الدعم؟',
      'لو زميلتي ظهر عندها نفس الخطأ، أقول لها تعمل إيه؟', 'أشرح للمدير في جملة ليه الحل النهائي هياخد وقت؟', 'إيه علامة واضحة تقول لي إن الطلب اتسجّل؟'],
  },
  sophia: {
    greeting: 'Hi, I’m Sophia from Speekr. I’ll be your interviewer.',
    opening: 'Tell me about yourself. Are you applying for a job or a university place?',
    hint: 'Which role or subject are you applying for, and what drew you to it?',
    example: 'I helped run our robotics club. That’s what drew me to engineering.',
    followups: ['What is one skill you would bring here?', 'When have you learned something from a setback?', 'What would you like to be doing a year from now?',
      'Tell me about a decision you made with limited information.', 'When have you used feedback to improve your work?', 'What question would you like to ask about this opportunity?'],
  },
  youssef: {
    greeting: 'أهلًا، أنا يوسف من Speekr. خلّينا نبدأ المقابلة.',
    opening: 'عرّفني بنفسك. بتقدّم على شغل ولا على جامعة؟',
    hint: 'بتقدّم على أنهي وظيفة أو تخصص؟ وإيه اللي جذبك ليه؟',
    example: 'شاركت في تنظيم يوم التوظيف، ومن وقتها وأنا مهتم بالموارد البشرية.',
    followups: ['إيه مهارة تحب تستخدمها في الفرصة دي؟', 'احكي لي عن موقف صعب اتعلّمت منه.', 'إيه خطوة نفسك تحققها خلال السنة الجاية؟',
      'احكي لي عن قرار أخدته قبل ما تبقى كل التفاصيل واضحة.', 'إيه ملاحظة من زميل أو مدرس غيّرت طريقة شغلك؟', 'لو عندك سؤال واحد عن الفرصة دي، تحب تسأل عن إيه؟'],
  },
};

export const conversations = Object.fromEntries(scenarios.flatMap(scenario =>
  scenario.personas.map(persona => {
    const script = scripts[persona.id];
    return [persona.id, {
      ...script, intro: script.greeting + ' ' + (script.wellbeing || script.opening), persona,
      scenario: scenario.id, topics: topics[scenario.id],
    }];
  })));
