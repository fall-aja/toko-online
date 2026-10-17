<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;

    protected $table = 'detail_transaksi';
    protected $primaryKey = 'id_detail';

    public $timestamps = false;

    protected $fillable = [
        'transaksi_id',
        'produk_id',
        'nama_produk',
        'qty',
        'harga',
        'subtotal',
    ];

    protected function casts(): array
    {
        return [
            'qty' => 'integer',
            'harga' => 'float',
            'subtotal' => 'float',
        ];
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaksi_id', 'id_transaksi');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produk_id', 'id_produk');
    }
}
