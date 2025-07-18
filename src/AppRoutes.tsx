import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { closeCart } from './components/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import PaymentPortal from './pages/PaymentPortal';
import Contact from './pages/Contact';
import Chat from './pages/Chat';
import FloatingChatWidget from './components/FloatingChatWidget';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ScrollToTop from './components/ScrollToTop';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname !== '/cart') {
      // Use MutationObserver to forcibly close the cart if it appears
      let observer: MutationObserver | null = null;
      const tryClose = () => {
        if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.theme && typeof window.Snipcart.api.theme.cart.close === 'function') {
          window.Snipcart.api.theme.cart.close();
        }
        // Also forcibly hide the cart DOM if needed
        const cartEl = document.querySelector('.snipcart-cart--opened, .snipcart-cart__side--opened, .snipcart-cart__main--opened');
        if (cartEl) {
          (cartEl as HTMLElement).style.display = 'none';
        }
      };
      // Try immediately
      tryClose();
      // Observe DOM for cart opening
      observer = new MutationObserver(() => tryClose());
      observer.observe(document.body, { childList: true, subtree: true });
      // Clean up
      return () => { if (observer) observer.disconnect(); };
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-warm-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/payment" element={<PaymentPortal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingChatWidget />
      </div>
    </>
  );
};

export default AppRoutes; 