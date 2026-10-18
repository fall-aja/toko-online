import React, { useState, useRef, useEffect } from 'react';
import { 
    Search, 
    Heart, 
    User as UserIcon, 
    ShoppingBag, 
    ChevronDown, 
    X, 
    Menu, 
    Package, 
    GitFork, 
    LogOut, 
    Sparkles,
    UserCheck,
    Layers,
    ArrowRight
} from 'lucide-react';
import { getInitials } from '../utils';

export default function Navbar({
    activeTab,
    setActiveTab,
    cartCount = 0,
    setIsCartOpen,
    searchQuery = '',
    setSearchQuery,
    currentUser,
    onLogout,
    setIsAuthOpen,
    setAuthInitialMode,
    isFlowchartOpen,
    setIsFlowchartOpen,
    categories = [],
    selectedCategory,
    setSelectedCategory,
    onNavigate,
    activeNavLink = 'home',
    setActiveNavLink,
    onOpenAbout,
    onOpenContact,
    onOpenWishlist,
    wishlistCount = 0,
    onSwitchUser
}) {
    // Dropdown and popup states
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categoriesRef = useRef(null);
    const userMenuRef = useRef(null);
    const searchInputRef = useRef(null);

    // Auto-focus search input when opened
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                setIsCategoriesOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers for navigation links
    const handleNavClick = (linkKey) => {
        if (setActiveNavLink) setActiveNavLink(linkKey);
        setIsCategoriesOpen(false);
        setIsMobileMenuOpen(false);

        if (linkKey === 'home') {
            setActiveTab('catalog');
            if (setSelectedCategory) setSelectedCategory(null);
            if (setSearchQuery) setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (linkKey === 'shop') {
            setActiveTab('catalog');
            if (setSelectedCategory) setSelectedCategory(null);
            const catalogEl = document.getElementById('catalog-section');
            if (catalogEl) {
                catalogEl.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 350, behavior: 'smooth' });
            }
        } else if (linkKey === 'new_arrivals') {
            setActiveTab('catalog');
            if (setSelectedCategory) setSelectedCategory(null);
            if (onNavigate) onNavigate('new_arrivals');
        } else if (linkKey === 'best_sellers') {
            setActiveTab('catalog');
            if (onNavigate) onNavigate('best_sellers');
        } else if (linkKey === 'about') {
            if (onOpenAbout) onOpenAbout();
        } else if (linkKey === 'contact') {
            if (onOpenContact) onOpenContact();
        }
    };

    const handleSelectCategory = (catId) => {
        setActiveTab('catalog');
        if (setSelectedCategory) setSelectedCategory(catId);
        if (setActiveNavLink) setActiveNavLink('categories');
        setIsCategoriesOpen(false);
        setIsMobileMenuOpen(false);
        const catalogEl = document.getElementById('catalog-section');
        if (catalogEl) {
            catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProfileClick = () => {
        if (!currentUser) {
            // User belum login: langsung buka modal login
            if (setAuthInitialMode) setAuthInitialMode('login');
            setIsAuthOpen(true);
        } else {
            // User sudah login: toggle dropdown menu pengguna
            setIsUserMenuOpen(!isUserMenuOpen);
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
                    
                    {/* 1. BRAND LOGO: RupaKala (Cetak miring / italic, no subtitle underneath) */}
                    <div className="flex items-center shrink-0">
                        <button
                            onClick={() => handleNavClick('home')}
                            className="flex items-center group text-left focus:outline-none"
                            title="RupaKala Beranda"
                        >
                            <span className="text-2xl sm:text-[26px] font-bold italic tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
                                RupaKala
                            </span>
                        </button>
                    </div>

                    {/* 2. CENTER NAVIGATION LINKS (Exact Order Requested) */}
                    {/* Order: Home -> Categories (with dropdown) -> New Arrivals -> Shop -> Best Sellers -> About -> Contact */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        
                        {/* 1. Home */}
                        <button
                            onClick={() => handleNavClick('home')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'home'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            Home
                            {activeNavLink === 'home' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 2. Categories (with dropdown, placed right beside Home) */}
                        <div className="relative" ref={categoriesRef}>
                            <button
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                onMouseEnter={() => setIsCategoriesOpen(true)}
                                className={`text-sm tracking-normal inline-flex items-center gap-1 py-1 focus:outline-none transition-colors ${
                                    activeNavLink === 'categories' || isCategoriesOpen
                                        ? 'text-stone-950 font-semibold'
                                        : 'text-stone-600 hover:text-stone-950 font-medium'
                                }`}
                            >
                                <span>Categories</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-stone-500 ${
                                    isCategoriesOpen ? 'rotate-180 text-stone-900' : ''
                                }`} />
                                {activeNavLink === 'categories' && (
                                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {isCategoriesOpen && (
                                <div 
                                    onMouseLeave={() => setIsCategoriesOpen(false)}
                                    className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                                >
                                    <div className="px-4 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                                        <span>Katalog Kategori</span>
                                        <Layers className="w-3 h-3 text-stone-400" />
                                    </div>

                                    <button
                                        onClick={() => handleSelectCategory(null)}
                                        className={`w-full px-4 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                                            selectedCategory === null 
                                                ? 'bg-stone-50 text-stone-950' 
                                                : 'text-stone-700 hover:bg-stone-50 hover:text-stone-950'
                                        }`}
                                    >
                                        <span>Semua Produk</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono">
                                            Semua
                                        </span>
                                    </button>

                                    {categories.map((cat) => {
                                        const isSelected = selectedCategory === cat.id_kategori;
                                        return (
                                            <button
                                                key={cat.id_kategori}
                                                onClick={() => handleSelectCategory(cat.id_kategori)}
                                                className={`w-full px-4 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                                                    isSelected 
                                                        ? 'bg-stone-50 text-stone-950 font-bold' 
                                                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-950 font-medium'
                                                }`}
                                            >
                                                <span className="truncate">{cat.nama_kategori}</span>
                                                {cat.produk_count !== undefined && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 font-mono">
                                                        {cat.produk_count}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 3. New Arrivals */}
                        <button
                            onClick={() => handleNavClick('new_arrivals')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'new_arrivals'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            New Arrivals
                            {activeNavLink === 'new_arrivals' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 4. Shop (placed right beside New Arrivals on the right) */}
                        <button
                            onClick={() => handleNavClick('shop')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'shop'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            Shop
                            {activeNavLink === 'shop' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 5. Best Sellers */}
                        <button
                            onClick={() => handleNavClick('best_sellers')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'best_sellers'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            Best Sellers
                            {activeNavLink === 'best_sellers' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 6. About */}
                        <button
                            onClick={() => handleNavClick('about')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'about'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            About
                            {activeNavLink === 'about' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 7. Contact (Blog is omitted as requested) */}
                        <button
                            onClick={() => handleNavClick('contact')}
                            className={`text-sm tracking-normal transition-colors relative py-1 focus:outline-none ${
                                activeNavLink === 'contact'
                                    ? 'text-stone-950 font-semibold'
                                    : 'text-stone-600 hover:text-stone-950 font-medium'
                            }`}
                        >
                            Contact
                            {activeNavLink === 'contact' && (
                                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                    </nav>

                    {/* 3. RIGHT ACTION ICONS: Search | Wishlist | Profile | Cart */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        
                        {/* 1. Search Icon */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`p-2 rounded-full transition-colors focus:outline-none ${
                                    isSearchOpen || searchQuery 
                                        ? 'text-stone-950 bg-stone-100' 
                                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
                                }`}
                                title="Cari Produk"
                            >
                                <Search className="w-5 h-5 stroke-[1.75]" />
                            </button>

                            {/* Expandable Search Popup */}
                            {isSearchOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Cari kurasi produk..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                                        <span>Tekan ketik untuk filter instan</span>
                                        <button
                                            onClick={() => setIsSearchOpen(false)}
                                            className="text-stone-600 hover:text-stone-900 font-medium"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. Wishlist Icon */}
                        <button
                            onClick={onOpenWishlist}
                            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-50 rounded-full transition-colors focus:outline-none"
                            title="Daftar Keinginan (Wishlist)"
                        >
                            <Heart className="w-5 h-5 stroke-[1.75]" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#d9534f] rounded-full" />
                            )}
                        </button>

                        {/* 3. Profile: Icon saat belum login, Inisial nama lengkap saat sudah login */}
                        <div className="relative" ref={userMenuRef}>
                            {!currentUser ? (
                                /* KONDISI 1: Belum login -> Tampilan ICON SAJA */
                                <button
                                    onClick={handleProfileClick}
                                    className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-50 rounded-full transition-colors focus:outline-none"
                                    title="Masuk / Akun Pengguna"
                                >
                                    <UserIcon className="w-5 h-5 stroke-[1.75]" />
                                </button>
                            ) : (
                                /* KONDISI 2: Sudah login -> Tampilan INISIAL NAMA LENGKAP */
                                <button
                                    onClick={handleProfileClick}
                                    className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center font-bold text-xs uppercase tracking-wider shadow-xs hover:ring-2 hover:ring-stone-400 transition-all focus:outline-none"
                                    title={`Akun: ${currentUser.nama_lengkap}`}
                                >
                                    {getInitials(currentUser.nama_lengkap)}
                                </button>
                            )}

                            {/* Dropdown Menu Pengguna (Muncul saat user klik profil) */}
                            {currentUser && isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* User Info Header */}
                                    <div className="px-4 py-2.5 border-b border-stone-100 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center uppercase shrink-0">
                                            {getInitials(currentUser.nama_lengkap)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-stone-900 truncate">
                                                {currentUser.nama_lengkap}
                                            </p>
                                            <p className="text-[11px] text-stone-400 truncate">
                                                @{currentUser.username || currentUser.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                if (setAuthInitialMode) setAuthInitialMode('profile');
                                                setIsAuthOpen(true);
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2.5 transition-colors"
                                        >
                                            <UserIcon className="w-3.5 h-3.5 text-stone-500" />
                                            <span>Profil & Data Akun</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                setActiveTab('orders');
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2.5 transition-colors"
                                        >
                                            <Package className="w-3.5 h-3.5 text-stone-500" />
                                            <span>Riwayat Pesanan</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                setIsFlowchartOpen(!isFlowchartOpen);
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2.5 transition-colors"
                                        >
                                            <GitFork className="w-3.5 h-3.5 text-stone-500" />
                                            <span>Panduan Flowchart</span>
                                        </button>
                                    </div>

                                    {/* Demo Switcher Quick Action */}
                                    {onSwitchUser && (
                                        <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/60">
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                                                Ganti Akun Demo
                                            </span>
                                            <div className="flex gap-1.5">
                                                <button
                                                    onClick={() => {
                                                        onSwitchUser(1);
                                                        setIsUserMenuOpen(false);
                                                    }}
                                                    className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-semibold border transition-colors ${
                                                        currentUser?.id_user === 1
                                                            ? 'bg-stone-900 text-white border-stone-900'
                                                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                                                    }`}
                                                >
                                                    Budi (ID 1)
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onSwitchUser(2);
                                                        setIsUserMenuOpen(false);
                                                    }}
                                                    className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-semibold border transition-colors ${
                                                        currentUser?.id_user === 2
                                                            ? 'bg-stone-900 text-white border-stone-900'
                                                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                                                    }`}
                                                >
                                                    Siti (ID 2)
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Logout Button */}
                                    <div className="pt-1 border-t border-stone-100">
                                        <button
                                            onClick={async () => {
                                                setIsUserMenuOpen(false);
                                                if (onLogout) await onLogout();
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors font-medium"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Keluar (Logout)</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 4. Cart Icon (with orange/terracotta badge matching screenshot) */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-50 rounded-full transition-colors focus:outline-none"
                            title="Keranjang Belanja"
                        >
                            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#d9534f] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-50 rounded-full focus:outline-none"
                            title="Menu Navigasi"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Slide-down Nav Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
                    <button
                        onClick={() => handleNavClick('home')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'home' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>Home</span>
                        {activeNavLink === 'home' && <span className="w-2 h-2 rounded-full bg-[#d9534f]" />}
                    </button>

                    <div className="py-1">
                        <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Categories
                        </div>
                        <div className="pl-2 space-y-1">
                            <button
                                onClick={() => handleSelectCategory(null)}
                                className={`w-full py-1 text-left text-xs ${
                                    selectedCategory === null ? 'font-bold text-stone-950' : 'text-stone-600'
                                }`}
                            >
                                Semua Produk
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id_kategori}
                                    onClick={() => handleSelectCategory(cat.id_kategori)}
                                    className={`w-full py-1 text-left text-xs flex items-center justify-between ${
                                        selectedCategory === cat.id_kategori ? 'font-bold text-stone-950' : 'text-stone-600'
                                    }`}
                                >
                                    <span>{cat.nama_kategori}</span>
                                    <span className="text-[10px] text-stone-400">{cat.produk_count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleNavClick('new_arrivals')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'new_arrivals' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>New Arrivals</span>
                        {activeNavLink === 'new_arrivals' && <span className="w-2 h-2 rounded-full bg-[#d9534f]" />}
                    </button>

                    <button
                        onClick={() => handleNavClick('shop')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'shop' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>Shop</span>
                        {activeNavLink === 'shop' && <span className="w-2 h-2 rounded-full bg-[#d9534f]" />}
                    </button>

                    <button
                        onClick={() => handleNavClick('best_sellers')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'best_sellers' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>Best Sellers</span>
                        {activeNavLink === 'best_sellers' && <span className="w-2 h-2 rounded-full bg-[#d9534f]" />}
                    </button>

                    <button
                        onClick={() => handleNavClick('about')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'about' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>About</span>
                    </button>

                    <button
                        onClick={() => handleNavClick('contact')}
                        className={`w-full py-2 text-left text-sm font-medium flex items-center justify-between ${
                            activeNavLink === 'contact' ? 'text-stone-950 font-bold' : 'text-stone-600'
                        }`}
                    >
                        <span>Contact</span>
                    </button>

                    {/* Flowchart Modal Button on Mobile */}
                    <div className="pt-2 border-t border-stone-100">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsFlowchartOpen(!isFlowchartOpen);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <GitFork className="w-4 h-4 text-stone-600" />
                                Panduan Alur Flowchart
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
