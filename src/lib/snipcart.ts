// Snipcart dynamic loader and utilities

let snipcartLoaded = false;
let snipcartLoadingPromise: Promise<void> | null = null;

export function loadSnipcart(): Promise<void> {
  if (snipcartLoaded) return Promise.resolve();
  if (snipcartLoadingPromise) return snipcartLoadingPromise;
  snipcartLoadingPromise = new Promise((resolve) => {
    if (window.Snipcart) {
      snipcartLoaded = true;
      resolve();
      return;
    }
    const check = () => {
      if (window.Snipcart) {
        snipcartLoaded = true;
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
  return snipcartLoadingPromise;
}

export function openCart() {
  loadSnipcart().then(() => {
    if (
      window.Snipcart &&
      window.Snipcart.api &&
      window.Snipcart.api.theme &&
      typeof window.Snipcart.api.theme.cart.open === 'function'
    ) {
      window.Snipcart.api.theme.cart.open();
    }
  });
}

export function closeCart() {
  loadSnipcart().then(() => {
    if (
      window.Snipcart &&
      window.Snipcart.api &&
      window.Snipcart.api.theme &&
      typeof window.Snipcart.api.theme.cart.close === 'function'
    ) {
      window.Snipcart.api.theme.cart.close();
    }
  });
}

export function preventCartAutoOpen() {
  document.addEventListener('snipcart.added', (e) => {
    if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.theme) {
      window.Snipcart.api.theme.cart.close();
    }
  });
}

export function forceCloseCart() {
  if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.theme && typeof window.Snipcart.api.theme.cart.close === 'function') {
    window.Snipcart.api.theme.cart.close();
  }
} 