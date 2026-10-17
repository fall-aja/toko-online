import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import OrderHistory from './components/OrderHistory';
import AuthModal from './components/AuthModal';
import FlowchartModal from './components/FlowchartModal';
import { Loader2, AlertCircle, ShoppingBag, Database, GitFork } from 'lucide-react';

export default function MainApp() {
    // State management
    const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'orders'
    const [currentUser, setCurrentUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Cart State with localStorage persistence
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('toko_online_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Modals
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [latestTransaction, setLatestTransaction] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isFlowchartOpen, setIsFlowchartOpen] = useState(false);

    // Loading & Network States
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Save cart to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('toko_online_cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Failed to save cart:', e);
        }
    }, [cartItems]);

    // Initial Fetch from Laravel API
    const fetchInitialData = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const response = await axios.get('/api/init');
            if (response.data && response.data.success) {
                setCurrentUser(response.data.user);
                setCategories(response.data.categories || []);
                setProducts(response.data.products || []);
                setTransactions(response.data.transactions || []);
            }
        } catch (err) {
            console.error('Error fetching initial data:', err);
            setErrorMessage('Gagal memuat data dari database MySQL toko_online. Pastikan server web berjalan.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    // Cart actions
    const handleAddToCart = (product, qty = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id_produk === product.id_produk);
            if (existing) {
                const newQty = Math.min(product.stok, existing.qty + qty);
                return prev.map(item => 
                    item.id_produk === product.id_produk ? { ...item, qty: newQty } : item
                );
            } else {
                return [...prev, { ...product, qty: Math.min(product.stok, qty) }];
            }
        });
    };

    const handleUpdateCartQty = (productId, newQty) => {
        if (newQty <= 0) {
            handleRemoveCartItem(productId);
            return;
        }
        setCartItems(prev => prev.map(item => {
            if (item.id_produk === productId) {
                return { ...item, qty: Math.min(item.stok, newQty) };
            }
            return item;
        }));
    };

    const handleRemoveCartItem = (productId) => {
        setCartItems(prev => prev.filter(item => item.id_produk !== productId));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    // Checkout Flow
    const handleProceedCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleConfirmCheckout = async (payload) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/checkout', payload);
            if (response.data && response.data.success) {
                // Clear cart
                setCartItems([]);
                setIsCheckoutOpen(false);
                setLatestTransaction(response.data.transaksi);
                setIsSuccessOpen(true);

                // Update products & transactions
                if (response.data.products) {
                    setProducts(response.data.products);
                }
                setTransactions(prev => [response.data.transaksi, ...prev]);

                return { success: true };
            } else {
                return { 
                    success: false, 
                    message: response.data.message || 'Pembayaran gagal.' 
                };
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Gagal memproses pesanan.';
            return { success: false, message: msg };
        } finally {
            setIsSubmitting(false);
        }
    };

    // User authentication
    const handleLogin = async (identifier, password) => {
        const response = await axios.post('/api/login', { identifier, password });
        if (response.data && response.data.success) {
            setCurrentUser(response.data.user);
            // Refresh transactions for this user
            const trxRes = await axios.get(`/api/transaksi?user_id=${response.data.user.id_user}`);
            if (trxRes.data && trxRes.data.success) {
                setTransactions(trxRes.data.transactions);
            }
            return response.data;
        }
        return response.data;
    };

    const handleRegister = async (payload) => {
        const response = await axios.post('/api/register', payload);
        if (response.data && response.data.success) {
            setCurrentUser(response.data.user);
            setTransactions([]);
            return response.data;
        }
        return response.data;
    };

    const handleSwitchUser = async (userId) => {
        const response = await axios.post('/api/switch-user', { user_id: userId });
        if (response.data && response.data.success) {
            setCurrentUser(response.data.user);
            const trxRes = await axios.get(`/api/transaksi?user_id=${userId}`);
            if (trxRes.data && trxRes.data.success) {
                setTransactions(trxRes.data.transactions);
            }
        }
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            {/* Top Navigation */}
            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                cartCount={cartCount}
                setIsCartOpen={setIsCartOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentUser={currentUser}
                setIsAuthOpen={setIsAuthOpen}
                isFlowchartOpen={isFlowchartOpen}
                setIsFlowchartOpen={setIsFlowchartOpen}
            />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12">
                {isLoading ? (
                    <div className="h-96 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
                        <p className="text-xs font-semibold text-slate-600">
                            Memuat data katalog & pengguna dari database...
                        </p>
                    </div>
                ) : errorMessage ? (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-md mx-auto my-12">
                        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
                        <h3 className="text-sm font-bold text-rose-900 mb-1">Koneksi Database Bermasalah</h3>
                        <p className="text-xs text-rose-700 mb-4">{errorMessage}</p>
                        <button
                            onClick={fetchInitialData}
                            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
                        >
                            Coba Hubungkan Ulang
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'catalog' ? (
                            <ProductCatalog
                                products={products}
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                onAddToCart={handleAddToCart}
                                onOpenProductDetail={(prod) => setSelectedProduct(prod)}
                                searchQuery={searchQuery}
                                currentUser={currentUser}
                            />
                        ) : (
                            <OrderHistory
                                transactions={transactions}
                                onStartShopping={() => setActiveTab('catalog')}
                                currentUser={currentUser}
                            />
                        )}
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-editorial text-lg font-bold italic text-stone-900">RupaKala</span>
                        <span>&bull;</span>
                        <span>Kurasi & Galeri Peserta</span>
                        <span>&bull;</span>
                        <span className="text-stone-500 font-mono text-[11px]">MySQL: toko_online</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                        <span>Laravel 11 + React 18</span>
                        <span>&bull;</span>
                        <button 
                            onClick={() => setIsFlowchartOpen(true)}
                            className="text-emerald-600 hover:text-emerald-800 font-semibold"
                        >
                            Lihat Panduan Flowchart
                        </button>
                    </div>
                </div>
            </footer>

            {/* Modals & Drawers */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
            />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQty={handleUpdateCartQty}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onProceedCheckout={handleProceedCheckout}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cartItems={cartItems}
                currentUser={currentUser}
                onConfirmCheckout={handleConfirmCheckout}
                isSubmitting={isSubmitting}
            />

            <OrderSuccessModal
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                transaction={latestTransaction}
                onViewOrders={() => {
                    setIsSuccessOpen(false);
                    setActiveTab('orders');
                }}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                currentUser={currentUser}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onSwitchUser={handleSwitchUser}
            />

            <FlowchartModal
                isOpen={isFlowchartOpen}
                onClose={() => setIsFlowchartOpen(false)}
            />
        </div>
    );
}
