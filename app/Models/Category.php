<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'nama_kategori',
        'deskripsi',
    ];

    protected $appends = [
        'id_kategori',
    ];

    public function getIdKategoriAttribute(): int
    {
        return (int) $this->attributes['category_id'];
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }

    // Backward compatibility
    public function produk()
    {
        return $this->products();
    }
}
