<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations according to ERD Toko-Online.
     * Tables: users, categories, products, cart_items, orders, order_items, payments.
     */
    public function up(): void
    {
        // 1. CATEGORIES TABLE
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->increments('category_id');
                $table->string('nama_kategori', 100);
                $table->text('deskripsi')->nullable();
                $table->timestamps();
            });

            // Migrate data from legacy 'kategori' table if exists
            if (Schema::hasTable('kategori')) {
                DB::statement("
                    INSERT INTO categories (category_id, nama_kategori, deskripsi, created_at, updated_at)
                    SELECT id_kategori, nama_kategori, deskripsi, created_at, NOW()
                    FROM kategori
                ");
            }
        }

        // 2. USERS TABLE
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->increments('user_id');
                $table->string('username', 50)->unique();
                $table->string('email', 100)->unique();
                $table->string('password', 255);
                $table->string('nama_lengkap', 100);
                $table->string('no_hp', 20)->nullable();
                $table->text('alamat')->nullable();
                $table->text('foto')->nullable();
                $table->timestamps();
            });

            // Migrate data from legacy 'user' table if exists
            if (Schema::hasTable('user')) {
                DB::statement("
                    INSERT INTO users (user_id, username, email, password, nama_lengkap, no_hp, alamat, foto, created_at, updated_at)
                    SELECT id_user, username, email, password, nama_lengkap, no_hp, alamat, foto, created_at, NOW()
                    FROM user
                ");
            }
        }

        // 3. PRODUCTS TABLE
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->increments('product_id');
                $table->unsignedInteger('category_id');
                $table->string('nama_produk', 150);
                $table->text('deskripsi')->nullable();
                $table->decimal('harga', 12, 2);
                $table->integer('stok')->default(0);
                $table->integer('berat_gram')->default(0);
                $table->json('ukuran')->nullable();
                $table->json('warna')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                $table->foreign('category_id')
                      ->references('category_id')
                      ->on('categories')
                      ->onDelete('cascade');
            });

            // Migrate data from legacy 'produk' table if exists
            if (Schema::hasTable('produk')) {
                DB::statement("
                    INSERT INTO products (product_id, category_id, nama_produk, deskripsi, harga, stok, berat_gram, ukuran, warna, is_active, created_at, updated_at)
                    SELECT id_produk, kategori_id, nama_produk, deskripsi, harga, stok, COALESCE(berat, 0), ukuran, warna, is_active, created_at, NOW()
                    FROM produk
                ");
            }
        }

        // 4. CART_ITEMS TABLE
        if (!Schema::hasTable('cart_items')) {
            Schema::create('cart_items', function (Blueprint $table) {
                $table->increments('cart_item_id');
                $table->unsignedInteger('user_id');
                $table->unsignedInteger('product_id');
                $table->string('ukuran', 50)->nullable();
                $table->string('warna', 50)->nullable();
                $table->integer('jumlah')->default(1);
                $table->timestamps();

                $table->foreign('user_id')
                      ->references('user_id')
                      ->on('users')
                      ->onDelete('cascade');

                $table->foreign('product_id')
                      ->references('product_id')
                      ->on('products')
                      ->onDelete('cascade');
            });
        }

        // 5. ORDERS TABLE
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->increments('order_id');
                $table->unsignedInteger('user_id');
                $table->dateTime('tanggal_pesan');
                $table->decimal('total_harga', 12, 2);
                $table->string('status_pesanan', 50)->default('pending'); // pending, paid, shipped, completed, cancelled
                $table->timestamps();

                $table->foreign('user_id')
                      ->references('user_id')
                      ->on('users')
                      ->onDelete('cascade');
            });

            // Migrate data from legacy 'transaksi' table if exists
            if (Schema::hasTable('transaksi')) {
                DB::statement("
                    INSERT INTO orders (order_id, user_id, tanggal_pesan, total_harga, status_pesanan, created_at, updated_at)
                    SELECT id_transaksi, user_id, tanggal, total, status, tanggal, NOW()
                    FROM transaksi
                ");
            }
        }

        // 6. ORDER_ITEMS TABLE
        if (!Schema::hasTable('order_items')) {
            Schema::create('order_items', function (Blueprint $table) {
                $table->increments('order_item_id');
                $table->unsignedInteger('order_id');
                $table->unsignedInteger('product_id')->nullable();
                $table->string('nama_produk', 150);
                $table->integer('jumlah')->default(1);
                $table->decimal('harga_satuan', 12, 2);
                $table->decimal('subtotal', 12, 2);
                $table->timestamps();

                $table->foreign('order_id')
                      ->references('order_id')
                      ->on('orders')
                      ->onDelete('cascade');

                $table->foreign('product_id')
                      ->references('product_id')
                      ->on('products')
                      ->onDelete('set null');
            });

            // Migrate data from legacy 'detail_transaksi' table if exists
            if (Schema::hasTable('detail_transaksi')) {
                DB::statement("
                    INSERT INTO order_items (order_item_id, order_id, product_id, nama_produk, jumlah, harga_satuan, subtotal, created_at, updated_at)
                    SELECT id_detail, transaksi_id, produk_id, nama_produk, qty, harga, subtotal, NOW(), NOW()
                    FROM detail_transaksi
                ");
            }
        }

        // 7. PAYMENTS TABLE
        if (!Schema::hasTable('payments')) {
            Schema::create('payments', function (Blueprint $table) {
                $table->increments('payment_id');
                $table->unsignedInteger('order_id');
                $table->string('metode_pembayaran', 50); // Transfer, E-Wallet, Bayar di Tempat - COD
                $table->string('status_pembayaran', 50)->default('pending'); // pending, paid, success, failed
                $table->dateTime('tanggal_bayar')->nullable();
                $table->timestamps();

                $table->foreign('order_id')
                      ->references('order_id')
                      ->on('orders')
                      ->onDelete('cascade');
            });

            // Populate initial payments from legacy 'transaksi' if exists
            if (Schema::hasTable('transaksi')) {
                DB::statement("
                    INSERT INTO payments (order_id, metode_pembayaran, status_pembayaran, tanggal_bayar, created_at, updated_at)
                    SELECT 
                        id_transaksi, 
                        metode_pembayaran, 
                        CASE WHEN status IN ('paid', 'completed', 'shipped') THEN 'paid' ELSE 'pending' END,
                        tanggal,
                        tanggal,
                        NOW()
                    FROM transaksi
                ");
            }
        }

        // 8. Legacy compatibility views
        // Drop legacy tables if they are empty/migrated or rename them to backup
        // and create compatibility views so ANY raw SQL on legacy names still works
        try {
            DB::statement("DROP TABLE IF EXISTS detail_transaksi");
            DB::statement("DROP TABLE IF EXISTS transaksi");
            DB::statement("DROP TABLE IF EXISTS produk");
            DB::statement("DROP TABLE IF EXISTS kategori");
            DB::statement("DROP TABLE IF EXISTS user");

            DB::statement("
                CREATE OR REPLACE VIEW `user` AS 
                SELECT user_id AS id_user, username, email, password, nama_lengkap, no_hp, alamat, foto, created_at 
                FROM users
            ");

            DB::statement("
                CREATE OR REPLACE VIEW `kategori` AS 
                SELECT category_id AS id_kategori, nama_kategori, deskripsi, created_at, updated_at 
                FROM categories
            ");

            DB::statement("
                CREATE OR REPLACE VIEW `produk` AS 
                SELECT product_id AS id_produk, category_id AS kategori_id, nama_produk, deskripsi, harga, stok, berat_gram AS berat, ukuran, warna, is_active, created_at, updated_at 
                FROM products
            ");

            DB::statement("
                CREATE OR REPLACE VIEW `transaksi` AS 
                SELECT 
                    o.order_id AS id_transaksi, 
                    o.user_id, 
                    o.tanggal_pesan AS tanggal, 
                    o.total_harga AS total, 
                    o.status_pesanan AS status, 
                    COALESCE(p.metode_pembayaran, 'transfer') AS metode_pembayaran
                FROM orders o 
                LEFT JOIN payments p ON o.order_id = p.order_id
            ");

            DB::statement("
                CREATE OR REPLACE VIEW `detail_transaksi` AS 
                SELECT 
                    order_item_id AS id_detail, 
                    order_id AS transaksi_id, 
                    product_id AS produk_id, 
                    nama_produk, 
                    jumlah AS qty, 
                    harga_satuan AS harga, 
                    subtotal 
                FROM order_items
            ");
        } catch (\Throwable $e) {
            // Log error if view creation had issues but keep migration passing
            report($e);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS detail_transaksi");
        DB::statement("DROP VIEW IF EXISTS transaksi");
        DB::statement("DROP VIEW IF EXISTS produk");
        DB::statement("DROP VIEW IF EXISTS kategori");
        DB::statement("DROP VIEW IF EXISTS user");

        Schema::dropIfExists('payments');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
    }
};

