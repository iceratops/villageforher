import React from 'react';
import AuthWrapper from '../components/AuthWrapper';
import TallyIntakeGate from '../components/TallyIntakeGate';
import HealingChatWindow from '../components/HealingChatWindow';
import UpgradePrompt from '../components/UpgradePrompt';
import { useOnboarding } from '../hooks/useOnboarding';
import { useUserId } from '../hooks/useUserId';

const isPremium = false;

const Chat: React.FC = () => {
  const { onboardingComplete, completeOnboarding } = useOnboarding();
  const userId = useUserId();

  return (
    <AuthWrapper>
      {!onboardingComplete && <TallyIntakeGate onComplete={completeOnboarding} />}
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