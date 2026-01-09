
import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserContextType, Product, CartItem } from './types';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import SalePage from './pages/SalePage';
import VouchersPage from './pages/VouchersPage';
import AccessoriesPage from './pages/AccessoriesPage';
import DenimsPage from './pages/DenimsPage';
import PolosPage from './pages/PolosPage';
import BagsPage from './pages/BagsPage';
import ShoesPage from './pages/ShoesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ContactPage from './pages/ContactPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SizeGuidePage from './pages/SizeGuidePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WishlistPage from './pages/WishlistPage';
import StyleAssistant from './components/StyleAssistant';

export const CartContext = createContext<UserContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('elysian_cart');
    const savedWishlist = localStorage.getItem('elysian_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('elysian_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('elysian_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isItemInWishlist = prev.some(item => item.id === product.id);
      if (isItemInWishlist) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <AuthProvider>
      <CartContext.Provider value={{ 
        cart, 
        wishlist, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        toggleWishlist, 
        isInWishlist,
        totalItems, 
        totalPrice 
      }}>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/vouchers" element={<VouchersPage />} />
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/denims" element={<DenimsPage />} />
                <Route path="/polos" element={<PolosPage />} />
                <Route path="/bags" element={<BagsPage />} />
                <Route path="/shoes" element={<ShoesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
                <Route path="/order-tracking" element={<OrderTrackingPage />} />
                <Route path="/size-guide" element={<SizeGuidePage />} />
              </Routes>
            </main>
            <Footer />
            <StyleAssistant />
          </div>
        </HashRouter>
      </CartContext.Provider>
    </AuthProvider>
  );
};

export default App;
