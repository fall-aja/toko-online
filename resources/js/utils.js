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

// High quality product photography URLs from Unsplash
export const PRODUCT_PHOTOS = {
    'TWS Bluetooth Earphone ANC Pro': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    'Smartwatch Ultra 2 Sport Edition': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    'Mechanical Keyboard 75% Wireless': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    'Powerbank Fast Charge 20000mAh 65W': 'https://images.unsplash.com/photo-1609592806596-b33367838fb3?w=600&auto=format&fit=crop&q=80',
    'Kemeja Linen Casual Earth Tone': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
    'Heavyweight Hoodie Oversize 330gsm': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    'Celana Chino Slim Fit Stretch': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
    'Sneakers Urban Casual White Leather': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    'Backpack Anti-Air Laptop 15.6 Inch': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    'Sling Bag Minimalist Cordura': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    'Tumbler Vacuum Insulated 750ml': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    'Lampu Meja LED Dimmable Touch Control': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    'Buku Pemrograman Web Modern Fullstack': 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
    'Hardcover Dotted Journal Notebook A5': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
};

export function getProductPhoto(nama) {
    return PRODUCT_PHOTOS[nama] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
}
