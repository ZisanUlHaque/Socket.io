import { Link } from 'react-router';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Chefs', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Track Order', href: '/orders' },
      { name: 'Delivery Info', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' }
    ],
    social: [
      { name: 'Facebook', href: '#', icon: '📘' },
      { name: 'Instagram', href: '#', icon: '📷' },
      { name: 'Twitter', href: '#', icon: '🐦' },
      { name: 'YouTube', href: '#', icon: '📺' }
    ]
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-xl font-bold">
                🍽️
              </div>
              <span className="text-2xl font-bold">FoodTrack</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Revolutionizing food delivery with real-time tracking, fresh ingredients,
              and exceptional service. Your favorite meals, delivered with care.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-orange-400">📞</span>
                <span>1-800-FOODTRACK</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-orange-400">✉️</span>
                <span>hello@foodtrack.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-orange-400">📍</span>
                <span>123 Food Street, Cuisine City, FC 12345</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6">Get the latest updates on new restaurants, special offers, and food trends.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700 bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-slate-400 text-sm">
              © 2026 FoodTrack. All rights reserved. Made with ❤️ for food lovers.
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-lg transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* App Store Links */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
                <span>📱</span>
                App Store
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
                <span>🤖</span>
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
