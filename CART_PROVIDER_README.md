# Modular Cart Provider Architecture

## Overview
This project uses a modular cart provider system to abstract all e-commerce cart logic behind a unified React context and hook interface. This allows you to swap out the underlying cart provider (Snipcart, Stripe, Square, custom backend, etc.) with minimal changes to your UI and business logic.

---

## Cart Provider Interface

The `CartProvider` and `useCart()` hook expose the following interface:

```ts
interface CartContextType {
  addItem: (product: CartItem, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  getCartContents: () => CartItem[];
  cart: CartItem[];
}
```

All cart actions and state are routed through this interface, not the underlying provider directly.

---

## How to Swap Cart Providers

1. **Implement a New Provider**
   - Create a new hook (e.g., `useStripeCartProvider`, `useCustomCartProvider`) that implements the `CartContextType` interface.
   - Use the relevant API (Stripe, custom backend, etc.) for all cart actions.

2. **Update the Main Provider**
   - In `CartContext.tsx`, swap the call to `useSnipcartProvider()` with your new provider hook.
   - Example:
     ```ts
     // Swap this to use a different provider in the future
     // const cart = useSnipcartProvider();
     const cart = useStripeCartProvider();
     ```

3. **Test the UI**
   - The rest of your app (cart page, header, product list, etc.) will continue to work without changes, as they only use the `useCart()` interface.

---

## Best Practices
- **Never call provider APIs directly in UI components.** Always use the `useCart()` hook.
- **Keep provider logic isolated** in its own hook for easy swapping and testing.
- **Document any provider-specific features** or limitations in this file.
- **Test all cart flows** (add, remove, update, open/close, navigation, mobile/desktop, accessibility) after swapping providers.

---

## Example: Adding a Stripe Cart Provider

1. Create `useStripeCartProvider` in `CartContext.tsx`:
   ```ts
   function useStripeCartProvider(): CartContextType {
     // Implement all methods using Stripe's API
     // ...
   }
   ```
2. Swap the provider in the main `CartProvider`:
   ```ts
   export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const cart = useStripeCartProvider();
     return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
   };
   ```

---

## Provider-Specific Notes
- **Snipcart:** Uses Snipcart's JS API and events. See `useSnipcartProvider` in `CartContext.tsx`.
- **Stripe/Custom:** Implement your own API calls and state management.

---

## Questions?
Contact the engineering team or check this file for updates when adding or swapping cart providers. 