import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading, error } = useProductDetail(productId);
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-16 text-gray-500">Loading product</div>;
  if (error || !product) return <div className="text-center py-16 text-red-500">{error || 'Product not found.'}</div>;

  const mainImage = product['Main Image']?.[0]?.url || '';
  const gallery = product['Gallery Images'] || [];
  const price = product['Sale Price'] || product['Price'];
  const originalPrice = product['Sale Price'] ? product['Price'] : null;
  const outOfStock = (product['Stock Count'] ?? 0) === 0;
  const lowStock = !!product['Low Stock Alert'] && !outOfStock;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button className="mb-6 text-soft-terracotta hover:underline" onClick={() => navigate(-1)}>&larr; Back to Products</button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {mainImage && (
            <img src={mainImage} alt={product['Product Name']} className="w-full h-96 object-cover rounded-xl shadow" />
          )}
          {gallery.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {gallery.map((img: any, i: number) => (
                <img key={i} src={img.url} alt={product['Product Name']} className="w-24 h-24 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product['Product Name']}</h1>
          <p className="text-gray-600 mb-4">{product['Description']}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${originalPrice}</span>
            )}
          </div>
          <div className="mb-4">
            {lowStock && (
              <div className="mb-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-center">
                Low inventory buy now before it's gone!
              </div>
            )}
          </div>
          <button
            className={`snipcart-add-item px-6 py-3 rounded-full font-semibold w-full mt-auto transition-all duration-300 ${outOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-soft-terracotta text-white hover:bg-deep-sage'}`}
            data-item-id={product.id}
            data-item-price={price}
            data-item-url={`/products/${product['Slug'] || product.id}`}
            data-item-description={product['Short Description']}
            data-item-image={mainImage}
            data-item-name={product['Product Name']}
            data-item-min-quantity="1"
            data-item-stackable="true"
            disabled={outOfStock}
          >
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 