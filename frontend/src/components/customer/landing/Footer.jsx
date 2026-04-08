import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about', internal: true },
      { name: 'Our Chefs', href: '/chefs', internal: true },
      { name: 'Careers', href: '/careers', internal: true },
      { name: 'Press', href: '/press', internal: true },
    ],
    support: [
      { name: 'Help Center', href: '/help', internal: true },
      { name: 'Contact Us', href: '/contact', internal: true },
      { name: 'Track Order', href: '/orders', internal: true },
      { name: 'Delivery Info', href: '/delivery', internal: true },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', internal: true },
      { name: 'Terms of Service', href: '/terms', internal: true },
      { name: 'Cookie Policy', href: '/cookies', internal: true },
      { name: 'Accessibility', href: '/accessibility', internal: true },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: '📘' },
      { name: 'Instagram', href: '#', icon: '📷' },
      { name: 'Twitter', href: '#', icon: '🐦' },
      { name: 'YouTube', href: '#', icon: '📺' },
    ],
  };

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkOpen = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 10 && hour < 23);
    };
    checkOpen();
    const id = setInterval(checkOpen, 60000);
    return () => clearInterval(id);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setStatus(null);

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      setEmail('');
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amber-500 text-white">
      {/* Main Footer - Compact Version */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={scrollToTop}
              className="mb-4 flex items-center gap-3 text-left"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-400 text-xl shadow-md">
                🐝
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 shadow" />
              </div>
              <div>
                <span className="block text-2xl font-bold">BeeBite</span>
                <span className="text-xs font-medium text-white">
                  Fresh & sweet delivery
                </span>
              </div>
            </button>

            <p className="mb-5 max-w-md text-sm leading-relaxed text-white">
              BeeBite brings your favourite meals from hive to home with realtime tracking and fresh ingredients.
            </p>

            {/* Open status */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-white">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              {isOpen ? 'We are taking orders now' : 'We’re currently closed'}
            </div>

            {/* Contact Info - smaller */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-white">
                <span className="text-orange-400">📞</span>
                <span>1‑800‑BEEBITE</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="text-orange-400">✉️</span>
                <span>hello@beebite.com</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="text-orange-400">📍</span>
                <span>123 Honeycomb Ave, Food City</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.internal ? (
                    <Link to={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.internal ? (
                    <Link to={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.internal ? (
                    <Link to={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-white hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;