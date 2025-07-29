// TypeScript declaration for Snipcart on window
declare global {
  interface Window {
    Snipcart: any;
    SnipcartSettings: any;
  }
}

export { openCart, closeCart } from '../lib/snipcart';