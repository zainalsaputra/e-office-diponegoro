<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseFormatter;
use App\Models\Major;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        if (request()->ajax()) {
            return ResponseFormatter::success(User::with('major')->get(), 'Data user');
        }

        $majors = Major::all();
        return view('pages.user.index', compact('majors'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required',
            'major_id' => 'required|exists:majors,id',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'major_id' => $request->major_id,
            ]);

            return ResponseFormatter::success($user, 'Data user berhasil ditambahkan');
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role' => 'required',
            'major_id' => 'required|exists:majors,id',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            $user = User::findOrFail($id);
            $user->update([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'role' => $request->role,
                'major_id' => $request->major_id,
            ]);

            return ResponseFormatter::success($user, 'Data user berhasil diubah');
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }

    public function updatePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::error(null, $validator->errors(), 422);
        }

        try {
            $user = User::findOrFail($id);
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            return ResponseFormatter::success($user, 'Password berhasil diubah');
        } catch (\Exception $e) {
            return ResponseFormatter::error(null, $e->getMessage(), 500);
        }
    }
}
