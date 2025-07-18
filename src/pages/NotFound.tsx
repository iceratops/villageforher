import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-warm-blush/10 to-sage/10 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
      <Heart className="h-12 w-12 text-soft-terracotta mb-4" />
      <h1 className="text-4xl font-bold text-pink-700 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist or has moved.<br />
        You’re still part of our village—let’s get you back home.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  </div>
);

export default NotFound; 