<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Gestionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GestionnaireAuthController extends Controller
{
    public function showLoginForm()
    {
        return inertia('Auth/GestionnaireLogin');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'matricule' => 'required|integer',
            'password' => ['required'],
        ]);

        $Admin = Gestionnaire::where('matricule', $credentials['matricule'])->first();


        if (!$Admin) {
            return back()->withErrors(['ExistsAdmin' => 'Matricule non trouvé']);
        } else if (Auth::guard('gestionnaire')->attempt($credentials)) {
            Auth::guard('web')->logout();
            $request->session()->regenerate();
            return redirect()->route('gestionnaire.dashboard');
        } else {
            return back()->withErrors(['password' => 'Mot de passe incorrect']);
        };

    }

    public function logout(Request $request)
    {
        Auth::guard('gestionnaire')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route("/");
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
