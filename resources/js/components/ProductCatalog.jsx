import React, { useState } from 'react';
import { 
    ShoppingCart, 
    Check, 
    Package, 
    ArrowUpDown,
    Heart,
    Star,
    ArrowRight
} from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

// Helper to determine product badge matching ShopifyRetail reference
function getProductBadge(product) {
    const name = (product.nama_produk || '').toLowerCase();
    if (name.includes('hitam') || name.includes('hoodie') || name.includes('ultra')) {
        return { label: 'Best Seller', bg: 'bg-[#e07000]' };
    }
    if (name.includes('biru') || name.includes('sneakers') || name.includes('cokelat') || name.includes('keyboard')) {
        return { label: 'New', bg: 'bg-[#194d33]' };
    }
    if (name.includes('cream') || name.includes('backpack') || name.includes('earphone') || name.includes('linen')) {
        return { label: 'Sale', bg: 'bg-[#204a2c]' };
    }
    const badges = [
        { label: 'Sale', bg: 'bg-[#204a2c]' },
        { label: 'Best Seller', bg: 'bg-[#e07000]' },
        { label: 'New', bg: 'bg-[#194d33]' }
    ];
    return badges[product.id_produk % badges.length];
}

// Realistic review count per product
function getProductReviews(product) {
    const list = [128, 96, 142, 87, 110, 76, 105, 94, 118, 83, 134, 91, 150];
    return list[product.id_produk % list.length] || 98;
}

export default function ProductCatalog({
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    onAddToCart,
    onOpenProductDetail,
    searchQuery,
    currentUser,
    wishlistIds = [],
    onToggleWishlist,
    catalogSortBy = 'newest'
}) {
    const [sortBy, setSortBy] = useState(catalogSortBy || 'newest');
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [addedIds, setAddedIds] = useState([]);

    React.useEffect(() => {
        if (catalogSortBy) {
            setSortBy(catalogSortBy);
        }
    }, [catalogSortBy]);

    // Filter products
    const filteredProducts = products.filter(p => {
        if (selectedCategory && p.kategori_id !== selectedCategory) {
            return false;
        }
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            const matchName = p.nama_produk.toLowerCase().includes(q);
            const matchDesc = p.deskripsi && p.deskripsi.toLowerCase().includes(q);
            if (!matchName && !matchDesc) return false;
        }
        if (onlyInStock && p.stok <= 0) {
            return false;
        }
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price_asc') return a.harga - b.harga;
        if (sortBy === 'price_desc') return b.harga - a.harga;
        return b.id_produk - a.id_produk;
    });

    const handleAdd = (product, e) => {
        e.stopPropagation();
        onAddToCart(product, 1);
        setAddedIds(prev => [...prev, product.id_produk]);
        setTimeout(() => {
            setAddedIds(prev => prev.filter(id => id !== product.id_produk));
        }, 1200);
    };

    return (
        <div className="space-y-6">
            
            {/* Featured Products Section Header matching ShopifyRetail example */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-sans">
                        Featured Products
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                        }}
                        className="text-xs sm:text-sm font-semibold text-[#204a2c] hover:text-[#132e1b] flex items-center gap-1.5 transition-colors group cursor-pointer"
                    >
                        <span>View all products</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Category Filter Pills & Controls */}
            <div id="catalog-section" className="space-y-3 scroll-mt-24">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-stone-200/80 px-4 py-3 shadow-2xs">
                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all font-medium cursor-pointer ${
                                selectedCategory === null
                                    ? 'bg-[#204a2c] text-white shadow-xs'
                                    : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-400'
                            }`}
                        >
                            Semua Produk ({products.length})
                        </button>
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat.id_kategori;
                            return (
                                <button
                                    key={cat.id_kategori}
                                    onClick={() => setSelectedCategory(isSelected ? null : cat.id_kategori)}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all font-medium cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#204a2c] text-white shadow-xs'
                                            : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-400'
                                    }`}
                                >
                                    {cat.nama_kategori} ({cat.produk_count ?? 0})
                                </button>
                            );
                        })}
                    </div>

                    {/* Filter and Sorting Controls */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs text-stone-600">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={onlyInStock}
                                onChange={(e) => setOnlyInStock(e.target.checked)}
                                className="rounded border-stone-300 text-[#204a2c] focus:ring-[#204a2c] w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className="text-stone-700 font-medium">Stok Tersedia</span>
                        </label>

                        <div className="flex items-center gap-1.5 border-l border-stone-200 pl-3">
                            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="price_asc">Harga: Rendah ke Tinggi</option>
                                <option value="price_desc">Harga: Tinggi ke Rendah</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid - Exactly matching ShopifyRetail layout with 6 columns on desktop */}
            {sortedProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-16 text-center shadow-2xs">
                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-3 stroke-1" />
                    <h3 className="text-xl font-bold text-stone-900 mb-1">
                        Koleksi Tidak Ditemukan
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                        Coba sesuaikan kata kunci pencarian Anda atau periksa kategori kurasi lainnya.
                    </p>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="px-5 py-2.5 bg-[#204a2c] text-white text-xs font-medium rounded-full hover:bg-[#15351e] transition-colors cursor-pointer"
                    >
                        Tampilkan Seluruh Koleksi
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                    {sortedProducts.map((product) => {
                        const isAdded = addedIds.includes(product.id_produk);
                        const isOutOfStock = product.stok <= 0;
                        const isWishlisted = wishlistIds.includes(product.id_produk);
                        const badge = getProductBadge(product);
                        const reviewCount = getProductReviews(product);
                        const isSale = badge.label === 'Sale';
                        const originalPrice = isSale 
                            ? Math.round((product.harga * 1.25) / 5000) * 5000 
                            : null;

                        return (
                            <div
                                key={product.id_produk}
                                onClick={() => onOpenProductDetail(product)}
                                className="group bg-white rounded-2xl border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col p-3 sm:p-3.5 cursor-pointer relative justify-between"
                            >
                                <div>
                                    {/* Product Image Container with 4:5 aspect ratio and uniform #f8f8f8 bg */}
                                    <div className="relative aspect-[4/5] w-full bg-[#f8f8f8] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2.5">
                                        <img
                                            src={getProductPhoto(product.nama_produk)}
                                            alt={product.nama_produk}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />

                                        {/* Status Badge (Sale, Best Seller, New) */}
                                        <div className="absolute top-2.5 left-2.5 z-10">
                                            {isOutOfStock ? (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-800 text-white shadow-2xs">
                                                    Habis
                                                </span>
                                            ) : (
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold text-white shadow-2xs ${badge.bg}`}>
                                                    {badge.label}
                                                </span>
                                            )}
                                        </div>

                                        {/* Wishlist Heart Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onToggleWishlist) onToggleWishlist(product);
                                            }}
                                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-stone-700 shadow-2xs transition-transform hover:scale-110 focus:outline-none z-10"
                                            title={isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
                                        >
                                            <Heart className={`w-3.5 h-3.5 transition-colors ${
                                                isWishlisted 
                                                    ? 'fill-rose-500 text-rose-500' 
                                                    : 'text-stone-700'
                                            }`} />
                                        </button>
                                    </div>

                                    {/* Product Title */}
                                    <h3 
                                        className="font-semibold text-xs sm:text-[13px] text-stone-900 group-hover:text-[#204a2c] transition-colors truncate mb-1 leading-snug"
                                        title={product.nama_produk}
                                    >
                                        {product.nama_produk}
                                    </h3>

                                    {/* Price Line in Indonesian Rupiah (Rp) */}
                                    <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                                        <span className="text-xs sm:text-sm font-bold text-stone-950 tracking-tight">
                                            {formatRupiah(product.harga)}
                                        </span>
                                        {originalPrice && (
                                            <span className="text-[10px] sm:text-xs text-stone-400 line-through font-normal">
                                                {formatRupiah(originalPrice)}
                                            </span>
                                        )}
                                    </div>

                                    {/* 5-Star Rating & Review Count */}
                                    <div className="flex items-center gap-1 mb-2.5">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-[11px] text-stone-500 font-normal">
                                            ({reviewCount})
                                        </span>
                                    </div>
                                </div>

                                {/* Full-Width Forest Green Add to Cart Button */}
                                <div>
                                    <button
                                        onClick={(e) => handleAdd(product, e)}
                                        disabled={isOutOfStock}
                                        className={`w-full py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                                            isOutOfStock
                                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                                : isAdded
                                                ? 'bg-[#15351e] text-emerald-200'
                                                : 'bg-[#204a2c] hover:bg-[#15351e] active:scale-[0.98] text-white'
                                        }`}
                                        title="Tambah ke Keranjang"
                                    >
                                        {isAdded ? (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Ditambahkan</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                                <span>Add to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
