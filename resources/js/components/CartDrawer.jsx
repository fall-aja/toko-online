import React from 'react';
import { 
    X, 
    Trash2, 
    Plus, 
    Minus, 
    ShoppingCart, 
    ArrowRight, 
    Scale, 
    Package, 
    GitFork 
} from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onUpdateQty,
    onRemoveItem,
    onClearCart,
    onProceedCheckout
}) {
    if (!isOpen) return null;

    const totalWeight = cartItems.reduce((sum, item) => sum + ((item.berat || 0) * item.qty), 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
                    
                    {/* Header */}
                    <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-2xs">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-stone-900">
                                    Keranjang Belanja
                                </h3>
                                <p className="text-xs text-stone-500">
                                    {totalItems} produk terpilih
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Trust Banner (Tokopedia/Shopee style) */}
                    <div className="bg-emerald-50/80 px-4 py-2 border-b border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-900">
                        <Package className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>
                            <strong>Proteksi RupaKala:</strong> Kemasan aman terlindungi &amp; garansi kurasi asli 100%.
                        </span>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                                <Package className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
                                <h4 className="font-bold text-slate-700 text-sm mb-1">
                                    Keranjang Masih Kosong
                                </h4>
                                <p className="text-xs text-slate-500 max-w-xs mb-4">
                                    Pilih produk favorit Anda dari katalog dan klik "Tambah ke Keranjang" untuk memulai transaksi.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                                >
                                    Jelajahi Produk Sekarang
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => {
                                const itemSubtotal = item.harga * item.qty;
                                const itemKey = item.cartKey || item.id_produk;
                                const itemPhoto = item.selectedPhoto || getProductPhoto(item.nama_produk);

                                return (
                                    <div key={itemKey} className="pt-3 first:pt-0 flex gap-3">
                                        {/* Thumbnail */}
                                        <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shrink-0 border border-slate-200">
                                            <img
                                                src={itemPhoto}
                                                alt={item.nama_produk}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info & Controls */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                                                        {item.nama_produk}
                                                    </h4>
                                                    <button
                                                        onClick={() => onRemoveItem(itemKey)}
                                                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                                                        title="Hapus Item"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Variant Badges (Ukuran & Warna) */}
                                                {(item.selectedSize || item.selectedColor) && (
                                                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                                        {item.selectedSize && (
                                                            <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-bold border border-stone-200">
                                                                Size: {item.selectedSize}
                                                            </span>
                                                        )}
                                                        {item.selectedColor && (
                                                            <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium border border-stone-200 flex items-center gap-1">
                                                                {item.selectedColorHex && (
                                                                    <span 
                                                                        className="w-2 h-2 rounded-full border border-stone-300"
                                                                        style={{ backgroundColor: item.selectedColorHex }}
                                                                    />
                                                                )}
                                                                {item.selectedColor}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                                                    <span>{formatRupiah(item.harga)}</span>
                                                    {item.berat && (
                                                        <span>&bull; {item.berat * item.qty} gr</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity modifier and Subtotal */}
                                            <div className="flex items-center justify-between mt-2 pt-1">
                                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                                    <button
                                                        onClick={() => onUpdateQty(itemKey, item.qty - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                                                        title="Kurangi Jumlah"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => onUpdateQty(itemKey, item.qty + 1)}
                                                        disabled={item.qty >= item.stok}
                                                        className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                                                            item.qty >= item.stok 
                                                                ? 'text-slate-300 cursor-not-allowed' 
                                                                : 'text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                        title="Tambah Jumlah"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <div className="text-xs font-extrabold text-slate-900">
                                                    {formatRupiah(itemSubtotal)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer Summary & Checkout Button */}
                    {cartItems.length > 0 && (
                        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between text-slate-500">
                                    <span>Total Item ({totalItems})</span>
                                    <span>{totalItems} barang</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Scale className="w-3 h-3 text-slate-400" />
                                        Total Berat Estimasi
                                    </span>
                                    <span>{(totalWeight / 1000).toFixed(2)} kg ({totalWeight} gr)</span>
                                </div>
                                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                                    <span>Subtotal Transaksi</span>
                                    <span className="text-emerald-700 text-base">{formatRupiah(subtotal)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={onClearCart}
                                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                    title="Kosongkan Keranjang"
                                >
                                    Kosongkan
                                </button>
                                <button
                                    onClick={onProceedCheckout}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                                >
                                    <span>Checkout Pesanan</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
