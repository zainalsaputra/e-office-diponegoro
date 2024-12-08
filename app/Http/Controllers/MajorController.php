<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseFormatter;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MajorController extends Controller
{
    public function index()
    {
        if (request()->ajax()) {
            return ResponseFormatter::success(
                Major::where('type', 'prodi')->get(),
                'Data Prodi',
            );
        }
        $fakultas = Major::where('type', 'fakultas')->get();
        return view('pages.major.index', compact('fakultas'));
    }
    
    public function faculty() 
    {
        if (request()->ajax()) {
            // return ResponseFormatter::success(
            //     Major::where('type', 'fakultas')->get(),
            //     'Data Fakultas',
            // );
            return ResponseFormatter::success(
                Major::all(),
                'Data Fakultas',
            );
        }
        return view('pages.faculty.index');
    }

    public function store(Request $request, $type = null)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            
            // if ($type == 'fakultas') {
            //     $major = Major::create([
            //         'name' => $request->name,
            //         'shortname' => $request->shortname,
            //         'type' => $type,
            //     ]);
            //     return ResponseFormatter::success($major, 'Data Fakultas berhasil ditambahkan');
            // } else {
            //     $major = Major::create([
            //         'name' => $request->name,
            //         'shortname' => $request->shortname,
            //         'type' => 'prodi',
            //         'faculty' => $request->faculty,
            //     ]);
                
            //     return ResponseFormatter::success($major, 'Data Prodi berhasil ditambahkan');
            // }

            $major = Major::create([
                'name' => $request->name,
            ]);
            return ResponseFormatter::success($major, 'Data Divisi berhasil ditambahkan');
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function update(Request $request, $type = null)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            $major = Major::find($request->id);
            // if ($type == 'fakultas') {
            //     $major->update([
            //         'name' => $request->name,
            //         'shortname' => $request->shortname,
            //     ]);
            //     return ResponseFormatter::success($major, 'Data Fakultas berhasil diubah');
            // } else {
            //     $major->update([
            //         'name' => $request->name,
            //         'shortname' => $request->shortname, 
            //         'faculty' => $request->faculty,
            //     ]);
            //     return ResponseFormatter::success($major, 'Data Prodi berhasil diubah');
            // }

            $major->update([
                'name' => $request->name,
            ]);
            return ResponseFormatter::success($major, 'Data Prodi berhasil diubah');
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
