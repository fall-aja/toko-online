<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $primaryKey = 'id_transaksi';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'tanggal',
        'total',
        'status',
        'metode_pembayaran',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'datetime',
            'total' => 'float',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function detailTransaksi()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaksi_id', 'id_transaksi');
    }
}
