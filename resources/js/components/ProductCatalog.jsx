import React, { useState } from 'react';
import { 
    Tag, 
    ShoppingCart, 
    Eye, 
    Check, 
    Package, 
    Scale, 
    ArrowUpDown,
    SlidersHorizontal
} from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

export default function ProductCatalog({
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    onAddToCart,
    onOpenProductDetail,
    searchQuery,
    currentUser
}) {
    const [sortBy, setSortBy] = useState('newest');
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [addedIds, setAddedIds] = useState([]);

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
        <div className="space-y-8">
            
            {/* Anti-Slop Editorial Hero Header */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-2xs relative overflow-hidden">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-900"></span>
                        <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500">
                            Kurasi &bull; Eksplorasi Pengguna
                        </span>
                    </div>

                    <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold italic tracking-tight text-stone-900 leading-[1.15] mb-4">
                        Keindahan Bentuk, Nilai Fungsi, & Harmoni Waktu.
                    </h1>

                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                        Selamat datang, <span className="font-semibold text-stone-900">{currentUser?.nama_lengkap || 'Pengguna'}</span>. Setiap koleksi di <em className="font-editorial font-bold not-italic">RupaKala</em> dipilih dengan kurasi material yang jujur, rancangan ergonomis, dan daya tahan jangka panjang.
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>Basis Data: MySQL <code>toko_online</code></span>
                    </div>
                    <div>
                        <span>Kategori: <strong>{categories.length} Bidang</strong></span>
                    </div>
                    <div>
                        <span>Item Terdaftar: <strong>{products.length} Karya</strong></span>
                    </div>
                </div>
            </div>

            {/* Category Filter Pills (Flowchart Tahap 2) */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
                        Pilih Kategori Produk &bull; Flowchart Tahap 2
                    </span>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="text-xs text-stone-600 hover:text-stone-900 underline font-medium"
                        >
                            Tampilkan Semua
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs transition-all font-medium ${
                            selectedCategory === null
                                ? 'bg-stone-900 text-stone-50 shadow-xs'
                                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                        }`}
                    >
                        Semua Koleksi ({products.length})
                    </button>
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.id_kategori;
                        return (
                            <button
                                key={cat.id_kategori}
                                onClick={() => setSelectedCategory(isSelected ? null : cat.id_kategori)}
                                className={`shrink-0 px-4 py-2 rounded-full text-xs transition-all font-medium ${
                                    isSelected
                                        ? 'bg-stone-900 text-stone-50 shadow-xs'
                                        : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                {cat.nama_kategori} ({cat.produk_count ?? 0})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filter and Sorting Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white rounded-2xl border border-stone-200 px-5 py-3.5 text-xs text-stone-600 shadow-2xs">
                <div>
                    Menampilkan <strong className="text-stone-900">{sortedProducts.length}</strong> produk pilihan
                    {searchQuery && <span> untuk "<em>{searchQuery}</em>"</span>}
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* In-Stock Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={onlyInStock}
                            onChange={(e) => setOnlyInStock(e.target.checked)}
                            className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span className="text-stone-700 font-medium">Stok Tersedia</span>
                    </label>

                    {/* Sort Select */}
                    <div className="flex items-center gap-1.5 border-l border-stone-200 pl-4">
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

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-16 text-center shadow-2xs">
                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-3 stroke-1" />
                    <h3 className="font-editorial text-xl font-bold italic text-stone-900 mb-1">
                        Koleksi Tidak Ditemukan
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                        Coba sesuaikan kata kunci pencarian Anda atau periksa kategori kurasi lainnya.
                    </p>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-full hover:bg-stone-800 transition-colors"
                    >
                        Tampilkan Seluruh Koleksi
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map((product) => {
                        const isAdded = addedIds.includes(product.id_produk);
                        const isOutOfStock = product.stok <= 0;

                        return (
                            <div
                                key={product.id_produk}
                                onClick={() => onOpenProductDetail(product)}
                                className="group bg-white rounded-3xl border border-stone-200/90 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-4/3 w-full bg-[#f4f2ee] overflow-hidden">
                                    <img
                                        src={getProductPhoto(product.nama_produk)}
                                        alt={product.nama_produk}
                                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Category Pill Tag */}
                                    <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/95 backdrop-blur-xs text-stone-700 shadow-2xs">
                                        {product.kategori?.nama_kategori || 'Katalog'}
                                    </span>

                                    {/* Stock Status */}
                                    {isOutOfStock ? (
                                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-stone-900 text-stone-50 shadow-2xs">
                                            Habis
                                        </span>
                                    ) : (
                                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-700 shadow-2xs">
                                            Stok: {product.stok}
                                        </span>
                                    )}
                                </div>

                                {/* Product Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mb-2">
                                            {product.berat && (
                                                <span className="flex items-center gap-1">
                                                    <Scale className="w-3 h-3" />
                                                    {product.berat} gr
                                                </span>
                                            )}
                                            <span>&bull;</span>
                                            <span>ID: #{product.id_produk}</span>
                                        </div>

                                        <h3 className="font-semibold text-sm text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 mb-1.5">
                                            {product.nama_produk}
                                        </h3>

                                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-light mb-4">
                                            {product.deskripsi || 'Koleksi terpilih dengan standar pengerjaan terpercaya.'}
                                        </p>
                                    </div>

                                    {/* Price & Add Button */}
                                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                                        <div>
                                            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">Harga</span>
                                            <span className="text-base font-bold text-stone-900 tracking-tight">
                                                {formatRupiah(product.harga)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => handleAdd(product, e)}
                                            disabled={isOutOfStock}
                                            className={`px-3.5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all focus:outline-none ${
                                                isOutOfStock
                                                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                                    : isAdded
                                                    ? 'bg-stone-800 text-stone-100'
                                                    : 'bg-stone-900 hover:bg-stone-800 text-stone-50 shadow-2xs'
                                            }`}
                                            title="Tambah ke Keranjang"
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Ditambah</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-3.5 h-3.5" />
                                                    <span>+ Keranjang</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
