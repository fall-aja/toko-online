import React from 'react';
import { X, Sparkles, Heart, ShieldCheck, Leaf, Award } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
                {/* Header Banner */}
                <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 text-stone-50 p-6 sm:p-8">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium tracking-wide mb-3 backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Koleksi Eksklusif &bull; Nilai Seni & Desain</span>
                    </div>
                    <h3 className="font-bold text-2xl sm:text-3xl tracking-tight text-white mb-2">
                        Tentang RupaKala
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                        Ruang kurasi produk estetis, fungsional, dan bernilai abadi dari para artisan dan perancang lokal Indonesia.
                    </p>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5 text-xs text-stone-600">
                    <div>
                        <h4 className="font-bold text-sm text-stone-900 mb-1.5">Filosofi Nama</h4>
                        <p className="leading-relaxed">
                            <strong>RupaKala</strong> berakar dari kata <em>"Rupa"</em> (bentuk, keindahan visual, dan estetika) serta <em>"Kala"</em> (waktu dan keabadian). Kami percaya bahwa setiap produk berkualitas harus memiliki desain yang menawan sekaligus relevan melintasi berbagai era.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                            <Leaf className="w-4 h-4 text-emerald-700 mb-1.5" />
                            <h5 className="font-bold text-stone-900 mb-0.5">Material Jujur</h5>
                            <p className="text-[11px] text-stone-500 leading-normal">
                                Mengutamakan material alami berkualitas tinggi dan ramah lingkungan.
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                            <Award className="w-4 h-4 text-amber-700 mb-1.5" />
                            <h5 className="font-bold text-stone-900 mb-0.5">Kualitas Teruji</h5>
                            <p className="text-[11px] text-stone-500 leading-normal">
                                Setiap barang melalui proses seleksi ketat sebelum sampai ke tangan Anda.
                            </p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                        <span>Platform Toko Online Resmi &bull; Laravel + React</span>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-stone-900 text-stone-50 font-semibold rounded-full hover:bg-stone-800 transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
