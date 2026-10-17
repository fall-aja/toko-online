import React, { useState } from 'react';
import { 
    X, 
    CreditCard, 
    Truck, 
    Wallet, 
    Banknote, 
    CheckCircle2, 
    AlertCircle, 
    ShieldCheck, 
    Scale, 
    User, 
    Phone, 
    MapPin, 
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { formatRupiah, PAYMENT_METHODS } from '../utils';

export default function CheckoutModal({
    isOpen,
    onClose,
    cartItems,
    currentUser,
    onConfirmCheckout,
    isSubmitting
}) {
    if (!isOpen) return null;

    const [paymentMethod, setPaymentMethod] = useState('transfer'); // 'transfer', 'cod', 'ewallet'
    const [simulateMode, setSimulateMode] = useState('success'); // 'success' or 'failed'
    const [errorMessage, setErrorMessage] = useState(null);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const totalWeight = cartItems.reduce((sum, item) => sum + ((item.berat || 0) * item.qty), 0);
    const shippingFee = 0; // Free shipping promo for users
    const grandTotal = subtotal + shippingFee;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const payload = {
            user_id: currentUser?.id_user || 1,
            items: cartItems.map(item => ({
                produk_id: item.id_produk,
                qty: item.qty,
            })),
            metode_pembayaran: paymentMethod,
            simulate_payment: simulateMode,
        };

        const result = await onConfirmCheckout(payload);
        if (result && !result.success) {
            setErrorMessage(result.message || 'Pembayaran gagal. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">
                                Checkout & Pembayaran Pesanan
                            </h3>
                            <p className="text-xs text-slate-500">
                                Sesuai Alur Flowchart & Simpan ke DB Transaksi
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
                    
                    {/* Error Banner when simulated payment fails */}
                    {errorMessage && (
                        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold block text-sm mb-0.5">Percabangan Flowchart: Pembayaran Gagal!</span>
                                <p>{errorMessage}</p>
                                <span className="text-[11px] text-rose-600 block mt-1">
                                    Alur diagram: Anda tetap berada di halaman Checkout untuk mengulang atau mengubah metode pembayaran.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Shipping Address (from ERD user table) */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                Alamat Pengiriman (Data Tabel User)
                            </span>
                            <span className="text-[11px] text-slate-400">
                                ID Pengguna: #{currentUser?.id_user || 1}
                            </span>
                        </div>
                        <div className="text-xs text-slate-800 space-y-1">
                            <div className="font-bold text-sm">
                                {currentUser?.nama_lengkap || 'Pengguna'}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {currentUser?.no_hp || '0812-xxxx-xxxx'} &bull; @{currentUser?.username || 'user'}
                            </div>
                            <div className="text-slate-600 pt-1">
                                {currentUser?.alamat || 'Alamat belum diatur'}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Items */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Ringkasan Produk ({cartItems.length} Macam)
                        </span>
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 divide-y divide-slate-100 max-h-44 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item.id_produk} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                                    <div className="min-w-0 pr-2">
                                        <div className="font-semibold text-slate-800 truncate">
                                            {item.nama_produk}
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {item.qty} x {formatRupiah(item.harga)}
                                        </div>
                                    </div>
                                    <div className="font-bold text-slate-900 shrink-0">
                                        {formatRupiah(item.harga * item.qty)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Selector (ERD: enum 'transfer', 'cod', 'ewallet') */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Pilih Metode Pembayaran (ERD: metode_pembayaran)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {/* Transfer */}
                            <label className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                                paymentMethod === 'transfer'
                                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/10'
                                    : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <Banknote className={`w-5 h-5 ${paymentMethod === 'transfer' ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="transfer"
                                        checked={paymentMethod === 'transfer'}
                                        onChange={() => setPaymentMethod('transfer')}
                                        className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold text-xs text-slate-800 block">Transfer Bank</span>
                                    <span className="text-[10px] text-slate-500 block">BCA, Mandiri, BRI</span>
                                </div>
                            </label>

                            {/* E-Wallet */}
                            <label className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                                paymentMethod === 'ewallet'
                                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/10'
                                    : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <Wallet className={`w-5 h-5 ${paymentMethod === 'ewallet' ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="ewallet"
                                        checked={paymentMethod === 'ewallet'}
                                        onChange={() => setPaymentMethod('ewallet')}
                                        className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold text-xs text-slate-800 block">E-Wallet / QRIS</span>
                                    <span className="text-[10px] text-slate-500 block">GoPay, OVO, Dana</span>
                                </div>
                            </label>

                            {/* COD */}
                            <label className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                                paymentMethod === 'cod'
                                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/10'
                                    : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <Truck className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold text-xs text-slate-800 block">COD</span>
                                    <span className="text-[10px] text-slate-500 block">Bayar di Tempat</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Flowchart Simulation Switch (Allows testing Success vs Fail per flowchart) */}
                    <div className="bg-slate-100 rounded-xl p-3 border border-slate-200">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold text-slate-700">
                                Pengujian Flowchart: Simulasi Hasil Pembayaran
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                                Fitur Demo Flowchart
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <label className={`cursor-pointer p-2 rounded-lg border text-center transition-all ${
                                simulateMode === 'success'
                                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                                    : 'bg-white border-slate-200 text-slate-600'
                            }`}>
                                <input
                                    type="radio"
                                    name="simulateMode"
                                    value="success"
                                    checked={simulateMode === 'success'}
                                    onChange={() => setSimulateMode('success')}
                                    className="hidden"
                                />
                                &bull; Pembayaran Berhasil (Sukses)
                            </label>
                            <label className={`cursor-pointer p-2 rounded-lg border text-center transition-all ${
                                simulateMode === 'failed'
                                    ? 'bg-rose-50 border-rose-400 text-rose-800 font-bold'
                                    : 'bg-white border-slate-200 text-slate-600'
                            }`}>
                                <input
                                    type="radio"
                                    name="simulateMode"
                                    value="failed"
                                    checked={simulateMode === 'failed'}
                                    onChange={() => setSimulateMode('failed')}
                                    className="hidden"
                                />
                                &bull; Pembayaran Gagal (Ulangi)
                            </label>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                            <span>Subtotal Belanja</span>
                            <span>{formatRupiah(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Ongkos Kirim ({totalWeight} gr)</span>
                            <span className="text-emerald-600 font-semibold">Gratis Promo</span>
                        </div>
                        <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-100">
                            <span>Total Tagihan (Tabel Transaksi)</span>
                            <span className="text-emerald-700 text-base">{formatRupiah(grandTotal)}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Kembali
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Memproses ke Database...</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Konfirmasi & Bayar Sekarang</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
