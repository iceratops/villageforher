import React from 'react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-gray-500 mb-8">Your cart is managed by Snipcart. Click the cart icon in the header to view or edit your cart.</p>
      <Link to="/products" className="px-6 py-3 bg-soft-terracotta text-white rounded-full font-medium hover:bg-deep-sage transition">Shop Products</Link>
    </div>
  );
};

export default Cart; 