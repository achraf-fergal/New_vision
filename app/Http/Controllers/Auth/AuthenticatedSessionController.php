<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
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

        if (Session::has('locale')) {
            $Langue = Session::get('locale');
        }
        if (app()->getLocale()) {
            $Langue = app()->getLocale();
        }

        $ValidationRequest = $request->validate([
            'email' => 'required|email',
            'password' => [
                'required',
                'not_in:None',
            ],
        ]);

        $laureat = User::where('email', $ValidationRequest['email'])->first();

        if (! $laureat) {
            if ($Langue == 'fr') {
                throw ValidationException::withMessages([
                    'email' => 'Adresse email non reconnue',
                ]);
            } elseif ($Langue == 'en') {
                throw ValidationException::withMessages([
                    'email' => 'Email address not recognized',
                ]);
            } elseif ($Langue == 'ar') {
                throw ValidationException::withMessages([
                    'email' => ' العنوان البريدي غير معروف',
                ]);
            }
        }

        if (Hash::check($ValidationRequest['password'], $laureat->password) && $laureat->is_blocked) {
            if ($Langue == 'en') {
                throw ValidationException::withMessages([
                    'NotExists' => __('Laureat Blocked.'),
                ]);
            }
            if ($Langue == 'fr') {
                throw ValidationException::withMessages([
                    'NotExists' => __('Laureat Bloqué.'),
                ]);
            }
            if ($Langue == 'ar') {
                throw ValidationException::withMessages([
                    'NotExists' => __('المشارك محظور.'),
                ]);
            }
        }

        // Removed admin-approval (`valide`) restriction so newly created
        // users can log in immediately after registration. Only `is_blocked`
        // still prevents login.

        if (! Auth::guard('web')->attempt($ValidationRequest, $request->boolean('remember'))) {
            if ($Langue == 'en') {
                throw ValidationException::withMessages([
                    'password' => __('The Password are incorrect.'),
                ]);
            }
            if ($Langue == 'fr') {
                throw ValidationException::withMessages([
                    'password' => __('Le mot de passe est incorrect.'),
                ]);
            }
            if ($Langue == 'ar') {
                throw ValidationException::withMessages([
                    'password' => __('كلمة المرور غير صحيحة.'),
                ]);
            }
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
