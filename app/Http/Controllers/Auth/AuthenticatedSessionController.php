<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\laureat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $ValidationRequest = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);



        $laureat = laureat::where('email', $ValidationRequest['email'])->first();

        if (!$laureat) {
            throw ValidationException::withMessages([
                'email' => __('Laureat doesn\'t exists.'),
            ]);
        }

        if (Hash::check($ValidationRequest["password"], $laureat->password) && !$laureat->valide) {
            throw ValidationException::withMessages([
                'NotExists' => __('Laureat not validated yet.'),
            ]);
        }

        if (!Auth::guard('web')->attempt($ValidationRequest, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'password' => __('The Password are incorrect.'),
            ]);
        }

        Auth::guard('gestionnaire')->logout();


        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
