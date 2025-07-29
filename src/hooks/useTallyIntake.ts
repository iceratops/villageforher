import { useState, useEffect, useCallback } from 'react';
import { listenForTallySubmission } from '../lib/tally';

export function useTallyIntake(onComplete: () => void) {
  const [submitted, setSubmitted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const cleanup = listenForTallySubmission(() => {
      setSubmitted(true);
      onComplete();
    });
    return cleanup;
  }, [onComplete]);

  const simulateSubmit = useCallback(() => {
    setSubmitted(true);
    onComplete();
  }, [onComplete]);

  return { submitted, setSubmitted, loadError, setLoadError, simulateSubmit };
} 