<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes(['register' => false, 'reset' => false, 'verify' => false]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['middleware' => 'auth'], function () {
    Route::post('/update-password', [App\Http\Controllers\HomeController::class, 'password'])->name('password');

    // Letter
    Route::group(['prefix' => 'letter', 'as' => 'letter.'], function () {
        // Incoming
        Route::get('/incoming', [App\Http\Controllers\IncomingLetterController::class, 'index'])->name('incoming.index');
        Route::post('/incoming', [App\Http\Controllers\IncomingLetterController::class, 'store'])->name('incoming.store');
        Route::get('/incoming/{id}', [App\Http\Controllers\IncomingLetterController::class, 'show'])->name('incoming.show');
        Route::post('/incoming/{id}/update', [App\Http\Controllers\IncomingLetterController::class, 'update'])->name('incoming.update');
        Route::delete('/incoming/{id}', [App\Http\Controllers\IncomingLetterController::class, 'destroy'])->name('incoming.destroy');
        Route::get('/incoming/{id}/download', [App\Http\Controllers\IncomingLetterController::class, 'download'])->name('incoming.download');
        Route::post('/incoming/{id}/disposisi', [App\Http\Controllers\IncomingLetterController::class, 'disposisi'])->name('incoming.disposisi');
        Route::get('/incoming/{id}/print', [App\Http\Controllers\IncomingLetterController::class, 'print'])->name('incoming.print');
        Route::get('/incoming/get-number/{id}', [App\Http\Controllers\OutgoingLetterController::class, 'getNumber'])->name('incoming.get-number');

        // Outgoing
        Route::get('/outgoing', [App\Http\Controllers\OutgoingLetterController::class, 'index'])->name('outgoing.index');
        Route::get('/letter/outgoing/all', [App\Http\Controllers\OutgoingLetterController::class, 'getAllData'])->middleware('role:admin');
        Route::post('/outgoing', [App\Http\Controllers\OutgoingLetterController::class, 'store'])->name('outgoing.store');
        Route::get('/outgoing/{id}', [App\Http\Controllers\OutgoingLetterController::class, 'show'])->name('outgoing.show');
        Route::post('/outgoing/{id}/update', [App\Http\Controllers\OutgoingLetterController::class, 'update'])->name('outgoing.update');
        Route::delete('/outgoing/{id}', [App\Http\Controllers\OutgoingLetterController::class, 'destroy'])->name('outgoing.destroy');
        Route::get('/outgoing/{id}/download', [App\Http\Controllers\OutgoingLetterController::class, 'download'])->name('outgoing.download');
        Route::get('/outgoing/get-number/{id}', [App\Http\Controllers\OutgoingLetterController::class, 'getNumber'])->name('outgoing.get-number');

        // Riwayat
        // Route::get('history', [App\Http\Controllers\LetterController::class, 'history'])->name('history');
    });

    // Letter
    Route::group(['prefix' => 'letter-type', 'as' => 'letter-type.'], function () {
        Route::get('', [App\Http\Controllers\LetterTypeController::class, 'index'])->name('index');
        Route::post('', [App\Http\Controllers\LetterTypeController::class, 'store'])->name('store');
        Route::get('{id}', [App\Http\Controllers\LetterTypeController::class, 'show'])->name('show');
        Route::put('{id}', [App\Http\Controllers\LetterTypeController::class, 'update'])->name('update');
    });

    // User
    Route::group(['prefix' => 'user'], function () {
        // Index
        Route::get('', [App\Http\Controllers\UserController::class, 'index'])->name('user.index');
        Route::post('', [App\Http\Controllers\UserController::class, 'store'])->name('user.store');
        Route::put('/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('user.update');
        Route::put('/password/{id}', [App\Http\Controllers\UserController::class, 'updatePassword'])->name('user.updatePassword');
    });

    // Prodi
    Route::group(['prefix' => 'major'], function () {
        // Index
        Route::get('', [App\Http\Controllers\MajorController::class, 'index'])->name('major.index');
        Route::get('/division', [App\Http\Controllers\MajorController::class, 'faculty'])->name('major.division.index');
        Route::post('{type?}', [App\Http\Controllers\MajorController::class, 'store'])->name('major.store');
        Route::put('/{type?}', [App\Http\Controllers\MajorController::class, 'update'])->name('major.update');
    });

    // Log
    Route::group(['prefix' => 'log'], function () {
        
    });
});
