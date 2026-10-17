import React from 'react';
import { 
    GitFork, 
    CheckCircle2, 
    ArrowRight, 
    ArrowDown, 
    Database, 
    X,
    UserCheck,
    Tag,
    ShoppingBag,
    ShoppingCart,
    CreditCard,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

export default function FlowchartModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const flowchartSteps = [
        {
            num: 1,
            title: 'Mulai & Autentikasi Pengguna',
            condition: 'Sudah Terdaftar?',
            options: [
                { label: 'Tidak', action: 'Form Registrasi User (username, email, pass, nama, no_hp, alamat)' },
                { label: 'Ya', action: 'Login Akun' },
            ],
            icon: UserCheck,
            color: 'text-blue-600 bg-blue-50 border-blue-200',
        },
        {
            num: 2,
            title: 'Pilih Kategori',
            desc: 'Pengguna memfilter produk berdasarkan kategori yang diinginkan pada database tabel kategori.',
            icon: Tag,
            color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        },
        {
            num: 3,
            title: 'Pilih Produk & Tambah ke Keranjang',
            desc: 'Melihat rincian produk (harga, stok, berat, deskripsi) dan memasukkan produk ke keranjang belanja.',
            icon: ShoppingBag,
            color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        },
        {
            num: 4,
            title: 'Lihat Keranjang & Manajemen Item',
            condition: 'Ubah Isi Keranjang?',
            options: [
                { label: 'Ya', action: 'Ubah Jumlah (Qty) atau Hapus Item dari keranjang' },
                { label: 'Tidak', action: 'Lanjut ke proses Checkout Pesanan' },
            ],
            icon: ShoppingCart,
            color: 'text-amber-600 bg-amber-50 border-amber-200',
        },
        {
            num: 5,
            title: 'Checkout & Simpan ke DB',
            desc: 'Menyimpan data pesanan ke Tabel Transaksi (total, status, metode_pembayaran) dan Tabel Detail Transaksi (produk_id, qty, harga, subtotal).',
            icon: Database,
            color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
        },
        {
            num: 6,
            title: 'Verifikasi Pembayaran',
            condition: 'Pembayaran Berhasil?',
            options: [
                { label: 'Gagal', action: 'Kembali ke tahap Checkout Pesanan untuk mencoba metode lain' },
                { label: 'Berhasil', action: 'Transaksi Selesai & status pesanan diperbarui menjadi Paid' },
            ],
            icon: CreditCard,
            color: 'text-purple-600 bg-purple-50 border-purple-200',
        },
        {
            num: 7,
            title: 'Transaksi Selesai',
            desc: 'Pesanan tersimpan di riwayat transaksi pengguna, stok produk terpotong otomatis di database.',
            icon: CheckCircle,
            color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <GitFork className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">
                                Alur Sistem <em className="font-editorial font-bold not-italic">RupaKala</em> (Flowchart & Relasi ERD)
                            </h3>
                            <p className="text-xs text-slate-500">
                                Berdasarkan diagram rancangan arsitektur database dan alur transaksi
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-emerald-900">
                            <span className="font-semibold block">Sistem Terintegrasi Penuh:</span>
                            Seluruh alur dari flowchart gambar (Registrasi &rarr; Pilih Kategori &rarr; Pilih Produk &rarr; Keranjang &rarr; Checkout &rarr; Transaksi & Detail DB &rarr; Pembayaran) telah aktif berjalan dengan database MySQL/Laravel.
                        </div>
                    </div>

                    <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:top-4 before:bottom-4">
                        {flowchartSteps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.num} className="relative flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 z-10 shadow-xs ${step.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Langkah {step.num}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                                            {step.title}
                                        </h4>
                                        {step.desc && (
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        )}
                                        {step.condition && (
                                            <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                                                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 mb-2">
                                                    Percabangan: {step.condition}
                                                </span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                    {step.options.map((opt, i) => (
                                                        <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                                                            <span className="font-bold text-slate-800 block text-[11px]">
                                                                &bull; {opt.label}:
                                                            </span>
                                                            <span className="text-slate-600 text-[11px]">
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

                {/* Footer */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                        Tutup Panduan
                    </button>
                </div>
            </div>
        </div>
    );
}
