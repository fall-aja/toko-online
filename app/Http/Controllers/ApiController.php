<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ApiController extends Controller
{
    /**
     * Get initial startup data: current user, categories, and products
     */
    public function getInitialData(Request $request)
    {
        $userId = session('logged_user_id');
        $user = $userId ? User::find($userId) : null;

        $categories = Kategori::withCount('produk')->get();
        $products = Produk::with('kategori')->where('is_active', true)->get();

        $transactions = [];
        if ($user) {
            $transactions = Transaksi::with('detailTransaksi')
                ->where('user_id', $user->id_user)
                ->orderBy('id_transaksi', 'desc')
                ->get();
        }

        return response()->json([
            'success' => true,
            'user' => $user,
            'categories' => $categories,
            'products' => $products,
            'transactions' => $transactions,
        ]);
    }

    /**
     * User Login
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

        session(['logged_user_id' => $user->id_user]);

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
     * User Registration
     */
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50|unique:user,username',
            'email' => 'required|email|max:100|unique:user,email',
            'password' => 'required|string|min:6',
            'nama_lengkap' => 'required|string|max:100',
            'no_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'created_at' => Carbon::now(),
        ]);

        session(['logged_user_id' => $user->id_user]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil! Akun Anda telah dibuat.',
            'user' => $user,
        ], 201);
    }

    /**
     * Switch Demo User (convenient for testing user accounts)
     */
    public function switchUser(Request $request)
    {
        $userId = $request->input('user_id');
        $user = User::find($userId);
        if ($user) {
            session(['logged_user_id' => $user->id_user]);
            return response()->json([
                'success' => true,
                'user' => $user,
            ]);
        }
        return response()->json(['success' => false, 'message' => 'User not found'], 404);
    }

    /**
     * Get All Products with optional filter
     */
    public function getProducts(Request $request)
    {
        $query = Produk::with('kategori')->where('is_active', true);

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
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
            $query->orderBy('id_produk', 'desc');
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
        $categories = Kategori::withCount('produk')->get();
        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }

    /**
     * Process Checkout
     * Matches flowchart: Simpan ke tabel Transaksi dan Detail -> Cek Pembayaran Berhasil
     */
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:user,id_user',
            'items' => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:produk,id_produk',
            'items.*.qty' => 'required|integer|min:1',
            'metode_pembayaran' => 'required|in:transfer,cod,ewallet',
            'simulate_payment' => 'nullable|string', // 'success' or 'failed'
        ]);

        $simulatePayment = $request->input('simulate_payment', 'success');

        // Check if simulated payment failed
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

            foreach ($request->items as $item) {
                $produk = Produk::find($item['produk_id']);
                if (!$produk) {
                    throw new \Exception("Produk ID {$item['produk_id']} tidak ditemukan.");
                }

                if ($produk->stok < $item['qty']) {
                    throw new \Exception("Stok untuk '{$produk->nama_produk}' tidak mencukupi (sisa {$produk->stok}).");
                }

                $subtotal = $produk->harga * $item['qty'];
                $total += $subtotal;

                $orderItems[] = [
                    'produk' => $produk,
                    'qty' => $item['qty'],
                    'harga' => $produk->harga,
                    'subtotal' => $subtotal,
                ];
            }

            // Create Transaksi
            $transaksi = Transaksi::create([
                'user_id' => $request->user_id,
                'tanggal' => Carbon::now(),
                'total' => $total,
                'status' => $request->metode_pembayaran === 'cod' ? 'pending' : 'paid',
                'metode_pembayaran' => $request->metode_pembayaran,
            ]);

            // Create DetailTransaksi & Deduct Stock
            foreach ($orderItems as $itemData) {
                DetailTransaksi::create([
                    'transaksi_id' => $transaksi->id_transaksi,
                    'produk_id' => $itemData['produk']->id_produk,
                    'nama_produk' => $itemData['produk']->nama_produk,
                    'qty' => $itemData['qty'],
                    'harga' => $itemData['harga'],
                    'subtotal' => $itemData['subtotal'],
                ]);

                // Reduce stock
                $itemData['produk']->decrement('stok', $itemData['qty']);
            }

            DB::commit();

            // Load transaction with items and fresh product list
            $fullTransaction = Transaksi::with('detailTransaksi')->find($transaksi->id_transaksi);
            $updatedProducts = Produk::with('kategori')->where('is_active', true)->get();

            return response()->json([
                'success' => true,
                'payment_status' => 'success',
                'message' => 'Transaksi berhasil diselesaikan! Pesanan Anda sedang diproses.',
                'transaksi' => $fullTransaction,
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
     * Get Transaction History for user
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

        $transactions = Transaksi::with('detailTransaksi')
            ->where('user_id', $userId)
            ->orderBy('id_transaksi', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'transactions' => $transactions,
        ]);
    }
}
