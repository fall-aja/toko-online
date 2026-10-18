# 📦 Panduan Pengelolaan Produk, Harga, & Kategori — RupaKala

File-file data sekarang sudah dipisahkan ke dalam folder khusus agar Anda **sangat mudah menemukan dan mengedit harga barang yang dijual**, stok, deskripsi, foto, maupun kategori.

---

## 📁 Struktur Folder Baru

```text
toko-online/
├── database/
│   ├── data/                      ⭐ FOLDER UTAMA DATA (SANGAT MUDAH DICARI)
│   │   ├── produk.php             👉 Tempat mengatur NAMA PRODUK, HARGA JUAL (Rp), STOK, dll.
│   │   ├── kategori.php           👉 Tempat mengatur DAFTAR KATEGORI
│   │   └── pengguna.php           👉 Tempat data AKUN PENGGUNA DEMO
│   └── seeders/
│       ├── ProdukSeeder.php       👉 Seeder khusus produk & harga
│       ├── KategoriSeeder.php     👉 Seeder khusus kategori
│       ├── UserSeeder.php         👉 Seeder khusus user
│       ├── TransaksiSeeder.php    👉 Seeder khusus riwayat transaksi
│       └── DatabaseSeeder.php     👉 Seeder induk yang memanggil semuanya
│
└── resources/
    └── js/
        └── data/
            └── productPhotos.js   👉 Daftar link foto resolusi tinggi produk
```

---

## 🏷️ 1. Cara Mengubah Harga Produk

Buka file: **`database/data/produk.php`**

Cari nama produk yang ingin diubah harganya, lalu ganti nilai pada bagian `'harga'`:

```php
[
    'nama_produk' => 'TWS Bluetooth Earphone ANC Pro',
    'kategori'    => 'Elektronik & Gadget',
    'harga'       => 450000, //Untuk ganti harga
    'stok'        => 50,     //Ini adalah untuk mengubah stok
    'berat'       => 180,
    'deskripsi'   => 'Wireless earbuds dengan Active Noise Cancelling...',
    'is_active'   => 1,
],
```

---

## ➕ 2. Cara Menambah Produk Baru

Buka file: **`database/data/produk.php`**

Tambahkan blok data produk baru di dalam array:

```php
[
    'nama_produk' => 'Jam Dinding Kayu Jati Minimalis',
    'kategori'    => 'Perlengkapan Rumah',
    'harga'       => 225000,
    'stok'        => 15,
    'berat'       => 600,
    'deskripsi'   => 'Jam dinding handmade kayu jati solid dengan mesin quartz silent sweep.',
    'foto'        => 'https://images.unsplash.com/...',
    'is_active'   => 1,
],
```

---

## 🔄 3. Menerapkan Perubahan ke Database MySQL

Setelah mengubah file `database/data/produk.php`, jalankan perintah berikut di terminal:

```bash
php artisan db:seed --class=ProdukSeeder
```

> **Tips Aman:** `ProdukSeeder` menggunakan fungsi pintar `updateOrCreate`, sehingga perubahan harga langsung terupdate ke MySQL tanpa menghapus transaksi atau data lainnya!
