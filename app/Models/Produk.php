<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    protected $table = 'produk';
    protected $primaryKey = 'id_produk';

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'nama_produk',
        'kategori_id',
        'harga',
        'stok',
        'berat',
        'deskripsi',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'harga' => 'float',
            'stok' => 'integer',
            'berat' => 'integer',
            'is_active' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id_kategori');
    }

    public function detailTransaksi()
    {
        return $this->hasMany(DetailTransaksi::class, 'produk_id', 'id_produk');
    }
}
