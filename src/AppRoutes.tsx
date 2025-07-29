import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { preventCartAutoOpen, forceCloseCart } from './lib/snipcart';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Chat from './pages/Chat';
import FloatingChatWidget from './components/FloatingChatWidget';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ScrollToTop from './components/ScrollToTop';
import CartDebug from './components/CartDebug';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    preventCartAutoOpen();
  }, []);

  useEffect(() => {
    forceCloseCart();
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingChatWidget />
        <CartDebug />
      </div>
    </>
  );
};

export default AppRoutes; 