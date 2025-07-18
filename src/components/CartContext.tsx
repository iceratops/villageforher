// TypeScript declaration for Snipcart on window
declare global {
  interface Window {
    Snipcart: any;
  }
}

// Snipcart cart open/close utilities for direct integration

export function openCart() {
  if (
    window.Snipcart &&
    window.Snipcart.api &&
    window.Snipcart.api.theme &&
    typeof window.Snipcart.api.theme.cart.open === 'function'
  ) {
    window.Snipcart.api.theme.cart.open();
  }
}

export function closeCart() {
  if (
    window.Snipcart &&
    window.Snipcart.api &&
    window.Snipcart.api.theme &&
    typeof window.Snipcart.api.theme.cart.close === 'function'
  ) {
    window.Snipcart.api.theme.cart.close();
  }
} 