import { useEffect, useRef, useState } from 'react';

const statsData = [
  {
    label: 'Happy Customers',
    description: 'Satisfied food lovers who choose us daily.',
    icon: '👥',
    value: 50000,
    suffix: '+',
    decimals: 0,
    image:
      'https://i.ibb.co.com/nsTB62yr/pexels-pavel-danilyuk-6612709.jpg',
  },
  {
    label: 'Orders Delivered',
    description: 'Meals served with love and care.',
    icon: '📦',
    value: 500000,
    suffix: '+',
    decimals: 0,
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=700&fit=crop',
  },
  {
    label: 'Average Minutes',
    description: 'From order to delivery at your door.',
    icon: '⚡',
    value: 25,
    suffix: ' min',
    decimals: 0,
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&h=700&fit=crop',
  },
  {
    label: 'Customer Rating',
    description: 'Based on 10,000+ verified reviews.',
    icon: '⭐',
    value: 4.9,
    suffix: '★',
    decimals: 1,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=700&fit=crop',
  },
  {
    label: 'Partner Restaurants',
    description: 'Local favourites in your area.',
    icon: '🏪',
    value: 50,
    suffix: '+',
    decimals: 0,
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&h=700&fit=crop',
  },
  {
    label: 'Customer Support',
    description: 'Always here to help, day or night.',
    icon: '💬',
    isStatic: true,
    display: '24/7',
    image:
      'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=900&h=700&fit=crop',
  },
];

const Stats = () => {
  const [animatedValues, setAnimatedValues] = useState(
    statsData.map(() => 0)
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  // Animate numbers when section appears
  useEffect(() => {
    if (!sectionRef.current) return;

    const animateValue = (index, end, decimals) => {
      const duration = 1200 + index * 120;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min(
          (now - startTime) / duration,
          1
        );
        const value = end * progress;

        setAnimatedValues((prev) => {
          const copy = [...prev];
          copy[index] = parseFloat(value.toFixed(decimals));
          return copy;
        });

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            statsData.forEach((stat, index) => {
              if (stat.isStatic) return;
              animateValue(index, stat.value, stat.decimals || 0);
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Auto cycle active image
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsData.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const formatValue = (stat, index) => {
    if (stat.isStatic) return stat.display;
    const raw = animatedValues[index] || 0;
    const decimals = stat.decimals || 0;
    const base =
      decimals > 0
        ? raw.toFixed(decimals)
        : Math.round(raw).toLocaleString();
    return `${base}${stat.suffix || ''}`;
  };

  const activeStat = statsData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFF8EC] py-16 md:py-20"
    >
      {/* background shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-44 w-44 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-40px] h-52 w-52 rounded-full bg-amber-300/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            <span className="text-base">📊</span>
            <span>Our impact</span>
          </div>
          <h2 className="mb-3 text-3xl font-black text-slate-900 md:text-4xl">
            Numbers that
            <span className="block text-orange-500">
              tell our story
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Every order, smile and review adds up. Explore the stats
            that show how BeeBite is serving your neighbourhood.
          </p>
        </div>

        {/* Layout: stats left, image right */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] items-center">
          {/* Stats grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {statsData.map((stat, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={stat.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative flex h-full flex-col items-start rounded-2xl border bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    isActive
                      ? 'border-orange-400/80 shadow-md'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-lg">
                      {stat.icon}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 md:text-3xl">
                    {formatValue(stat, index)}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 md:text-sm">
                    {stat.description}
                  </p>
                  {isActive && (
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      Highlighted
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Image panel */}
          <div className="relative h-72 md:h-80 lg:h-96">
            {/* glow */}
            <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-orange-200 via-amber-100 to-orange-50 shadow-[0_24px_70px_rgba(248,162,69,0.45)]" />
            {/* inner card */}
            <div className="absolute inset-[10px] rounded-[36px] bg-white/90 p-4 shadow-inner">
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  key={activeStat.image}
                  src={activeStat.image}
                  alt={activeStat.label}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                />
                {/* overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/0 to-transparent" />
                {/* badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-md">
                  <span className="text-sm">{activeStat.icon}</span>
                  <span>{activeStat.label}</span>
                </div>
                {/* value badge */}
                <div className="absolute bottom-4 left-4 rounded-2xl bg-black/65 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  {formatValue(activeStat, activeIndex)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;