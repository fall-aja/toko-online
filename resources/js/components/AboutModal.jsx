import React from 'react';
import { 
    X, 
    Sparkles, 
    Heart, 
    ShieldCheck, 
    Leaf, 
    Award, 
    CheckCircle2, 
    Truck, 
    RotateCcw, 
    Users,
    Store
} from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const guarantees = [
        {
            icon: ShieldCheck,
            title: '100% Kurasi Asli',
            desc: 'Setiap produk diseleksi langsung dari perajin dan artisan independen terbaik Indonesia.',
            color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
        },
        {
            icon: RotateCcw,
            title: 'Garansi Mutu 7 Hari',
            desc: 'Jaminan penggantian jika barang diterima cacat atau tidak sesuai deskripsi kurasi.',
            color: 'text-blue-700 bg-blue-50 border-blue-200'
        },
        {
            icon: Leaf,
            title: 'Material Berkelanjutan',
            desc: 'Mengedepankan bahan alami, ramah lingkungan, dan kemasan daur ulang bebas plastik sekali pakai.',
            color: 'text-amber-700 bg-amber-50 border-amber-200'
        },
        {
            icon: Users,
            title: 'Dukung Artisan Lokal',
            desc: 'Sebagian besar hasil penjualan langsung mendukung kelangsungan studio pengrajin tradisional.',
            color: 'text-purple-700 bg-purple-50 border-purple-200'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[92vh]">
                
                {/* Header Banner (Tokopedia Official Store / Mall Story Style) */}
                <div className="relative bg-stone-900 text-stone-50 p-6 sm:p-8">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 flex items-center justify-center transition-colors"
                        title="Tutup"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold tracking-wide mb-3 border border-white/15">
                        <Store className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Official Brand &bull; Toko Kurasi Resmi</span>
                    </div>

                    <h3 className="font-bold text-2xl sm:text-3xl tracking-tight text-white mb-2 font-serif">
                        Tentang RupaKala
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                        Panggung kurasi produk estetis, fungsional, dan bernilai abadi dari para artisan dan desainer independen Indonesia.
                    </p>
                </div>

                {/* Content Body */}
                <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-600">
                    
                    {/* Brand Philosophy */}
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                            <span>Filosofi Rupa &amp; Kala</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-600 font-normal">
                                Makna Identitas
                            </span>
                        </h4>
                        <p className="leading-relaxed text-stone-600">
                            <strong>RupaKala</strong> menyatukan dua kata: <em>"Rupa"</em> (keindahan visual, bentuk, dan keelokan karya) serta <em>"Kala"</em> (waktu dan keabadian). Kami percaya bahwa desain terbaik adalah desain yang tidak lekang oleh tren sesaat, melainkan relevan dan dapat dinikmati sepanjang masa.
                        </p>
                    </div>

                    {/* 4 Guarantees (Tokopedia/Shopee Mall Standards) */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400 mb-3">
                            Standar Jaminan Belanja RupaKala
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {guarantees.map((g, idx) => {
                                const Icon = g.icon;
                                return (
                                    <div 
                                        key={idx}
                                        className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
                                    >
                                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${g.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h5 className="font-bold text-stone-900 mb-0.5 text-xs">
                                                {g.title}
                                            </h5>
                                            <p className="text-[11px] text-stone-500 leading-normal">
                                                {g.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Trust Metrics Bar */}
                    <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 grid grid-cols-3 text-center divide-x divide-stone-800">
                        <div>
                            <span className="font-extrabold text-base sm:text-lg block text-emerald-400">100%</span>
                            <span className="text-[10px] text-stone-400">Kurasi Asli</span>
                        </div>
                        <div>
                            <span className="font-extrabold text-base sm:text-lg block text-amber-400">4.9/5</span>
                            <span className="text-[10px] text-stone-400">Kepuasan Pelanggan</span>
                        </div>
                        <div>
                            <span className="font-extrabold text-base sm:text-lg block text-sky-400">24 Jam</span>
                            <span className="text-[10px] text-stone-400">Dukungan CS</span>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                        <span>Platform Toko Online Resmi &bull; RupaKala Web</span>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-stone-900 text-stone-50 font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-2xs"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
