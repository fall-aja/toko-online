<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = 'order_items';
    protected $primaryKey = 'order_item_id';

    protected $fillable = [
        'order_id',
        'product_id',
        'nama_produk',
        'jumlah',
        'harga_satuan',
        'subtotal',
    ];

    protected $appends = [
        'id_detail',
        'transaksi_id',
        'produk_id',
        'qty',
        'harga',
    ];

    protected function casts(): array
    {
        return [
            'order_id' => 'integer',
            'product_id' => 'integer',
            'jumlah' => 'integer',
            'harga_satuan' => 'float',
            'subtotal' => 'float',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Backward compatibility accessors
    public function getIdDetailAttribute(): int
    {
        return (int) $this->attributes['order_item_id'];
    }

    public function getTransaksiIdAttribute(): int
    {
        return (int) $this->attributes['order_id'];
    }

    public function getProdukIdAttribute(): ?int
    {
        return isset($this->attributes['product_id']) ? (int) $this->attributes['product_id'] : null;
    }

    public function getQtyAttribute(): int
    {
        return (int) $this->attributes['jumlah'];
    }

    public function getHargaAttribute(): float
    {
        return (float) $this->attributes['harga_satuan'];
    }

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    // Backward compatibility
    public function transaksi()
    {
        return $this->order();
    }

    public function produk()
    {
        return $this->product();
    }
}

