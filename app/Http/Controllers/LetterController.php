<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LetterController extends Controller
{
    public function incoming()
    {
        return view('pages.letters.incoming');
    }

    public function outgoing()
    {
    }

    public function history()
    {
        return view('pages.letters.history');
    }
}
