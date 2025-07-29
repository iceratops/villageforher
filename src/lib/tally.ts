export const DEFAULT_TALLY_URL = 'https://tally.so/r/PLACEHOLDER';

export function addTallyEmbedScript() {
  const w = 'https://tally.so/widgets/embed.js';
  const v = function() {
    if (typeof window.Tally !== 'undefined') {
      window.Tally.loadEmbeds();
    } else {
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((e) => {
        const iframe = e as HTMLIFrameElement;
        if (iframe.dataset && iframe.dataset.tallySrc) {
          iframe.src = iframe.dataset.tallySrc;
        }
      });
    }
  };
  if (typeof window.Tally !== 'undefined') {
    v();
  } else if (!document.querySelector(`script[src="${w}"]`)) {
    const s = document.createElement('script');
    s.src = w;
    s.onload = v;
    s.onerror = v;
    document.body.appendChild(s);
  }
}

export function listenForTallySubmission(onComplete: () => void) {
  function handleMessage(event: MessageEvent) {
    if (event.data === 'tally-form-submitted') {
      onComplete();
    }
  }
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
} 