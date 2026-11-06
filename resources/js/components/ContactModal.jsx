import React, { useState } from 'react';
import { 
    X, 
    Phone, 
    Mail, 
    MapPin, 
    MessageCircle, 
    Clock, 
    Send, 
    CheckCircle2, 
    Copy, 
    ExternalLink, 
    HelpCircle, 
    ShieldCheck, 
    Sparkles 
} from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [submitted, setSubmitted] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('Pertanyaan Produk');
    const [message, setMessage] = useState('');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const helpTopics = [
        '📦 Lacak Pengiriman',
        '💳 Konfirmasi Pembayaran',
        '🔄 Retur & Garansi',
        '🎨 Kemitraan Artisan',
        '💬 Pertanyaan Produk'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const code = `RPK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomNum}`;
        setTicketNumber(code);
        setSubmitted(true);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('halo@rupakala.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleReset = () => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[92vh]">
                
                {/* Header: RupaKala Care (Tokopedia Care & Shopee Bantuan Style) */}
                <div className="px-6 py-4.5 border-b border-stone-200/80 bg-stone-50/80 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-2xs">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-stone-900 tracking-tight">
                                    Pusat Bantuan & Layanan Pelanggan
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                                <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    CS Aktif Online
                                </span>
                                <span>&bull;</span>
                                <span>Respon rata-rata &lt; 10 menit</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors"
                        title="Tutup Pusat Bantuan"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-600">
                    
                    {/* 1. Official Communication Channels */}
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2.5">
                            Kanal Komunikasi Resmi
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            
                            {/* WhatsApp Official Support */}
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20RupaKala%20Customer%20Care%2C%20saya%20ingin%20bertanya%20seputar%20pesanan%20dan%20kurasi%20produk."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-xs text-stone-900 flex items-start gap-3 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-stone-950 group-hover:text-emerald-700 transition-colors">
                                            WhatsApp CS
                                        </span>
                                        <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-mono text-stone-700 block mt-0.5">
                                        +62 812-3456-7890
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-medium">
                                        Respon langsung chat
                                    </span>
                                </div>
                            </a>

                            {/* Official Email Desk */}
                            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-xs text-stone-900 flex items-start gap-3 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-stone-950">
                                            Email Kurator
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="text-stone-400 hover:text-stone-900 transition-colors"
                                            title="Salin alamat email"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <span className="text-xs font-mono text-stone-700 block mt-0.5 truncate">
                                        halo@rupakala.com
                                    </span>
                                    <span className="text-[10px] text-stone-500">
                                        {copiedEmail ? 'Alamat disalin!' : 'Layanan 1x24 jam'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Studio Fisik & Jam Operasional */}
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-stone-200/70 text-stone-700 flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-stone-900 block text-xs">
                                        Studio & Galeri Fisik RupaKala
                                    </span>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] text-stone-700 hover:text-stone-950 font-semibold hover:underline inline-flex items-center gap-1"
                                    >
                                        <span>Peta</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                <span className="text-[11px] text-stone-500 leading-relaxed block mt-0.5">
                                    Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-2 border-t border-stone-200/60">
                            <div className="w-8 h-8 rounded-lg bg-stone-200/70 text-stone-700 flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="font-bold text-stone-900 block text-xs">
                                    Jam Operasional Layanan
                                </span>
                                <span className="text-[11px] text-stone-500 block mt-0.5">
                                    Senin &ndash; Sabtu: 09:00 &ndash; 18:00 WIB &bull; Minggu / Hari Libur: Layanan Tiket Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Quick Inquiry Form (Tokopedia Care Ticket style) */}
                    <div>
                        {submitted ? (
                            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3 animate-in fade-in">
                                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-sm text-emerald-950">
                                        Pertanyaan Anda Berhasil Diterima!
                                    </h4>
                                    <p className="text-xs text-emerald-800 mt-1">
                                        Nomor Tiket Layanan:{' '}
                                        <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                                            {ticketNumber}
                                        </span>
                                    </p>
                                    <p className="text-[11px] text-emerald-700 mt-2 max-w-sm mx-auto leading-relaxed">
                                        Tim RupaKala telah menerima pesan dari <strong>{name || 'Anda'}</strong> ({email}) dan akan menghubungi Anda secepatnya.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors inline-block"
                                >
                                    Selesai & Tutup
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-stone-900">
                                        Kirim Pertanyaan / Bantuan Langsung
                                    </span>
                                    <span className="text-[11px] text-stone-400">
                                        Respon via Email / WhatsApp
                                    </span>
                                </div>

                                {/* Topic Selector Pills */}
                                <div>
                                    <label className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                                        Pilih Topik Pertanyaan:
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {helpTopics.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setTopic(t)}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                                                    topic === t
                                                        ? 'bg-stone-900 text-white shadow-2xs'
                                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                                }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: Budi Pratama"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                            Alamat Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="nama@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                        Pesan atau Pertanyaan
                                    </label>
                                    <textarea
                                        required
                                        rows="3"
                                        placeholder="Jelaskan kebutuhan, pertanyaan pesanan, atau kendala yang Anda alami..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Kirim Tiket Pertanyaan</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
