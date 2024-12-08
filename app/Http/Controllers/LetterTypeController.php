<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseFormatter;
use App\Models\LetterType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class LetterTypeController extends Controller
{
    public function index()
    {
        // if (request()->ajax()) {
        //     $types = auth()->user()->major->letterTypes;
        //     return ResponseFormatter::success($types, 'Data berhasil diambil');
        // }

        if (request()->ajax()) {
            $types = LetterType::all();
    
            return ResponseFormatter::success($types, 'Data berhasil diambil');
        }

        return view('pages.letters.type');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {

            $letterType = new LetterType();

            $letterType->major_id = auth()->user()->major_id;
            $letterType->name = strtoupper($request->name);
            $letterType->format = str_replace(' ', '', $request->format);

            $letterType->save();

            return ResponseFormatter::success($letterType, 'Data berhasil ditambahkan', 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        $letterType = LetterType::find($id);

        if (!$letterType) {
            return ResponseFormatter::error(null, 'Data tidak ditemukan', 404);
        }

        return ResponseFormatter::success($letterType, 'Data berhasil diambil');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'format' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {

            $letterType = LetterType::find($id);

            if (!$letterType) {
                return ResponseFormatter::error(null, 'Data tidak ditemukan', 404);
            }

            $letterType->name = strtoupper($request->name);
            $letterType->format = $request->format;

            $letterType->save();

            return ResponseFormatter::success($letterType, 'Data berhasil diubah');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
