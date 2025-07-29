import { useEffect, useState } from 'react';
import { fetchProductByIdOrSlug, Product } from '../lib/products';

export function useProductDetail(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('No product ID provided.');
      setLoading(false);
      return;
    }
    fetchProductByIdOrSlug(productId)
      .then((found) => {
        if (!found) {
          setError('Product not found.');
        } else {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found.');
        setLoading(false);
      });
  }, [productId]);

  return { product, loading, error };
} 