import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, MessageCircleHeart, User, ShoppingCart } from 'lucide-react';
import { openCart } from './CartContext';

function getSessionUserId(): string | null {
  try {
    return sessionStorage.getItem('vfh_userId');
  } catch {
    return (window as any)._vfh_userId || null;
  }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = getSessionUserId();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Payment', href: '/payment' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('vfh_userId');
    } catch {}
    window.location.reload();
  };

  return (
    <header className="bg-warm-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="h-8 w-8 text-soft-terracotta group-hover:text-deep-sage transition-colors duration-300" />
            <span className="text-xl font-heading font-semibold text-gray-900">
              Village For Her
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-soft-terracotta ${
                  isActive(item.href)
                    ? 'text-soft-terracotta border-b-2 border-soft-terracotta pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Healing Companion Highlighted Link */}
            <Link
              to="/chat"
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-blue-50 font-semibold text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-all duration-200 ${
                isActive('/chat') ? 'ring-2 ring-pink-300 scale-105' : ''
              } animate-pulse`}
              style={{ boxShadow: '0 2px 8px 0 rgba(236, 72, 153, 0.10)' }}
            >
              <MessageCircleHeart className="h-5 w-5 text-pink-400" />
              Healing Companion
            </Link>
            {/* Cart Icon */}
            <div className="ml-4 relative group">
              <button onClick={openCart} className="relative focus:outline-none">
                <ShoppingCart className="h-7 w-7 text-soft-terracotta group-hover:text-deep-sage transition" />
                <span className="snipcart-items-count absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow"></span>
              </button>
            </div>
            {/* Login/Profile Button */}
            {!userId ? (
              <Link
                to="/auth"
                className="ml-4 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow hover:bg-blue-100 hover:text-blue-900 transition-all font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="ml-4 relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200 shadow hover:bg-green-100 hover:text-green-900 transition-all font-medium"
                  onClick={() => setProfileOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
                >
                  <User className="h-5 w-5 text-green-400" />
                  Profile
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-soft-terracotta transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-warm-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-soft-terracotta hover:bg-warm-blush/20 rounded-md ${
                    isActive(item.href)
                      ? 'text-soft-terracotta bg-warm-blush/30'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Healing Companion Highlighted Link (Mobile) */}
              <Link
                to="/chat"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 mt-2 rounded-full shadow-md border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-blue-50 font-semibold text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-all duration-200 ${
                  isActive('/chat') ? 'ring-2 ring-pink-300 scale-105' : ''
                } animate-pulse`}
                style={{ boxShadow: '0 2px 8px 0 rgba(236, 72, 153, 0.10)' }}
              >
                <MessageCircleHeart className="h-5 w-5 text-pink-400" />
                Healing Companion
              </Link>
              {/* Cart Icon (Mobile) */}
              <button
                onClick={() => { setIsMenuOpen(false); openCart(); }}
                className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full shadow-md border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-blue-50 font-semibold text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-all duration-200 animate-pulse"
                style={{ boxShadow: '0 2px 8px 0 rgba(236, 72, 153, 0.10)' }}
              >
                <ShoppingCart className="h-5 w-5 text-pink-400" />
                <span className="snipcart-items-count"></span>
                Cart
              </button>
              {/* Login/Profile Button (Mobile) */}
              {!userId ? (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow hover:bg-blue-100 hover:text-blue-900 transition-all font-medium"
                >
                  Login
                </Link>
              ) : (
                <div className="mt-2 relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200 shadow hover:bg-green-100 hover:text-green-900 transition-all font-medium w-full"
                    onClick={() => setProfileOpen((v) => !v)}
                    onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
                  >
                    <User className="h-5 w-5 text-green-400" />
                    Profile
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-t-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;