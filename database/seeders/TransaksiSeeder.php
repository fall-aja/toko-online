<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use Carbon\Carbon;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::where('username', 'peserta_demo')->first();
        if (!$user1) return;

        // Cek jika sudah ada transaksi
        if (Transaksi::where('user_id', $user1->id_user)->count() > 0) {
            return;
        }

        $p1 = Produk::first();
        $p2 = Produk::skip(1)->first();

        if ($p1 && $p2) {
            // Transaksi 1: Completed
            $t1 = Transaksi::create([
                'user_id'           => $user1->id_user,
                'tanggal'           => Carbon::now()->subDays(12),
                'total'             => $p1->harga + ($p2->harga * 2),
                'status'            => 'completed',
                'metode_pembayaran' => 'transfer',
            ]);

            DetailTransaksi::create([
                'transaksi_id' => $t1->id_transaksi,
                'produk_id'    => $p1->id_produk,
                'nama_produk'  => $p1->nama_produk,
                'qty'          => 1,
                'harga'        => $p1->harga,
                'subtotal'     => $p1->harga,
            ]);

            DetailTransaksi::create([
                'transaksi_id' => $t1->id_transaksi,
                'produk_id'    => $p2->id_produk,
                'nama_produk'  => $p2->nama_produk,
                'qty'          => 2,
                'harga'        => $p2->harga,
                'subtotal'     => $p2->harga * 2,
            ]);

            // Transaksi 2: Paid
            $t2 = Transaksi::create([
                'user_id'           => $user1->id_user,
                'tanggal'           => Carbon::now()->subDays(3),
                'total'             => $p1->harga,
                'status'            => 'paid',
                'metode_pembayaran' => 'ewallet',
            ]);

            DetailTransaksi::create([
                'transaksi_id' => $t2->id_transaksi,
                'produk_id'    => $p1->id_produk,
                'nama_produk'  => $p1->nama_produk,
                'qty'          => 1,
                'harga'        => $p1->harga,
                'subtotal'     => $p1->harga,
            ]);
        }
    }
}
