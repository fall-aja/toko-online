import React from 'react';
import { 
    CheckCircle2, 
    ArrowRight, 
    Package, 
    Calendar, 
    CreditCard, 
    Database, 
    Check, 
    ShoppingBag 
} from 'lucide-react';
import { formatRupiah, formatDate, STATUS_CONFIG, PAYMENT_METHODS } from '../utils';

export default function OrderSuccessModal({ transaction, isOpen, onClose, onViewOrders }) {
    if (!isOpen || !transaction) return null;

    const statusInfo = STATUS_CONFIG[transaction.status] || STATUS_CONFIG.paid;
    const paymentInfo = PAYMENT_METHODS[transaction.metode_pembayaran] || { name: transaction.metode_pembayaran };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-center">
                
                {/* Top Success Icon */}
                <div className="pt-8 pb-4 px-6 bg-emerald-50/60 border-b border-emerald-100/60">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 mb-2">
                        Flowchart: Transaksi Selesai & Sukses!
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                        Pembayaran Berhasil Dikonfirmasi
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Data pesanan telah resmi tersimpan di tabel <code className="bg-white px-1 py-0.5 rounded text-emerald-700 font-semibold">transaksi</code> dan <code className="bg-white px-1 py-0.5 rounded text-emerald-700 font-semibold">detail_transaksi</code>.
                    </p>
                </div>

                {/* Receipt Details */}
                <div className="p-6 text-left space-y-4 max-h-[60vh] overflow-y-auto">
                    
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-400">ID Transaksi</span>
                            <span className="font-mono font-bold text-slate-900">
                                #TRX-{String(transaction.id_transaksi).padStart(5, '0')}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Waktu Transaksi</span>
                            <span className="font-semibold text-slate-800">
                                {formatDate(transaction.tanggal)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Metode Pembayaran</span>
                            <span className="font-semibold text-slate-800">
                                {paymentInfo.name}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                            <span className="text-slate-400">Status Pembayaran</span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></span>
                                {statusInfo.label}
                            </span>
                        </div>
                    </div>

                    {/* Purchased Items List */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Item yang Dibeli ({transaction.detail_transaksi?.length || 0} Produk)
                        </span>
                        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                            {transaction.detail_transaksi?.map((item) => (
                                <div key={item.id_detail} className="p-3 flex items-center justify-between text-xs">
                                    <div className="pr-2">
                                        <div className="font-bold text-slate-800 line-clamp-1">
                                            {item.nama_produk}
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {item.qty} pcs &bull; {formatRupiah(item.harga)}
                                        </div>
                                    </div>
                                    <div className="font-extrabold text-slate-900 shrink-0">
                                        {formatRupiah(item.subtotal)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                        <span className="text-xs font-bold">Total Pembayaran</span>
                        <span className="text-lg font-black text-emerald-700">
                            {formatRupiah(transaction.total)}
                        </span>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-2 border-t border-slate-100 flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Belanja Lagi
                    </button>
                    <button
                        onClick={onViewOrders}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                        <span>Lihat Riwayat Pesanan</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
}
