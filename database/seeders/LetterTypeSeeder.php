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
        // LetterType::create([
        //     'name' => 'Biasa',
        //     'format' => 'B/#/b/t',
        // ]);
        LetterType::create([
            'name' => 'BIASA',
            'format' => 'TA/#/DKWAU/t',
        ]);
        LetterType::create([
            'name' => 'AGENDA',
            'format' => 'ND/#/KADY/t',
        ]);
    }
}
