import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ConnectionStatus from "./ConnectionStatus";

const Header = ({
  cartCount = 0,
  showCart = true,
  showAdmin = true,
  connected,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const BeeLogo = () => (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 shadow-md">
      <span className="text-xl">🐝</span>
      {/* tiny live dot on logo */}
      <div className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-white/80">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      </div>
    </div>
  );

  return (
    <header className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <BeeLogo />
            <div>
              <h1 className="text-lg font-bold text-slate-900">BeeBite</h1>
              <p className="text-xs text-slate-500">Fresh & sweet delivery</p>
            </div>
          </Link>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Cart - Always Visible */}
            {showCart && (
              <button
                onClick={() => navigate("/cart")}
                className="relative hover:bg-orange-500 px-3 py-2 rounded-lg transition"
              >
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/orders"
                className="hover:bg-orange-500 px-4 py-2 rounded-lg transition font-medium"
              >
                📦 Track Order
              </Link>
              <ConnectionStatus connected={connected} />

              {showAdmin && (
                <Link
                  to="/admin"
                  className="hover:bg-orange-500 px-4 py-2 rounded-lg transition font-medium"
                >
                  👨‍💼 Admin
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-500 transition text-2xl"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-4 animate-fade-in text-gray-800">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-500">Status</span>
              <ConnectionStatus connected={connected} />
            </div>

            <Link
              to="/orders"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition font-medium text-gray-700"
            >
              <span>📦</span>
              <span>Track Order</span>
            </Link>

            {showAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition font-medium text-gray-700"
              >
                <span>👨‍💼</span>
                <span>Admin Dashboard</span>
              </Link>
            )}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/");
              }}
              className="text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition text-gray-600"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
