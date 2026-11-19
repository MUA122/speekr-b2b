import { lines } from './topics/format.js';

// These answers have a different meaning once a particular question is on the table.
export const contextualTurns = {
  sales: {
    after: ['price', 'negotiate'],
    en: lines('per month|a month|annually|per year|monthly fee', 'Does that amount cover everyone on my team or just one seat?', 'Can I start at that rate and add colleagues later?'),
    ar: lines('في الشهر|شهريا|في السنة|سنويًا|كل شهر', 'المبلغ ده للفريق كله، ولا لكل مستخدم؟', 'ينفع أبدأ بالسعر ده وأضيف ناس بعدين؟'),
  },
  care: {
    after: ['apology', 'delivery', 'recovery', 'angry'],
    en: lines('tomorrow|after lunch|this afternoon|by noon|in an hour', 'I’ll look out for that update. Will you call me or send a message?', 'If I haven’t heard back by then, which ticket should I quote?'),
    ar: lines('بكرة|الظهر|بعد ساعة|بعد الضهر|النهارده بالليل', 'هستنى للميعاد ده. هتكلّمني ولا هتبعت رسالة؟', 'لو الميعاد عدى من غير رد، أتابع برقم أنهي بلاغ؟'),
  },
  leadership: {
    after: ['coaching', 'deadline', 'performance'],
    en: lines('on monday|on friday|midweek|each week|every morning', 'I can make that time. What should I have ready for our check-in?', 'Let’s use that check-in to spot delays. Which task should I report on first?'),
    ar: lines('كل أسبوع|نص الأسبوع|يوم الحد|يوم الخميس|كل يوم الصبح', 'الميعاد ده مناسب. تحب أحضّر إيه قبل ما نتقابل؟', 'نتابع في الميعاد ده. أبدأ بأنهي مهمة في التحديث؟'),
  },
  technical: {
    after: ['bug', 'support', 'demo'],
    en: lines('confirmation email|green check|confirmation message|success message', 'If that confirmation never appears, should I try again or wait?', 'How can I check that the order went through only once?'),
    ar: lines('رسالة تأكيد|علامة صح|إيميل تأكيد|رسالة نجاح', 'ولو رسالة التأكيد مظهرتش، أحاول تاني ولا أستنى؟', 'أتأكد منين إن الطلب اتسجّل مرة واحدة بس؟'),
  },
  screening: {
    after: ['experience', 'education', 'strength'],
    en: lines('we worked|we built|we designed|our team made', 'That gives me the team result. Which decision was yours personally?', 'Which part could a teammate point to as your contribution?'),
    ar: lines('اشتغلنا|فريقنا عمل|صممنا|عملنا سوا', 'فهمت نتيجة الفريق. أنهي قرار كان قرارك إنت؟', 'لو سألت زميلك عن دورك بالتحديد، هيقول إيه؟'),
  },
};
