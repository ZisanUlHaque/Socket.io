import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How does real-time order tracking work?',
      answer: 'Our advanced tracking system provides live updates from the moment you place your order. You can see when your food is being prepared, when it leaves the restaurant, and track the delivery driver in real-time until it arrives at your door.'
    },
    {
      question: 'What if my food arrives cold or incorrect?',
      answer: 'We guarantee hot, fresh food delivery. If your order arrives cold, incorrect, or unsatisfactory, contact our support team immediately. We\'ll make it right with a replacement or full refund, plus we\'ll work with the restaurant to ensure it doesn\'t happen again.'
    },
    {
      question: 'How long does delivery typically take?',
      answer: 'Most orders arrive within 25-35 minutes from placement to delivery. During peak hours, it may take up to 45 minutes. You\'ll receive real-time updates and can track your order\'s progress throughout the entire journey.'
    },
    {
      question: 'Are there any delivery fees?',
      answer: 'Delivery fees vary by restaurant and distance, typically ranging from $2.99 to $4.99. Many restaurants offer free delivery on orders over $25. You\'ll see all fees clearly before checkout.'
    },
    {
      question: 'Can I schedule orders for later?',
      answer: 'Yes! You can schedule orders up to 7 days in advance. Choose your preferred delivery time during checkout, and we\'ll ensure your food arrives exactly when you want it.'
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We currently deliver to most urban and suburban areas. Enter your address during checkout to see if we service your location. We\'re constantly expanding our delivery network.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 mb-4">
            <span className="text-lg">❓</span>
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Got questions?
            <span className="block text-orange-600">We've got answers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about ordering with FoodTrack.
            Can't find what you're looking for? Our support team is here to help.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-2xl text-orange-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-orange-50 rounded-3xl p-8 border border-slate-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <p className="text-slate-600 mb-6">
              Our friendly support team is available 24/7 to help with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-3 rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl hover:-translate-y-1">
                <span>💬</span>
                <span>Chat with Support</span>
              </button>
              <button className="inline-flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-lg transition-all hover:border-slate-300 hover:shadow-xl hover:-translate-y-1">
                <span>📧</span>
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;