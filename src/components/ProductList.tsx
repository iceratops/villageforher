import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { AirtableService } from '../services/airtableService';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AirtableService.fetchProducts()
      .then((data) => {
        setProducts(data.filter((p: any) => p['Visible on Site']));
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-16 text-gray-500">Loading products…</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (products.length === 0) return <div className="text-center py-16 text-gray-400">No products available yet. Please check back soon!</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={() => navigate(`/products/${product['Slug'] || product.id}`)}
        />
      ))}
    </div>
  );
};

export default ProductList; 