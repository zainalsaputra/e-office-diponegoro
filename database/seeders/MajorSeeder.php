<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $data = [
        //     [ "name" => "DIII Keperawatan"],
        //     ["type" => "prodi", "name" => "DIII Kebidanan"],
        //     ["type" => "prodi", "name" => "DIII Akupunktur"],
        //     ["type" => "prodi", "name" => "DIII Farmasi"],
        //     ["type" => "prodi", "name" => "DIII RMIK"],
        //     ["type" => "prodi", "name" => "DIV Kebidanan"],
        //     ["type" => "prodi", "name" => "Profesi Bidan"],
        //     ["type" => "prodi", "name" => "S1 Farmasi"],
        //     ["type" => "prodi", "name" => "S1 Fisioterapi"],
        //     ["type" => "prodi", "name" => "S1 Informatika"],
        //     ["type" => "prodi", "name" => "S1 Keperawatan"],
        //     ["type" => "prodi", "name" => "Profesi Ners"],
        //     ["type" => "prodi", "name" => "DIV Anestesi"],
        //     ["type" => "fakultas", "name" => "FSTK"],
        //     ["type" => "rektorat", "name" => "Rektor"],
        //     ["type" => "rektorat", "name" => "Wakil Rektor 1"],
        //     ["type" => "rektorat", "name" => "Wakil Rektor 2"],
        //     ["type" => "rektorat", "name" => "Wakil Rektor 3"]
        // ];
        $data = [
            ["name" => "DANDENKESYAH"],
            ["name" => "WADAN DENKESYAH"],
            ["name" => "PASI TUUD"],
            ["name" => "PASI MINLOG"],
            ["name" => "PASI MINKES"],
            ["name" => "KARUMKIT dr. ARYOKO "],
            ["name" => "DANTIM KESLAP"],
            ["name" => "KAGUDKESYAH"]
        ];

        foreach ($data as $value) {
            Major::create($value);
        }
    }
}
