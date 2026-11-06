<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'category_id',
        'nama_produk',
        'deskripsi',
        'harga',
        'stok',
        'berat_gram',
        'ukuran',
        'warna',
        'is_active',
    ];

    protected $appends = [
        'id_produk',
        'kategori_id',
        'berat',
    ];

    protected function casts(): array
    {
        return [
            'harga' => 'float',
            'stok' => 'integer',
            'berat_gram' => 'integer',
            'ukuran' => 'array',
            'warna' => 'array',
            'is_active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Backward compatibility accessors
    public function getIdProdukAttribute(): int
    {
        return (int) $this->attributes['product_id'];
    }

    public function getKategoriIdAttribute(): int
    {
        return (int) $this->attributes['category_id'];
    }

    public function getBeratAttribute(): int
    {
        return (int) ($this->attributes['berat_gram'] ?? 0);
    }

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id', 'product_id');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'product_id', 'product_id');
    }

    // Backward compatibility
    public function kategori()
    {
        return $this->category();
    }

    public function detailTransaksi()
    {
        return $this->orderItems();
    }
}
