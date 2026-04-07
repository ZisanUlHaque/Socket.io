import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';

const sectionIds = ['hero', 'how-it-works', 'testimonials', 'faq'];

const BeeLogo = () => (
  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 shadow-md">
    <span className="text-xl">🐝</span>
    {/* tiny live dot on logo */}
    <div className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-white/80">
      <span className="h-2 w-2 rounded-full bg-amber-500" />
    </div>
  </div>
);

const Navbar = ({ cartCount = 0, connected = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [cartBump, setCartBump] = useState(false);
  const prevCartCount = useRef(cartCount);

  // Smooth scroll and close mobile menu
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  // Highlight nav item based on scroll (IntersectionObserver)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Cart bump animation when count increases
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 250);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  const navButtonBase =
    'relative text-sm font-semibold transition-colors';

  const desktopNav = (
    <nav className="hidden md:flex items-center gap-6">
      <button
        onClick={() => scrollToSection('hero')}
        className={`${navButtonBase} ${
          activeSection === 'hero'
            ? 'text-orange-600'
            : 'text-slate-700 hover:text-orange-600'
        }`}
      >
        Home
        {activeSection === 'hero' && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange-500" />
        )}
      </button>
      <button
        onClick={() => scrollToSection('how-it-works')}
        className={`${navButtonBase} ${
          activeSection === 'how-it-works'
            ? 'text-orange-600'
            : 'text-slate-700 hover:text-orange-600'
        }`}
      >
        How It Works
        {activeSection === 'how-it-works' && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange-500" />
        )}
      </button>
      <Link
        to="/menu"
        className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
      >
        Menu
      </Link>
      <button
        onClick={() => scrollToSection('testimonials')}
        className={`${navButtonBase} ${
          activeSection === 'testimonials'
            ? 'text-orange-600'
            : 'text-slate-700 hover:text-orange-600'
        }`}
      >
        Reviews
        {activeSection === 'testimonials' && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange-500" />
        )}
      </button>
    </nav>
  );

  const cartButtonClasses =
    'inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transform transition-all duration-200 ' +
    (cartBump ? 'scale-110 shadow-lg' : '');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo + name */}
        <Link to="/" className="flex items-center gap-3">
          <BeeLogo />
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              BeeBite
            </h1>
            <p className="text-xs text-slate-500">
              Fresh & sweet delivery
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        {desktopNav}

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-orange-300 transition"
          >
            📦 Track Order
          </Link>

          {/* Live / Offline pill – only text 'Live' now */}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
              connected
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                connected
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            {connected ? 'Live' : 'Offline'}
          </span>

          {/* Cart button with bump */}
          <Link to="/cart" className={cartButtonClasses}>
            🛒 Cart
            <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white text-orange-600 px-2 text-xs font-bold">
              {cartCount}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('hero')}
                className={`text-left text-sm font-semibold rounded-full px-3 py-2 transition-colors ${
                  activeSection === 'hero'
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className={`text-left text-sm font-semibold rounded-full px-3 py-2 transition-colors ${
                  activeSection === 'how-it-works'
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                📋 How It Works
              </button>
              <Link
                to="/menu"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-sm font-semibold rounded-full px-3 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                🍽️ Menu
              </Link>
              <button
                onClick={() => scrollToSection('testimonials')}
                className={`text-left text-sm font-semibold rounded-full px-3 py-2 transition-colors ${
                  activeSection === 'testimonials'
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                ⭐ Reviews
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`text-left text-sm font-semibold rounded-full px-3 py-2 transition-colors ${
                  activeSection === 'faq'
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                ❓ FAQ
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;