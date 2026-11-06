import React, { useState, useEffect, useRef } from 'react';
import { 
    X, 
    User, 
    Mail, 
    Lock, 
    Phone, 
    MapPin, 
    UserPlus, 
    LogIn, 
    LogOut, 
    Camera, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    Loader2, 
    Image, 
    Trash2, 
    ShieldCheck, 
    Sparkles, 
    BadgeCheck,
    RotateCcw
} from 'lucide-react';
import { formatDate, getInitials } from '../utils';

// Curated avatar presets for quick selection
const AVATAR_PRESETS = [
    { label: 'Kurator Seni', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    { label: 'Artisan Nusantara', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
    { label: 'Desainer Studio', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
    { label: 'Pengrajin Kriya', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
    { label: 'Penata Tekstil', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80' },
    { label: 'Kolektor Rupa', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
];

export default function AuthModal({
    isOpen,
    onClose,
    currentUser,
    onLogin,
    onRegister,
    onSwitchUser,
    onLogout,
    onUpdateProfile,
    initialMode = 'profile'
}) {
    if (!isOpen) return null;

    const [mode, setMode] = useState(currentUser ? initialMode : 'login'); // 'profile', 'login', 'register'
    
    // Login form state
    const [identifier, setIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Register form states
    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regNamaLengkap, setRegNamaLengkap] = useState('');
    const [regNoHp, setRegNoHp] = useState('');
    const [regAlamat, setRegAlamat] = useState('');

    // Profile Edit States
    const [editNama, setEditNama] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editNoHp, setEditNoHp] = useState('');
    const [editAlamat, setEditAlamat] = useState('');
    const [editFoto, setEditFoto] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'error' | 'success', text: string }

    const fileInputRef = useRef(null);

    // Sync profile fields with currentUser when opened or changed
    useEffect(() => {
        if (currentUser) {
            setEditNama(currentUser.nama_lengkap || '');
            setEditUsername(currentUser.username || '');
            setEditEmail(currentUser.email || '');
            setEditNoHp(currentUser.no_hp || '');
            setEditAlamat(currentUser.alamat || '');
            setEditFoto(currentUser.foto || '');
            setEditPassword('');
        }
    }, [currentUser, isOpen]);

    // Handle Login Submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage(null);
        try {
            const res = await onLogin(identifier, loginPassword);
            if (res.success) {
                setStatusMessage({ type: 'success', text: res.message || 'Login berhasil!' });
                setTimeout(() => {
                    setMode('profile');
                    setStatusMessage(null);
                }, 800);
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'Username/email atau password salah.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Terjadi kesalahan sistem.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle Register Submit
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage(null);
        try {
            const payload = {
                username: regUsername,
                email: regEmail,
                password: regPassword,
                nama_lengkap: regNamaLengkap,
                no_hp: regNoHp,
                alamat: regAlamat,
            };
            const res = await onRegister(payload);
            if (res.success) {
                setStatusMessage({ type: 'success', text: res.message || 'Registrasi berhasil!' });
                setTimeout(() => {
                    setMode('profile');
                    setStatusMessage(null);
                }, 800);
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'Registrasi gagal.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Terjadi kesalahan registrasi.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle Profile Save
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!onUpdateProfile) return;

        setLoading(true);
        setStatusMessage(null);

        try {
            const payload = {
                nama_lengkap: editNama,
                username: editUsername,
                email: editEmail,
                no_hp: editNoHp,
                alamat: editAlamat,
                foto: editFoto,
            };
            if (editPassword.trim()) {
                payload.password = editPassword;
            }

            const res = await onUpdateProfile(payload);
            if (res.success) {
                setStatusMessage({ type: 'success', text: res.message || 'Profil Anda berhasil disimpan!' });
                setIsAvatarPickerOpen(false);
                setEditPassword('');
                setTimeout(() => setStatusMessage(null), 3500);
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'Gagal menyimpan profil.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Gagal menyimpan perubahan.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle Photo File Upload
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setStatusMessage({ type: 'error', text: 'Ukuran foto maksimal 2MB.' });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditFoto(reader.result);
            setIsAvatarPickerOpen(false);
            setStatusMessage({ type: 'success', text: 'Foto baru terpilih! Klik "Simpan Perubahan" untuk menyimpan.' });
        };
        reader.readAsDataURL(file);
    };

    const handleSwitch = async (userId) => {
        setLoading(true);
        setStatusMessage(null);
        await onSwitchUser(userId);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200/90 overflow-hidden my-6 flex flex-col max-h-[92vh]">
                
                {/* Header (Tokopedia / Shopee Web Style) */}
                <div className="px-6 py-4.5 border-b border-stone-200/80 bg-stone-50/80 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-2xs">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-stone-900 tracking-tight">
                                {mode === 'profile' ? 'Profil Pengguna RupaKala' : mode === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
                            </h3>
                            <p className="text-xs text-stone-500 mt-0.5">
                                {mode === 'profile' 
                                    ? 'Kelola informasi identitas, foto profil, dan alamat pengiriman' 
                                    : 'Akses keranjang tersimpan, wishlist, dan pelacakan pesanan'}
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

                {/* Sub-nav Tabs */}
                <div className="grid grid-cols-3 border-b border-stone-200/80 text-xs font-semibold bg-stone-50/60 shrink-0">
                    <button
                        onClick={() => { setMode('profile'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-all ${
                            mode === 'profile'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Profil Saya
                    </button>
                    <button
                        onClick={() => { setMode('login'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-all ${
                            mode === 'login'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Masuk (Login)
                    </button>
                    <button
                        onClick={() => { setMode('register'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-all ${
                            mode === 'register'
                                ? 'border-stone-950 text-stone-950 bg-white font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        Daftar Baru
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    
                    {/* Status Feedback Toast */}
                    {statusMessage && (
                        <div className={`p-3 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in ${
                            statusMessage.type === 'success'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                            {statusMessage.type === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                            <span className="font-medium">{statusMessage.text}</span>
                        </div>
                    )}

                    {/* MODE 1: Profile View & Edit */}
                    {mode === 'profile' && (
                        <div className="space-y-6">
                            {!currentUser ? (
                                <div className="text-center py-10">
                                    <User className="w-12 h-12 mx-auto text-stone-300 mb-2 stroke-1" />
                                    <h4 className="font-bold text-sm text-stone-800">Anda Belum Masuk</h4>
                                    <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                                        Silakan masuk atau daftar akun untuk melihat dan mengubah profil Anda.
                                    </p>
                                    <button
                                        onClick={() => setMode('login')}
                                        className="mt-4 px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                                    >
                                        Masuk ke Akun
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleProfileSubmit} className="space-y-5">
                                    
                                    {/* 1. Avatar Photo Box (Tokopedia/Shopee Profile Photo) */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-center gap-4.5">
                                        
                                        {/* Avatar Thumbnail with Camera Action */}
                                        <div className="relative group shrink-0">
                                            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-stone-200 border-2 border-white shadow-md flex items-center justify-center">
                                                {editFoto ? (
                                                    <img
                                                        src={editFoto}
                                                        alt={currentUser.nama_lengkap}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl font-bold text-stone-800 tracking-wider">
                                                        {getInitials(currentUser.nama_lengkap)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Camera change button overlay */}
                                            <button
                                                type="button"
                                                onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
                                                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-stone-900 text-white hover:bg-stone-800 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                                                title="Ganti Foto Profil"
                                            >
                                                <Camera className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Avatar Actions & Info */}
                                        <div className="min-w-0 flex-1 text-center sm:text-left">
                                            <div className="flex items-center justify-center sm:justify-start gap-1.5">
                                                <h4 className="font-extrabold text-base text-stone-950 truncate">
                                                    {currentUser.nama_lengkap}
                                                </h4>
                                                <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                            </div>

                                            <p className="text-xs text-stone-500 font-mono mt-0.5">
                                                @{currentUser.username} &bull; ID #{currentUser.id_user}
                                            </p>

                                            {/* Photo action buttons */}
                                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold text-xs transition-colors shadow-2xs"
                                                >
                                                    Pilih Foto Komputer
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
                                                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold text-xs transition-colors shadow-2xs"
                                                >
                                                    Koleksi Avatar
                                                </button>

                                                {editFoto && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditFoto('')}
                                                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                        title="Hapus Foto"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preset Avatar Selection Grid */}
                                    {isAvatarPickerOpen && (
                                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 animate-in fade-in">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-stone-900">
                                                    Pilih Avatar Ilustrasi / Kurator:
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsAvatarPickerOpen(false)}
                                                    className="text-stone-400 hover:text-stone-700 text-xs"
                                                >
                                                    Tutup
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                                                {AVATAR_PRESETS.map((p, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            setEditFoto(p.url);
                                                            setIsAvatarPickerOpen(false);
                                                        }}
                                                        className="group flex flex-col items-center gap-1 focus:outline-none"
                                                    >
                                                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                                                            editFoto === p.url
                                                                ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105'
                                                                : 'border-white hover:border-stone-400'
                                                        }`}>
                                                            <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="text-[10px] text-stone-500 group-hover:text-stone-900 truncate w-full text-center">
                                                            {p.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. Personal Information Fields (Nama, Username, Email, No HP, Alamat) */}
                                    <div className="space-y-3.5 text-xs">
                                        <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                                            <span className="font-bold text-xs uppercase tracking-wider text-stone-400">
                                                Biodata Diri Pengguna
                                            </span>
                                            <span className="text-[10px] text-stone-400">
                                                Tersimpan di tabel MySQL user
                                            </span>
                                        </div>

                                        {/* Nama Lengkap */}
                                        <div>
                                            <label className="font-semibold text-stone-700 block mb-1">
                                                Nama Lengkap <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={editNama}
                                                onChange={(e) => setEditNama(e.target.value)}
                                                placeholder="Nama lengkap Anda..."
                                                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 font-medium"
                                            />
                                        </div>

                                        {/* Grid: Username & Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="font-semibold text-stone-700 block mb-1">
                                                    Username <span className="text-rose-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-xs">@</span>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={editUsername}
                                                        onChange={(e) => setEditUsername(e.target.value)}
                                                        placeholder="username"
                                                        className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 font-mono text-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="font-semibold text-stone-700 block mb-1">
                                                    Alamat Email <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={editEmail}
                                                    onChange={(e) => setEditEmail(e.target.value)}
                                                    placeholder="nama@email.com"
                                                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                                />
                                            </div>
                                        </div>

                                        {/* Nomor HP / WhatsApp */}
                                        <div>
                                            <label className="font-semibold text-stone-700 block mb-1">
                                                Nomor Telepon / WhatsApp
                                            </label>
                                            <input
                                                type="tel"
                                                value={editNoHp}
                                                onChange={(e) => setEditNoHp(e.target.value)}
                                                placeholder="081234567890"
                                                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs font-mono"
                                            />
                                        </div>

                                        {/* Alamat Pengiriman */}
                                        <div>
                                            <label className="font-semibold text-stone-700 block mb-1">
                                                Alamat Pengiriman Utama
                                            </label>
                                            <textarea
                                                rows="2"
                                                value={editAlamat}
                                                onChange={(e) => setEditAlamat(e.target.value)}
                                                placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kota, kode pos..."
                                                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs resize-none"
                                            />
                                        </div>

                                        {/* Ganti Password (Opsional) */}
                                        <div>
                                            <label className="font-semibold text-stone-700 block mb-1">
                                                Ganti Password <span className="text-stone-400 font-normal">(Kosongkan jika tidak ingin diubah)</span>
                                            </label>
                                            <input
                                                type="password"
                                                value={editPassword}
                                                onChange={(e) => setEditPassword(e.target.value)}
                                                placeholder="Minimal 6 karakter"
                                                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons: Simpan Perubahan */}
                                    <div className="pt-2 flex items-center gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            <span>Simpan Perubahan Profil</span>
                                        </button>
                                    </div>

                                    {/* Demo Account Switcher (Practical for testing) */}
                                    <div className="pt-3 border-t border-stone-100">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                                            Ganti Akun Demo Pengujian:
                                        </span>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => handleSwitch(1)}
                                                disabled={loading}
                                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                                    currentUser?.id_user === 1
                                                        ? 'bg-stone-900 text-white font-bold border-stone-900 shadow-2xs'
                                                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                                                }`}
                                            >
                                                <div className="font-bold">Budi Pratama</div>
                                                <div className={`text-[10px] ${currentUser?.id_user === 1 ? 'text-stone-300' : 'text-stone-500'}`}>
                                                    @peserta_demo
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSwitch(2)}
                                                disabled={loading}
                                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                                    currentUser?.id_user === 2
                                                        ? 'bg-stone-900 text-white font-bold border-stone-900 shadow-2xs'
                                                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                                                }`}
                                            >
                                                <div className="font-bold">Siti Rahmawati</div>
                                                <div className={`text-[10px] ${currentUser?.id_user === 2 ? 'text-stone-300' : 'text-stone-500'}`}>
                                                    @siti_rahma
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Logout Action */}
                                    {onLogout && (
                                        <div className="pt-2">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    await onLogout();
                                                    onClose();
                                                }}
                                                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <LogOut className="w-3.5 h-3.5" />
                                                <span>Keluar dari Akun (Logout)</span>
                                            </button>
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    )}

                    {/* MODE 2: Login Form */}
                    {mode === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                            <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-stone-800 text-xs flex items-center gap-2.5">
                                <LogIn className="w-4 h-4 text-stone-600 shrink-0" />
                                <div>
                                    <span className="font-bold block">Masuk ke RupaKala</span>
                                    <span className="text-[11px] text-stone-500">Gunakan akun demo atau akun yang sudah Anda daftarkan.</span>
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-stone-700 block mb-1">
                                    Username atau Alamat Email
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="peserta_demo atau email@anda.com"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-stone-700 block mb-1">
                                    Kata Sandi (Password)
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Ketik password Anda (demo: password123)"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                                <span>Masuk ke Akun</span>
                            </button>

                            <div className="text-center pt-2 text-stone-500 text-xs">
                                Belum memiliki akun?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('register')}
                                    className="font-bold text-stone-900 underline"
                                >
                                    Daftar sekarang
                                </button>
                            </div>
                        </form>
                    )}

                    {/* MODE 3: Register Form */}
                    {mode === 'register' && (
                        <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                            <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-stone-800 text-xs flex items-center gap-2.5">
                                <UserPlus className="w-4 h-4 text-stone-600 shrink-0" />
                                <div>
                                    <span className="font-bold block">Pendaftaran Anggota Baru</span>
                                    <span className="text-[11px] text-stone-500">Buat akun untuk belanja produk kriya & kurasi lokal.</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-stone-700 block mb-1">
                                        Username <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="username_anda"
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-stone-700 block mb-1">
                                        Email <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="nama@email.com"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-stone-700 block mb-1">
                                        Nama Lengkap <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama Lengkap"
                                        value={regNamaLengkap}
                                        onChange={(e) => setRegNamaLengkap(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-stone-700 block mb-1">
                                        Nomor Telepon / WA
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="08123456789"
                                        value={regNoHp}
                                        onChange={(e) => setRegNoHp(e.target.value)}
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-stone-700 block mb-1">
                                    Kata Sandi (Password) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Minimal 6 karakter"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-stone-700 block mb-1">
                                    Alamat Pengiriman Lengkap
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Alamat lengkap tujuan pengiriman..."
                                    value={regAlamat}
                                    onChange={(e) => setRegAlamat(e.target.value)}
                                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-900 text-xs resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                                <span>Daftarkan Akun Baru</span>
                            </button>

                            <div className="text-center pt-2 text-stone-500 text-xs">
                                Sudah punya akun?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="font-bold text-stone-900 underline"
                                >
                                    Masuk di sini
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
