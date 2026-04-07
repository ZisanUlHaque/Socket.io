import { useState } from 'react';
import { Link } from 'react-router';
const reasons = [
  {
    title: 'Lightning Fast Delivery',
    description:
      'Our dedicated delivery team ensures your food arrives hot and fresh within 30 minutes or less.',
    icon: '⚡',
    stat: '25min',
    statLabel: 'Average delivery time',
    image:
      'https://i.ibb.co.com/Z7cx4ZV/pexels-clayton-943956-11206901.jpg', // delivery rider / scooter
  },
  {
    title: 'Real-Time Tracking',
    description:
      'Watch your order progress from kitchen to doorstep with live updates and accurate ETAs.',
    icon: '📍',
    stat: '100%',
    statLabel: 'Order visibility',
    image:
      'https://i.ibb.co.com/7xFP0mW3/pexels-technobulka-8824105.jpg', // phone / tracking
  },
  {
    title: 'Fresh Ingredients',
    description:
      'We partner with local farms and suppliers so every dish uses the freshest, highest‑quality ingredients.',
    icon: '🥬',
    stat: '24hrs',
    statLabel: 'Freshness guarantee',
    image:
      'https://i.ibb.co.com/rRcxhWMZ/pexels-laura-oliveira-2156849568-34705701.jpg', // vegetables
  },
  {
    title: 'Expert Chefs',
    description:
      'Our professional chefs bring years of experience and passion to every dish they prepare.',
    icon: '👨‍🍳',
    stat: '15+',
    statLabel: 'Years experience',
    image:
      'https://i.ibb.co.com/Gvr0Y8t3/pexels-sonyfeo-7488820.jpg', // chef
  },
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="why-choose-us" className="bg-orange-50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
            <span className="text-lg">🏆</span>
            Why Choose BeeBite
          </div>
          <h2 className="mb-4 text-3xl font-black text-slate-900 md:text-4xl">
            The smarter way to
            <span className="block text-orange-600">
              order food online
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            From speed and freshness to full transparency, BeeBite is
            built to make every order feel reliable, tasty and a bit
            delightful.
          </p>
        </div>

        {/* Reasons – alternating layout with images */}
        <div className="space-y-12 md:space-y-16">
          {reasons.map((reason, index) => {
            const isActive = index === activeIndex;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={reason.title}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group cursor-pointer rounded-3xl bg-white px-4 py-5 shadow-sm transition-colors md:px-6 md:py-6 ${
                  isActive
                    ? 'bg-orange-50/70 shadow-md'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="grid items-center gap-8 md:grid-cols-2">
                  {/* IMAGE SIDE */}
                  <div
                    className={`relative h-56 md:h-64 ${
                      isReversed
                        ? 'order-1 md:order-2'
                        : 'order-1 md:order-1'
                    }`}
                  >
                    {/* soft blob background */}
                    <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50 shadow-[0_20px_45px_rgba(15,23,42,0.12)]" />
                    {/* dotted pattern */}
                    <div className="pointer-events-none absolute top-6 left-8 grid grid-cols-4 gap-1 opacity-40">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-emerald-200"
                        />
                      ))}
                    </div>

                    {/* main image */}
                    <div className="relative h-full w-full p-5 md:p-6">
                      <div
                        className={`flex h-full w-full items-center justify-center overflow-hidden rounded-[32px] bg-white/70 shadow-inner transition-transform duration-300 ${
                          isActive
                            ? 'scale-[1.03]'
                            : 'group-hover:scale-[1.02]'
                        }`}
                      >
                        <img
                          src={reason.image}
                          alt={reason.title}
                          className="h-full w-full object-cover md:object-cover"
                        />
                      </div>

                      {/* circular icon badge */}
                      <div className="pointer-events-none absolute -top-4 -right-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-lg">
                        {reason.icon}
                      </div>

                      {/* stat badge (like 50% discount) */}
                      <div className="pointer-events-none absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-md md:text-sm">
                        <span className="mr-1 text-orange-600">
                          {reason.stat}
                        </span>
                        <span className="text-slate-500">
                          {reason.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TEXT SIDE */}
                  <div
                    className={`space-y-3 md:space-y-4 ${
                      isReversed
                        ? 'order-2 md:order-1 text-left md:pr-10'
                        : 'order-2 md:order-2 text-left md:pl-10'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      <span className="text-base">{reason.icon}</span>
                      <span>Reason {index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-[0.97rem]">
                      {reason.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2 text-sm">
                      <button
                        type="button"
                        className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-orange-400 hover:text-orange-600"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom interactive summary CTA */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex max-w-xl items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 text-left shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
              ⭐
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900 md:text-base">
                Customers love us for{' '}
                <span className="text-orange-600">
                  {reasons[activeIndex].title}
                </span>
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                {reasons[activeIndex].stat} ·{' '}
                {reasons[activeIndex].statLabel}
              </div>
            </div>
            <Link to={'/menu'}>
              <button
              type="button"
              className="ml-auto hidden rounded-2xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-orange-700 hover:-translate-y-[1px] md:inline-flex md:items-center md:gap-2"
            >
              <span>🍽️</span>
              <span>Start your order</span>
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;