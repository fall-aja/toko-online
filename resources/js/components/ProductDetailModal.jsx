import React, { useState } from 'react';
import { 
    X, 
    ShoppingCart, 
    Check, 
    Scale, 
    Box, 
    Calendar, 
    Database, 
    ShieldCheck, 
    Truck 
} from 'lucide-react';
import { formatRupiah, formatDate, getProductPhoto } from '../utils';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
    const [qty, setQty] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        onAddToCart(product, qty);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            onClose();
        }, 800);
    };

    const isOutOfStock = product.stok <= 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Rincian Produk (ERD: Tabel Produk)
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Image */}
                        <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative">
                            <img
                                src={getProductPhoto(product.nama_produk)}
                                alt={product.nama_produk}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 backdrop-blur-xs text-slate-800 shadow-xs">
                                {product.kategori?.nama_kategori || 'Kategori'}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-2">
                                    {product.nama_produk}
                                </h2>

                                <div className="text-2xl font-black text-emerald-600 mb-4">
                                    {formatRupiah(product.harga)}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-400 block mb-0.5 font-medium">Ketersediaan Stok</span>
                                        <span className={`font-bold ${isOutOfStock ? 'text-rose-600' : 'text-slate-800'}`}>
                                            {isOutOfStock ? 'Stok Habis' : `${product.stok} unit`}
                                        </span>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-400 block mb-0.5 font-medium">Berat Barang</span>
                                        <span className="font-bold text-slate-800 flex items-center gap-1">
                                            <Scale className="w-3.5 h-3.5 text-slate-400" />
                                            {product.berat || 0} gram
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        <span>Garansi 100% Produk Original</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-emerald-600" />
                                        <span>Pengiriman Cepat & Asuransi Kurir</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity and Action */}
                            {!isOutOfStock && (
                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <span className="text-xs font-semibold text-slate-700">Jumlah Pembelian:</span>
                                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center text-xs font-bold text-slate-800">
                                                {qty}
                                            </span>
                                            <button
                                                onClick={() => setQty(Math.min(product.stok, qty + 1))}
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                            isAdded
                                                ? 'bg-emerald-700 text-white'
                                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                        }`}
                                    >
                                        {isAdded ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Berhasil Ditambahkan!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4" />
                                                Tambah ke Keranjang ({qty} Item &bull; {formatRupiah(product.harga * qty)})
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full Description */}
                    <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Deskripsi Lengkap
                        </h4>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                            {product.deskripsi || 'Tidak ada keterangan detail untuk produk ini.'}
                        </div>
                    </div>

                    {/* ERD Database Field Inspector */}
                    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2 font-bold text-slate-800 mb-1.5">
                            <Database className="w-4 h-4 text-emerald-600" />
                            <span>Kesesuaian Skema ERD (Tabel: produk)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                            <div><span className="text-slate-400">id_produk:</span> {product.id_produk}</div>
                            <div><span className="text-slate-400">kategori_id:</span> {product.kategori_id}</div>
                            <div><span className="text-slate-400">stok:</span> {product.stok}</div>
                            <div><span className="text-slate-400">berat:</span> {product.berat} gr</div>
                            <div><span className="text-slate-400">is_active:</span> {product.is_active ? '1 (Aktif)' : '0'}</div>
                            <div><span className="text-slate-400">harga:</span> {product.harga}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
