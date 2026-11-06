<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProdukSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk produk dan harga jual.
     * Menggunakan updateOrCreate sehingga Anda dapat mengubah harga produk
     * di database/data/produk.php lalu menjalankan seeder ini tanpa merusak data lain.
     */
    public function run(): void
    {
        $products = require database_path('data/produk.php');

        // Buat map kategori untuk pencarian cepat
        $kategoriMap = Category::pluck('category_id', 'nama_kategori')->toArray();

        foreach ($products as $item) {
            $kategoriId = $kategoriMap[$item['kategori']] ?? null;

            if (!$kategoriId) {
                // Buat kategori jika belum ada
                $kat = Category::firstOrCreate(
                    ['nama_kategori' => $item['kategori']],
                    ['deskripsi'     => 'Kategori ' . $item['kategori']]
                );
                $kategoriId = $kat->category_id;
                $kategoriMap[$item['kategori']] = $kategoriId;
            }

            Product::updateOrCreate(
                ['nama_produk' => $item['nama_produk']],
                [
                    'category_id' => $kategoriId,
                    'harga'       => $item['harga'],
                    'stok'        => $item['stok'] ?? 0,
                    'berat_gram'  => $item['berat'] ?? 0,
                    'deskripsi'   => $item['deskripsi'] ?? null,
                    'ukuran'      => $item['ukuran'] ?? null,
                    'warna'       => $item['warna'] ?? null,
                    'is_active'   => $item['is_active'] ?? 1,
                ]
            );
        }

        // Hapus produk lama yang sudah tidak terdaftar di database/data/produk.php
        $activeNames = array_column($products, 'nama_produk');
        Product::whereNotIn('nama_produk', $activeNames)->delete();
    }
}
