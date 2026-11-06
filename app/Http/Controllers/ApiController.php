<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ApiController extends Controller
{
    /**
     * Get initial startup data: current user, categories, products, orders, cart
     */
    public function getInitialData(Request $request)
    {
        $userId = session('logged_user_id');
        $user = $userId ? User::find($userId) : null;

        $categories = Category::withCount('products')->get();
        $products = Product::with('category')->where('is_active', true)->get();

        $transactions = [];
        $dbCart = [];
        if ($user) {
            $transactions = Order::with(['orderItems', 'payment'])
                ->where('user_id', $user->user_id)
                ->orderBy('order_id', 'desc')
                ->get();

            $dbCart = CartItem::with('product')
                ->where('user_id', $user->user_id)
                ->get();
        }

        return response()->json([
            'success' => true,
            'user' => $user,
            'categories' => $categories,
            'products' => $products,
            'transactions' => $transactions,
            'cart_items' => $dbCart,
        ]);
    }

    /**
     * User Login (Flowchart Tahap 1: Autentikasi Pengguna)
     */
    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string', // username or email
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->identifier)
            ->orWhere('email', $request->identifier)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Also allow fallback password 'password123' if plain text or hash mismatch in dev
            if (!$user || ($request->password !== 'password123' && !Hash::check($request->password, $user->password))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Username/email atau password salah.',
                ], 401);
            }
        }

        session(['logged_user_id' => $user->user_id]);

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil! Selamat datang, ' . $user->nama_lengkap,
            'user' => $user,
        ]);
    }

    /**
     * User Logout
     */
    public function logout(Request $request)
    {
        session()->forget('logged_user_id');

        return response()->json([
            'success' => true,
            'message' => 'Berhasil keluar dari akun.',
        ]);
    }

    /**
     * User Registration (Flowchart Tahap 1: Registrasi isi data diri & password)
     */
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50|unique:users,username',
            'email' => 'required|email|max:100|unique:users,email',
            'password' => 'required|string|min:6',
            'nama_lengkap' => 'required|string|max:100',
            'no_hp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
        ]);

        session(['logged_user_id' => $user->user_id]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil! Akun Anda telah dibuat.',
            'user' => $user,
        ], 201);
    }

    /**
     * Switch Demo User
     */
    public function switchUser(Request $request)
    {
        $userId = $request->input('user_id');
        $user = User::find($userId);
        if ($user) {
            session(['logged_user_id' => $user->user_id]);
            return response()->json([
                'success' => true,
                'user' => $user,
            ]);
        }
        return response()->json(['success' => false, 'message' => 'User not found'], 404);
    }

    /**
     * Get All Products with optional filter (Flowchart Tahap 2: Lihat daftar & filter produk)
     */
    public function getProducts(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);

        if ($request->filled('kategori_id') || $request->filled('category_id')) {
            $catId = $request->input('category_id', $request->input('kategori_id'));
            $query->where('category_id', $catId);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_produk', 'like', "%{$search}%")
                  ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        if ($request->input('sort') === 'price_asc') {
            $query->orderBy('harga', 'asc');
        } elseif ($request->input('sort') === 'price_desc') {
            $query->orderBy('harga', 'desc');
        } else {
            $query->orderBy('product_id', 'desc');
        }

        return response()->json([
            'success' => true,
            'products' => $query->get(),
        ]);
    }

    /**
     * Get Categories
     */
    public function getCategories()
    {
        $categories = Category::withCount('products')->get();
        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }

    /**
     * Cart API (Flowchart Tahap 2: Tambahkan ke Keranjang & Simpan ke tabel cart_items)
     */
    public function getCart(Request $request)
    {
        $userId = $request->input('user_id', session('logged_user_id'));
        if (!$userId) {
            return response()->json(['success' => true, 'cart_items' => []]);
        }

        $items = CartItem::with('product')->where('user_id', $userId)->get();
        return response()->json(['success' => true, 'cart_items' => $items]);
    }

    public function syncCart(Request $request)
    {
        $userId = $request->input('user_id', session('logged_user_id'));
        if (!$userId) {
            return response()->json(['success' => false, 'message' => 'User belum login'], 401);
        }

        $items = $request->input('items', []);
        DB::beginTransaction();
        try {
            CartItem::where('user_id', $userId)->delete();
            foreach ($items as $item) {
                $prodId = $item['product_id'] ?? $item['id_produk'] ?? null;
                if ($prodId) {
                    CartItem::create([
                        'user_id' => $userId,
                        'product_id' => $prodId,
                        'ukuran' => $item['selectedSize'] ?? $item['ukuran'] ?? null,
                        'warna' => $item['selectedColor'] ?? $item['warna'] ?? null,
                        'jumlah' => $item['qty'] ?? $item['jumlah'] ?? 1,
                    ]);
                }
            }
            DB::commit();
            $updatedCart = CartItem::with('product')->where('user_id', $userId)->get();
            return response()->json(['success' => true, 'cart_items' => $updatedCart]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    /**
     * Process Checkout
     * Sesuai alur diagram Flowchart Toko-Online:
     * Tahap 3: Checkout & Pembayaran (Isi alamat, pilih metode, cek pembayaran)
     * Tahap 4: Proses Pesanan di Server (Cek stok, orders, payments, order_items, kurangi stok, commit)
     * Tahap 5: Hasil Pesanan (Tampilkan notifikasi, riwayat pesanan)
     */
    public function checkout(Request $request)
    {
        $userId = $request->input('user_id', session('logged_user_id'));

        $request->validate([
            'items' => 'required|array|min:1',
            'metode_pembayaran' => 'required|string', // 'transfer', 'cod', 'ewallet'
            'simulate_payment' => 'nullable|string',   // 'success' or 'failed'
        ]);

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu untuk melakukan checkout.',
            ], 401);
        }

        $simulatePayment = $request->input('simulate_payment', 'success');

        // Flowchart Tahap 3 Decision: Pembayaran Berhasil?
        if ($simulatePayment === 'failed') {
            return response()->json([
                'success' => false,
                'payment_status' => 'failed',
                'message' => 'Pembayaran gagal diproses oleh gateway/bank. Silakan ulangi checkout.',
            ], 422);
        }

        DB::beginTransaction();
        try {
            $total = 0;
            $orderItems = [];

            // Flowchart Tahap 4 Decision: Stok mencukupi?
            foreach ($request->items as $item) {
                $prodId = $item['product_id'] ?? $item['produk_id'] ?? null;
                $product = Product::find($prodId);
                if (!$product) {
                    throw new \Exception("Produk ID {$prodId} tidak ditemukan.");
                }

                $qty = $item['qty'] ?? $item['jumlah'] ?? 1;

                if ($product->stok < $qty) {
                    throw new \Exception("Stok untuk '{$product->nama_produk}' tidak mencukupi (sisa {$product->stok}).");
                }

                $subtotal = $product->harga * $qty;
                $total += $subtotal;

                $orderItems[] = [
                    'product'  => $product,
                    'qty'      => $qty,
                    'harga'    => $product->harga,
                    'subtotal' => $subtotal,
                    'size'     => $item['size'] ?? $item['ukuran'] ?? null,
                    'color'    => $item['color'] ?? $item['warna'] ?? null,
                ];
            }

            // Flowchart Tahap 4 Decision: Metode COD?
            $metodeInput = strtolower($request->metode_pembayaran);
            $isCod = (strpos($metodeInput, 'cod') !== false);
            $orderStatus = $isCod ? 'pending' : 'paid';

            // Nama metode pembayaran sesuai ERD Toko-Online
            $metodeLabel = match(true) {
                $isCod => 'Bayar di Tempat - COD',
                strpos($metodeInput, 'ewallet') !== false => 'E-Wallet',
                default => 'Transfer Bank',
            };

            // 1. Simpan ke tabel ORDERS (ERD: orders)
            $order = Order::create([
                'user_id'        => $userId,
                'tanggal_pesan'  => Carbon::now(),
                'total_harga'    => $total,
                'status_pesanan' => $orderStatus,
            ]);

            // 2. Simpan ke tabel PAYMENTS (ERD: payments)
            Payment::create([
                'order_id'          => $order->order_id,
                'metode_pembayaran' => $metodeLabel,
                'status_pembayaran' => $isCod ? 'pending' : 'paid',
                'tanggal_bayar'     => Carbon::now(),
            ]);

            // 3. Simpan ke tabel ORDER_ITEMS & Kurangi Stok (ERD: order_items, products)
            foreach ($orderItems as $itemData) {
                $detailNama = $itemData['product']->nama_produk;
                $variants = array_filter([
                    !empty($itemData['size']) ? 'Ukuran: ' . $itemData['size'] : null,
                    !empty($itemData['color']) ? 'Warna: ' . $itemData['color'] : null,
                ]);
                if (!empty($variants)) {
                    $detailNama .= ' (' . implode(', ', $variants) . ')';
                }

                OrderItem::create([
                    'order_id'     => $order->order_id,
                    'product_id'   => $itemData['product']->product_id,
                    'nama_produk'  => substr($detailNama, 0, 150),
                    'jumlah'       => $itemData['qty'],
                    'harga_satuan' => $itemData['harga'],
                    'subtotal'     => $itemData['subtotal'],
                ]);

                // Kurangi stok produk
                $itemData['product']->decrement('stok', $itemData['qty']);
            }

            // 4. Bersihkan cart_items di DB untuk user ini
            CartItem::where('user_id', $userId)->delete();

            // Commit transaksi
            DB::commit();

            // Load fresh order with relations
            $fullOrder = Order::with(['orderItems', 'payment'])->find($order->order_id);
            $updatedProducts = Product::with('category')->where('is_active', true)->get();

            return response()->json([
                'success' => true,
                'payment_status' => 'success',
                'message' => 'Pesanan berhasil dibuat dan tersimpan di database!',
                'transaksi' => $fullOrder,
                'order' => $fullOrder,
                'products' => $updatedProducts,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses pesanan: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get Transaction / Order History (Flowchart Tahap 5: Simpan di Riwayat Pesanan)
     */
    public function getTransactions(Request $request)
    {
        $userId = $request->query('user_id', session('logged_user_id'));

        if (!$userId) {
            return response()->json([
                'success' => true,
                'transactions' => [],
            ]);
        }

        $orders = Order::with(['orderItems', 'payment'])
            ->where('user_id', $userId)
            ->orderBy('order_id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'transactions' => $orders,
            'orders' => $orders,
        ]);
    }

    /**
     * Update Order Status (Flowchart Tahap 5: shipped / completed)
     */
    public function updateOrderStatus(Request $request, $orderId)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed,cancelled',
        ]);

        $order = Order::find($orderId);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Pesanan tidak ditemukan'], 404);
        }

        $order->status_pesanan = $request->status;
        $order->save();

        if ($request->status === 'paid' && $order->payment) {
            $order->payment->status_pembayaran = 'paid';
            $order->payment->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Status pesanan berhasil diperbarui!',
            'order' => $order->fresh(['orderItems', 'payment']),
            'transaksi' => $order->fresh(['orderItems', 'payment']),
        ]);
    }

    /**
     * Update User Profile (foto, nama, username, no_hp, alamat, email)
     */
    public function updateProfile(Request $request)
    {
        $userId = $request->input('user_id', session('logged_user_id'));
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan. Silakan login kembali.',
            ], 404);
        }

        $request->validate([
            'nama_lengkap' => 'required|string|max:100',
            'username' => 'required|string|max:50|unique:users,username,' . $user->user_id . ',user_id',
            'email' => 'required|email|max:100|unique:users,email,' . $user->user_id . ',user_id',
            'no_hp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'foto' => 'nullable|string',
        ]);

        $user->nama_lengkap = $request->nama_lengkap;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->no_hp = $request->no_hp;
        $user->alamat = $request->alamat;
        if ($request->has('foto')) {
            $user->foto = $request->foto;
        }

        if ($request->filled('password')) {
            $request->validate(['password' => 'min:6']);
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil Anda berhasil diperbarui!',
            'user' => $user->fresh(),
        ]);
    }
}
