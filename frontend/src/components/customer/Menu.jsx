import { useState } from "react";
import { menuItems, categories } from "../../utils/menuData";

const Menu = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 rounded-[2rem] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 p-10 text-white shadow-2xl shadow-orange-500/20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-orange-100">
              <span className="text-lg">✨</span>
              Chef's Selection
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Premium dishes,
              <span className="block text-white">curated for your cravings.</span>
            </h1>
            <p className="text-lg text-orange-100/90 leading-relaxed max-w-2xl">
              Explore our menu with distinct sections for comfort food, chef favorites, and seasonal specials — each prepared to order and delivered hot.
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 mb-4">
              <span className="text-lg">🍽️</span>
              Fresh Menu
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Choose your
              <span className="block text-orange-600">favorite dishes</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              Handcrafted meals prepared with fresh ingredients and served with love.
              Every dish tells a story of flavor and passion.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-slate-900 text-sm font-semibold">
                      {(4.2 + Math.random() * 0.8).toFixed(1)}
                    </span>
                  </div>
                </div>
                {item.popular && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🔥 Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags?.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-slate-500 line-through ml-2">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Add to Cart</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-16 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600">Try selecting a different category to see our delicious options.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;