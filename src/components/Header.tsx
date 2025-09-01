'use client';

import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
  ];

  const isActive = (path: string) => pathname === path;





  return (
    <header className="bg-warm-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
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
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-soft-terracotta ${
                  isActive(item.href)
                    ? 'text-soft-terracotta border-b-2 border-soft-terracotta pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Shop Link */}
            <a
              href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=nav&utm_campaign=shop_link"
              className="ml-4 px-4 py-2 rounded-full bg-soft-terracotta text-white border border-soft-terracotta shadow hover:bg-deep-sage hover:text-white transition-all font-medium"
              data-analytics="outbound-shop"
            >
              Shop
            </a>

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
                  href={item.href}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-soft-terracotta hover:bg-warm-blush/20 rounded-md ${
                    isActive(item.href) ? 'text-soft-terracotta bg-warm-blush/30' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Shop Link (Mobile) */}
              <a
                href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=nav&utm_campaign=shop_link"
                className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full shadow-md border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-blue-50 font-semibold text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-all duration-200 animate-pulse"
                style={{ boxShadow: '0 2px 8px 0 rgba(236, 72, 153, 0.10)' }}
                onClick={() => setIsMenuOpen(false)}
                data-analytics="outbound-shop"
              >
                Shop
              </a>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
