import React from 'react';

interface ProductCardProps {
  product: any;
  onViewDetails?: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const mainImage = product['Main Image']?.[0]?.url || '';
  const price = product['Sale Price'] || product['Price'];
  const originalPrice = product['Sale Price'] ? product['Price'] : null;
  const stock = product['Stock Count'] ?? 0;
  const outOfStock = stock === 0;
  const lowStock = !!product['Low Stock Alert'] && !outOfStock;
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col`}>
      <div className="relative">
        {mainImage && (
          <img src={mainImage} alt={product['Product Name']} className="w-full h-64 object-cover" />
        )}
        {lowStock && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow">
            Low Stock
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product['Product Name']}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product['Short Description']}</p>
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-2">${originalPrice}</span>
          )}
        </div>
        <div className="flex gap-2 mt-auto">
          {!outOfStock ? (
            <button
              className="snipcart-add-item flex-1 px-4 py-2 bg-soft-terracotta text-white font-medium rounded-full hover:bg-deep-sage transition-all duration-300"
              data-item-id={product.id}
              data-item-price={price}
              data-item-url={`/products/${product['Slug'] || product.id}`}
              data-item-description={product['Short Description']}
              data-item-image={mainImage}
              data-item-name={product['Product Name']}
              data-item-custom1-name="SKU"
              data-item-custom1-value={product['SKU']}
              disabled={outOfStock}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="flex-1 px-4 py-2 rounded-full font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
              disabled
            >
              Out of Stock
            </button>
          )}
          <button
            className="flex-1 px-4 py-2 bg-sage text-white font-medium rounded-full hover:bg-deep-sage transition-all duration-300"
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 