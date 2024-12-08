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
            'email' => 'admin@email.test',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'DANDENKESYAH',
            'email' => 'user@email.test',
            'username' => 'user',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 1,
        ]);

        User::create([
            'name' => 'WADAN DANDENKESYAH',
            'email' => 'user2@email.test',
            'username' => 'user2',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 2,
        ]);

        User::create([
            'name' => 'PASI TUUD',
            'email' => 'user3@email.test',
            'username' => 'user3',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 3,
        ]);

        User::create([
            'name' => 'PASI MINLOG',
            'email' => 'user4@email.test',
            'username' => 'user4',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 4,
        ]);
        
        User::create([
            'name' => 'PASI MINKES',
            'email' => 'user5@email.test',
            'username' => 'user5',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 5,
        ]);

        User::create([
            'name' => 'KARUMKIT dr. ARYOKO',
            'email' => 'user6@email.test',
            'username' => 'user6',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 6,
        ]);

        User::create([
            'name' => 'DANTIM KESLAP',
            'email' => 'user7@email.test',
            'username' => 'user7',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 7,
        ]);

        User::create([
            'name' => 'KAGUDKESYAH',
            'email' => 'user8@email.test',
            'username' => 'user8',
            'password' => Hash::make('password'),
            'role' => 'user',
            'major_id' => 8,
        ]);
    }
}
