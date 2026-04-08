const Features = () => {
  const features = [
    {
      title: 'Real-Time Order Tracking',
      description:
        'Watch your order progress from kitchen to doorstep with live updates and accurate ETAs.',
      icon: '📍',
      image:
        'https://i.ibb.co.com/7xFP0mW3/pexels-technobulka-8824105.jpg',
      tag: 'LIVE',
    },
    {
      title: 'Fresh Ingredients Only',
      description:
        'We partner with local farms and suppliers so every dish uses the freshest, highest‑quality ingredients.',
      icon: '🥬',
      image:
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&h=500&fit=crop',
      tag: 'FRESH',
    },
    {
      title: 'Expert Chefs',
      description:
        'Our chefs bring years of experience and passion to every plate that leaves the kitchen.',
      icon: '👨‍🍳',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop',
      tag: 'CHEF',
    },
    {
      title: 'Lightning Fast Delivery',
      description:
        'Dedicated riders ensure your food arrives hot and on time, usually within 25–30 minutes.',
      icon: '🚀',
      image:
        'https://i.ibb.co.com/SDvgZZsn/pexels-rdne-7363098.jpg',
      tag: 'FAST',
    },
    {
      title: 'Secure Payments',
      description:
        'Multiple payment options with bank‑level encryption to keep your transactions safe.',
      icon: '🔒',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop',
      tag: 'SECURE',
    },
    {
      title: '24/7 Customer Support',
      description:
        'Friendly support ready to help with any questions, any time of day or night.',
      icon: '💬',
      image:
        'https://i.ibb.co.com/rRZ2NG5C/pexels-yankrukov-8867434.jpg',
      tag: '24/7',
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#FFF7EA] py-20 md:py-24"
    >
      {/* decorative bees & doodles */}
      <div className="pointer-events-none absolute inset-0">
        {/* left bee */}
        <div className="absolute top-16 left-6 md:left-12">
          <span className="text-2xl">🐝</span>
        </div>
        {/* right bee + simple dotted path */}
        <div className="absolute top-10 right-6 md:right-16 flex items-center gap-2">
          <svg
            width="120"
            height="40"
            viewBox="0 0 120 40"
            fill="none"
            className="text-orange-300"
          >
            <path
              d="M5 30 C 35 5, 70 5, 115 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
          <span className="text-2xl">🐝</span>
        </div>
        {/* simple leaf doodles bottom corners */}
        <div className="absolute bottom-6 left-4 text-orange-200">
          <svg
            width="60"
            height="90"
            viewBox="0 0 60 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M10 80 C 15 45, 25 35, 30 10" />
            <path d="M10 70 C 5 60, 5 50, 15 45" />
            <path d="M18 55 C 24 50, 26 44, 25 37" />
          </svg>
        </div>
        <div className="absolute bottom-6 right-4 text-orange-200 rotate-180">
          <svg
            width="60"
            height="90"
            viewBox="0 0 60 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M10 80 C 15 45, 25 35, 30 10" />
            <path d="M10 70 C 5 60, 5 50, 15 45" />
            <path d="M18 55 C 24 50, 26 44, 25 37" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
            Our features
          </p>
          <h2 className="mb-3 text-3xl font-black text-slate-900 md:text-4xl">
            Everything you need
            <span className="block text-orange-500">
              for perfect delivery
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Built like a premium honey shop, but for food delivery. Clean,
            simple and focused on what matters most.
          </p>
        </div>

        {/* Features grid – product style (like image) */}
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center text-center"
            >
              {/* main product image */}
              <div className="relative mb-6 flex h-56 w-full items-center justify-center md:h-64">
                <div className="absolute inset-x-6 bottom-2 h-5 rounded-full bg-slate-300/30 blur-md" />
                <div className="relative flex h-full w-full items-center justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-h-full w-auto rounded-3xl bg-white object-contain shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                  {index === 0 && (
                    <span className="absolute -top-3 right-8 rounded-full bg-orange-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* title + icon pill */}
              <h3 className="mb-1 text-sm font-black tracking-[0.16em] text-slate-900 md:text-base">
                {feature.title.toUpperCase()}
              </h3>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
                <span>{feature.icon}</span>
                <span>{feature.tag}</span>
              </div>

              {/* description */}
              <p className="mb-4 max-w-xs text-xs leading-relaxed text-slate-600 md:text-sm">
                {feature.description}
              </p>

              {/* small CTA, like “ADD TO CART” row */}
              <button
                type="button"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 transition-colors group-hover:text-orange-600"
              >
                <span className="h-[1px] w-6 bg-slate-400 group-hover:bg-orange-500" />
                Learn more
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;