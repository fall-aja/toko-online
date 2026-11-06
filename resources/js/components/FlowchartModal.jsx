import React, { useState } from 'react';
import { 
    GitFork, 
    CheckCircle2, 
    Database, 
    X,
    UserCheck,
    Tag,
    ShoppingBag,
    ShoppingCart,
    CreditCard,
    CheckCircle,
    Server,
    ExternalLink,
    FileText,
    Image as ImageIcon
} from 'lucide-react';

export default function FlowchartModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState('flowchart'); // 'flowchart' | 'erd' | 'diagram_view'
    const [diagramType, setDiagramType] = useState('erd'); // 'erd' | 'flowchart'

    // 5 Tahap Flowchart Sesuai Flowchart Toko-Online
    const flowchartSteps = [
        {
            num: 1,
            title: 'Autentikasi Pengguna',
            desc: 'Pintu masuk pengguna ke sistem dengan validasi akun terenkripsi.',
            condition: 'Sudah punya akun?',
            options: [
                { 
                    label: 'Sudah', 
                    action: 'Login: input username/email & password -> Validasi data -> Simpan sesi login' 
                },
                { 
                    label: 'Belum', 
                    action: 'Registrasi: isi data diri & password -> Validasi data -> Simpan sesi login' 
                },
            ],
            icon: UserCheck,
            color: 'text-stone-900 bg-stone-100 border-stone-300',
        },
        {
            num: 2,
            title: 'Katalog dan Keranjang',
            desc: 'Pengguna menelusuri katalog, filter kategori, urutkan harga, serta memilih varian produk (ukuran & warna).',
            condition: 'Beli sekarang?',
            options: [
                { 
                    label: 'Tidak', 
                    action: 'Tambahkan ke keranjang belanja (tabel cart_items) -> Selesai / Lanjut cari produk' 
                },
                { 
                    label: 'Ya', 
                    action: 'Atur kuantitas (qty) atau hapus item -> Lanjutkan ke tahap Checkout & Pembayaran' 
                },
            ],
            icon: ShoppingBag,
            color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
            num: 3,
            title: 'Checkout dan Pembayaran',
            desc: 'Pengisian data alamat pengiriman dan pemilihan channel transaksi pembayaran.',
            condition: 'Metode & Verifikasi Pembayaran',
            options: [
                { 
                    label: 'Pilihan Metode', 
                    action: 'Transfer Bank | E-Wallet | Bayar di Tempat (COD)' 
                },
                { 
                    label: 'Cek Status Bayar', 
                    action: 'Jika GAGAL: Tampilkan notifikasi error & ulangi checkout. Jika BERHASIL: Kirim ke server' 
                },
            ],
            icon: CreditCard,
            color: 'text-amber-700 bg-amber-50 border-amber-200',
        },
        {
            num: 4,
            title: 'Proses Pesanan di Server',
            desc: 'Backend Laravel memproses ACID transaction: validasi stok, pencatatan pesanan, pembayaran, detail item, & pemotongan stok aman.',
            condition: 'Pengecekan Stok & Status COD',
            options: [
                { 
                    label: 'Cek Stok Fisik', 
                    action: 'Jika stok kurang -> Tolak transaksi. Jika cukup -> Simpan ke tabel orders & payments' 
                },
                { 
                    label: 'Status Otomatis', 
                    action: 'Metode COD = Status "pending". Non-COD = Status "paid". Simpan ke order_items & kurangi stok produk' 
                },
            ],
            icon: Server,
            color: 'text-sky-700 bg-sky-50 border-sky-200',
        },
        {
            num: 5,
            title: 'Hasil Pesanan & Distribusi',
            desc: 'Pesanan tersimpan permanen di database MySQL dan siap dipantau status pengirimannya.',
            condition: 'Alur Status Pesanan',
            options: [
                { 
                    label: 'Pesanan Masuk', 
                    action: 'Tampilkan notifikasi pesanan berhasil & simpan ke Riwayat Pesanan pelanggan' 
                },
                { 
                    label: 'Siklus Pengiriman', 
                    action: 'Pesanan dikirim (status "shipped") -> Pesanan diterima (status "completed") -> Selesai' 
                },
            ],
            icon: CheckCircle,
            color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        },
    ];

    // 7 Tabel Sesuai ERD Toko-Online
    const databaseTables = [
        {
            name: 'USERS',
            desc: 'Menyimpan data identitas pengguna, kredensial login, kontak, dan foto profil.',
            relations: 'Relasi: membuat -> ORDERS, menambahkan -> CART_ITEMS',
            columns: [
                { name: 'user_id', type: 'int', key: 'PK' },
                { name: 'username', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'password', type: 'string' },
                { name: 'nama_lengkap', type: 'string' },
                { name: 'no_hp', type: 'string' },
                { name: 'alamat', type: 'string' },
                { name: 'foto', type: 'text' },
            ]
        },
        {
            name: 'CATEGORIES',
            desc: 'Klasifikasi kategori kurasi produk.',
            relations: 'Relasi: mengelompokkan -> PRODUCTS',
            columns: [
                { name: 'category_id', type: 'int', key: 'PK' },
                { name: 'nama_kategori', type: 'string' },
            ]
        },
        {
            name: 'PRODUCTS',
            desc: 'Daftar produk, harga, ketersediaan stok, berat, serta varian ukuran dan warna (JSON).',
            relations: 'Relasi: FK category_id -> CATEGORIES | dipilih_di -> CART_ITEMS | dipesan -> ORDER_ITEMS',
            columns: [
                { name: 'product_id', type: 'int', key: 'PK' },
                { name: 'category_id', type: 'int', key: 'FK' },
                { name: 'nama_produk', type: 'string' },
                { name: 'deskripsi', type: 'text' },
                { name: 'harga', type: 'decimal' },
                { name: 'stok', type: 'int' },
                { name: 'berat_gram', type: 'int' },
                { name: 'ukuran', type: 'json' },
                { name: 'warna', type: 'json' },
                { name: 'is_active', type: 'boolean' },
            ]
        },
        {
            name: 'CART_ITEMS',
            desc: 'Item produk yang dipilih oleh user sebelum melakukan checkout pembelian.',
            relations: 'Relasi: FK user_id -> USERS | FK product_id -> PRODUCTS',
            columns: [
                { name: 'cart_item_id', type: 'int', key: 'PK' },
                { name: 'user_id', type: 'int', key: 'FK' },
                { name: 'product_id', type: 'int', key: 'FK' },
                { name: 'ukuran', type: 'string' },
                { name: 'warna', type: 'string' },
                { name: 'jumlah', type: 'int' },
            ]
        },
        {
            name: 'ORDERS',
            desc: 'Header transaksi pesanan belanja pelanggan dengan tanggal dan total harga.',
            relations: 'Relasi: FK user_id -> USERS | berisi -> ORDER_ITEMS | memiliki -> PAYMENTS',
            columns: [
                { name: 'order_id', type: 'int', key: 'PK' },
                { name: 'user_id', type: 'int', key: 'FK' },
                { name: 'tanggal_pesan', type: 'datetime' },
                { name: 'total_harga', type: 'decimal' },
                { name: 'status_pesanan', type: 'string' },
            ]
        },
        {
            name: 'ORDER_ITEMS',
            desc: 'Rincian produk dan kuantitas barang yang dipesan dalam satu order pesanan.',
            relations: 'Relasi: FK order_id -> ORDERS | FK product_id -> PRODUCTS',
            columns: [
                { name: 'order_item_id', type: 'int', key: 'PK' },
                { name: 'order_id', type: 'int', key: 'FK' },
                { name: 'product_id', type: 'int', key: 'FK' },
                { name: 'nama_produk', type: 'string' },
                { name: 'jumlah', type: 'int' },
                { name: 'harga_satuan', type: 'decimal' },
                { name: 'subtotal', type: 'decimal' },
            ]
        },
        {
            name: 'PAYMENTS',
            desc: 'Pencatatan rincian pembayaran untuk setiap order (Transfer / E-Wallet / COD).',
            relations: 'Relasi: FK order_id -> ORDERS',
            columns: [
                { name: 'payment_id', type: 'int', key: 'PK' },
                { name: 'order_id', type: 'int', key: 'FK' },
                { name: 'metode_pembayaran', type: 'string' },
                { name: 'status_pembayaran', type: 'string' },
                { name: 'tanggal_bayar', type: 'datetime' },
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[92vh]">
                
                {/* Header */}
                <div className="px-6 py-4.5 border-b border-stone-200/80 bg-stone-50/80 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-2xs">
                            <GitFork className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-stone-900 tracking-tight">
                                    Arsitektur Sistem &amp; Skema ERD Toko-Online
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    7 Tabel MySQL Aktif
                                </span>
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                                Implementasi alur belanja web &amp; relasi basis data MySQL Laravel
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
                <div className="grid grid-cols-3 border-b border-stone-200/80 text-xs font-semibold bg-stone-50/60 shrink-0">
                    <button
                        onClick={() => setActiveTab('flowchart')}
                        className={`py-3 text-center border-b-2 transition-all ${
                            activeTab === 'flowchart'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Alur Belanja (5 Tahap Flowchart)
                    </button>
                    <button
                        onClick={() => setActiveTab('erd')}
                        className={`py-3 text-center border-b-2 transition-all ${
                            activeTab === 'erd'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Skema Basis Data (7 Tabel ERD)
                    </button>
                    <button
                        onClick={() => setActiveTab('diagram_view')}
                        className={`py-3 text-center border-b-2 transition-all ${
                            activeTab === 'diagram_view'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Lihat Gambar Diagram Asli
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-stone-600">
                    
                    {/* TAB 1: FLOWCHART */}
                    {activeTab === 'flowchart' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-xs leading-relaxed">
                                    <span className="font-bold block text-emerald-950">Alur Flowchart Aktif &amp; Terintegrasi:</span>
                                    Seluruh alur flowchart (Autentikasi &rarr; Katalog &amp; Keranjang &rarr; Checkout &amp; Pembayaran &rarr; Proses Server MySQL &rarr; Hasil Pesanan) telah berjalan secara nyata pada database dan API web ini.
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
                                                            Pengecekan: {step.condition}
                                                        </span>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                                            {step.options.map((opt, i) => (
                                                                <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                                                                    <span className="font-bold text-stone-800 block mb-1">
                                                                        {opt.label}:
                                                                    </span>
                                                                    <span className="text-stone-600 leading-relaxed block">
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

                    {/* TAB 2: ERD */}
                    {activeTab === 'erd' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 flex items-start gap-3">
                                <Database className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                                <div className="text-xs leading-relaxed">
                                    <span className="font-bold block text-stone-950">Relasi 7 Tabel MySQL (Sesuai Diagram ERD Toko-Online):</span>
                                    Setiap tabel terhubung dengan relasi Foreign Key yang presisi: <code>CATEGORIES &rarr; PRODUCTS</code>, <code>USERS &rarr; CART_ITEMS</code>, <code>USERS &rarr; ORDERS</code>, <code>ORDERS &rarr; ORDER_ITEMS</code>, <code>PRODUCTS &rarr; ORDER_ITEMS</code>, dan <code>ORDERS &rarr; PAYMENTS</code>.
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3.5">
                                {databaseTables.map((t, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                                <h4 className="font-mono font-bold text-xs text-stone-900 tracking-wide">
                                                    TABEL: {t.name}
                                                </h4>
                                            </div>
                                            <span className="text-[10px] text-stone-400 font-mono">
                                                {t.columns.length} Kolom
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-stone-500 mb-2">
                                            {t.desc}
                                        </p>
                                        <div className="text-[10px] font-mono text-stone-600 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/70 mb-2.5">
                                            {t.relations}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {t.columns.map((col, cIdx) => (
                                                <span 
                                                    key={cIdx} 
                                                    className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 ${
                                                        col.key === 'PK'
                                                            ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300' 
                                                            : col.key === 'FK'
                                                            ? 'bg-sky-100 text-sky-900 font-semibold border border-sky-300'
                                                            : 'bg-stone-100 text-stone-700'
                                                    }`}
                                                >
                                                    <span className="opacity-60 text-[9px]">{col.type}</span>
                                                    <span className="font-semibold">{col.name}</span>
                                                    {col.key && <strong className="text-[9px] font-extrabold">[{col.key}]</strong>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: DIAGRAM VIEW */}
                    {activeTab === 'diagram_view' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setDiagramType('erd')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            diagramType === 'erd'
                                                ? 'bg-stone-900 text-white'
                                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                        }`}
                                    >
                                        Lihat Diagram ERD (7 Tabel)
                                    </button>
                                    <button
                                        onClick={() => setDiagramType('flowchart')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            diagramType === 'flowchart'
                                                ? 'bg-stone-900 text-white'
                                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                        }`}
                                    >
                                        Lihat Diagram Flowchart (5 Tahap)
                                    </button>
                                </div>

                                <a
                                    href={diagramType === 'erd' ? '/images/diagrams/erd-toko-online.png' : '/images/diagrams/flowchart-toko-online.png'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 hover:text-stone-900 underline"
                                >
                                    <span>Buka Gambar Asli Resolusi Penuh</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            <div className="bg-stone-950 rounded-2xl p-3 flex justify-center items-center overflow-auto max-h-[60vh] border border-stone-800">
                                <img
                                    src={diagramType === 'erd' ? '/images/diagrams/erd-toko-online.png' : '/images/diagrams/flowchart-toko-online.png'}
                                    alt={diagramType === 'erd' ? 'ERD Toko-Online' : 'Flowchart Toko-Online'}
                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500 shrink-0">
                    <span className="font-mono text-[11px]">Database: MySQL toko_online (7 Tabel)</span>
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
