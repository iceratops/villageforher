import React, { useState, useEffect } from 'react';
import AuthWrapper from '../components/AuthWrapper';
import TallyIntakeGate from '../components/TallyIntakeGate';
import HealingChatWindow from '../components/HealingChatWindow';
import UpgradePrompt from '../components/UpgradePrompt';

// Helper for onboarding state (sessionStorage)
function getOnboardingComplete() {
  try {
    return sessionStorage.getItem('vfh_onboarding_complete') === 'true';
  } catch {
    return false;
  }
}
function setOnboardingComplete() {
  try {
    sessionStorage.setItem('vfh_onboarding_complete', 'true');
  } catch {}
}

// Hardcoded premium flag for now
const isPremium = false;

const Chat: React.FC = () => {
  const [onboardingComplete, setOnboardingCompleteState] = useState(getOnboardingComplete());

  // Handler for Tally completion
  const handleTallyComplete = () => {
    setOnboardingComplete();
    setOnboardingCompleteState(true);
  };

  // Get userId from session (used for chat)
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    try {
      setUserId(sessionStorage.getItem('vfh_userId'));
    } catch {}
  }, []);

  return (
    <AuthWrapper>
      {!onboardingComplete && <TallyIntakeGate onComplete={handleTallyComplete} />}
      {onboardingComplete && (
        <>
          {!isPremium && <UpgradePrompt />}
          <HealingChatWindow userId={userId} isPremium={isPremium} />
        </>
      )}
    </AuthWrapper>
  );
};

export default Chat; 