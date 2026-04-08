import { useMemo, useState } from 'react';
import { menuItems, categories } from '../../utils/menuData';

const Menu = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  const heroDish = menuItems[0];

  return (
    <section className="bg-[#FFF8EC] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero header – like a product hero */}
        <div className="mb-12 grid gap-8 rounded-[2.5rem] bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 px-7 py-8 shadow-[0_22px_60px_rgba(248,163,71,0.35)] md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:px-10 md:py-10">
          {/* LEFT: text + filters */}
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              <span className="text-base">🐝</span>
              <span>Our menu</span>
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Premium dishes,
                <span className="block text-orange-500">
                  curated for your cravings
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 md:text-[0.97rem]">
                Handcrafted meals prepared with fresh ingredients and served
                with love. Pick your favourites or discover something new from
                our BeeBite kitchen.
              </p>
            </div>

            {/* Search + categories pills */}
            <div className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a dish…"
                    className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    🔍
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all md:text-sm ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-400/40'
                        : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-orange-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: featured dish image */}
          {heroDish && (
            <div className="relative flex items-center justify-center">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-orange-200/60 blur-2xl" />
              <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-amber-300/60 blur-2xl" />

              <div className="relative w-full max-w-sm">
                <div className="absolute -top-3 left-5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-orange-600 shadow-md">
                  Chef’s pick
                </div>
                <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
                  <img
                    src={heroDish.image}
                    alt={heroDish.name}
                    className="h-60 w-full object-cover md:h-72"
                  />
                  <div className="flex items-center justify-between px-5 py-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 md:text-base">
                        {heroDish.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        From {heroDish.category}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-orange-600">
                      ${heroDish.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* little bee */}
              <div className="absolute -left-5 bottom-0 text-2xl">🐝</div>
            </div>
          )}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => {
            const rating = item.rating ?? 4.8;

            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-3xl bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* rating badge */}
                  <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow-md">
                    <span className="mr-1 text-yellow-400">★</span>
                    {rating.toFixed ? rating.toFixed(1) : rating}
                  </div>
                  {/* popular tag */}
                  {item.popular && (
                    <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-base font-bold text-slate-900 md:text-lg">
                    {item.name}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags?.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {item.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-orange-50 px-2 py-1 text-[11px] font-medium text-orange-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price + add button */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                      <span className="text-lg font-bold text-slate-900 md:text-xl">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-2 text-xs text-slate-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-[1px]"
                    >
                      <span>Add</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-16 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              No items found
            </h3>
            <p className="text-sm text-slate-600">
              Try a different category or clear your search to explore all
              our delicious options.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;