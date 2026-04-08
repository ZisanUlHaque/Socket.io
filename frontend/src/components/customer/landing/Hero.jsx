import { Link } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const featuredDishes = [
  {
    id: 1,
    image:
      'https://i.ibb.co.com/F4Znpp3v/pexels-natan-machado-fotografia-gastronomica-162809799-15141035.jpg',
    name: 'Smoky Burger',
    tag: 'Most ordered today',
  },
  {
    id: 2,
    image:
      'https://i.ibb.co.com/7JhmgR9J/pexels-davegarcia-32371277.jpg',
    name: 'Pasta Alfredo',
    tag: "Chef's special",
  },
  {
    id: 3,
    image:
      'https://i.ibb.co.com/Q7CFM0QF/pexels-mohamed9380-36934933.jpg',
    name: 'Sushi Platter',
    tag: 'Fresh arrival',
  },
];

const cuisineSuggestions = [
  'Pizza',
  'Burger',
  'Pasta',
  'Sushi',
  'Biryani',
  'Salad',
  'Desserts',
  'Coffee',
  'Vegan Bowl',
  'Noodles',
];

const liveOrderMessages = [
  'Ravi from Downtown just ordered a Smoky Burger.',
  'Aditi from Riverside grabbed a Sushi Platter.',
  'Kumar from Green Park ordered Double Cheese Pizza.',
  'Sara from City Center ordered Veggie Salad.',
  'John from Lakeside grabbed a Tiramisu dessert.',
];

// flying bees overlay
const FlyingBees = () => (
  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
    <div className="bee-path-1 absolute top-6 left-0">
      <span className="bee-inner text-xl md:text-4xl">🐝</span>
    </div>

    <div className="bee-path-2 absolute bottom-20 left-0">
      <span className="bee-inner text-lg md:text-3xl">🐝</span>
    </div>

    <div className="bee-path-3 absolute top-1/2 left-0">
      <span className="bee-inner text-base md:text-2lg">🐝</span>
    </div>
  </div>
);

const Hero = ({ connected }) => {
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const [ordersCount, setOrdersCount] = useState(2143);
  const [avgDelivery, setAvgDelivery] = useState(18);
  const [rating, setRating] = useState(4.8);
  const [tickerIndex, setTickerIndex] = useState(0);

  const [showSuggestions, setShowSuggestions] = useState(false);

  // realtime-ish stats
  useEffect(() => {
    const id = setInterval(() => {
      setOrdersCount((prev) => {
        const next = prev + Math.floor(Math.random() * 7);
        return next > 2600 ? 2100 : next;
      });

      setAvgDelivery((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        if (next < 12) return 12;
        if (next > 25) return 25;
        return next;
      });

      setRating((prev) => {
        let next = +(prev + (Math.random() - 0.5) * 0.06).toFixed(1);
        if (next < 4.6) next = 4.6;
        if (next > 4.9) next = 4.9;
        return next;
      });
    }, 4000);

    return () => clearInterval(id);
  }, []);

  // live order ticker
  useEffect(() => {
    const id = setInterval(
      () => setTickerIndex((i) => (i + 1) % liveOrderMessages.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  // search suggestions
  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    return cuisineSuggestions
      .filter((c) =>
        c.toLowerCase().includes(search.trim().toLowerCase())
      )
      .slice(0, 6);
  }, [search]);

  useEffect(() => {
    setShowSuggestions(
      !!search.trim() && filteredSuggestions.length > 0
    );
  }, [search, filteredSuggestions.length]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported in this browser.');
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(
          `Near (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`
        );
        setIsDetectingLocation(false);
      },
      () => {
        setIsDetectingLocation(false);
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', { location, search });
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF8EC]">
      {/* background doodles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full border border-dashed border-orange-200" />
        <div className="absolute bottom-10 -right-16 h-48 w-48 rounded-full bg-orange-100/50 blur-3xl" />
        <svg
          className="absolute bottom-0 left-1/4 h-24 w-64 text-orange-200"
          viewBox="0 0 200 60"
          fill="none"
        >
          <path
            d="M0 40 C 40 10, 80 10, 120 40 C 160 70, 200 70, 240 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      {/* flying bees */}
      <FlyingBees />

      {/* main content */}
      <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center gap-10 px-4 pt-8 pb-14 lg:flex-row lg:pt-10 lg:pb-16">
        {/* LEFT: text + search + stats */}
        <div className="relative z-10 w-full space-y-7 lg:w-1/2">
          {/* online pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                connected
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-slate-400'
              }`}
            />
            {connected ? 'Riders near you right now' : 'Demo mode'}
          </div>

          {/* heading + description */}
          <div className="space-y-3 text-left">
            <p className="text-xs font-semibold tracking-[0.25em] text-orange-500">
              FRESH • HOT • DELIVERED
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Hungry for
              <span className="block text-orange-500">
                something delicious?
              </span>
            </h1>
            <p className="max-w-xl text-base text-slate-600 md:text-lg">
              Order from your favorite local restaurants and trending
              kitchens. Track your food live and get it delivered in
              minutes.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
            >
              <span>Order now</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-400 px-5 py-2 text-xs font-medium text-slate-700 hover:border-orange-400 hover:text-orange-500"
            >
              View today&apos;s offers
            </button>
          </div>

          {/* search card */}
          <form
            onSubmit={handleSearch}
            className="relative mt-3 space-y-2 rounded-3xl bg-white/90 p-3 shadow-xl backdrop-blur-sm"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* location input */}
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
                <span className="text-lg">📍</span>
                <input
                  type="text"
                  placeholder="Add your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-medium text-orange-600 shadow-sm hover:bg-orange-50"
                >
                  {isDetectingLocation ? 'Locating…' : 'Use my location'}
                </button>
              </div>

              {/* search input */}
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
                <span className="text-lg">🍽️</span>
                <input
                  type="text"
                  placeholder="Search for restaurant, cuisine or dish"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transition hover:from-orange-600 hover:to-orange-700"
                >
                  🔍
                </button>
              </div>
            </div>

            {/* suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute left-3 right-3 top-full z-20 mt-2 rounded-2xl border border-slate-100 bg-white shadow-lg">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearch(item);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-orange-50"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-orange-500">
                      Search
                    </span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* stats */}
          <div className="mt-5 grid max-w-md grid-cols-3 gap-4 text-center text-sm">
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="text-xl font-bold text-orange-500">
                {ordersCount.toLocaleString()}+
              </div>
              <div className="text-[11px] text-slate-500">
                Active orders today
              </div>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="text-xl font-bold text-orange-500">
                {avgDelivery} min
              </div>
              <div className="text-[11px] text-slate-500">
                Avg delivery time
              </div>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="text-xl font-bold text-orange-500">
                {rating.toFixed(1)}★
              </div>
              <div className="text-[11px] text-slate-500">
                Customer rating
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: bigger round image + ticker */}
        <div className="relative flex w-full justify-center lg:w-1/2">
          {/* bigger circle */}
          <div className="relative h-80 w-80 md:h-96 md:w-96">
            {/* outer glow */}
            <div className="absolute inset-0 -z-20 rounded-full bg-orange-200/40 blur-3xl" />

            {/* gradient ring */}
            <div className="absolute inset-0 -z-10 rounded-[42%] bg-gradient-to-tr from-amber-300 via-amber-50 to-orange-200 shadow-[0_30px_80px_rgba(255,148,48,0.55)]" />

            {/* soft inner background */}
            <div className="absolute inset-[12px] rounded-[45%] bg-gradient-to-b from-white via-amber-50 to-amber-100" />

            {/* actual image container */}
            <div className="absolute inset-[22px] flex items-center justify-center overflow-hidden rounded-[45%] border border-white/70 bg-amber-50/40">
              <Swiper
                modules={[Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                loop
                effect="fade"
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                className="h-full w-full"
              >
                {featuredDishes.map((dish) => (
                  <SwiperSlide key={dish.id}>
                    <div className="group relative h-full w-full cursor-grab">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* glassy highlight */}
                      <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-24 rotate-[-28deg] bg-white/55 blur-2xl opacity-70" />

                      {/* bottom glow */}
                      <div className="pointer-events-none absolute -bottom-10 right-[-24px] h-36 w-36 rounded-full bg-amber-500/40 blur-3xl opacity-50" />

                      {/* label pill */}
                      <div className="pointer-events-none absolute bottom-3 left-1/2 w-[80%] -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-center text-[11px] text-white backdrop-blur">
                        <span className="font-semibold">{dish.name}</span>{' '}
                        ·{' '}
                        <span className="text-orange-300">
                          {dish.tag}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* decorative chips moved further OUTSIDE the circle */}
            <div className="pointer-events-none absolute top-1/4 -left-24 md:-left-28 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-500 shadow-md">
              <span>🐝</span>
              <span>Hot &amp; fresh</span>
            </div>
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-24 md:-right-32 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
              <span>🚚</span>
              <span>Free delivery</span>
            </div>
            <div className="pointer-events-none absolute bottom-6 -left-20 md:-left-18 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
              <span>🛡️</span>
              <span>No-contact</span>
            </div>

            {/* live ticker BELOW the circle */}
            <div className="absolute left-1/2 top-full mt-6 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-[11px] text-white shadow-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Live:</span>
              <span className="whitespace-nowrap text-slate-200">
                {liveOrderMessages[tickerIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;