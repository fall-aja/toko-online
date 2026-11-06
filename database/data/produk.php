<?php

/**
 * ============================================================================
 * DATA PRODUK & HARGA JUAL TOKO ONLINE RUPAKALA
 * ============================================================================
 * File ini adalah tempat utama untuk mengatur:
 * 1. nama_produk : Nama barang yang dijual
 * 2. kategori    : Nama kategori (harus cocok dengan di kategori.php)
 * 3. harga       : Harga jual dalam Rupiah (Rp) - CUKUP UBAH ANGKA INI UNTUK GANTI HARGA
 * 4. stok        : Jumlah ketersediaan barang di gudang
 * 5. berat       : Berat produk dalam satuan gram (gr)
 * 6. deskripsi   : Penjelasan keunggulan produk
 * 7. ukuran      : Array ukuran pakaian (misal: S, M, L, XL, XXL) untuk kategori Fashion
 * 8. warna       : Array pilihan warna produk dengan nama, hex kode warna, dan foto varian
 * 9. foto        : URL foto resolusi tinggi untuk katalog produk
 * 10. is_active  : 1 jika produk aktif dijual, 0 jika produk disembunyikan
 * ============================================================================
 */

return [
    // ------------------------------------------------------------------------
    // KATEGORI: Elektronik & Gadget
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'TWS Bluetooth Earphone ANC Pro',
        'kategori'    => 'Elektronik & Gadget',
        'harga'       => 389000,
        'stok'        => 45,
        'berat'       => 180,
        'deskripsi'   => 'Wireless earbuds dengan Active Noise Cancelling hingga 35dB, baterai tahan 28 jam, dan audio bass punchy.',
        'foto'        => 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
        'warna'       => [
            ['nama' => 'Matte Black', 'hex' => '#18181b'],
            ['nama' => 'Pure White', 'hex' => '#f8fafc'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Smartwatch Ultra 2 Sport Edition',
        'kategori'    => 'Elektronik & Gadget',
        'harga'       => 849000,
        'stok'        => 28,
        'berat'       => 250,
        'deskripsi'   => 'Jam tangan pintar layar AMOLED 1.96 inch, monitor detak jantung, SpO2, GPS, dan tahan air IP68.',
        'foto'        => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        'warna'       => [
            ['nama' => 'Space Grey', 'hex' => '#374151'],
            ['nama' => 'Silver Aluminum', 'hex' => '#cbd5e1'],
            ['nama' => 'Orange Alpine', 'hex' => '#ea580c'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Mechanical Keyboard 75% Wireless',
        'kategori'    => 'Elektronik & Gadget',
        'harga'       => 675000,
        'stok'        => 19,
        'berat'       => 850,
        'deskripsi'   => 'Keyboard mekanikal hot-swappable dengan switch linear pre-lubed, RGB backlit, dan konektivitas tri-mode.',
        'foto'        => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
        'warna'       => [
            ['nama' => 'Retro Grey', 'hex' => '#4b5563'],
            ['nama' => 'Milk White', 'hex' => '#f1f5f9'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Powerbank Magnetic Wireless 10000mAh 22.5W',
        'kategori'    => 'Elektronik & Gadget',
        'harga'       => 285000,
        'stok'        => 50,
        'berat'       => 210,
        'deskripsi'   => 'Pengisi daya nirkabel portabel 10.000mAh dengan fitur MagSafe magnetic snap-on, fast charging 22.5W, indikator LED, dan desain ramping ramah penerbangan pesawat.',
        'foto'        => '/images/powerbank/powerbank1.png',
        'warna'       => [
            ['nama' => 'Matte Black', 'hex' => '#1e293b'],
            ['nama' => 'Titanium Grey', 'hex' => '#64748b'],
        ],
        'is_active'   => 1,
    ],

    // ------------------------------------------------------------------------
    // KATEGORI: Fashion & Pakaian
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'Polo Shirt Retro Hitam Kerah Putih',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 18000,
        'stok'        => 35,
        'berat'       => 280,
        'deskripsi'   => 'Kaos polo retro premium warna hitam dengan kerah kontras putih gading dan kancing eksklusif. Bahan katun adem dan potongan rapi.',
        'foto'        => '/images/baju/baju1.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Hitam Retro', 'hex' => '#18181b', 'foto' => '/images/baju/baju1.png'],
            ['nama' => 'Baby Blue', 'hex' => '#93c5fd', 'foto' => '/images/baju/baju2.png'],
            ['nama' => 'Vintage Cream', 'hex' => '#fef08a', 'foto' => '/images/baju/baju3.png'],
            ['nama' => 'Espresso Brown', 'hex' => '#451a03', 'foto' => '/images/baju/baju4.png'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Polo Shirt Pastel Biru Kerah Putih',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 17000,
        'stok'        => 40,
        'berat'       => 280,
        'deskripsi'   => 'Polo shirt kasual warna baby blue pastel berkerah putih bersih dengan manset lengan kontras yang stylish.',
        'foto'        => '/images/baju/baju2.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Baby Blue', 'hex' => '#93c5fd', 'foto' => '/images/baju/baju2.png'],
            ['nama' => 'Hitam Retro', 'hex' => '#18181b', 'foto' => '/images/baju/baju1.png'],
            ['nama' => 'Vintage Cream', 'hex' => '#fef08a', 'foto' => '/images/baju/baju3.png'],
            ['nama' => 'Espresso Brown', 'hex' => '#451a03', 'foto' => '/images/baju/baju4.png'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Polo Shirt Vintage Cream Kerah Hijau',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 19000,
        'stok'        => 30,
        'berat'       => 280,
        'deskripsi'   => 'Kaos polo bernuansa vintage warna cream dengan kerah dan lis manset forest green yang sangat elegan.',
        'foto'        => '/images/baju/baju3.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Vintage Cream', 'hex' => '#fef08a', 'foto' => '/images/baju/baju3.png'],
            ['nama' => 'Hitam Retro', 'hex' => '#18181b', 'foto' => '/images/baju/baju1.png'],
            ['nama' => 'Baby Blue', 'hex' => '#93c5fd', 'foto' => '/images/baju/baju2.png'],
            ['nama' => 'Espresso Brown', 'hex' => '#451a03', 'foto' => '/images/baju/baju4.png'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Polo Shirt Espresso Ribbed Kerah Garis',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 215000,
        'stok'        => 25,
        'berat'       => 310,
        'deskripsi'   => 'Polo shirt rajut ribbed knit warna cokelat espresso dengan aksen garis putih ganda pada kerah dan ujung lengan.',
        'foto'        => '/images/baju/baju4.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Espresso Brown', 'hex' => '#451a03', 'foto' => '/images/baju/baju4.png'],
            ['nama' => 'Hitam Retro', 'hex' => '#18181b', 'foto' => '/images/baju/baju1.png'],
            ['nama' => 'Baby Blue', 'hex' => '#93c5fd', 'foto' => '/images/baju/baju2.png'],
            ['nama' => 'Vintage Cream', 'hex' => '#fef08a', 'foto' => '/images/baju/baju3.png'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Kemeja Linen Casual Earth Tone',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 189000,
        'stok'        => 35,
        'berat'       => 280,
        'deskripsi'   => 'Kemeja pria berbahan pure linen adem, potongan regular fit, cocok untuk outfit santai maupun semi formal.',
        'foto'        => '/images/baju/baju1.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Broken White', 'hex' => '#fdfbf7'],
            ['nama' => 'Sand Khaki', 'hex' => '#c2b280'],
            ['nama' => 'Sage Green', 'hex' => '#879788'],
            ['nama' => 'Deep Navy', 'hex' => '#1b2c4e'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Heavyweight Hoodie Oversize 330gsm',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 245000,
        'stok'        => 40,
        'berat'       => 650,
        'deskripsi'   => 'Hoodie fleece tebal 330gsm dengan sablon minimalis, saku kanguru empuk, dan jahitan rapi ganda.',
        'foto'        => 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
        'ukuran'      => ['M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Charcoal Heather', 'hex' => '#374151'],
            ['nama' => 'Onyx Black', 'hex' => '#0f172a'],
            ['nama' => 'Forest Green', 'hex' => '#14532d'],
            ['nama' => 'Warm Oat', 'hex' => '#e2d9cc'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Jaket Harrington Classic Vintage Cream',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 289000,
        'stok'        => 35,
        'berat'       => 550,
        'deskripsi'   => 'Jaket harrington klasik warna cream gading dengan kerah kasual, resleting silver depan, saku samping, dan aksen bordir ikonik. Bahan katun twill berfuring adem.',
        'foto'        => '/images/jaket/jaket1.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Cream Gading', 'hex' => '#f5efe6', 'foto' => '/images/jaket/jaket1.png'],
            ['nama' => 'Varsity Navy', 'hex' => '#1e3a5f', 'foto' => '/images/jaket/jaket2.png'],
            ['nama' => 'Caramel Suede', 'hex' => '#8b5a2b', 'foto' => '/images/jaket/jaket3.png'],
            ['nama' => 'Midnight Black', 'hex' => '#18181b'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Jaket Varsity Two-Tone Navy White',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 295000,
        'stok'        => 28,
        'berat'       => 680,
        'deskripsi'   => 'Jaket varsity bernuansa vintage warna biru navy dengan aksen kontras panel bahu dan lis saku putih gading. Dilengkapi kancing snap button dan rib bergaris elastis.',
        'foto'        => '/images/jaket/jaket2.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Varsity Navy', 'hex' => '#1e3a5f', 'foto' => '/images/jaket/jaket2.png'],
            ['nama' => 'Cream Gading', 'hex' => '#f5efe6', 'foto' => '/images/jaket/jaket1.png'],
            ['nama' => 'Caramel Suede', 'hex' => '#8b5a2b', 'foto' => '/images/jaket/jaket3.png'],
            ['nama' => 'Forest Emerald', 'hex' => '#14532d'],
        ],
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Jaket Suede Biker Classic Brown',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 345000,
        'stok'        => 22,
        'berat'       => 750,
        'deskripsi'   => 'Jaket moto biker bahan faux suede premium warna cokelat karamel dengan resleting asimetris metalik, kerah notch lapel, dan saku zipper modern.',
        'foto'        => '/images/jaket/jaket3.png',
        'ukuran'      => ['S', 'M', 'L', 'XL', 'XXL'],
        'warna'       => [
            ['nama' => 'Caramel Suede', 'hex' => '#8b5a2b', 'foto' => '/images/jaket/jaket3.png'],
            ['nama' => 'Cream Gading', 'hex' => '#f5efe6', 'foto' => '/images/jaket/jaket1.png'],
            ['nama' => 'Varsity Navy', 'hex' => '#1e3a5f', 'foto' => '/images/jaket/jaket2.png'],
            ['nama' => 'Dark Tan', 'hex' => '#78350f'],
        ],
        'is_active'   => 1,
    ],

    // ------------------------------------------------------------------------
    // KATEGORI: Buku & Alat Tulis
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'Buku Pemrograman Web Modern Fullstack',
        'kategori'    => 'Buku & Alat Tulis',
        'harga'       => 145000,
        'stok'        => 40,
        'berat'       => 450,
        'deskripsi'   => 'Panduan komprehensif arsitektur REST API, database relasional, React.js frontend, dan keamanan aplikasi web.',
        'foto'        => 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Hardcover Dotted Journal Notebook A5',
        'kategori'    => 'Buku & Alat Tulis',
        'harga'       => 69000,
        'stok'        => 85,
        'berat'       => 320,
        'deskripsi'   => 'Buku catatan bersampul kulit keras, kertas 100gsm ramah tinta fountain pen, 192 halaman bergaris titik.',
        'foto'        => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
        'warna'       => [
            ['nama' => 'Emerald Green', 'hex' => '#15803d'],
            ['nama' => 'Classic Navy', 'hex' => '#1e3a8a'],
            ['nama' => 'Cognac Tan', 'hex' => '#b45309'],
        ],
        'is_active'   => 1,
    ],
];
