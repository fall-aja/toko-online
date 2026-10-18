import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

export default function WishlistModal({
    isOpen,
    onClose,
    wishlistItems = [],
    onRemoveFromWishlist,
    onAddToCart
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                            <Heart className="w-4 h-4 fill-rose-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-stone-900">Daftar Keinginan (Wishlist)</h3>
                            <p className="text-[11px] text-stone-500">
                                {wishlistItems.length} produk tersimpan
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 max-h-[65vh] overflow-y-auto">
                    {wishlistItems.length === 0 ? (
                        <div className="py-12 text-center text-stone-400">
                            <Heart className="w-12 h-12 mx-auto stroke-1 mb-2 text-stone-300" />
                            <p className="font-semibold text-xs text-stone-600">Belum Ada Produk di Wishlist</p>
                            <p className="text-[11px] text-stone-400 mt-1 max-w-xs mx-auto">
                                Klik ikon hati pada kartu produk yang Anda minati untuk menyimpannya di sini.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {wishlistItems.map((product) => (
                                <div
                                    key={product.id_produk}
                                    className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors"
                                >
                                    <img
                                        src={getProductPhoto(product.nama_produk)}
                                        alt={product.nama_produk}
                                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white border border-stone-200"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-bold text-xs text-stone-900 truncate">
                                            {product.nama_produk}
                                        </h4>
                                        <p className="text-xs font-semibold text-stone-700 mt-0.5">
                                            {formatRupiah(product.harga)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                            onClick={() => {
                                                onAddToCart(product);
                                                if (onRemoveFromWishlist) onRemoveFromWishlist(product.id_produk);
                                            }}
                                            className="px-2.5 py-1.5 rounded-lg bg-stone-900 text-stone-50 text-[11px] font-semibold hover:bg-stone-800 flex items-center gap-1 transition-colors"
                                            title="Pindahkan ke Keranjang"
                                        >
                                            <ShoppingCart className="w-3 h-3" />
                                            <span className="hidden sm:inline">Beli</span>
                                        </button>
                                        {onRemoveFromWishlist && (
                                            <button
                                                onClick={() => onRemoveFromWishlist(product.id_produk)}
                                                className="w-7 h-7 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
                                                title="Hapus dari Wishlist"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
