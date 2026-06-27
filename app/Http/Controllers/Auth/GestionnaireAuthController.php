<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Gestionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GestionnaireAuthController extends Controller
{
    public function showLoginForm()
    {
        return inertia('Auth/GestionnaireLogin');
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $identifier = $validated['login'];
        $password = $validated['password'];

        $loginField = filter_var($identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'matricule';

        $credentials = [
            $loginField => $identifier,
            'password' => $password,
        ];

        if (Auth::guard('gestionnaire')->attempt($credentials)) {
            // ❌ احذف: Auth::guard('web')->logout();
            $request->session()->regenerate();

            return redirect()->route('gestionnaire.dashboard');
        }

        return back()->withErrors([
            'login' => 'Email/Matricule ou mot de passe incorrect',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('gestionnaire')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('/');
    }

    public function showRegistrationForm()
    {
        return inertia('Gestionnaire/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:gestionnaires'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $gestionnaire = Gestionnaire::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        Auth::guard('gestionnaire')->login($gestionnaire);

        return redirect()->route('gestionnaire.dashboard');
    }
}
