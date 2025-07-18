import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function getSessionUserId(): string | null {
  try {
    return sessionStorage.getItem('vfh_userId');
  } catch {
    return (window as any)._vfh_userId || null;
  }
}

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = getSessionUserId();

  useEffect(() => {
    if (!userId) {
      sessionStorage.setItem('vfh_auth_redirect', location.pathname + location.search);
      navigate('/auth', { replace: true });
    }
  }, [userId, location, navigate]);

  if (!userId) return null;
  return <>{children}</>;
};

export default AuthWrapper; 