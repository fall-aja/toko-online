import React, { useState, useEffect } from 'react';
import { 
    X, 
    ShoppingCart, 
    Check, 
    Scale, 
    Box, 
    ShieldCheck, 
    Truck, 
    Ruler, 
    Sparkles, 
    Palette 
} from 'lucide-react';
import { formatRupiah, getProductPhoto } from '../utils';

// Standard measurement guide for Indonesian Fashion & Apparel
const SIZE_GUIDE_DATA = [
    { size: 'S', ld: '48 cm', pb: '68 cm', pt: '58 cm' },
    { size: 'M', ld: '51 cm', pb: '70 cm', pt: '60 cm' },
    { size: 'L', ld: '54 cm', pb: '72 cm', pt: '62 cm' },
    { size: 'XL', ld: '57 cm', pb: '74 cm', pt: '63 cm' },
    { size: 'XXL', ld: '60 cm', pb: '76 cm', pt: '64 cm' },
];

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
    if (!isOpen || !product) return null;

    const isFashion = (product.kategori?.nama_kategori || '').toLowerCase().includes('fashion') || 
                      (product.nama_kategori || '').toLowerCase().includes('fashion') ||
                      Array.isArray(product.ukuran);

    // Available sizes
    const availableSizes = Array.isArray(product.ukuran) && product.ukuran.length > 0
        ? product.ukuran
        : (isFashion ? ['S', 'M', 'L', 'XL', 'XXL'] : null);

    // Available colors
    const availableColors = Array.isArray(product.warna) && product.warna.length > 0
        ? product.warna
        : (isFashion ? [
            { nama: 'Warna Utama', hex: '#1e293b' }
        ] : null);

    const [selectedSize, setSelectedSize] = useState(availableSizes ? availableSizes[0] : null);
    const [selectedColor, setSelectedColor] = useState(availableColors ? availableColors[0] : null);
    const [activePhoto, setActivePhoto] = useState(getProductPhoto(product.nama_produk));
    const [qty, setQty] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    // Update active photo & selections when product changes
    useEffect(() => {
        if (product) {
            const firstColor = Array.isArray(product.warna) && product.warna.length > 0 ? product.warna[0] : null;
            const firstSize = Array.isArray(product.ukuran) && product.ukuran.length > 0 
                ? product.ukuran[0] 
                : (isFashion ? 'L' : null);
            
            setSelectedColor(firstColor);
            setSelectedSize(firstSize);
            setQty(1);
            setIsAdded(false);
            setShowSizeGuide(false);

            if (firstColor && firstColor.foto) {
                setActivePhoto(firstColor.foto);
            } else {
                setActivePhoto(getProductPhoto(product.nama_produk));
            }
        }
    }, [product]);

    // Handle switching color
    const handleSelectColor = (color) => {
        setSelectedColor(color);
        if (color.foto) {
            setActivePhoto(color.foto);
        }
    };

    const handleAddToCart = () => {
        onAddToCart(product, qty, {
            size: selectedSize,
            color: selectedColor?.nama || null,
            colorHex: selectedColor?.hex || null,
            photo: activePhoto
        });
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            onClose();
        }, 800);
    };

    const isOutOfStock = product.stok <= 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 bg-stone-50/70">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                        <span className="px-2.5 py-1 rounded-full bg-stone-200/80 text-stone-800 text-[11px] font-bold">
                            {product.kategori?.nama_kategori || 'Katalog'}
                        </span>
                        {isFashion && (
                            <span className="inline-flex items-center gap-1 text-[#204a2c] font-medium text-[11px]">
                                <Sparkles className="w-3 h-3" />
                                Pilihan Ukuran &amp; Warna Tersedia
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Image Preview with Dynamic Color Switch Transition */}
                        <div className="space-y-3">
                            <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden relative border border-stone-200/70 p-4 flex items-center justify-center group">
                                <img
                                    key={activePhoto}
                                    src={activePhoto}
                                    alt={product.nama_produk}
                                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                                />

                                {selectedColor && (
                                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/95 backdrop-blur-xs text-stone-800 shadow-2xs border border-stone-200 flex items-center gap-1.5">
                                        <span 
                                            className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0" 
                                            style={{ backgroundColor: selectedColor.hex || '#ccc' }} 
                                        />
                                        <span>{selectedColor.nama}</span>
                                    </div>
                                )}
                            </div>

                            {/* Color Quick Switch Bar below image if variants exist */}
                            {availableColors && availableColors.length > 1 && (
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    <span className="text-[11px] text-stone-400">Varian:</span>
                                    {availableColors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectColor(color)}
                                            title={color.nama}
                                            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                                                selectedColor?.nama === color.nama
                                                    ? 'border-[#204a2c] scale-110 shadow-xs'
                                                    : 'border-white hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-stone-300'
                                            }`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info & Options */}
                        <div className="flex flex-col justify-between space-y-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2 font-sans">
                                    {product.nama_produk}
                                </h2>

                                <div className="text-2xl font-black text-[#204a2c] mb-4 tracking-tight">
                                    {formatRupiah(product.harga)}
                                </div>

                                {/* Stock & Weight Quick Pills */}
                                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                                        <span className="text-stone-400 block mb-0.5 text-[10px] font-medium">Ketersediaan Stok</span>
                                        <span className={`font-bold ${isOutOfStock ? 'text-rose-600' : 'text-stone-800'}`}>
                                            {isOutOfStock ? 'Stok Habis' : `${product.stok} unit tersedia`}
                                        </span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                                        <span className="text-stone-400 block mb-0.5 text-[10px] font-medium">Berat Barang</span>
                                        <span className="font-bold text-stone-800 flex items-center gap-1">
                                            <Scale className="w-3.5 h-3.5 text-stone-400" />
                                            {product.berat || 0} gram
                                        </span>
                                    </div>
                                </div>

                                {/* 1. PEMILIHAN WARNA (COLOR SELECTOR) */}
                                {availableColors && availableColors.length > 0 && (
                                    <div className="mb-4 pt-2 border-t border-stone-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                                                <Palette className="w-3.5 h-3.5 text-[#204a2c]" />
                                                <span>Pilih Warna:</span>
                                            </label>
                                            <span className="text-xs font-semibold text-[#204a2c]">
                                                {selectedColor?.nama || '-'}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2.5">
                                            {availableColors.map((color, index) => {
                                                const isSelected = selectedColor?.nama === color.nama;
                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleSelectColor(color)}
                                                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                                            isSelected
                                                                ? 'bg-[#204a2c] text-white shadow-xs'
                                                                : 'bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-400'
                                                        }`}
                                                    >
                                                        <span 
                                                            className={`w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0 ${
                                                                isSelected ? 'ring-2 ring-white/70' : ''
                                                            }`} 
                                                            style={{ backgroundColor: color.hex }} 
                                                        />
                                                        <span>{color.nama}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 2. PEMILIHAN UKURAN (SIZE SELECTOR) */}
                                {availableSizes && availableSizes.length > 0 && (
                                    <div className="mb-4 pt-2 border-t border-stone-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                                                <Ruler className="w-3.5 h-3.5 text-[#204a2c]" />
                                                <span>Pilih Ukuran:</span>
                                                <span className="text-xs font-semibold text-[#204a2c]">
                                                    {selectedSize}
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setShowSizeGuide(!showSizeGuide)}
                                                className="text-[11px] font-medium text-stone-500 hover:text-[#204a2c] underline cursor-pointer"
                                            >
                                                {showSizeGuide ? 'Tutup Panduan' : 'Panduan Ukuran'}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-5 gap-2">
                                            {availableSizes.map((size) => {
                                                const isSelected = selectedSize === size;
                                                return (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`py-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                            isSelected
                                                                ? 'bg-[#204a2c] text-white shadow-xs scale-102 ring-2 ring-[#204a2c]/20'
                                                                : 'bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-100'
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Size Guide Table */}
                                        {showSizeGuide && (
                                            <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-stone-600 animate-in fade-in duration-150">
                                                <div className="text-[11px] font-bold text-stone-800 mb-1.5">
                                                    Standar Ukuran Busana (Reguler Fit Indonesia)
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-[10px] text-left">
                                                        <thead>
                                                            <tr className="border-b border-stone-200 text-stone-400">
                                                                <th className="py-1">Size</th>
                                                                <th className="py-1">Lebar Dada</th>
                                                                <th className="py-1">Panjang Baju</th>
                                                                <th className="py-1">Panjang Tangan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {SIZE_GUIDE_DATA.map(item => (
                                                                <tr key={item.size} className={`border-b border-stone-100 ${selectedSize === item.size ? 'font-bold text-[#204a2c] bg-stone-100/60' : ''}`}>
                                                                    <td className="py-1">{item.size}</td>
                                                                    <td className="py-1">{item.ld}</td>
                                                                    <td className="py-1">{item.pb}</td>
                                                                    <td className="py-1">{item.pt}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Trust Highlights */}
                                <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#204a2c]" />
                                        <span>Garansi 100% Produk Original &amp; Bisa Tukar Ukuran</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-[#204a2c]" />
                                        <span>Pengiriman Cepat Seluruh Indonesia (COD / Transfer / E-Wallet)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity and Action Button */}
                            {!isOutOfStock && (
                                <div className="pt-4 border-t border-stone-200">
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <span className="text-xs font-semibold text-stone-700">Jumlah Pembelian:</span>
                                        <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 text-sm font-bold cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center text-xs font-bold text-stone-800">
                                                {qty}
                                            </span>
                                            <button
                                                onClick={() => setQty(Math.min(product.stok, qty + 1))}
                                                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 text-sm font-bold cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                                            isAdded
                                                ? 'bg-[#15351e] text-emerald-200'
                                                : 'bg-[#204a2c] hover:bg-[#15351e] text-white active:scale-[0.99]'
                                        }`}
                                    >
                                        {isAdded ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                <span>Berhasil Ditambahkan!</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4" />
                                                <span>
                                                    Tambah ke Keranjang &bull; {formatRupiah(product.harga * qty)}
                                                    {selectedSize ? ` (${selectedSize}` : ''}
                                                    {selectedColor ? `${selectedSize ? ', ' : ' ('}${selectedColor.nama})` : (selectedSize ? ')' : '')}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full Description */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                            Deskripsi Lengkap Produk
                        </h4>
                        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                            {product.deskripsi || 'Tidak ada keterangan detail untuk produk ini.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
