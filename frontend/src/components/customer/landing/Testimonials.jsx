import { Link } from 'react-router';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image:
        'https://i.ibb.co.com/MyPg9Pm9/pexels-olly-761973.jpg',
      quote: 'The real‑time tracking is incredible!',
      accent: 'border-orange-400',
      glow: 'shadow-orange-200',
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
      quote: 'Live updates save me so much time.',
      accent: 'border-amber-400',
      glow: 'shadow-amber-200',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=900&fit=crop',
      quote: 'The delivery was super fast!',
      accent: 'border-emerald-400',
      glow: 'shadow-emerald-200',
    },
  ];

  // grid positions to mimic the SiteGround layout:
  const positions = [
    'md:row-start-1 md:col-start-1', // top-left
    'md:row-start-1 md:col-start-2', // top-right
    'md:row-start-2 md:col-start-2', // bottom-right (offset)
  ];

  return (
    <section id="testimonials" className="bg-white">
      {/* Top part – text + image grid */}
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT: text + CTAs */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700">
              <span>⭐</span>
              <span>Success stories</span>
            </div>

            <h2 className="mb-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              Inspiring orders,
              <span className="block text-orange-500">
                delivered with care
              </span>
            </h2>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-slate-700 md:text-[0.95rem]">
              Real reviews from real customers. See how BeeBite brings
              delicious meals to food lovers with speed, freshness and
              a smile.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-[1px]"
              >
                Read stories
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition-colors hover:text-orange-700"
              >
                Start yours →
              </Link>
            </div>
          </div>

          {/* RIGHT: image card grid like the screenshot */}
          <div className="relative">
            <div className="grid auto-rows-[210px] gap-4 md:auto-rows-[240px] md:grid-cols-2">
              {testimonials.map((t, idx) => (
                <div
                  key={t.name}
                  className={`group relative overflow-hidden rounded-3xl border-2 bg-slate-900 text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl ${t.accent} ${t.glow} ${positions[idx]}`}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                  {/* dark gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  {/* text overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs font-semibold text-amber-50 md:text-sm">
                      {t.quote}
                    </p>
                    <p className="mt-1 text-[11px] text-amber-200 md:text-xs">
                      {t.name} · {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* small bee */}
            <div className="pointer-events-none absolute -left-4 -bottom-4 text-2xl">
              🐝
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div className="border-t border-orange-100 bg-orange-50/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="text-2xl font-black text-slate-900 md:text-3xl">
                4.8<span className="text-orange-500">★</span>
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                Average rating
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 md:text-3xl">
                2,500+
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                Happy customers
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 md:text-3xl">
                15<span className="text-sm text-slate-400">min</span>
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                Avg delivery time
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 md:text-3xl">
                98%
              </div>
              <div className="text-xs text-slate-600 md:text-sm">
                Satisfaction rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;