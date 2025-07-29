import { useState } from 'react';
import { getOnboardingComplete, setOnboardingComplete } from '../lib/chat';

export function useOnboarding() {
  const [onboardingComplete, setOnboardingCompleteState] = useState(getOnboardingComplete());

  const completeOnboarding = () => {
    setOnboardingComplete();
    setOnboardingCompleteState(true);
  };

  return { onboardingComplete, completeOnboarding };
} 