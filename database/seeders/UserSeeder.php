<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = require database_path('data/pengguna.php');

        foreach ($users as $u) {
            User::firstOrCreate(
                ['username' => $u['username']],
                [
                    'email'        => $u['email'],
                    'password'     => Hash::make($u['password']),
                    'nama_lengkap' => $u['nama_lengkap'],
                    'no_hp'        => $u['no_hp'],
                    'alamat'       => $u['alamat'],
                    'created_at'   => Carbon::now()->subMonths(2),
                ]
            );
        }
    }
}
