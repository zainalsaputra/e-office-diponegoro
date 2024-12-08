<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admintuud@kesdam.test',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'DANDENKESYAH',
            'email' => 'dandenkesyah@kesdam.test',
            'username' => 'dandenkesyah',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 1,
        ]);

        User::create([
            'name' => 'WADAN DANDENKESYAH',
            'email' => 'wadandenkesyah@kesdam.test',
            'username' => 'wadandenkesyah',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 2,
        ]);

        User::create([
            'name' => 'PASI TUUD',
            'email' => 'pasituud@kesdam.test',
            'username' => 'pasituud',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 3,
        ]);

        User::create([
            'name' => 'PASI MINLOG',
            'email' => 'pasiminlog@kesdam.test',
            'username' => 'pasiminlog',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 4,
        ]);
        
        User::create([
            'name' => 'PASI MINKES',
            'email' => 'pasiminkes@kesdam.test',
            'username' => 'pasiminkes',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 5,
        ]);

        User::create([
            'name' => 'KARUMKIT dr. ARYOKO',
            'email' => 'karumkit@kesdam.test',
            'username' => 'karumkit',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 6,
        ]);

        User::create([
            'name' => 'DANTIM KESLAP',
            'email' => 'dankeslap@kesdam.test',
            'username' => 'dankeslap',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 7,
        ]);

        User::create([
            'name' => 'KAGUDKESYAH',
            'email' => 'kagudkesyah@kesdam.test',
            'username' => 'kagudkesyah',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 8,
        ]);
    }
}
