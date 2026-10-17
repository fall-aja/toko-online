import React, { useState } from 'react';
import { 
    Package, 
    Calendar, 
    CreditCard, 
    ChevronDown, 
    ChevronUp, 
    Database, 
    ArrowRight,
    ShoppingBag,
    Filter,
    CheckCircle2
} from 'lucide-react';
import { formatRupiah, formatDate, STATUS_CONFIG, PAYMENT_METHODS } from '../utils';

export default function OrderHistory({ transactions, onStartShopping, currentUser }) {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const filteredTransactions = transactions.filter(t => {
        if (selectedStatus === 'all') return true;
        return t.status === selectedStatus;
    });

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-6">
            
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                            <Database className="w-3.5 h-3.5" />
                            Relasi: Tabel Transaksi & Detail Transaksi
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Riwayat Pesanan & Transaksi Saya
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Akun: <strong className="text-slate-800">{currentUser?.nama_lengkap}</strong> (@{currentUser?.username}) &bull; Total {transactions.length} pesanan tercatat.
                        </p>
                    </div>

                    <button
                        onClick={onStartShopping}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors self-start md:self-auto"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Katalog Belanja</span>
                    </button>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto pb-1">
                    <span className="text-xs font-bold text-slate-400 shrink-0 mr-2 flex items-center gap-1">
                        <Filter className="w-3 h-3" />
                        Filter Status:
                    </span>
                    {[
                        { key: 'all', label: 'Semua Status' },
                        { key: 'pending', label: 'Pending' },
                        { key: 'paid', label: 'Paid' },
                        { key: 'shipped', label: 'Shipped' },
                        { key: 'completed', label: 'Completed' },
                        { key: 'cancelled', label: 'Cancelled' },
                    ].map((tab) => {
                        const count = tab.key === 'all' 
                            ? transactions.length 
                            : transactions.filter(t => t.status === tab.key).length;
                        const isSelected = selectedStatus === tab.key;

                        return (
                            <button
                                key={tab.key}
                                onClick={() => setSelectedStatus(tab.key)}
                                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    isSelected
                                        ? 'bg-slate-900 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {tab.label} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Transactions List */}
            {filteredTransactions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800 mb-1">
                        Belum Ada Transaksi
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Anda belum memiliki pesanan dengan filter status ini. Silakan belanja produk di katalog untuk membuat pesanan baru.
                    </p>
                    <button
                        onClick={onStartShopping}
                        className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Mulai Belanja Sekarang
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredTransactions.map((trx) => {
                        const isExpanded = expandedId === trx.id_transaksi;
                        const status = STATUS_CONFIG[trx.status] || STATUS_CONFIG.pending;
                        const payment = PAYMENT_METHODS[trx.metode_pembayaran] || { name: trx.metode_pembayaran };
                        const itemCount = trx.detail_transaksi?.length || 0;

                        return (
                            <div 
                                key={trx.id_transaksi}
                                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs overflow-hidden transition-all"
                            >
                                {/* Transaction Card Header */}
                                <div 
                                    onClick={() => toggleExpand(trx.id_transaksi)}
                                    className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-start md:items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-mono font-bold text-slate-900 text-sm">
                                                    #TRX-{String(trx.id_transaksi).padStart(5, '0')}
                                                </span>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${status.bg} ${status.text} ${status.border}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                    {status.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {formatDate(trx.tanggal)}
                                                </span>
                                                <span>&bull;</span>
                                                <span className="flex items-center gap-1">
                                                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                                                    {payment.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                                        <div className="text-left md:text-right">
                                            <span className="text-[11px] text-slate-400 block">Total Tagihan ({itemCount} item)</span>
                                            <span className="text-base font-extrabold text-slate-900">
                                                {formatRupiah(trx.total)}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details (Tabel detail_transaksi) */}
                                {isExpanded && (
                                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 animate-in fade-in duration-150">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                                <Database className="w-3.5 h-3.5 text-emerald-600" />
                                                Detail Item Pesanan (Tabel: detail_transaksi)
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-mono">
                                                transaksi_id: {trx.id_transaksi}
                                            </span>
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                                            {trx.detail_transaksi?.map((item) => (
                                                <div key={item.id_detail} className="p-3.5 flex items-center justify-between text-xs">
                                                    <div className="min-w-0 pr-4">
                                                        <div className="font-bold text-slate-900">
                                                            {item.nama_produk}
                                                        </div>
                                                        <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                                                            produk_id: {item.produk_id || 'NULL'} &bull; {item.qty} pcs &times; {formatRupiah(item.harga)}
                                                        </div>
                                                    </div>
                                                    <div className="font-extrabold text-slate-900 text-sm shrink-0">
                                                        {formatRupiah(item.subtotal)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
                                            <span>Metode Pembayaran: <strong className="text-slate-800">{payment.name}</strong></span>
                                            <span>Total Transaksi: <strong className="text-emerald-700 font-extrabold text-sm">{formatRupiah(trx.total)}</strong></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
