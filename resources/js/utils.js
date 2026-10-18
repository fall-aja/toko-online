export function formatRupiah(amount) {
    if (isNaN(amount)) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date) + ' WIB';
}

export const STATUS_CONFIG = {
    pending: {
        label: 'Menunggu Pembayaran',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
    },
    paid: {
        label: 'Sudah Dibayar',
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        dot: 'bg-sky-500',
    },
    shipped: {
        label: 'Sedang Dikirim',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        dot: 'bg-indigo-500',
    },
    completed: {
        label: 'Selesai',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
    },
    cancelled: {
        label: 'Dibatalkan',
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
    },
};

export const PAYMENT_METHODS = {
    transfer: {
        name: 'Transfer Bank (BCA / Mandiri / BRI)',
        desc: 'Verifikasi instan via Virtual Account atau Cek Otomatis',
        badge: 'Otomatis',
    },
    ewallet: {
        name: 'E-Wallet (GoPay / OVO / Dana / ShopeePay)',
        desc: 'Scan QRIS atau bayar langsung via aplikasi e-wallet',
        badge: 'Cepat & Praktis',
    },
    cod: {
        name: 'COD (Cash on Delivery)',
        desc: 'Bayar tunai di tempat ke kurir saat pesanan tiba',
        badge: 'Bayar di Tempat',
    },
};

import { PRODUCT_PHOTOS } from './data/productPhotos';
export { PRODUCT_PHOTOS };

export function getProductPhoto(nama) {
    return PRODUCT_PHOTOS[nama] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
}

export function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

