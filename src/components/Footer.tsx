import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-warm-blush" />
              <span className="text-xl font-heading font-semibold">Village For Her</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Supporting women everywhere with compassionate postpartum care, emotional support, and practical help during your most precious journey. Founded in Austin, TX, we are honored to serve women across the nation and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/villageforher/" target="_blank" className="text-gray-400 hover:text-warm-blush transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/villageforher" target="_blank" className="text-gray-400 hover:text-warm-blush transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-warm-blush transition-colors duration-200">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-warm-blush transition-colors duration-200">Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-warm-blush transition-colors duration-200">Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-warm-blush transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-warm-blush" />
                <span className="text-gray-300">
                  <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm italic">Based in Austin, TX & serving women everywhere</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Village For Her. All rights reserved. | Supporting women on their postpartum journey, everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;