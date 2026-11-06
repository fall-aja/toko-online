import React, { useState, useMemo } from 'react';
import { 
    X, 
    Heart, 
    ShoppingCart, 
    Trash2, 
    ArrowRight, 
    Search, 
    CheckSquare, 
    Square, 
    ShoppingBag, 
    Sparkles, 
    Filter,
    CheckCircle2
} from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

export default function WishlistModal({
    isOpen,
    onClose,
    wishlistItems = [],
    onRemoveFromWishlist,
    onAddToCart,
    onDirectBuy
}) {
    if (!isOpen) return null;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [filterAvailability, setFilterAvailability] = useState('all'); // 'all' | 'in_stock'
    const [actionFeedback, setActionFeedback] = useState(null);

    // Filter items based on search and stock status
    const filteredItems = useMemo(() => {
        return wishlistItems.filter(item => {
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchName = item.nama_produk.toLowerCase().includes(q);
                const matchCat = item.kategori?.nama_kategori?.toLowerCase().includes(q);
                if (!matchName && !matchCat) return false;
            }
            if (filterAvailability === 'in_stock' && item.stok <= 0) {
                return false;
            }
            return true;
        });
    }, [wishlistItems, searchQuery, filterAvailability]);

    // Handle check all
    const isAllSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;
    
    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredItems.map(item => item.id_produk));
        }
    };

    const handleToggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleMoveSelectedToCart = () => {
        const toAdd = wishlistItems.filter(item => selectedIds.includes(item.id_produk));
        toAdd.forEach(item => {
            onAddToCart(item, 1);
            if (onRemoveFromWishlist) {
                onRemoveFromWishlist(item.id_produk);
            }
        });
        setSelectedIds([]);
        showFeedback(`${toAdd.length} produk berhasil dipindahkan ke keranjang!`);
    };

    const handleRemoveSelected = () => {
        selectedIds.forEach(id => {
            if (onRemoveFromWishlist) {
                onRemoveFromWishlist(id);
            }
        });
        setSelectedIds([]);
        showFeedback('Produk terpilih dihapus dari wishlist.');
    };

    const showFeedback = (text) => {
        setActionFeedback(text);
        setTimeout(() => setActionFeedback(null), 2500);
    };

    const totalSelectedPrice = wishlistItems
        .filter(item => selectedIds.includes(item.id_produk))
        .reduce((sum, item) => sum + item.harga, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[90vh]">
                
                {/* Header (Tokopedia / Shopee Web Style) */}
                <div className="px-6 py-4.5 border-b border-stone-200/80 bg-stone-50/80 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/80 shadow-2xs">
                            <Heart className="w-5 h-5 fill-rose-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-stone-900 tracking-tight">
                                    Wishlist Saya
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-200/80 text-stone-700">
                                    {wishlistItems.length} Produk
                                </span>
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                                Koleksi kurasi RupaKala yang Anda simpan untuk dibeli nanti
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors"
                        title="Tutup Wishlist"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sub-header: Search & Filter Toolbar */}
                {wishlistItems.length > 0 && (
                    <div className="px-6 py-3 border-b border-stone-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
                        {/* Search in Wishlist */}
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Cari barang dalam wishlist..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900"
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

                        {/* Availability Filter Chips */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                            <button
                                onClick={() => setFilterAvailability('all')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                    filterAvailability === 'all'
                                        ? 'bg-stone-900 text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setFilterAvailability('in_stock')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                    filterAvailability === 'in_stock'
                                        ? 'bg-stone-900 text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                Tersedia Saja
                            </button>
                        </div>
                    </div>
                )}

                {/* Batch Action Bar (Shown when items exist) */}
                {filteredItems.length > 0 && (
                    <div className="px-6 py-2.5 bg-stone-50/50 border-b border-stone-100 flex items-center justify-between text-xs text-stone-600 shrink-0">
                        <label className="flex items-center gap-2 cursor-pointer select-none font-medium hover:text-stone-900">
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleToggleSelectAll}
                                className="w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                            />
                            <span>Pilih Semua ({filteredItems.length})</span>
                        </label>

                        {selectedIds.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-stone-500 font-mono text-[11px]">
                                    {selectedIds.length} terpilih
                                </span>
                                <button
                                    onClick={handleRemoveSelected}
                                    className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium text-[11px] flex items-center gap-1 transition-colors"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Hapus</span>
                                </button>
                                <button
                                    onClick={handleMoveSelectedToCart}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] flex items-center gap-1 transition-colors"
                                >
                                    <ShoppingCart className="w-3 h-3" />
                                    <span>+ Keranjang</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Feedback Toast */}
                {actionFeedback && (
                    <div className="mx-6 mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{actionFeedback}</span>
                    </div>
                )}

                {/* Wishlist Items List */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
                    {wishlistItems.length === 0 ? (
                        <div className="py-16 text-center text-stone-400">
                            <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                                <Heart className="w-8 h-8 stroke-[1.5]" />
                            </div>
                            <h4 className="font-bold text-sm text-stone-800">
                                Wishlist Anda Masih Kosong
                            </h4>
                            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
                                Jelajahi katalog RupaKala dan klik ikon hati pada produk favorit Anda untuk menyimpannya di sini.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-5 px-5 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-2 shadow-sm"
                            >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Mulai Belanja Sekarang</span>
                            </button>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="py-12 text-center text-stone-400">
                            <Search className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                            <p className="font-semibold text-xs text-stone-700">
                                Tidak ada produk yang sesuai dengan pencarian
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setFilterAvailability('all'); }}
                                className="text-xs text-stone-900 font-semibold underline mt-2"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        filteredItems.map((product) => {
                            const isSelected = selectedIds.includes(product.id_produk);
                            const inStock = product.stok > 0;

                            return (
                                <div
                                    key={product.id_produk}
                                    className={`flex items-start sm:items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${
                                        isSelected 
                                            ? 'bg-stone-50/90 border-stone-400 shadow-2xs' 
                                            : 'bg-white border-stone-200/90 hover:border-stone-300'
                                    }`}
                                >
                                    {/* Selection Checkbox */}
                                    <div className="pt-2 sm:pt-0 shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleToggleSelect(product.id_produk)}
                                            className="w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                                        />
                                    </div>

                                    {/* Product Photo */}
                                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-stone-200">
                                        <img
                                            src={getProductPhoto(product.nama_produk)}
                                            alt={product.nama_produk}
                                            className="w-full h-full object-cover"
                                        />
                                        {!inStock && (
                                            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
                                                Habis
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details (Tokopedia/Shopee style) */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            {product.kategori?.nama_kategori && (
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                                                    {product.kategori.nama_kategori}
                                                </span>
                                            )}
                                            <span className="text-stone-300">&bull;</span>
                                            <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                                                Kurasi Asli
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                                            {product.nama_produk}
                                        </h4>

                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                                                {formatRupiah(product.harga)}
                                            </span>
                                            {inStock ? (
                                                <span className="text-[10px] font-semibold text-emerald-700">
                                                    Stok sisa {product.stok}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-semibold text-rose-600">
                                                    Stok Habis
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0 self-center">
                                        {/* Button Add to Cart */}
                                        <button
                                            disabled={!inStock}
                                            onClick={() => {
                                                onAddToCart(product, 1);
                                                showFeedback(`"${product.nama_produk}" ditambahkan ke keranjang!`);
                                            }}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                                inStock
                                                    ? 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                                                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                            }`}
                                            title="Tambah ke Keranjang"
                                        >
                                            <ShoppingCart className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">+ Keranjang</span>
                                        </button>

                                        {/* Button Buy Direct (Tokopedia/Shopee Beli Langsung) */}
                                        {onDirectBuy && inStock && (
                                            <button
                                                onClick={() => {
                                                    onDirectBuy(product);
                                                }}
                                                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-2xs"
                                                title="Beli Langsung Sekarang"
                                            >
                                                <span>Beli</span>
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}

                                        {/* Remove from Wishlist */}
                                        {onRemoveFromWishlist && (
                                            <button
                                                onClick={() => onRemoveFromWishlist(product.id_produk)}
                                                className="w-8 h-8 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
                                                title="Hapus dari Wishlist"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer (Tokopedia/Shopee style sticky checkout bar) */}
                {selectedIds.length > 0 && (
                    <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/90 flex items-center justify-between shrink-0">
                        <div>
                            <span className="text-[11px] text-stone-500 block">Total {selectedIds.length} Produk Terpilih:</span>
                            <span className="text-sm sm:text-base font-extrabold text-stone-900">
                                {formatRupiah(totalSelectedPrice)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleMoveSelectedToCart}
                                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                            >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Pindahkan ke Keranjang</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
