<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Users
        $user1 = User::firstOrCreate(
            ['username' => 'peserta_demo'],
            [
                'email' => 'peserta@tokoonline.test',
                'password' => Hash::make('password123'),
                'nama_lengkap' => 'Budi Pratama',
                'no_hp' => '081298765432',
                'alamat' => 'Jl. Kebon Jeruk Raya No. 18, Kebon Jeruk, Jakarta Barat 11530',
                'created_at' => Carbon::now()->subMonths(3),
            ]
        );

        $user2 = User::firstOrCreate(
            ['username' => 'siti_rahma'],
            [
                'email' => 'siti@tokoonline.test',
                'password' => Hash::make('password123'),
                'nama_lengkap' => 'Siti Rahmawati',
                'no_hp' => '085711223344',
                'alamat' => 'Jl. Diponegoro No. 45, Bandung, Jawa Barat 40115',
                'created_at' => Carbon::now()->subMonths(1),
            ]
        );

        // 2. Seed Categories
        $kategoriList = [
            [
                'nama_kategori' => 'Elektronik & Gadget',
                'deskripsi' => 'Perangkat elektronik mutakhir, smartphone, audio nirkabel, dan aksesoris digital.',
            ],
            [
                'nama_kategori' => 'Fashion & Pakaian',
                'deskripsi' => 'Koleksi busana pria dan wanita dengan bahan katun premium dan desain terkini.',
            ],
            [
                'nama_kategori' => 'Sepatu & Tas',
                'deskripsi' => 'Sneakers kasual, sepatu formal, dan tas ransel ergonomis berkualitas tinggi.',
            ],
            [
                'nama_kategori' => 'Perlengkapan Rumah',
                'deskripsi' => 'Peralatan rumah tangga minimalis, lampu meja LED, dan dekorasi estetik.',
            ],
            [
                'nama_kategori' => 'Buku & Alat Tulis',
                'deskripsi' => 'Buku referensi teknologi, novel best seller, dan binder produktivitas.',
            ],
        ];

        $kategoriModels = [];
        foreach ($kategoriList as $kat) {
            $kategoriModels[$kat['nama_kategori']] = Kategori::firstOrCreate(
                ['nama_kategori' => $kat['nama_kategori']],
                ['deskripsi' => $kat['deskripsi']]
            );
        }

        // 3. Seed Products
        $productsData = [
            // Elektronik
            [
                'kategori' => 'Elektronik & Gadget',
                'nama_produk' => 'TWS Bluetooth Earphone ANC Pro',
                'harga' => 389000,
                'stok' => 45,
                'berat' => 180,
                'deskripsi' => 'Wireless earbuds dengan Active Noise Cancelling hingga 35dB, baterai tahan 28 jam, dan audio bass punchy.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Elektronik & Gadget',
                'nama_produk' => 'Smartwatch Ultra 2 Sport Edition',
                'harga' => 849000,
                'stok' => 28,
                'berat' => 250,
                'deskripsi' => 'Jam tangan pintar layar AMOLED 1.96 inch, monitor detak jantung, SpO2, GPS, dan tahan air IP68.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Elektronik & Gadget',
                'nama_produk' => 'Mechanical Keyboard 75% Wireless',
                'harga' => 675000,
                'stok' => 19,
                'berat' => 850,
                'deskripsi' => 'Keyboard mekanikal hot-swappable dengan switch linear pre-lubed, RGB backlit, dan konektivitas tri-mode.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Elektronik & Gadget',
                'nama_produk' => 'Powerbank Fast Charge 20000mAh 65W',
                'harga' => 320000,
                'stok' => 60,
                'berat' => 420,
                'deskripsi' => 'Pengisi daya portabel kapasitas besar 20.000mAh mendukung PD 65W, cukup untuk laptop dan smartphone.',
                'is_active' => 1,
            ],

            // Fashion
            [
                'kategori' => 'Fashion & Pakaian',
                'nama_produk' => 'Kemeja Linen Casual Earth Tone',
                'harga' => 189000,
                'stok' => 35,
                'berat' => 280,
                'deskripsi' => 'Kemeja pria berbahan pure linen adem, potongan regular fit, cocok untuk outfit santai maupun semi formal.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Fashion & Pakaian',
                'nama_produk' => 'Heavyweight Hoodie Oversize 330gsm',
                'harga' => 245000,
                'stok' => 40,
                'berat' => 650,
                'deskripsi' => 'Hoodie fleece tebal 330gsm dengan sablon minimalis, saku kanguru empuk, dan jahitan rapi ganda.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Fashion & Pakaian',
                'nama_produk' => 'Celana Chino Slim Fit Stretch',
                'harga' => 179000,
                'stok' => 50,
                'berat' => 400,
                'deskripsi' => 'Celana panjang chino katun twill elastis yang nyaman dipakai seharian di kantor maupun hangout.',
                'is_active' => 1,
            ],

            // Sepatu & Tas
            [
                'kategori' => 'Sepatu & Tas',
                'nama_produk' => 'Sneakers Urban Casual White Leather',
                'harga' => 425000,
                'stok' => 24,
                'berat' => 900,
                'deskripsi' => 'Sepatu sneakers kulit sintetis premium warna putih bersih dengan insole memory foam anti pegal.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Sepatu & Tas',
                'nama_produk' => 'Backpack Anti-Air Laptop 15.6 Inch',
                'harga' => 285000,
                'stok' => 32,
                'berat' => 750,
                'deskripsi' => 'Tas ransel kompartemen laptop busa tebal, material cordura water-repellent, dan port USB charger.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Sepatu & Tas',
                'nama_produk' => 'Sling Bag Minimalist Cordura',
                'harga' => 125000,
                'stok' => 55,
                'berat' => 220,
                'deskripsi' => 'Tas selempang praktis untuk membawa dompet, HP, paspor, kunci, dengan resleting YKK waterproof.',
                'is_active' => 1,
            ],

            // Perlengkapan Rumah
            [
                'kategori' => 'Perlengkapan Rumah',
                'nama_produk' => 'Tumbler Vacuum Insulated 750ml',
                'harga' => 135000,
                'stok' => 70,
                'berat' => 380,
                'deskripsi' => 'Botol minum stainless steel sus 304, menjaga air dingin 24 jam dan air panas 12 jam tanpa embun.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Perlengkapan Rumah',
                'nama_produk' => 'Lampu Meja LED Dimmable Touch Control',
                'harga' => 155000,
                'stok' => 26,
                'berat' => 510,
                'deskripsi' => 'Lampu meja belajar dengan 3 temperatur warna (warm, natural, cool) dan pengatur kecerahan sentuh.',
                'is_active' => 1,
            ],

            // Buku & Alat Tulis
            [
                'kategori' => 'Buku & Alat Tulis',
                'nama_produk' => 'Buku Pemrograman Web Modern Fullstack',
                'harga' => 145000,
                'stok' => 40,
                'berat' => 450,
                'deskripsi' => 'Panduan komprehensif arsitektur REST API, database relasional, React.js frontend, dan keamanan aplikasi web.',
                'is_active' => 1,
            ],
            [
                'kategori' => 'Buku & Alat Tulis',
                'nama_produk' => 'Hardcover Dotted Journal Notebook A5',
                'harga' => 69000,
                'stok' => 85,
                'berat' => 320,
                'deskripsi' => 'Buku catatan bersampul kulit keras, kertas 100gsm ramah tinta fountain pen, 192 halaman bergaris titik.',
                'is_active' => 1,
            ],
        ];

        $createdProducts = [];
        foreach ($productsData as $item) {
            $kategoriModel = $kategoriModels[$item['kategori']];
            $prod = Produk::firstOrCreate(
                ['nama_produk' => $item['nama_produk']],
                [
                    'kategori_id' => $kategoriModel->id_kategori,
                    'harga' => $item['harga'],
                    'stok' => $item['stok'],
                    'berat' => $item['berat'],
                    'deskripsi' => $item['deskripsi'],
                    'is_active' => $item['is_active'],
                ]
            );
            $createdProducts[] = $prod;
        }

        // 4. Seed sample transactions for user 1 if not exists
        if (Transaksi::where('user_id', $user1->id_user)->count() === 0) {
            // Transaksi 1: Completed
            $t1 = Transaksi::create([
                'user_id' => $user1->id_user,
                'tanggal' => Carbon::now()->subDays(12),
                'total' => 524000,
                'status' => 'completed',
                'metode_pembayaran' => 'transfer',
            ]);
            DetailTransaksi::create([
                'transaksi_id' => $t1->id_transaksi,
                'produk_id' => $createdProducts[0]->id_produk, // TWS
                'nama_produk' => $createdProducts[0]->nama_produk,
                'qty' => 1,
                'harga' => 389000,
                'subtotal' => 389000,
            ]);
            DetailTransaksi::create([
                'transaksi_id' => $t1->id_transaksi,
                'produk_id' => $createdProducts[10]->id_produk, // Tumbler
                'nama_produk' => $createdProducts[10]->nama_produk,
                'qty' => 1,
                'harga' => 135000,
                'subtotal' => 135000,
            ]);

            // Transaksi 2: Shipped
            $t2 = Transaksi::create([
                'user_id' => $user1->id_user,
                'tanggal' => Carbon::now()->subDays(2),
                'total' => 434000,
                'status' => 'shipped',
                'metode_pembayaran' => 'ewallet',
            ]);
            DetailTransaksi::create([
                'transaksi_id' => $t2->id_transaksi,
                'produk_id' => $createdProducts[4]->id_produk, // Kemeja Linen
                'nama_produk' => $createdProducts[4]->nama_produk,
                'qty' => 1,
                'harga' => 189000,
                'subtotal' => 189000,
            ]);
            DetailTransaksi::create([
                'transaksi_id' => $t2->id_transaksi,
                'produk_id' => $createdProducts[5]->id_produk, // Hoodie
                'nama_produk' => $createdProducts[5]->nama_produk,
                'qty' => 1,
                'harga' => 245000,
                'subtotal' => 245000,
            ]);

            // Transaksi 3: Pending
            $t3 = Transaksi::create([
                'user_id' => $user1->id_user,
                'tanggal' => Carbon::now()->subHours(4),
                'total' => 675000,
                'status' => 'pending',
                'metode_pembayaran' => 'transfer',
            ]);
            DetailTransaksi::create([
                'transaksi_id' => $t3->id_transaksi,
                'produk_id' => $createdProducts[2]->id_produk, // Keyboard
                'nama_produk' => $createdProducts[2]->nama_produk,
                'qty' => 1,
                'harga' => 675000,
                'subtotal' => 675000,
            ]);
        }
    }
}
