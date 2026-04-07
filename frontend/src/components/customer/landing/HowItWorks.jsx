import { useEffect, useState } from 'react';

const steps = [
  {
    title: 'Browse & Select',
    subtitle: 'Start with cravings',
    description:
      'Explore our curated menu with rich photos and chef notes. Add dishes to your cart in a single tap.',
    image:
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop',
    icon: '🍽️',
    cta: 'Browse the menu',
    details: ['Fresh ingredients only', 'Chef favourites highlighted', 'Clear allergen labels'],
  },
  {
    title: 'Secure Checkout',
    subtitle: 'Pay your way',
    description:
      'Review your order, add delivery notes, and pay securely with your preferred method.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    icon: '💳',
    cta: 'Go to checkout',
    details: ['Cards, UPI & wallets', 'Smart delivery instructions', 'Save your favourites'],
  },
  {
    title: 'Live Tracking',
    subtitle: 'From hive to home',
    description:
      'Watch your order move from the kitchen to your doorstep with live ETA and status updates.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    icon: '📍',
    cta: 'Track your order',
    details: ['Minute‑by‑minute updates', 'Accurate ETA tracking', 'Contact your rider'],
  },
];


const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [avgTime, setAvgTime] = useState(25);

  // Auto‑cycle steps
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  // Gently animate average delivery time
  useEffect(() => {
    const id = setInterval(() => {
      setAvgTime((prev) => {
        let next = prev + (Math.random() > 0.5 ? 1 : -1);
        if (next < 20) next = 20;
        if (next > 32) next = 32;
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-orange-50 to-emerald-50 py-20 md:py-24"
    >


      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            <span className="text-lg">🐝</span>
            How BeeBite works
          </div>
          <h2 className="mb-4 text-3xl font-black text-slate-900 md:text-4xl">
            Your order, in three
            <span className="block text-orange-500">sweet & simple steps</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            From first craving to the final bite, BeeBite keeps every step
            transparent, fast and a little bit fun.
          </p>
        </div>

        {/* Step selector pills (top) */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={step.title}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all md:px-4 md:py-2 ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                    : 'border-transparent bg-white/70 text-slate-700 hover:border-orange-200 hover:bg-orange-50/60'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden text-xs md:inline">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards – interactive like Salesforce style */}
        <div className="relative mx-auto flex max-w-5xl flex-col gap-5 md:flex-row">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative flex-1 cursor-pointer rounded-3xl bg-white/95 p-5 text-left shadow-lg backdrop-blur-sm transition-all duration-300 md:p-6 ${
                  isActive
                    ? 'md:-translate-y-2 md:shadow-2xl ring-2 ring-orange-400/70'
                    : 'hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                {/* Icon + subtitle */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 md:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl shadow-sm">
                    {step.icon}
                  </div>
                </div>

                {/* Image preview */}
                <div className="mb-4 overflow-hidden rounded-2xl border border-slate-100">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-36"
                  />
                </div>

                <p className="mb-3 text-sm text-slate-600 md:text-[0.94rem]">
                  {step.description}
                </p>

                {/* Details – show more when active */}
                <div className="space-y-2 pb-2">
                  {step.details.map((detail, i) => {
                    const show =
                      isActive || i === 0 || window.innerWidth < 768;
                    if (!show) return null;
                    return (
                      <div
                        key={detail}
                        className="flex items-center gap-2 text-xs text-slate-700 md:text-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>{detail}</span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA + tiny progress bar */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-orange-600 md:text-sm">
                    {step.cta}
                  </span>
                  {isActive && (
                    <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-orange-100">
                      <div className="absolute inset-y-0 left-0 w-1/2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA – dynamic average time */}
        <div className="relative mt-14 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 px-6 py-4 shadow-sm">
            <div className="text-2xl md:text-3xl">⚡</div>
            <div>
              <div className="text-sm font-semibold text-slate-900 md:text-base">
                Average delivery time:{' '}
                <span className="text-orange-600">{avgTime} minutes</span>
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                From tap to doorstep, based on live orders.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;