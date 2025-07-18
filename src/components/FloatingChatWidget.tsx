import React, { useState, useEffect, useRef } from 'react';
import HealingChatWindow from './HealingChatWindow';
import UpgradePrompt from './UpgradePrompt';
import { useLocation, useNavigate } from 'react-router-dom';

// Helper for onboarding state (sessionStorage)
function getOnboardingComplete() {
  try {
    return sessionStorage.getItem('vfh_onboarding_complete') === 'true';
  } catch {
    return false;
  }
}
function getUserId() {
  try {
    return sessionStorage.getItem('vfh_userId');
  } catch {
    return null;
  }
}

// Hardcoded premium flag for now
const isPremium = false;

const FloatingChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(getOnboardingComplete());
  const [userId, setUserId] = useState<string | null>(getUserId());
  const location = useLocation();
  const navigate = useNavigate();
  const userClickedRef = useRef(false);

  useEffect(() => {
    try {
      setUserId(getUserId());
    } catch {}
  }, []);

  // Listen for onboarding completion and auth in sessionStorage (in case it changes elsewhere)
  useEffect(() => {
    const interval = setInterval(() => {
      setOnboardingComplete(getOnboardingComplete());
      setUserId(getUserId());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open && !userId && userClickedRef.current) {
      sessionStorage.setItem('vfh_auth_redirect', location.pathname + location.search);
      navigate('/auth', { replace: true });
      userClickedRef.current = false;
    }
  }, [open, userId, location, navigate]);

  // Animate modal open/close
  useEffect(() => {
    if (open) {
      setShowModal(true);
    } else {
      // Wait for animation before removing from DOM
      const timeout = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!onboardingComplete) return null;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-300"
          onClick={() => {
            userClickedRef.current = true;
            setOpen(true);
          }}
          aria-label="Open Healing Chat"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="white"/><path d="M8 12h8M12 8v8" stroke="#db2777" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      )}
      {/* Modal chat with animation */}
      {showModal && userId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
          <div
            className={`bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-md mx-auto p-0 flex flex-col relative 
              ${open ? 'animate-vfh-pop-in' : 'animate-vfh-pop-out'}
            `}
            style={{
              animationDuration: '300ms',
              background: 'linear-gradient(135deg, #fdf6f9 0%, #f0f7fa 100%)',
              boxShadow: '0 8px 32px 0 rgba(236, 72, 153, 0.15)',
            }}
          >
            <div className="relative pt-10 sm:pt-8">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none z-20 bg-white/80 rounded-full px-2 py-0.5 shadow"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{ zIndex: 20 }}
              >
                ×
              </button>
              <div className="p-2 sm:p-4">
                {!isPremium && <UpgradePrompt />}
                <HealingChatWindow userId={userId} isPremium={isPremium} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Tailwind custom keyframes for pop-in/pop-out */}
      <style>{`
        @keyframes vfh-pop-in {
          0% { opacity: 0; transform: scale(0.92) translateY(40px); }
          80% { opacity: 1; transform: scale(1.03) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes vfh-pop-out {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.92) translateY(40px); }
        }
        .animate-vfh-pop-in {
          animation: vfh-pop-in 300ms cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-vfh-pop-out {
          animation: vfh-pop-out 300ms cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </>
  );
};

export default FloatingChatWidget; 