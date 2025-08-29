import { useState, useEffect } from 'react';
import { getUserOrders, SnipcartOrder } from '../lib/snipcart';

export function useOrders() {
  const [orders, setOrders] = useState<SnipcartOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
} 