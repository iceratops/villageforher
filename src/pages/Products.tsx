import React from 'react';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Postpartum Care Products & Gift Boxes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Thoughtfully curated care packages and products designed for women everywhere. Each item is selected to support your postpartum recovery and well-being.
            </p>
          </div>
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default Products;