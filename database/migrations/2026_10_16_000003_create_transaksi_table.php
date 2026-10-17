<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('transaksi')) {
            Schema::create('transaksi', function (Blueprint $table) {
                $table->increments('id_transaksi');
                $table->unsignedInteger('user_id')->index();
                $table->dateTime('tanggal')->useCurrent()->index();
                $table->decimal('total', 12, 2);
                $table->enum('status', ['pending', 'paid', 'shipped', 'completed', 'cancelled'])->default('pending')->index();
                $table->enum('metode_pembayaran', ['transfer', 'cod', 'ewallet']);

                $table->foreign('user_id')
                      ->references('id_user')
                      ->on('user')
                      ->onDelete('restrict');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
