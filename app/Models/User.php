<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'username',
        'email',
        'password',
        'nama_lengkap',
        'no_hp',
        'alamat',
        'foto',
    ];

    protected $hidden = [
        'password',
    ];

    protected $appends = [
        'id_user',
        'id',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Backward compatibility accessors
    public function getIdUserAttribute(): int
    {
        return (int) $this->attributes['user_id'];
    }

    public function getIdAttribute(): int
    {
        return (int) $this->attributes['user_id'];
    }

    // Relationships according to ERD
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'user_id', 'user_id');
    }

    // Backward compatibility relation
    public function transaksi()
    {
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }
}
