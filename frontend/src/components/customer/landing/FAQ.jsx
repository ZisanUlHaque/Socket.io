import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How does real-time order tracking work?',
      answer:
        'Our advanced tracking system provides live updates from the moment you place your order. You can see when your food is being prepared, when it leaves the restaurant, and track the delivery driver in real-time until it arrives at your door.',
    },
    {
      question: 'What if my food arrives cold or incorrect?',
      answer:
        "We guarantee hot, fresh food delivery. If your order arrives cold, incorrect, or unsatisfactory, contact our support team immediately. We'll make it right with a replacement or full refund, plus we’ll work with the restaurant to ensure it doesn’t happen again.",
    },
    {
      question: 'How long does delivery typically take?',
      answer:
        "Most orders arrive within 25–35 minutes from placement to delivery. During peak hours, it may take up to 45 minutes. You'll receive real-time updates and can track your order's progress throughout the entire journey.",
    },
    {
      question: 'Are there any delivery fees?',
      answer:
        'Delivery fees vary by restaurant and distance, typically ranging from $2.99 to $4.99. Many restaurants offer free delivery on orders over $25. You’ll see all fees clearly before checkout.',
    },
    {
      question: 'Can I schedule orders for later?',
      answer:
        'Yes! You can schedule orders up to 7 days in advance. Choose your preferred delivery time during checkout, and we’ll ensure your food arrives exactly when you want it.',
    },
    {
      question: 'What areas do you deliver to?',
      answer:
        'We currently deliver to most urban and suburban areas. Enter your address during checkout to see if we service your location. We’re constantly expanding our delivery network.',
    },
  ];

  const toggleFAQ = (index) =>
    setOpenIndex(openIndex === index ? -1 : index);

  return (
    <section
      id="faq"
      className="bg-[#FFF8EC] py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 items-start md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.1fr)]">
          {/* LEFT: heading + FAQ list */}
          <div>
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              Everything you need to know about ordering with BeeBite.
              If you still can’t find your answer, our team is here to
              help 24/7.
            </p>

            <div className="mt-8 border-t border-slate-200">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border-b border-slate-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left hover:bg-orange-50/40 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-900 md:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`text-lg text-orange-500 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-250 ${
                      openIndex === index
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pb-4 pr-6 text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: illustration panel */}
          <div className="relative mt-6 hidden md:flex items-center justify-center">
            <div className="relative max-w-xs">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-orange-200/60 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-amber-200/60 blur-2xl" />
              <img
                src="https://i.ibb.co.com/BH6c7y7c/4464b47eec22bcf445ef2e20d1d5f22f.jpg"
                alt="Question and food illustration"
                className="rounded-3xl"
              />
              {/* little bee */}
              <div className="absolute -top-4 left-4 text-2xl">
                🐝
              </div>
            </div>
          </div>
        </div>

        {/* Small contact CTA under FAQs */}
        <div className="mt-10 rounded-2xl border border-orange-100 bg-white/80 px-5 py-4 text-center text-xs text-slate-600 md:text-sm">
          Still need help? Chat with us in the app or email
          <span className="font-semibold text-orange-600">
            {' '}
            support@beebite.com
          </span>
          .
        </div>
      </div>
    </section>
  );
};

export default FAQ;