<?php

namespace Database\Seeders;

use App\Models\LetterType;
use Illuminate\Database\Seeder;

class LetterTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        LetterType::create([
            'name' => 'BIASA',
            'format' => 'B/#/b/t',
        ]);
        LetterType::create([
            'name' => 'NOTA DINAS',
            'format' => 'ND/#/b/t',
        ]);
        LetterType::create([
            'name' => 'SPRIN',
            'format' => 'SP/#/b/t',
        ]);
        LetterType::create([
            'name' => 'RAHASIA',
            'format' => 'R/#/b/t',
        ]);
    }
}
