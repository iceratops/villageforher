import { useState, useEffect } from 'react';
import { getUserId } from '../lib/chat';

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(getUserId());

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  return userId;
} 