<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'order_id';

    protected $fillable = [
        'user_id',
        'tanggal_pesan',
        'total_harga',
        'status_pesanan',
    ];

    protected $appends = [
        'id_transaksi',
        'tanggal',
        'total',
        'status',
        'metode_pembayaran',
        'detail_transaksi',
    ];

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'tanggal_pesan' => 'datetime',
            'total_harga' => 'float',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Backward compatibility accessors
    public function getIdTransaksiAttribute(): int
    {
        return (int) $this->attributes['order_id'];
    }

    public function getTanggalAttribute()
    {
        return $this->attributes['tanggal_pesan'] ?? null;
    }

    public function getTotalAttribute(): float
    {
        return (float) ($this->attributes['total_harga'] ?? 0);
    }

    public function getStatusAttribute(): string
    {
        return (string) ($this->attributes['status_pesanan'] ?? 'pending');
    }

    public function getMetodePembayaranAttribute(): string
    {
        return $this->payment ? $this->payment->metode_pembayaran : 'transfer';
    }

    public function getDetailTransaksiAttribute()
    {
        return $this->orderItems;
    }

    // Relationships according to ERD
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'order_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id', 'order_id');
    }

    // Backward compatibility
    public function detailTransaksi()
    {
        return $this->orderItems();
    }
}

