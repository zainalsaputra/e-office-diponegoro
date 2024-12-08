<?php

namespace App\Http\Controllers;

use App\Helpers\NumberToRoman;
use App\Helpers\ResponseFormatter;
use App\Models\IncomingLetter;
use App\Models\LetterType;
use App\Models\Major;
use App\Models\OutgoingLetter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class IncomingLetterController extends Controller
{
    // public function index()
    // {
    //     if (request()->ajax()) {
    //         try {
    //             $collection = collect();
    //             $incoming = IncomingLetter::where('user_id', auth()->user()->id)->get();
    //             $outgoing = OutgoingLetter::where('kepada', auth()->user()->major_id)->where('is_read', 0)->with('user.major', function ($q) {
    //                 $q->select('id', 'name AS dari');
    //             })->get();

    //             foreach ($incoming as $in)
    //                 $collection->push($in);
    //             foreach ($outgoing as $out)
    //                 $collection->push($out);

    //             $sorted = $collection->sortByDesc('created_at');
    //             return ResponseFormatter::success($sorted->values()->all(), 'Data berhasil diambil');
    //         } catch (\Exception $e) {
    //             return ResponseFormatter::error($e->getMessage(), 'Server error, check server logs');
    //         }
    //     }


    //     $major = Major::all()->except(auth()->user()->major_id);

    //     return view('pages.letters.incoming', compact('major'));
    // }

    // public function index()
    // {
    //     if (request()->ajax()) {
    //         try {
    //             if (auth()->user()->hasRole('admin')) {
    //                 // Admins can see all incoming letters
    //                 $data = IncomingLetter::with('user.major')->orderBy('tgl_surat', 'desc')->get();
    //             } else {
    //                 // Normal users can see incoming letters addressed to them
    //                 $data = IncomingLetter::where('user_id', auth()->user()->id)
    //                     ->with('user.major')
    //                     ->orderBy('tgl_surat', 'desc')
    //                     ->get();

    //                 // Add outgoing letters addressed to the user's major
    //                 $outgoing = OutgoingLetter::where('kepada', auth()->user()->major_id)
    //                     ->where('is_read', 0)
    //                     ->with('user.major', function ($q) {
    //                         $q->select('id', 'name AS dari');
    //                     })
    //                     ->orderBy('tgl_surat', 'desc')
    //                     ->get();

    //                 // Merge incoming and outgoing letters
    //                 $data = $data->merge($outgoing)->sortByDesc('tgl_surat')->values();
    //             }

    //             return ResponseFormatter::success($data, 'Data berhasil diambil');
    //         } catch (\Exception $e) {
    //             return ResponseFormatter::error($e->getMessage(), 'Server error, check server logs');
    //         }
    //     }

    //     // Adjust logic for fetching majors
    //     $major = auth()->user()->hasRole('admin') ? Major::all() : Major::where('id', '!=', auth()->user()->major_id)->get();

    //     return view('pages.letters.incoming', compact('major'));
    // }

    // public function index()
    // {
    //     if (request()->ajax()) {
    //         try {
    //             if (auth()->user()->hasRole('admin')) {
    //                 // Admins can see all incoming letters
    //                 $data = IncomingLetter::with('user.major')->orderBy('tgl_surat', 'desc')->get();
    //             } else {
    //                 // Normal users can see incoming letters addressed to them
    //                 $data = IncomingLetter::where('user_id', auth()->user()->id)
    //                     ->with('user.major')
    //                     ->orderBy('tgl_surat', 'desc')
    //                     ->get();

    //                 // Add outgoing letters addressed to the user's major
    //                 $outgoing = OutgoingLetter::where('kepada', auth()->user()->major_id)
    //                     ->where('is_read', 0)
    //                     ->with('user.major', function ($q) {
    //                         $q->select('id', 'name AS dari');
    //                     })
    //                     ->orderBy('tgl_surat', 'desc')
    //                     ->get();

    //                 // Merge incoming and outgoing letters
    //                 $data = $data->merge($outgoing)->sortByDesc('tgl_surat')->values();
    //             }

    //             return ResponseFormatter::success($data, 'Data berhasil diambil');
    //         } catch (\Exception $e) {
    //             return ResponseFormatter::error($e->getMessage(), 'Server error, check server logs');
    //         }
    //     }

    //     // Adjust logic for fetching majors
    //     $major = auth()->user()->hasRole('admin') ? Major::all() : Major::where('id', '!=', auth()->user()->major_id)->get();

    //     return view('pages.letters.incoming', compact('major'));
    // }

    public function index()
    {
        if (request()->ajax()) {
            try {
                $user = auth()->user();

                if ($user->hasRole('admin')) {
                    // Admins can see all incoming letters
                    $data = IncomingLetter::with('user.major')
                        ->orderBy('tgl_surat', 'desc')
                        ->get();
                } else {
                    // Normal users can see incoming letters addressed to them
                    $incomingLetters = IncomingLetter::where('user_id', $user->id)
                        ->with('user.major')
                        ->orderBy('tgl_surat', 'desc')
                        ->get();

                    // Add outgoing letters addressed to the user's major
                    $outgoingLetters = OutgoingLetter::where('kepada', $user->major_id)
                        ->where('is_read', 0)
                        ->with(['user.major' => function ($q) {
                            $q->select('id', 'name AS dari');
                        }])
                        ->orderBy('tgl_surat', 'desc')
                        ->get();

                    // Merge incoming and outgoing letters
                    $data = $incomingLetters->merge($outgoingLetters)
                        ->sortByDesc('tgl_surat')
                        ->values();

                    // Remove duplicates based on combination of tgl_surat, user_id, and kepada
                    // $data = $data->unique(function ($item) {
                    //     // Combine relevant fields (e.g., 'tgl_surat', 'user_id', 'kepada') to detect duplicates
                    //     return $item->tgl_surat . '-' . $item->user_id . '-' . ($item->kepada ?? '');
                    // })->values(); // Reset the array keys after filtering duplicates
                }

                return ResponseFormatter::success($data, 'Data berhasil diambil');
            } catch (\Exception $e) {
                // Log the error for debugging
                Log::error('Error fetching letters: ', ['error' => $e->getMessage()]);

                return ResponseFormatter::error(null, 'Server error, check server logs');
            }
        }

        // Determine the majors for the dropdown
        $major = auth()->user()->hasRole('admin')
            ? Major::all()
            : Major::where('id', '!=', auth()->user()->major_id)->get();

        return view('pages.letters.incoming', compact('major'));
    }




    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'no_agenda' => 'required',
            'tgl_terima' => 'required',
            'no_surat' => 'required',
            'tgl_surat' => 'required',
            'dari' => 'required',
            'perihal' => 'required',
            'file' => 'required|file|mimes:pdf|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            $file = $request->file('file');
            $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), '-');
            $path = Storage::putFileAs(
                'public/transaction-letters',
                $request->file('file'),
                time() . '-' . $fileName . '.' . $file->getClientOriginalExtension()
            );
            $fileName = explode("/", $path)[2];

            $incomingLetter = new IncomingLetter();
            $incomingLetter->user_id = auth()->user()->id;
            $incomingLetter->major_id = auth()->user()->major_id;
            $incomingLetter->no_agenda = $request->no_agenda;
            $incomingLetter->tgl_terima = $request->tgl_terima;
            $incomingLetter->no_surat = $request->no_surat;
            $incomingLetter->tgl_surat = $request->tgl_surat;
            $incomingLetter->dari = $request->dari;
            $incomingLetter->perihal = $request->perihal;
            $incomingLetter->file = $fileName;
            $incomingLetter->save();

            return ResponseFormatter::success($incomingLetter, 'Surat Masuk berhasil ditambahkan', 201);
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        $incomingLetter = IncomingLetter::find($id);
        if (!$incomingLetter) {
            return ResponseFormatter::error(null, 'Surat Masuk tidak ditemukan', 404);
        }
        return ResponseFormatter::success($incomingLetter, 'Data berhasil diambil');
    }

    // public function update(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'no_agenda' => 'required',
    //         'tgl_terima' => 'required',
    //         'no_surat' => 'required',
    //         'tgl_surat' => 'required',
    //         'dari' => 'required',
    //         'perihal' => 'required',
    //         'file' => 'nullable|file|mimes:pdf|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return ResponseFormatter::error(null, $validator->errors(), 422);
    //     }

    //     try {
    //         $incomingLetter = IncomingLetter::find($id);
    //         if (!$incomingLetter) {
    //             return ResponseFormatter::error(null, 'Surat Masuk tidak ditemukan', 404);
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
    //             $oldFile = $incomingLetter->file;
    //             Storage::delete('public/transaction-letters/' . $oldFile);

    //             $incomingLetter->file = explode("/", $path)[2];
    //         }

    //         $incomingLetter->no_agenda = $request->no_agenda;
    //         $incomingLetter->tgl_terima = $request->tgl_terima;
    //         $incomingLetter->no_surat = $request->no_surat;
    //         $incomingLetter->tgl_surat = $request->tgl_surat;
    //         $incomingLetter->dari = $request->dari;
    //         $incomingLetter->perihal = $request->perihal;
    //         $incomingLetter->save();

    //         return ResponseFormatter::success($incomingLetter, 'Surat Masuk berhasil diubah', 200);
    //     } catch (\Exception $e) {
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'no_agenda' => 'required',
            'tgl_terima' => 'required',
            'no_surat' => 'required',
            'tgl_surat' => 'required',
            'dari' => 'required',
            'perihal' => 'required',
            'file' => 'nullable|file|mimes:pdf|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        // Mulai transaksi
        DB::beginTransaction();

        try {
            // Cari surat masuk berdasarkan ID
            $incomingLetter = IncomingLetter::findOrFail($id);

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
                if ($incomingLetter->file) {
                    $oldFile = $incomingLetter->file;
                    Storage::delete('public/transaction-letters/' . $oldFile);
                }

                $incomingLetter->file = explode("/", $path)[2];
            }

            // Perbarui data di tabel incoming_letters
            $incomingLetter->no_agenda = $request->no_agenda;
            $incomingLetter->tgl_terima = $request->tgl_terima;
            $incomingLetter->no_surat = $request->no_surat;
            $incomingLetter->tgl_surat = $request->tgl_surat;
            $incomingLetter->dari = $request->dari;
            $incomingLetter->perihal = $request->perihal;
            $incomingLetter->save();

            // Perbarui atau tambahkan data ke tabel outgoing_letters
            $outgoingLetter = OutgoingLetter::where('no_surat', $incomingLetter->no_surat)->first();

            if (!$outgoingLetter) {
                $outgoingLetter = new OutgoingLetter();
            }

            $outgoingLetter->letter_type_id = $request->jenis ?? $outgoingLetter->letter_type_id;
            $outgoingLetter->no_surat = $incomingLetter->no_surat;
            $outgoingLetter->tgl_surat = $incomingLetter->tgl_surat;
            $outgoingLetter->kepada = $incomingLetter->major_id;
            $outgoingLetter->perihal = $incomingLetter->perihal;
            $outgoingLetter->file = $incomingLetter->file;
            $outgoingLetter->save();

            // Commit transaksi jika semua berhasil
            DB::commit();

            return ResponseFormatter::success([
                'incoming_letter' => $incomingLetter,
                'outgoing_letter' => $outgoingLetter
            ], 'Surat berhasil diperbarui di kedua tabel', 200);
        } catch (\Exception $e) {
            // Rollback jika terjadi kesalahan
            DB::rollBack();
            Log::error("IncomingLetterController@update: " . $e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }


    // public function destroy($id)
    // {
    //     $incomingLetter = IncomingLetter::find($id);
    //     if (!$incomingLetter) {
    //         return ResponseFormatter::error(null, 'Surat Masuk tidak ditemukan', 404);
    //     }
    //     try {
    //         $incomingLetter->delete();
    //         return ResponseFormatter::success(null, 'Surat Masuk berhasil dihapus', 200);
    //     } catch (\Exception $e) {
    //         return ResponseFormatter::error(null, $e->getMessage(), 500);
    //     }
    // }

    public function destroy($id)
    {
        $incomingLetter = IncomingLetter::find($id);

        if (!$incomingLetter) {
            return response()->json([
                'status' => 'error',
                'message' => 'Surat Masuk tidak ditemukan',
                'data' => null
            ], 404);
        }

        try {
            // Hapus file surat masuk jika ada
            if ($incomingLetter->file) {
                $filePath = 'public/transaction-letters/' . $incomingLetter->file;
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
            }

            // Cari dan hapus data terkait di tabel outgoing_letters
            // $outgoingLetter = OutgoingLetter::where('no_surat', $incomingLetter->no_surat)->first();
            // if ($outgoingLetter) {
            //     // Hapus file surat keluar jika ada
            //     if ($outgoingLetter->file) {
            //         $filePath = 'public/outgoing-letters/' . $outgoingLetter->file;
            //         if (Storage::exists($filePath)) {
            //             Storage::delete($filePath);
            //         }
            //     }

            //     $outgoingLetter->delete();
            // }

            $incomingLetter->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Surat Masuk berhasil dihapus',
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
        $incomingLetter = IncomingLetter::find($id);
        if (!$incomingLetter) {
            return abort(404);
        }
        $file = $incomingLetter->file;
        $path = storage_path('app/public/transaction-letters/' . $file);
        return response()->download($path);
    }

    public function disposisi(Request $request, $id)
    {
        $outgoing = OutgoingLetter::find($id);

        if ($outgoing) {
            // check if incoming letter exists
            $incomingLetter = IncomingLetter::where('major_id', auth()->user()->major_id)->where('no_surat', $outgoing->no_surat)->first();

            if (!$incomingLetter) {
                $incoming = IncomingLetter::create([
                    'user_id' => auth()->user()->id,
                    'major_id' => auth()->user()->major_id,
                    // 'no_agenda' => $request->no_agenda,
                    'tgl_terima' => $request->tgl_terima,
                    'no_surat' => $outgoing->no_surat,
                    'tgl_surat' => $outgoing->tgl_surat,
                    'dari' => $request->dari,
                    'perihal' => $outgoing->perihal,
                    'file' => $outgoing->file
                ]);

                // copy file
                Storage::copy('public/outgoing-letters/' . $outgoing->file, 'public/transaction-letters/' . $outgoing->file);

                // update outgoing letters status
                $outgoing->status = 'diterima';
                $outgoing->is_read = 1;
                $outgoing->save();

                if ($incoming) {
                    return view('pages.disposisi.fstk', ['data' => $incoming]);
                }
            } else {
                return view('pages.disposisi.fstk', ['data' => $incomingLetter]);
            }
        }

        return abort(404);
    }

    public function print($id)
    {
        $incoming = IncomingLetter::find($id);
        if ($incoming) {
            return view('pages.disposisi.fstk', ['data' => $incoming]);
        }

        return abort(404);
    }

    public function getNumber($id)
    {
        try {
            // get incoming letter by major_id
            $incoming = IncomingLetter::where('major_id', $id)->whereYear('tgl_surat', Carbon::now()->year)->orderBy('id', 'desc')->first();
            if ($incoming) {
                $no_agenda = $incoming->no_agenda;
                preg_match('/\d+/', $no_agenda, $matches);
                $numb = $matches[0] + 1;
            } else {
                $numb = 1;
            }

            // get format, month, year
            // $format = LetterType::where("major_id", auth()->user()->major_id)->where('name', 'AGENDA')->first()->format; // Surat Biasa

            $format = LetterType::where("major_id", auth()->user()->major_id)->where('name', 'BIASA')->first()->format; // Surat Biasa

            // $format = LetterType::where("major_id", auth()->user()->major_id)->orderBy('created_at', 'asc')->first()->format; // Data Terbaru

            // $format = "001/AGENDA/2024"

            $month = NumberToRoman::convert(date('n'));
            $year = date('Y');

            // replace format with number, month, year
            $result = str_replace(
                array("#", "b", "t"),
                array($numb, $month, $year),
                $format
            );

            return ResponseFormatter::success($result, 'Nomor Surat berhasil diambil');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
