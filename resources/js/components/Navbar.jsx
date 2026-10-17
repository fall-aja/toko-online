import React from 'react';
import { 
    ShoppingCart, 
    Search, 
    User as UserIcon, 
    Package, 
    Compass, 
    GitFork,
    Sparkles
} from 'lucide-react';

export default function Navbar({ 
    activeTab, 
    setActiveTab, 
    cartCount, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery, 
    currentUser, 
    setIsAuthOpen,
    setIsFlowchartOpen,
    isFlowchartOpen
}) {
    return (
        <header className="sticky top-0 z-30 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-5 sm:py-6 gap-4">
                    
                    {/* Brand Logo - RupaKala Official Image */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button 
                            onClick={() => setActiveTab('catalog')}
                            className="flex items-center gap-3 text-left group focus:outline-none"
                        >
                            <div className="h-12 sm:h-14 rounded-2xl bg-white border border-stone-200/90 shadow-2xs group-hover:shadow-xs overflow-hidden flex items-center p-1 transition-all">
                                <img 
                                    src="/images/logo_rupakala.png" 
                                    alt="Logo RupaKala" 
                                    className="h-full w-auto object-contain group-hover:scale-103 transition-transform"
                                />
                            </div>
                            <div>
                                <span className="font-editorial text-2xl font-bold italic text-stone-900 tracking-tight block leading-tight group-hover:text-stone-700 transition-colors">
                                    RupaKala
                                </span>
                                <span className="text-[10px] tracking-widest uppercase font-mono text-stone-400 block -mt-0.5">
                                    Koleksi &bull; Peserta
                                </span>
                            </div>
                        </button>
                    </div>

                    {/* Search Bar - Understated Minimalist */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Eksplorasi kurasi produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900 placeholder-stone-400 transition-all shadow-2xs"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Flowchart Guide */}
                        <button
                            onClick={() => setIsFlowchartOpen(!isFlowchartOpen)}
                            title="Buka Alur Flowchart Transaksi"
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                                isFlowchartOpen 
                                    ? 'bg-stone-900 text-stone-50 border-stone-900' 
                                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 shadow-2xs'
                            }`}
                        >
                            <GitFork className="w-3.5 h-3.5 text-stone-500" />
                            <span className="hidden sm:inline">Alur Flowchart</span>
                        </button>

                        {/* Katalog Tab */}
                        <button
                            onClick={() => setActiveTab('catalog')}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                                activeTab === 'catalog'
                                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                        >
                            <Compass className="w-3.5 h-3.5" />
                            <span>Katalog</span>
                        </button>

                        {/* Riwayat Tab */}
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                                activeTab === 'orders'
                                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                        >
                            <Package className="w-3.5 h-3.5" />
                            <span>Pesanan</span>
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-800 transition-all shadow-2xs focus:outline-none"
                            title="Buka Keranjang Belanja"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-stone-900 text-stone-100 text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* User Profile */}
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-stone-200 hover:border-stone-400 transition-all shadow-2xs focus:outline-none"
                        >
                            <div className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-[11px] uppercase">
                                {currentUser?.nama_lengkap ? currentUser.nama_lengkap.charAt(0) : 'U'}
                            </div>
                            <span className="text-xs font-medium text-stone-800 hidden lg:inline max-w-[100px] truncate">
                                {currentUser?.nama_lengkap?.split(' ')[0] || 'Akun'}
                            </span>
                        </button>

                    </div>
                </div>

                {/* Mobile Search Input */}
                <div className="md:hidden pb-3">
                    <div className="relative w-full">
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari kurasi produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900"
                        />
                    </div>
                </div>

            </div>
        </header>
    );
}
