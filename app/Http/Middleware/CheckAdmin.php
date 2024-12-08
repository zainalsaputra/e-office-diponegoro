<?php
// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;

// class CheckAdmin
// {
//     public function handle(Request $request, Closure $next)
//     {
//         if (!auth()->user()->hasRole('admin')) {
//             // Jika bukan admin, bisa mengalihkan atau menampilkan error
//             return redirect()->route('home')->with('error', 'Access denied');
//         }

//         return $next($request);
//     }
// }
