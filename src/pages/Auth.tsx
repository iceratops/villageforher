import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../config/google';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function setSessionUserId(userId: string) {
  try {
    sessionStorage.setItem('vfh_userId', userId);
  } catch {
    (window as any)._vfh_userId = userId;
  }
}

function clearSessionUserId() {
  try {
    sessionStorage.removeItem('vfh_userId');
  } catch {
    (window as any)._vfh_userId = undefined;
  }
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // On mount, check if already logged in and redirect if so
  useEffect(() => {
    const id = sessionStorage.getItem('vfh_userId');
    setUserId(id);
    if (id) {
      const redirectTo = sessionStorage.getItem('vfh_auth_redirect') || '/';
      sessionStorage.removeItem('vfh_auth_redirect');
      navigate(redirectTo, { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  // Handle Google login success
  const handleLogin = useCallback((credentialResponse: CredentialResponse) => {
    setLoading(true);
    setError(null);
    if (credentialResponse.credential) {
      const payload = parseJwt(credentialResponse.credential);
      if (payload && payload.sub) {
        setSessionUserId(payload.sub);
        const redirectTo = sessionStorage.getItem('vfh_auth_redirect') || '/';
        sessionStorage.removeItem('vfh_auth_redirect');
        setLoading(false);
        navigate(redirectTo, { replace: true });
      } else {
        setError('Failed to extract user ID from Google response.');
        setLoading(false);
      }
    } else {
      setError('No credential received from Google.');
      setLoading(false);
    }
  }, [navigate]);

  // Handle logout (should only be possible if user is on /auth and logged in)
  const handleLogout = () => {
    clearSessionUserId();
    window.location.reload();
  };

  // While checking auth, show nothing (or a spinner if desired)
  if (checkingAuth) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-semibold mb-4 text-pink-700">Sign in to Village For Her</h2>
          <p className="mb-6 text-gray-600">Sign in with Google to access your account and features.</p>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => setError('Google SSO failed. Please try again.')}
            useOneTap
          />
          {loading && <div className="mt-4 text-blue-500">Signing in...</div>}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {userId && !checkingAuth && (
            <button
              className="mt-6 px-4 py-2 bg-pink-50 text-pink-700 border border-pink-200 rounded-full shadow hover:bg-pink-100 hover:text-pink-900 transition-all text-sm font-medium"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth; 