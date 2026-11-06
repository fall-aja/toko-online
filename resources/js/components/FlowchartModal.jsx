import React, { useState } from 'react';
import { 
    GitFork, 
    CheckCircle2, 
    ArrowRight, 
    Database, 
    X,
    UserCheck,
    Tag,
    ShoppingBag,
    ShoppingCart,
    CreditCard,
    CheckCircle,
    Layers,
    Server,
    FileText,
    Sparkles
} from 'lucide-react';

export default function FlowchartModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState('flowchart'); // 'flowchart' | 'erd' | 'api'

    const flowchartSteps = [
        {
            num: 1,
            title: 'Mulai & Autentikasi Pengguna',
            condition: 'Sudah Memiliki Akun?',
            options: [
                { label: 'Belum', action: 'Daftar Akun Baru (Form input data diri & password)' },
                { label: 'Sudah', action: 'Masuk Akun (Autentikasi Username/Email + Password)' },
            ],
            icon: UserCheck,
            color: 'text-stone-900 bg-stone-100 border-stone-300',
        },
        {
            num: 2,
            title: 'Eksplorasi & Filter Kategori',
            desc: 'Pengguna menelusuri katalog berdasarkan kategori pilihan yang tersimpan di tabel kategori MySQL.',
            icon: Tag,
            color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
            num: 3,
            title: 'Kurasi Produk & Tambah Keranjang / Wishlist',
            desc: 'Melihat spesifikasi kurasi, harga Rupiah, dan ketersediaan stok fisik secara realtime.',
            icon: ShoppingBag,
            color: 'text-amber-700 bg-amber-50 border-amber-200',
        },
        {
            num: 4,
            title: 'Manajemen Keranjang Belanja',
            condition: 'Ubah Item Pesanan?',
            options: [
                { label: 'Ya', action: 'Atur Kuantitas (Qty) atau Hapus barang' },
                { label: 'Tidak', action: 'Lanjutkan ke Formulir Checkout' },
            ],
            icon: ShoppingCart,
            color: 'text-sky-700 bg-sky-50 border-sky-200',
        },
        {
            num: 5,
            title: 'Checkout & Sinkronisasi Database',
            desc: 'Penyimpanan transaksi otomatis: membuat record di tabel transaksi dan detail_transaksi serta pemotongan stok aman.',
            icon: Database,
            color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        },
        {
            num: 6,
            title: 'Verifikasi & Simulasi Pembayaran',
            condition: 'Status Pembayaran?',
            options: [
                { label: 'Gagal', action: 'Kembali ke tahap Checkout untuk memilih metode lain' },
                { label: 'Sukses', action: 'Status diperbarui menjadi Lunas (Paid) / COD' },
            ],
            icon: CreditCard,
            color: 'text-purple-700 bg-purple-50 border-purple-200',
        },
        {
            num: 7,
            title: 'Pesanan Selesai & Invoice Riwayat',
            desc: 'Pesanan tersimpan permanen di Riwayat Pesanan pelanggan, notifikasi siap diproses studio.',
            icon: CheckCircle,
            color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        },
    ];

    const databaseTables = [
        {
            name: 'user',
            desc: 'Data akun pelanggan dan perajin',
            columns: ['id_user (PK)', 'username', 'email', 'password', 'nama_lengkap', 'no_hp', 'alamat', 'foto', 'created_at']
        },
        {
            name: 'kategori',
            desc: 'Kategori klasifikasi produk kurasi',
            columns: ['id_kategori (PK)', 'nama_kategori', 'keterangan']
        },
        {
            name: 'produk',
            desc: 'Katalog barang kurasi, harga, stok, dan relasi kategori',
            columns: ['id_produk (PK)', 'nama_produk', 'kategori_id (FK)', 'harga', 'stok', 'berat', 'deskripsi', 'is_active']
        },
        {
            name: 'transaksi',
            desc: 'Header transaksi pesanan belanja',
            columns: ['id_transaksi (PK)', 'user_id (FK)', 'tanggal', 'total', 'status', 'metode_pembayaran']
        },
        {
            name: 'detail_transaksi',
            desc: 'Item rincian per produk dalam transaksi pesanan',
            columns: ['id_detail (PK)', 'transaksi_id (FK)', 'produk_id (FK)', 'nama_produk', 'qty', 'harga', 'subtotal']
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[92vh]">
                
                {/* Header (Tokopedia Tech Architecture style) */}
                <div className="px-6 py-4.5 border-b border-stone-200/80 bg-stone-50/80 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-2xs">
                            <GitFork className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-stone-900 tracking-tight">
                                    Arsitektur Sistem &amp; Flowchart Transaksi
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    MySQL Aktif
                                </span>
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                                Implementasi alur belanja web RupaKala &amp; relasi basis data Laravel
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors"
                        title="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-2 border-b border-stone-200/80 text-xs font-semibold bg-stone-50/60 shrink-0">
                    <button
                        onClick={() => setActiveTab('flowchart')}
                        className={`py-3 text-center border-b-2 transition-all ${
                            activeTab === 'flowchart'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Alur Belanja (7 Langkah Flowchart)
                    </button>
                    <button
                        onClick={() => setActiveTab('erd')}
                        className={`py-3 text-center border-b-2 transition-all ${
                            activeTab === 'erd'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Skema Basis Data (5 Tabel ERD)
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-stone-600">
                    
                    {activeTab === 'flowchart' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-xs leading-relaxed">
                                    <span className="font-bold block text-emerald-950">Sistem Berjalan Penuh:</span>
                                    Seluruh alur flowchart (Autentikasi &rarr; Kategori &rarr; Produk &rarr; Keranjang &rarr; Checkout DB &rarr; Verifikasi Pembayaran &rarr; Selesai) telah terhubung nyata ke server database MySQL RupaKala.
                                </div>
                            </div>

                            {/* Stepper Steps */}
                            <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-stone-200 before:top-4 before:bottom-4">
                                {flowchartSteps.map((step) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={step.num} className="relative flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 z-10 shadow-2xs ${step.color}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-stone-300 transition-colors">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                                                        Tahap {step.num}
                                                    </span>
                                                </div>

                                                <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                                                    {step.title}
                                                </h4>

                                                {step.desc && (
                                                    <p className="text-xs text-stone-500 leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                )}

                                                {step.condition && (
                                                    <div className="mt-2.5 pt-2.5 border-t border-stone-100">
                                                        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-stone-700 mb-2">
                                                            Keputusan: {step.condition}
                                                        </span>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                                            {step.options.map((opt, i) => (
                                                                <div key={i} className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                                                                    <span className="font-bold text-stone-800 block mb-0.5">
                                                                        {opt.label === 'Ya' || opt.label === 'Sudah' ? '✓' : '✕'} {opt.label}:
                                                                    </span>
                                                                    <span className="text-stone-500 leading-normal block">
                                                                        {opt.action}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'erd' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 flex items-start gap-3">
                                <Database className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                                <div className="text-xs leading-relaxed">
                                    <span className="font-bold block text-stone-950">Relasi 5 Tabel MySQL:</span>
                                    Setiap tabel tersambung dengan Foreign Key terstruktur: <code>kategori &rarr; produk</code>, <code>user &rarr; transaksi</code>, dan <code>transaksi + produk &rarr; detail_transaksi</code>.
                                </div>
                            </div>

                            <div className="space-y-3">
                                {databaseTables.map((t, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <h4 className="font-mono font-bold text-xs text-stone-900">
                                                    tabel {t.name}
                                                </h4>
                                            </div>
                                            <span className="text-[10px] text-stone-400 font-mono">
                                                {t.columns.length} Kolom
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-stone-500 mb-2.5">
                                            {t.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {t.columns.map((col, cIdx) => (
                                                <span 
                                                    key={cIdx} 
                                                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                                        col.includes('PK') 
                                                            ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300' 
                                                            : col.includes('FK')
                                                            ? 'bg-sky-100 text-sky-900 font-semibold border border-sky-300'
                                                            : 'bg-stone-100 text-stone-700'
                                                    }`}
                                                >
                                                    {col}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500 shrink-0">
                    <span>Arsitektur Web E-Commerce RupaKala</span>
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors text-xs"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
