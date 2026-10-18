import React, { useState } from 'react';
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
    Database, 
    AlertCircle, 
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { formatDate } from '../utils';

export default function AuthModal({
    isOpen,
    onClose,
    currentUser,
    onLogin,
    onRegister,
    onSwitchUser,
    onLogout,
    initialMode = 'profile'
}) {
    if (!isOpen) return null;

    const [mode, setMode] = useState(currentUser ? initialMode : 'login'); // 'profile', 'login', 'register'
    const [identifier, setIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Register form states
    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regNamaLengkap, setRegNamaLengkap] = useState('');
    const [regNoHp, setRegNoHp] = useState('');
    const [regAlamat, setRegAlamat] = useState('');

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'error' | 'success', text: string }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage(null);
        try {
            const res = await onLogin(identifier, loginPassword);
            if (res.success) {
                setStatusMessage({ type: 'success', text: res.message });
                setTimeout(() => {
                    setMode('profile');
                    setStatusMessage(null);
                }, 1000);
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'Login gagal.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.message || 'Terjadi kesalahan sistem.' });
        } finally {
            setLoading(false);
        }
    };

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
                setStatusMessage({ type: 'success', text: res.message });
                setTimeout(() => {
                    setMode('profile');
                    setStatusMessage(null);
                }, 1000);
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'Registrasi gagal.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.message || 'Terjadi kesalahan registrasi.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSwitch = async (userId) => {
        setLoading(true);
        setStatusMessage(null);
        await onSwitchUser(userId);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">
                                {mode === 'profile' ? 'Profil Pengguna (Tabel User)' : mode === 'login' ? 'Login Akun Pengguna' : 'Form Registrasi User'}
                            </h3>
                            <p className="text-[11px] text-slate-500">
                                Sesuai Flowchart: Mulai &rarr; Sudah Terdaftar?
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

                {/* Sub-nav tabs */}
                <div className="grid grid-cols-3 border-b border-slate-200 text-xs font-semibold bg-slate-50">
                    <button
                        onClick={() => { setMode('profile'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-colors ${
                            mode === 'profile'
                                ? 'border-emerald-600 text-emerald-800 bg-white'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        Profil Saya
                    </button>
                    <button
                        onClick={() => { setMode('login'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-colors ${
                            mode === 'login'
                                ? 'border-emerald-600 text-emerald-800 bg-white'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        Login Akun
                    </button>
                    <button
                        onClick={() => { setMode('register'); setStatusMessage(null); }}
                        className={`py-3 text-center border-b-2 transition-colors ${
                            mode === 'register'
                                ? 'border-emerald-600 text-emerald-800 bg-white'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        Registrasi Baru
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {/* Status Feedback */}
                    {statusMessage && (
                        <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
                            statusMessage.type === 'success'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                            {statusMessage.type === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                            <span>{statusMessage.text}</span>
                        </div>
                    )}

                    {/* MODE 1: Profile View */}
                    {mode === 'profile' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl uppercase shadow-xs">
                                    {currentUser?.nama_lengkap ? currentUser.nama_lengkap.charAt(0) : 'U'}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-extrabold text-base text-slate-900 truncate">
                                        {currentUser?.nama_lengkap || 'Belum Login'}
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        @{currentUser?.username || '-'} &bull; {currentUser?.email || '-'}
                                    </p>
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        Akun Aktif (ID #{currentUser?.id_user || 1})
                                    </span>
                                </div>
                            </div>

                            {/* ERD Fields Mapping */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs">
                                <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] pb-1 border-b border-slate-100">
                                    <span>Kolom ERD</span>
                                    <span>Nilai Terdata</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">nama_lengkap</span>
                                    <span className="font-bold text-slate-900">{currentUser?.nama_lengkap}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">username</span>
                                    <span className="font-mono text-slate-800">@{currentUser?.username}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">email</span>
                                    <span className="text-slate-800">{currentUser?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">no_hp</span>
                                    <span className="text-slate-800">{currentUser?.no_hp || '-'}</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-slate-500 shrink-0">alamat</span>
                                    <span className="text-right text-slate-800">{currentUser?.alamat || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">created_at</span>
                                    <span className="text-slate-600">{formatDate(currentUser?.created_at)}</span>
                                </div>
                            </div>

                            {/* Demo User Switcher */}
                            <div className="pt-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                    Ganti Akun Demo (Pengujian Praktis)
                                </span>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => handleSwitch(1)}
                                        disabled={loading}
                                        className={`p-2.5 rounded-xl border text-left transition-all ${
                                            currentUser?.id_user === 1
                                                ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900'
                                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        <div className="font-bold">Budi Pratama</div>
                                        <div className="text-[10px] text-slate-500">@peserta_demo</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSwitch(2)}
                                        disabled={loading}
                                        className={`p-2.5 rounded-xl border text-left transition-all ${
                                            currentUser?.id_user === 2
                                                ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900'
                                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        <div className="font-bold">Siti Rahmawati</div>
                                        <div className="text-[10px] text-slate-500">@siti_rahma</div>
                                    </button>
                                </div>
                            </div>

                            {/* Logout Action */}
                            {onLogout && (
                                <div className="pt-2 border-t border-slate-100">
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
                        </div>
                    )}

                    {/* MODE 2: Login Form (Flowchart: Sudah Terdaftar? Ya -> Login Akun) */}
                    {mode === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                            <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-xl text-blue-900 text-xs">
                                <strong>Alur Flowchart:</strong> Sudah Terdaftar? &rarr; Ya &rarr; Login Akun
                            </div>

                            <div>
                                <label className="font-semibold text-slate-700 block mb-1">
                                    Username atau Alamat Email
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="peserta_demo atau peserta@tokoonline.test"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-slate-700 block mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="password123"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                                <span className="text-[11px] text-slate-400 block mt-1">
                                    Password demo default: <code className="bg-slate-100 px-1 py-0.5 rounded">password123</code>
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <LogIn className="w-4 h-4" />
                                )}
                                <span>Masuk ke Akun Saya</span>
                            </button>
                        </form>
                    )}

                    {/* MODE 3: Register Form (Flowchart: Sudah Terdaftar? Tidak -> Form Registrasi User) */}
                    {mode === 'register' && (
                        <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs">
                                <strong>Alur Flowchart:</strong> Belum Terdaftar &rarr; Isi Form Registrasi User &rarr; Simpan ke Tabel User
                            </div>

                            <div>
                                <label className="font-semibold text-slate-700 block mb-1">
                                    Nama Lengkap <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Ahmad Fauzi"
                                    value={regNamaLengkap}
                                    onChange={(e) => setRegNamaLengkap(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-slate-700 block mb-1">
                                        Username <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="ahmad_fauzi"
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-slate-700 block mb-1">
                                        Email <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="ahmad@gmail.com"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-slate-700 block mb-1">
                                        Password <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Minimal 6 karakter"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-slate-700 block mb-1">
                                        Nomor HP
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0812xxxxxxxx"
                                        value={regNoHp}
                                        onChange={(e) => setRegNoHp(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-slate-700 block mb-1">
                                    Alamat Lengkap Pengiriman
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Jalan, nomor rumah, RT/RW, kecamatan, kota..."
                                    value={regAlamat}
                                    onChange={(e) => setRegAlamat(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <UserPlus className="w-4 h-4" />
                                )}
                                <span>Daftarkan Akun Baru</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
