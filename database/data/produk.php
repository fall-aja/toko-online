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
 * 7. foto        : URL foto resolusi tinggi untuk katalog produk
 * 8. is_active   : 1 jika produk aktif dijual, 0 jika produk disembunyikan
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
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Powerbank Fast Charge 20000mAh 65W',
        'kategori'    => 'Elektronik & Gadget',
        'harga'       => 320000,
        'stok'        => 60,
        'berat'       => 420,
        'deskripsi'   => 'Pengisi daya portabel kapasitas besar 20.000mAh mendukung PD 65W, cukup untuk laptop dan smartphone.',
        'foto'        => 'https://images.unsplash.com/photo-1609592806596-b33367838fb3?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],

    // ------------------------------------------------------------------------
    // KATEGORI: Fashion & Pakaian
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'Polo Shirt Retro Hitam Kerah Putih',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 189000,
        'stok'        => 35,
        'berat'       => 280,
        'deskripsi'   => 'Kaos polo retro premium warna hitam dengan kerah kontras putih gading dan kancing eksklusif. Bahan katun adem dan potongan rapi.',
        'foto'        => '/images/baju/baju1.png',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Polo Shirt Pastel Biru Kerah Putih',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 179000,
        'stok'        => 40,
        'berat'       => 280,
        'deskripsi'   => 'Polo shirt kasual warna baby blue pastel berkerah putih bersih dengan manset lengan kontras yang stylish.',
        'foto'        => '/images/baju/baju2.png',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Polo Shirt Vintage Cream Kerah Hijau',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 195000,
        'stok'        => 30,
        'berat'       => 280,
        'deskripsi'   => 'Kaos polo bernuansa vintage warna cream dengan kerah dan lis manset forest green yang sangat elegan.',
        'foto'        => '/images/baju/baju3.png',
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
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Celana Chino Slim Fit Stretch',
        'kategori'    => 'Fashion & Pakaian',
        'harga'       => 179000,
        'stok'        => 50,
        'berat'       => 400,
        'deskripsi'   => 'Celana panjang chino katun twill elastis yang nyaman dipakai seharian di kantor maupun hangout.',
        'foto'        => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],

    // ------------------------------------------------------------------------
    // KATEGORI: Sepatu & Tas
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'Sneakers Urban Casual White Leather',
        'kategori'    => 'Sepatu & Tas',
        'harga'       => 425000,
        'stok'        => 24,
        'berat'       => 900,
        'deskripsi'   => 'Sepatu sneakers kulit sintetis premium warna putih bersih dengan insole memory foam anti pegal.',
        'foto'        => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Backpack Anti-Air Laptop 15.6 Inch',
        'kategori'    => 'Sepatu & Tas',
        'harga'       => 285000,
        'stok'        => 32,
        'berat'       => 750,
        'deskripsi'   => 'Tas ransel kompartemen laptop busa tebal, material cordura water-repellent, dan port USB charger.',
        'foto'        => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Sling Bag Minimalist Cordura',
        'kategori'    => 'Sepatu & Tas',
        'harga'       => 125000,
        'stok'        => 55,
        'berat'       => 220,
        'deskripsi'   => 'Tas selempang praktis untuk membawa dompet, HP, paspor, kunci, dengan resleting YKK waterproof.',
        'foto'        => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],

    // ------------------------------------------------------------------------
    // KATEGORI: Perlengkapan Rumah
    // ------------------------------------------------------------------------
    [
        'nama_produk' => 'Tumbler Vacuum Insulated 750ml',
        'kategori'    => 'Perlengkapan Rumah',
        'harga'       => 135000,
        'stok'        => 70,
        'berat'       => 380,
        'deskripsi'   => 'Botol minum stainless steel sus 304, menjaga air dingin 24 jam dan air panas 12 jam tanpa embun.',
        'foto'        => 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
        'is_active'   => 1,
    ],
    [
        'nama_produk' => 'Lampu Meja LED Dimmable Touch Control',
        'kategori'    => 'Perlengkapan Rumah',
        'harga'       => 155000,
        'stok'        => 26,
        'berat'       => 510,
        'deskripsi'   => 'Lampu meja belajar dengan 3 temperatur warna (warm, natural, cool) dan pengatur kecerahan sentuh.',
        'foto'        => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
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
        'is_active'   => 1,
    ],
];
