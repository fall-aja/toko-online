<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kategori;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        $categories = require database_path('data/kategori.php');

        foreach ($categories as $cat) {
            Kategori::firstOrCreate(
                ['nama_kategori' => $cat['nama_kategori']],
                ['deskripsi'     => $cat['deskripsi']]
            );
        }
    }
}
