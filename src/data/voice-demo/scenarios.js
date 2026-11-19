import { voiceProfiles } from './voiceProfiles.js';

const copy = (en, ar) => ({ en, ar });

function coach(id, name, language, role, description) {
  return {
    id, name, language, role, description,
    portrait: `/images/voice-demo/${id}.webp`,
    voice: voiceProfiles[id],
  };
}

export const scenarios = [
  {
    id: 'sales',
    name: copy('Sales', 'المبيعات'),
    personas: [
      coach('emma', copy('Emma', 'إيما'), 'en', copy('Sales Coach', 'مدربة مبيعات'),
        copy('Emma is a prospective buyer with a tight budget. Open the call, find out what matters to her, and earn a follow-up.', 'إيما عميلة محتملة بميزانية محدودة. ابدأ المكالمة، واكتشف أولوياتها، واتفق معها على خطوة تالية.')),
      coach('omar', copy('Omar', 'عمر'), 'ar', copy('Sales Coach', 'مدرب مبيعات'),
        copy('Omar is weighing two suppliers. Ask about his needs, address his price concerns, and suggest a next step.', 'عمر بيفاضل بين موردين. اسأله عن احتياجاته، وناقش قلقه من السعر، واقترح خطوة تالية.')),
    ],
  },
  {
    id: 'care',
    name: copy('Customer Care', 'خدمة العملاء'),
    personas: [
      coach('james', copy('James', 'جيمس'), 'en', copy('Customer Care Coach', 'مدرب خدمة عملاء'),
        copy('James has chased the same service issue twice. Acknowledge his frustration and offer a resolution he can count on.', 'جيمس تواصل مرتين بخصوص نفس المشكلة. عبّر عن تفهّمك لضيقه، واقترح حلًا يقدر يعتمد عليه.')),
      coach('sara', copy('Sara', 'سارة'), 'ar', copy('Customer Care Coach', 'مدربة خدمة عملاء'),
        copy('Sara is waiting for a delayed order. Hear her out, explain what you can do, and agree on a time for an update.', 'سارة مستنية طلب اتأخر. اسمعها، واشرح لها تقدر تساعدها إزاي، واتفق معاها على ميعاد للمتابعة.')),
    ],
  },
  {
    id: 'leadership',
    name: copy('Leadership', 'القيادة'),
    personas: [
      coach('olivia', copy('Olivia', 'أوليفيا'), 'en', copy('Leadership Coach', 'مدربة قيادة'),
        copy('Olivia has missed a team deadline. Give specific feedback, listen for the obstacle, and plan the next delivery together.', 'أوليفيا اتأخرت عن تسليم مهم. وضّح لها ملاحظاتك، واسمع منها سبب التأخير، وخطّطوا مع بعض للتسليم الجاي.')),
      coach('ahmed', copy('Ahmed', 'أحمد'), 'ar', copy('Leadership Coach', 'مدرب قيادة'),
        copy('Ahmed is juggling competing deadlines. Start a constructive conversation about the missed milestone and the support he needs.', 'أحمد عنده أكتر من موعد تسليم في نفس الوقت. اتكلم معاه عن التأخير واعرف محتاج منك دعم إيه.')),
    ],
  },
  {
    id: 'technical',
    name: copy('Technical Teams', 'الفرق التقنية'),
    personas: [
      coach('daniel', copy('Daniel', 'دانيال'), 'en', copy('Technical Communication Coach', 'مدرب تواصل تقني'),
        copy('Daniel needs to explain a system issue to his client. Use an everyday example, describe the impact, and check his understanding.', 'دانيال محتاج يشرح مشكلة في النظام لعميله. استخدم مثال من الحياة اليومية، ووضّح تأثير المشكلة واتأكد إنه فهمك.')),
      coach('leila', copy('Leila', 'ليلى'), 'ar', copy('Technical Communication Coach', 'مدربة تواصل تقني'),
        copy('Leila wants to know why a service is slow. Explain it in plain language and tell her what the team can do next.', 'ليلى عايزة تعرف ليه الخدمة بطيئة. اشرح لها السبب بكلام بسيط ووضّح لها الفريق هيعمل إيه بعد كده.')),
    ],
  },
  {
    id: 'screening',
    name: copy('Applicant Screening', 'فرز المتقدمين'),
    personas: [
      coach('sophia', copy('Sophia', 'صوفيا'), 'en', copy('Interview Specialist', 'متخصصة مقابلات'),
        copy('Sophia is interviewing you for a job or university place. Introduce yourself and connect one experience to the opportunity.', 'صوفيا بتحاورك عشان وظيفة أو قبول جامعي. عرّفها بنفسك واربط خبرة عندك بالفرصة اللي بتقدّم عليها.')),
      coach('youssef', copy('Youssef', 'يوسف'), 'ar', copy('Interview Specialist', 'متخصص مقابلات'),
        copy('Youssef wants to hear what drew you to the role or degree. Share your motivation and a specific example from work or study.', 'يوسف عايز يعرف إيه اللي جذبك للوظيفة أو التخصص. اتكلم عن دوافعك واحكي مثال من شغلك أو دراستك.')),
    ],
  },
];

export const languageName = { en: 'English', ar: 'العربية' };
