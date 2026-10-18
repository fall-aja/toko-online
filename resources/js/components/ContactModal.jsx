import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setMessage('');
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-stone-900">Hubungi RupaKala</h3>
                            <p className="text-[11px] text-stone-500">Layanan Pelanggan & Informasi Kurasi</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 space-y-5 text-xs text-stone-600">
                    {/* Quick Contacts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                            href="https://wa.me/6281234567890?text=Halo%20RupaKala%2C%20saya%20ingin%20bertanya%20mengenai%20produk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-300 text-emerald-900 flex items-center gap-3 transition-colors group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="font-bold block text-emerald-950 group-hover:underline">WhatsApp CS</span>
                                <span className="text-[11px] text-emerald-700">+62 812-3456-7890</span>
                            </div>
                        </a>

                        <a
                            href="mailto:support@rupakala.com"
                            className="p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 text-stone-800 flex items-center gap-3 transition-colors group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="font-bold block text-stone-900 group-hover:underline">Email Resmi</span>
                                <span className="text-[11px] text-stone-500">halo@rupakala.com</span>
                            </div>
                        </a>
                    </div>

                    {/* Operational Details */}
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2">
                        <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-stone-900 block">Studio & Galeri</span>
                                <span className="text-[11px] text-stone-500">Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 pt-1">
                            <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-stone-900 block">Jam Operasional</span>
                                <span className="text-[11px] text-stone-500">Senin &ndash; Sabtu: 09:00 &ndash; 18:00 WIB</span>
                            </div>
                        </div>
                    </div>

                    {/* Message Form */}
                    {submitted ? (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div>
                                <p className="font-bold text-xs">Pesan Anda Berhasil Terkirim!</p>
                                <p className="text-[11px] text-emerald-700">Tim RupaKala akan segera merespons pertanyaan Anda.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="font-bold text-stone-900">Kirim Pertanyaan Cepat</div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama Anda"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Email Anda"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <textarea
                                    required
                                    rows="2"
                                    placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Kirim Pesan</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
