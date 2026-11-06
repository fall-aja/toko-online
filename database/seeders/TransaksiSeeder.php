<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\CartItem;
use Carbon\Carbon;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::where('username', 'peserta_demo')->first();
        if (!$user1) return;

        // Cek jika sudah ada pesanan
        if (Order::where('user_id', $user1->user_id)->count() > 0) {
            return;
        }

        $p1 = Product::first();
        $p2 = Product::skip(1)->first();

        if ($p1 && $p2) {
            // Pesanan 1: Completed (Transfer Bank)
            $total1 = $p1->harga + ($p2->harga * 2);
            $order1 = Order::create([
                'user_id'        => $user1->user_id,
                'tanggal_pesan'  => Carbon::now()->subDays(12),
                'total_harga'    => $total1,
                'status_pesanan' => 'completed',
            ]);

            Payment::create([
                'order_id'          => $order1->order_id,
                'metode_pembayaran' => 'Transfer Bank',
                'status_pembayaran' => 'paid',
                'tanggal_bayar'     => Carbon::now()->subDays(12),
            ]);

            OrderItem::create([
                'order_id'     => $order1->order_id,
                'product_id'   => $p1->product_id,
                'nama_produk'  => $p1->nama_produk,
                'jumlah'       => 1,
                'harga_satuan' => $p1->harga,
                'subtotal'     => $p1->harga,
            ]);

            OrderItem::create([
                'order_id'     => $order1->order_id,
                'product_id'   => $p2->product_id,
                'nama_produk'  => $p2->nama_produk,
                'jumlah'       => 2,
                'harga_satuan' => $p2->harga,
                'subtotal'     => $p2->harga * 2,
            ]);

            // Pesanan 2: Paid (E-Wallet)
            $order2 = Order::create([
                'user_id'        => $user1->user_id,
                'tanggal_pesan'  => Carbon::now()->subDays(3),
                'total_harga'    => $p1->harga,
                'status_pesanan' => 'paid',
            ]);

            Payment::create([
                'order_id'          => $order2->order_id,
                'metode_pembayaran' => 'E-Wallet',
                'status_pembayaran' => 'paid',
                'tanggal_bayar'     => Carbon::now()->subDays(3),
            ]);

            OrderItem::create([
                'order_id'     => $order2->order_id,
                'product_id'   => $p1->product_id,
                'nama_produk'  => $p1->nama_produk,
                'jumlah'       => 1,
                'harga_satuan' => $p1->harga,
                'subtotal'     => $p1->harga,
            ]);

            // Pesanan 3: Pending (Bayar di Tempat - COD)
            $order3 = Order::create([
                'user_id'        => $user1->user_id,
                'tanggal_pesan'  => Carbon::now()->subHours(5),
                'total_harga'    => $p2->harga,
                'status_pesanan' => 'pending',
            ]);

            Payment::create([
                'order_id'          => $order3->order_id,
                'metode_pembayaran' => 'Bayar di Tempat - COD',
                'status_pembayaran' => 'pending',
                'tanggal_bayar'     => null,
            ]);

            OrderItem::create([
                'order_id'     => $order3->order_id,
                'product_id'   => $p2->product_id,
                'nama_produk'  => $p2->nama_produk,
                'jumlah'       => 1,
                'harga_satuan' => $p2->harga,
                'subtotal'     => $p2->harga,
            ]);

            // Sample item in cart_items table
            CartItem::create([
                'user_id'    => $user1->user_id,
                'product_id' => $p1->product_id,
                'ukuran'     => is_array($p1->ukuran) && count($p1->ukuran) > 0 ? $p1->ukuran[0] : null,
                'warna'      => is_array($p1->warna) && count($p1->warna) > 0 ? ($p1->warna[0]['nama'] ?? null) : null,
                'jumlah'     => 1,
            ]);
        }
    }
}
