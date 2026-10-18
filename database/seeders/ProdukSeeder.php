<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produk;
use App\Models\Kategori;

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
        $kategoriMap = Kategori::pluck('id_kategori', 'nama_kategori')->toArray();

        foreach ($products as $item) {
            $kategoriId = $kategoriMap[$item['kategori']] ?? null;

            if (!$kategoriId) {
                // Buat kategori jika belum ada
                $kat = Kategori::firstOrCreate(
                    ['nama_kategori' => $item['kategori']],
                    ['deskripsi'     => 'Kategori ' . $item['kategori']]
                );
                $kategoriId = $kat->id_kategori;
                $kategoriMap[$item['kategori']] = $kategoriId;
            }

            Produk::updateOrCreate(
                ['nama_produk' => $item['nama_produk']],
                [
                    'kategori_id' => $kategoriId,
                    'harga'       => $item['harga'],
                    'stok'        => $item['stok'] ?? 0,
                    'berat'       => $item['berat'] ?? null,
                    'deskripsi'   => $item['deskripsi'] ?? null,
                    'is_active'   => $item['is_active'] ?? 1,
                ]
            );
        }
    }
}
