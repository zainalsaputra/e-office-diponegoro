<?php

namespace App\Http\Controllers;

use App\Helpers\NumberToRoman;
use App\Helpers\ResponseFormatter;
use App\Models\LetterType;
use App\Models\Major;
use App\Models\OutgoingLetter;
use App\Models\IncomingLetter;
use App\Models\User;
use App\Notifications\IncomingLetterNotifications;
use Carbon\Carbon;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OutgoingLetterController extends Controller
{
    // public function index()
    // {
    //     if (request()->ajax()) {
    //         $data = OutgoingLetter::where('major_id', auth()->user()->major_id)->with('recipient')->orderBy('tgl_surat', 'desc')->get();
    //         return ResponseFormatter::success($data, 'Data berhasil diambil');
    //     }

    //     if (auth()->user()->major) {
    //         switch (auth()->user()->major->type) {
    //             case 'prodi':
    //                 $major = Major::where('name', auth()->user()->major->faculty)->get();
    //                 break;
    //             case 'fakultas':
    //                 $major = Major::where('type', 'rektorat')->orWhere('type', 'prodi')->get();
    //                 break;
    //             default:
    //                 $major = Major::get();
    //                 break;
    //         }
    //     } else {
    //         $major = Major::get();
    //     }

    //     $types = auth()->user()->major->letterTypes;
    //     return view('pages.letters.outgoing', compact('major', 'types'));
    // }

    // public function getAllData()
    // {
    //     if (request()->ajax()) {
    //         $data = OutgoingLetter::with('recipient')
    //             ->orderBy('tgl_surat', 'desc')
    //             ->get();

    //         return ResponseFormatter::success($data, 'Data berhasil diambil');
    //     }

    //     $major = Major::all();

    //     $types = LetterType::all();

    //     return view('pages.letters.outgoing', compact('major', 'types'));
    // }

    public function index()
    {
        if (request()->ajax()) {
            if (auth()->user()->hasRole('admin')) {
                // Admins can see all outgoing letters
                $data = OutgoingLetter::with('recipient')->orderBy('tgl_surat', 'desc')->get();
            } else {
                // Normal users can see letters related to their major
                $data = OutgoingLetter::where('major_id', auth()->user()->major_id)
                    ->with('recipient')
                    ->orderBy('tgl_surat', 'desc')
                    ->get();
            }

            return ResponseFormatter::success($data, 'Data berhasil diambil');
        }

        // Adjust logic for fetching majors or letter types
        $major = Major::get();

        $types = auth()->user()->hasRole('admin') ? LetterType::all() : auth()->user()->major->letterTypes;

        $typesName = $namaSurat = LetterType::all('id', 'name');

        return view('pages.letters.outgoing', compact('major', 'types', 'typesName'));
    }



    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'no_surat' => 'required',
    //         'jenis' => 'required',
    //         'tgl_surat' => 'required',
    //         'kepada' => 'required',
    //         'perihal' => 'required',
    //         'file' => 'required|file|mimes:pdf|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return ResponseFormatter::error(null, $validator->errors(), 422);
    //     }

    //     try {
    //         $file = $request->file('file');
    //         $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
    //         $path = Storage::putFileAs(
    //             'public/transaction-letters',
    //             $request->file('file'),
    //             time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
    //         );
    //         $fileName = explode("/", $path)[2];

    //         $outgoingLetter = new OutgoingLetter();
    //         $outgoingLetter->user_id = auth()->user()->id;
    //         $outgoingLetter->major_id = auth()->user()->major_id;
    //         $outgoingLetter->letter_type_id = $request->jenis;
    //         $outgoingLetter->no_surat = $request->no_surat;
    //         $outgoingLetter->tgl_surat = $request->tgl_surat;
    //         $outgoingLetter->kepada = $request->kepada;
    //         $outgoingLetter->perihal = $request->perihal;
    //         $outgoingLetter->file = $fileName;
    //         $outgoingLetter->save();

    //         // Notifikasi telegram ke FSTK
    //         $fstk = Major::where('type', 'fakultas')->first()->id;
    //         if ($request->kepada == $fstk) {
    //             $data = [
    //                 'from' => auth()->user()->major->name,
    //                 'subject' => $request->perihal,
    //                 'date' => Carbon::CreateFromFormat('Y-m-d', $request->tgl_surat)->format('d F Y'),
    //                 'number' => $request->no_surat,
    //                 'download' => config('app.url') . '/storage/transaction-letters/' . $fileName
    //             ];

    //             $recipient = User::where('major_id', $request->kepada)->first();
    //             $recipient->notify(new IncomingLetter($data));
    //             Log::info('Notifikasi surat keluar ke' . $recipient->name . ' berhasil dikirim');
    //         }

    //         return ResponseFormatter::success($outgoingLetter, 'Surat Keluar berhasil ditambahkan', 201);
    //     } catch (\Exception $e) {
    //         Log::error("OutgoingLetterController@store: " . $e->getMessage());
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }

    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'no_surat' => 'required',
    //         'jenis' => 'required',
    //         'tgl_surat' => 'required',
    //         'kepada' => 'required',
    //         'perihal' => 'required',
    //         'file' => 'required|file|mimes:pdf|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return ResponseFormatter::error(null, $validator->errors(), 422);
    //     }

    //     try {
    //         $file = $request->file('file');
    //         $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
    //         $path = Storage::putFileAs(
    //             'public/transaction-letters',
    //             $request->file('file'),
    //             time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
    //         );
    //         $fileName = explode("/", $path)[2];

    //         // Simpan data ke tabel outgoing_letters
    //         $outgoingLetter = new OutgoingLetter();
    //         $outgoingLetter->user_id = auth()->user()->id;
    //         $outgoingLetter->major_id = auth()->user()->major_id;
    //         $outgoingLetter->letter_type_id = $request->jenis;
    //         $outgoingLetter->no_surat = $request->no_surat;
    //         $outgoingLetter->tgl_surat = $request->tgl_surat;
    //         $outgoingLetter->kepada = $request->kepada;
    //         $outgoingLetter->perihal = $request->perihal;
    //         $outgoingLetter->file = $fileName;
    //         $outgoingLetter->save();

    //         // Simpan data ke tabel incoming_letters
    //         $incomingLetter = new IncomingLetter();
    //         $incomingLetter->user_id = $request->kepada; // Surat ditujukan kepada pengguna yang sesuai
    //         $incomingLetter->major_id = Major::find($request->kepada)->id; // Major penerima
    //         // $incomingLetter->letter_type_id = $request->jenis;
    //         $incomingLetter->dari = 'Saya'; // Surat ditujukan kepada pengguna yang sesuai
    //         $incomingLetter->no_agenda = time();
    //         $incomingLetter->no_surat = $request->no_surat;
    //         $incomingLetter->tgl_surat = $request->tgl_surat;
    //         $incomingLetter->tgl_terima = $request->tgl_surat;
    //         $incomingLetter->perihal = $request->perihal;
    //         $incomingLetter->file = $fileName;
    //         $incomingLetter->save();

    //         // Notifikasi telegram ke FSTK jika surat ditujukan ke FSTK
    //         $fstk = Major::where('type', 'fakultas')->first()->id;
    //         if ($request->kepada == $fstk) {
    //             $data = [
    //                 'from' => auth()->user()->major->name,
    //                 'subject' => $request->perihal,
    //                 'date' => Carbon::CreateFromFormat('Y-m-d', $request->tgl_surat)->format('d F Y'),
    //                 'number' => $request->no_surat,
    //                 'download' => config('app.url') . '/storage/transaction-letters/' . $fileName
    //             ];

    //             $recipient = User::where('major_id', $request->kepada)->first();
    //             $recipient->notify(new IncomingLetter($data));
    //             Log::info('Notifikasi surat keluar ke ' . $recipient->name . ' berhasil dikirim');
    //         }

    //         return ResponseFormatter::success($outgoingLetter, 'Surat Keluar berhasil ditambahkan', 201);
    //     } catch (\Exception $e) {
    //         Log::error("OutgoingLetterController@store: " . $e->getMessage());
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }


    // public function store(Request $request)
    // {
    //     // Validasi input
    //     $validator = Validator::make($request->all(), [
    //         'no_surat' => 'required',
    //         'jenis' => 'required',
    //         'tgl_surat' => 'required',
    //         'kepada' => 'required',
    //         'perihal' => 'required',
    //         'file' => 'required|file|mimes:pdf|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return ResponseFormatter::error(null, $validator->errors(), 422);
    //     }

    //     // Mulai transaksi
    //     DB::beginTransaction();

    //     try {
    //         // Proses upload file
    //         $file = $request->file('file');
    //         $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
    //         $path = Storage::putFileAs(
    //             'public/transaction-letters',
    //             $request->file('file'),
    //             time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
    //         );
    //         $fileName = explode("/", $path)[2];

    //         // Insert ke tabel outgoing_letters
    //         $outgoingLetter = new OutgoingLetter();
    //         $outgoingLetter->user_id = auth()->user()->id;
    //         $outgoingLetter->major_id = auth()->user()->major_id;
    //         $outgoingLetter->letter_type_id = $request->jenis;
    //         $outgoingLetter->no_surat = $request->no_surat;
    //         $outgoingLetter->tgl_surat = $request->tgl_surat;
    //         $outgoingLetter->kepada = $request->kepada;
    //         $outgoingLetter->perihal = $request->perihal;
    //         $outgoingLetter->file = $fileName;
    //         $outgoingLetter->save();

    //         // Insert ke tabel incoming_letters
    //         $incomingLetter = new IncomingLetter();
    //         $incomingLetter->user_id = $request->kepada; // Surat ditujukan kepada pengguna yang sesuai
    //         $incomingLetter->major_id = Major::find($request->kepada)->id; // Major penerima surat
    //         $incomingLetter->dari = auth()->user()->name; // Ambil nama pengirim dari pengguna yang login
    //         $incomingLetter->no_agenda = time(); // Misalnya generate no_agenda berdasarkan timestamp
    //         $incomingLetter->no_surat = $request->no_surat;
    //         $incomingLetter->tgl_surat = $request->tgl_surat;
    //         $incomingLetter->tgl_terima = $request->tgl_surat; // Tanggal terima sama dengan tanggal surat
    //         $incomingLetter->perihal = $request->perihal;
    //         $incomingLetter->file = $fileName;
    //         $incomingLetter->save();

    //         // Notifikasi telegram ke FSTK jika diperlukan
    //         $fstk = Major::where('type', 'fakultas')->first()->id;
    //         if ($request->kepada == $fstk) {
    //             $data = [
    //                 'from' => auth()->user()->major->name,
    //                 'subject' => $request->perihal,
    //                 'date' => Carbon::createFromFormat('Y-m-d', $request->tgl_surat)->format('d F Y'),
    //                 'number' => $request->no_surat,
    //                 'download' => config('app.url') . '/storage/transaction-letters/' . $fileName
    //             ];

    //             $recipient = User::where('major_id', $request->kepada)->first();
    //             $recipient->notify(new IncomingLetter($data));
    //             Log::info('Notifikasi surat keluar ke ' . $recipient->name . ' berhasil dikirim');
    //         }

    //         // Jika semua berhasil, commit transaksi
    //         DB::commit();

    //         return ResponseFormatter::success($outgoingLetter, 'Surat Keluar berhasil ditambahkan', 201);

    //     } catch (\Exception $e) {
    //         // Jika ada kesalahan, rollback transaksi
    //         DB::rollBack();
    //         Log::error("OutgoingLetterController@store: " . $e->getMessage());
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'no_surat' => 'required',
            'jenis' => 'required',
            'tgl_surat' => 'required',
            'kepada' => 'required',
            'perihal' => 'required',
            'file' => 'required|file|mimes:pdf|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        // Mulai transaksi
        DB::beginTransaction();

        try {
            // Proses upload file
            $file = $request->file('file');
            $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
            $path = Storage::putFileAs(
                'public/transaction-letters',
                $request->file('file'),
                time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
            );
            $fileName = explode("/", $path)[2];

            // Insert ke tabel outgoing_letters
            $outgoingLetter = new OutgoingLetter();
            $outgoingLetter->user_id = auth()->user()->id;
            $outgoingLetter->major_id = auth()->user()->major_id;
            $outgoingLetter->letter_type_id = $request->jenis;
            $outgoingLetter->no_surat = $request->no_surat;
            $outgoingLetter->tgl_surat = $request->tgl_surat;
            $outgoingLetter->kepada = $request->kepada;
            $outgoingLetter->perihal = $request->perihal;
            $outgoingLetter->file = $fileName;
            $outgoingLetter->save();


            // Cek apakah user dengan major_id yang dituju ada dalam tabel users
            $recipientUser = User::where('major_id', $request->kepada)->first();

            if (!$recipientUser) {
                throw new \Exception("User dengan major_id " . $request->kepada . " tidak ditemukan.");
            }

            // Insert ke tabel incoming_letters
            $incomingLetter = new IncomingLetter();
            $incomingLetter->user_id = $recipientUser->id; // User yang menerima surat
            $incomingLetter->major_id = $request->kepada; // Major penerima surat
            $incomingLetter->dari = auth()->user()->name; // Pengirim dari nama pengguna yang login
            $incomingLetter->no_agenda = $request->no_surat; // Misalnya generate no_agenda berdasarkan timestamp
            $incomingLetter->no_surat = $request->no_surat;
            $incomingLetter->tgl_surat = $request->tgl_surat;
            $incomingLetter->tgl_terima = $request->tgl_surat; // Tanggal terima sama dengan tanggal surat
            $incomingLetter->perihal = $request->perihal;
            $incomingLetter->file = $fileName;
            $incomingLetter->save();

            // Notifikasi telegram ke FSTK jika diperlukan
            // $fstk = Major::where('type', 'fakultas')->first()->id;
            // if ($request->kepada == $fstk) {
            //     $data = [
            //         'from' => auth()->user()->major->name,
            //         'subject' => $request->perihal,
            //         'date' => Carbon::createFromFormat('Y-m-d', $request->tgl_surat)->format('d F Y'),
            //         'number' => $request->no_surat,
            //         'download' => config('app.url') . '/storage/transaction-letters/' . $fileName
            //     ];

            //     $recipient = User::where('major_id', $request->kepada)->first();
            //     $recipient->notify(new IncomingLetterNotifications($data));
            //     Log::info('Notifikasi surat keluar ke ' . $recipient->name . ' berhasil dikirim');
            // }

            // Jika semua berhasil, commit transaksi
            DB::commit();

            return ResponseFormatter::success($outgoingLetter, 'Surat Keluar berhasil ditambahkan', 201);
        } catch (\Exception $e) {
            // Jika ada kesalahan, rollback transaksi
            DB::rollBack();
            Log::error("OutgoingLetterController@store: " . $e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        $outgoingLetter = OutgoingLetter::find($id);
        if (!$outgoingLetter) {
            return ResponseFormatter::error(null, 'Surat Keluar tidak ditemukan', 404);
        }
        return ResponseFormatter::success($outgoingLetter, 'Data berhasil diambil');
    }

    // public function update(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'no_surat' => 'required',
    //         'tgl_surat' => 'required',
    //         'kepada' => 'required',
    //         'perihal' => 'required',
    //         'file' => 'nullable|file|mimes:pdf|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return ResponseFormatter::error(null, $validator->errors(), 422);
    //     }

    //     try {
    //         $outgoingLetter = OutgoingLetter::find($id);
    //         if (!$outgoingLetter) {
    //             return ResponseFormatter::error(null, 'Surat Keluar tidak ditemukan', 404);
    //         }
    //         if ($request->hasFile('file')) {
    //             $file = $request->file('file');
    //             $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
    //             $path = Storage::putFileAs(
    //                 'public/transaction-letters',
    //                 $request->file('file'),
    //                 time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
    //             );

    //             // delete old file
    //             $oldFile = $outgoingLetter->file;
    //             Storage::delete('public/transaction-letters/' . $oldFile);

    //             $outgoingLetter->file = explode("/", $path)[2];
    //         }

    //         $outgoingLetter->no_surat = $request->no_surat;
    //         $outgoingLetter->tgl_surat = $request->tgl_surat;
    //         $outgoingLetter->kepada = $request->kepada;
    //         $outgoingLetter->perihal = $request->perihal;
    //         $outgoingLetter->save();
    //         return ResponseFormatter::success($outgoingLetter, 'Surat Keluar berhasil diubah', 200);
    //     } catch (\Exception $e) {
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'no_surat' => 'required',
            'tgl_surat' => 'required',
            'kepada' => 'required',
            'perihal' => 'required',
            'file' => 'nullable|file|mimes:pdf|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        // Mulai transaksi
        DB::beginTransaction();

        try {
            // Cari surat keluar berdasarkan ID
            $outgoingLetter = OutgoingLetter::findOrFail($id);

            // Proses file jika ada perubahan
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
                $path = Storage::putFileAs(
                    'public/transaction-letters',
                    $file,
                    time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
                );

                // Hapus file lama
                if ($outgoingLetter->file) {
                    $oldFile = $outgoingLetter->file;
                    Storage::delete('public/transaction-letters/' . $oldFile);
                }

                $outgoingLetter->file = explode("/", $path)[2];
            }

            // Perbarui data di tabel outgoing_letters
            $outgoingLetter->no_surat = $request->no_surat;
            $outgoingLetter->tgl_surat = $request->tgl_surat;
            $outgoingLetter->kepada = $request->kepada;
            $outgoingLetter->perihal = $request->perihal;
            $outgoingLetter->save();

            // Perbarui atau tambahkan data ke tabel incoming_letters jika diperlukan
            $incomingLetter = IncomingLetter::where('no_surat', $outgoingLetter->no_surat)->first();

            if (!$incomingLetter) {
                $incomingLetter = new IncomingLetter();
            }

            $incomingLetter->no_agenda = $request->no_agenda ?? $incomingLetter->no_agenda;
            $incomingLetter->tgl_terima = $request->tgl_terima ?? $incomingLetter->tgl_terima;
            $incomingLetter->no_surat = $outgoingLetter->no_surat;
            $incomingLetter->tgl_surat = $outgoingLetter->tgl_surat;
            $incomingLetter->perihal = $outgoingLetter->perihal;
            $incomingLetter->file = $outgoingLetter->file;
            $incomingLetter->save();

            // Commit transaksi jika semua berhasil
            DB::commit();

            return ResponseFormatter::success([
                'outgoing_letter' => $outgoingLetter,
                'incoming_letter' => $incomingLetter
            ], 'Surat berhasil diperbarui di kedua tabel', 200);
        } catch (\Exception $e) {
            // Rollback jika terjadi kesalahan
            DB::rollBack();
            Log::error("OutgoingLetterController@update: " . $e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }


    // public function destroy($id)
    // {
    //     $outgoingLetter = OutgoingLetter::find($id);
    //     if (!$outgoingLetter) {
    //         return ResponseFormatter::error(null, 'Surat Keluar tidak ditemukan', 404);
    //     }
    //     try {
    //         $outgoingLetter->delete();
    //         return ResponseFormatter::success(null, 'Surat Keluar berhasil dihapus', 200);
    //     } catch (\Exception $e) {
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }


    // public function destroy($id)
    // {
    //     $incomingLetter = IncomingLetter::find($id);

    //     if (!$incomingLetter) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Surat Masuk tidak ditemukan',
    //             'data' => null
    //         ], 404);
    //     }

    //     try {
    //         // Hapus file surat masuk jika ada
    //         if ($incomingLetter->file) {
    //             $filePath = 'public/incoming-letters/' . $incomingLetter->file;
    //             if (Storage::exists($filePath)) {
    //                 Storage::delete($filePath);
    //             }
    //         }

    //         // Cari dan hapus data terkait di tabel outgoing_letters
    //         $outgoingLetter = OutgoingLetter::where('no_surat', $incomingLetter->no_surat)->first();
    //         if ($outgoingLetter) {
    //             // Hapus file surat keluar jika ada
    //             if ($outgoingLetter->file) {
    //                 $filePath = 'public/transaction-letters/' . $outgoingLetter->file;
    //                 if (Storage::exists($filePath)) {
    //                     Storage::delete($filePath);
    //                 }
    //             }

    //             $outgoingLetter->delete();
    //         }

    //         $incomingLetter->delete();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Surat Masuk berhasil dihapus',
    //             'data' => null
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Terjadi kesalahan saat menghapus surat',
    //             'data' => null,
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function destroy($id)
    {
        $outgoingLetter = OutgoingLetter::find($id);

        if (!$outgoingLetter) {
            return response()->json([
                'status' => 'error',
                'message' => 'Surat Keluar tidak ditemukan',
                'data' => null
            ], 404);
        }

        try {
            // Hapus file surat keluar jika ada
            if ($outgoingLetter->file) {
                $filePath = 'public/transaction-letters/' . $outgoingLetter->file;
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
            }

            // Cari dan hapus data terkait di tabel incoming_letters
            // $incomingLetter = IncomingLetter::where('no_surat', $outgoingLetter->no_surat)->first();
            // if ($incomingLetter) {
            //     // Hapus file surat masuk jika ada
            //     if ($incomingLetter->file) {
            //         $filePath = 'public/incoming-letters/' . $incomingLetter->file;
            //         if (Storage::exists($filePath)) {
            //             Storage::delete($filePath);
            //         }
            //     }

            //     $incomingLetter->delete();
            // }

            // Hapus surat keluar
            $outgoingLetter->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Surat Keluar berhasil dihapus',
                'data' => null
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus surat',
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function download($id)
    {
        $outgoingLetter = OutgoingLetter::find($id);
        if (!$outgoingLetter) {
            return abort(404);
        }
        $file = $outgoingLetter->file;
        $path = storage_path('app/public/transaction-letters/' . $file);
        return response()->download($path);
    }

    public function getNumber($id)
    {
        try {
            // get outgoing letter by letter_type_id and sort by created_at desc
            $outgoingLetter = OutgoingLetter::where('letter_type_id', $id)->whereYear('tgl_surat', Carbon::now()->year)->orderBy('created_at', 'desc')->first();

            // if exist, get letter number
            if ($outgoingLetter) {
                // regex number
                $no_surat = $outgoingLetter->no_surat;
                preg_match('/\d+/', $no_surat, $matches);
                $numb = $matches[0] + 1;
            } else {
                $numb = 1;
            }

            // get format, month, year
            $format = LetterType::find($id)->format;
            $month = NumberToRoman::convert(date('n'));
            $year = date('Y');

            // replace format with number, month, year
            $result = str_replace(
                array("#", "/b/", "/t"),
                array($numb, "/" . $month . "/", "/" . $year),
                $format
            );

            return ResponseFormatter::success($result, 'Nomor Surat berhasil diambil');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
