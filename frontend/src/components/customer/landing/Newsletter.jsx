const Newsletter = () => {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-[#FFF7EA] py-16 md:py-20"
    >
      {/* decorative bees & dotted path */}
      <div className="pointer-events-none absolute inset-0">
        {/* top-left bee */}
        <div className="absolute top-10 left-6 md:left-16 text-xl">
          🐝
        </div>

        {/* bottom-right bee + path */}
        <div className="absolute bottom-6 right-6 md:right-16 flex items-center gap-2">
          <svg
            width="120"
            height="50"
            viewBox="0 0 120 50"
            fill="none"
            className="text-orange-200"
          >
            <path
              d="M5 40 C 35 15, 70 15, 115 30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
          <span className="text-xl">🐝</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {/* main card */}
        <div className="grid gap-10 rounded-3xl bg-[#FFFDF8] px-6 py-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:grid-cols-2 md:px-10 md:py-12">
          {/* LEFT: honey image */}
          <div className="flex items-center justify-center">
            <div className="relative max-w-xs">
              <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-orange-100/70 blur-2xl" />
              <img
                src="https://i.ibb.co.com/PvZ15srZ/pexels-wkn-992646-12039747.jpg"
                alt="Honeycomb and honey jar"
                className="relative z-10 w-full max-w-xs rounded-[32px] bg-white object-contain shadow-[0_22px_45px_rgba(249,115,22,0.45)]"
              />
            </div>
          </div>

          {/* RIGHT: copy + form */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-bold tracking-[0.16em] text-slate-900 md:text-xl">
              NEWSLETTER SIGN UP
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
              Get offers as sweet as honey. Be the first to know about new
              restaurants, seasonal menus, and exclusive BeeBite deals
              delivered straight to your inbox.
            </p>

            {/* form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-none bg-orange-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-orange-700"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-3 text-[11px] text-slate-500">
              We respect your privacy. Unsubscribe anytime with a single
              click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;