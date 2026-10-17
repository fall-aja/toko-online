<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('produk')) {
            Schema::create('produk', function (Blueprint $table) {
                $table->increments('id_produk');
                $table->string('nama_produk', 100)->index();
                $table->unsignedInteger('kategori_id')->index();
                $table->decimal('harga', 10, 2);
                $table->integer('stok')->default(0);
                $table->integer('berat')->nullable()->comment('dalam gram');
                $table->text('deskripsi')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamp('created_at')->useCurrent();

                $table->foreign('kategori_id')
                      ->references('id_kategori')
                      ->on('kategori')
                      ->onDelete('restrict')
                      ->onUpdate('cascade');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
