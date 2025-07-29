import { useEffect } from 'react';
import { addTallyEmbedScript } from '../lib/tally';

export function useTallyEmbed() {
  useEffect(() => {
    addTallyEmbedScript();
  }, []);
} 