<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Jalankan seluruh seeder aplikasi Toko Online RupaKala.
     * Masing-masing data (produk, kategori, user, dll.) sudah dipisah ke file tersendiri di:
     * - database/data/produk.php
     * - database/data/kategori.php
     * - database/data/pengguna.php
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            KategoriSeeder::class,
            ProdukSeeder::class,
            TransaksiSeeder::class,
        ]);
    }
}
