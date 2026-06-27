<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {

        if (app()->getLocale()) {
            $Langue = app()->getLocale();
        }

        // Use stateless mode for local OAuth callback handling to avoid
        // InvalidStateException when the session state is lost across the
        // Google redirect.
        $socialUser = Socialite::driver($provider)->stateless()->user();
        // dump($socialUser);
        $user = User::where('email', $socialUser->email)->first();
        if ($user) {
            if ($user->is_blocked) {
                if ($Langue == 'en') {
                    throw ValidationException::withMessages([
                        'NotExists' => __('Laureat Blocked.'),
                    ])->redirectTo('/login');
                }
                if ($Langue == 'fr') {
                    throw ValidationException::withMessages([
                        'NotExists' => __('Laureat Bloqué.'),
                    ])->redirectTo('/login');
                }
                if ($Langue == 'ar') {
                    throw ValidationException::withMessages([
                        'NotExists' => __('المشارك محظور.'),
                    ])->redirectTo('/login');
                }
            }

            // Removed admin-approval (`valide`) restriction for social logins
            // so users can authenticate via Google/GitHub immediately.
            Auth::login($user);

            return redirect()->route('dashboard');
        } else {
            $Data = [
                'nom' => $provider !== 'github' ? $socialUser->user['family_name'] : $socialUser->user['login'],
                'prenom' => $provider !== 'github' ? $socialUser->user['given_name'] : $socialUser->user['name'],
                'email' => $socialUser->email,
                'password' => 'None',
            ];
            session()->put('request', $Data);

            return redirect()->route('FinalRegister');
        }
    }
}
