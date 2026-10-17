<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'kategori';
    protected $primaryKey = 'id_kategori';

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'nama_kategori',
        'deskripsi',
    ];

    public function produk()
    {
        return $this->hasMany(Produk::class, 'kategori_id', 'id_kategori');
    }
}
