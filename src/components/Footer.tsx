import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-soft-terracotta" />
              <span className="text-xl font-heading font-semibold">Village For Her</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A sanctuary for healing, growth, and connection designed specifically for women.
              We&apos;re here to support your journey every step of the way.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/orders-returns" className="text-gray-300 hover:text-white transition-colors">
                  Orders & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@villageforher.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop & Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop & Policies</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=footer&utm_campaign=shop_link"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-analytics="outbound-shop"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="https://villageforher.square.site/shipping-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-analytics="outbound-shop"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="https://villageforher.square.site/returns-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-analytics="outbound-shop"
                >
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Village For Her. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
