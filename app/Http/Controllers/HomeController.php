<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseFormatter;
use App\Models\IncomingLetter;
use App\Models\LetterType;
use App\Models\OutgoingLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    // public function index()
    // {
    //     $incoming = IncomingLetter::where('major_id', auth()->user()->major_id)->count();
    //     $outgoing = OutgoingLetter::where('major_id', auth()->user()->major_id)->count();
    //     $unprocessed = OutgoingLetter::where('kepada', auth()->user()->major_id)->where('is_read', 0)->count();
    //     $type = LetterType::where('major_id', auth()->user()->major_id)->count();

    //     if (request()->ajax()) {
    //         $incoming = IncomingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at')->where('major_id', auth()->user()->major_id)->get();
    //         $outgoing = OutgoingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at')->where('major_id', auth()->user()->major_id)->get();

    //         foreach ($incoming as $value) {
    //             $value->jenis = 'Masuk';  //you are adding new element named 'type'
    //         }

    //         foreach ($outgoing as $value) {
    //             $value->jenis = 'Keluar';  //you are adding new element named 'type'
    //         }

    //         $merged = $incoming->merge($outgoing);
    //         $result = $merged->sortByDesc('created_at');

    //         return ResponseFormatter::success($result, 'Data berhasil diambil');
    //     }

    //     return view('home', compact('incoming', 'outgoing', 'unprocessed', 'type'));
    // }

    public function index()
    {
        $incoming = IncomingLetter::where('major_id', auth()->user()->major_id)->count();
        $outgoing = OutgoingLetter::where('major_id', auth()->user()->major_id)->count();
        $unprocessed = OutgoingLetter::where('kepada', auth()->user()->major_id)->where('is_read', 0)->count();
        $type = LetterType::where('major_id', auth()->user()->major_id)->count();

        if (auth()->user()->hasRole('admin')) {
            $incoming = IncomingLetter::count();
            $outgoing = OutgoingLetter::count();
            $unprocessed = OutgoingLetter::where('is_read', 0)->count();
            $type = LetterType::count();
        }

        if (request()->ajax()) {
            $incoming = IncomingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at')->where('major_id', auth()->user()->major_id)->get();
            $outgoing = OutgoingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at')->where('major_id', auth()->user()->major_id)->get();

            if (auth()->user()->hasRole('admin')) {
                $incoming = IncomingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at');
                $outgoing = OutgoingLetter::select('id', 'perihal', 'no_surat', 'tgl_surat', 'created_at');
            }

            foreach ($incoming as $value) {
                $value->jenis = 'Masuk';  //you are adding new element named 'type'
            }

            foreach ($outgoing as $value) {
                $value->jenis = 'Keluar';  //you are adding new element named 'type'
            }

            $merged = $incoming->merge($outgoing);
            $result = $merged->sortByDesc('created_at');

            return ResponseFormatter::success($result, 'Data berhasil diambil');
        }

        return view('home', compact('incoming', 'outgoing', 'unprocessed', 'type'));
    }

    public function password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error($validator->errors(), 'Password berhasil diupdate');
        }

        try {
            $user = auth()->user();
            $user->password = Hash::make($request->password);
            $user->save();

            return ResponseFormatter::success($user, 'Password berhasil diupdate');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
