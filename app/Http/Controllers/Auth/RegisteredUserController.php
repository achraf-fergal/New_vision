<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $SessionData = session()->get('request');

        if ($SessionData) {
            // dd($SessionData);
            session()->forget('request.password');

            return Inertia::render('Auth/Register', [
                'InitialData' => $SessionData,
            ]);
        }

        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required', Rules\Password::defaults(), 'confirmed'],
        ]);
        session()->put('request', $validatedData);

        return redirect()->route('FinalRegister');
    }

    /**
     * Display the final registration form.
     */
    public function createFinalRegister(Request $request)
    {
        $initialData = session('request');

        if ($initialData && isset($initialData['email']) && isset($initialData['password'])) {
            return Inertia::render('Auth/Register2', [
                'InitialData' => $initialData,
            ]);
        } else {
            return redirect()->route('register');
        }
    }

    /**
     * Handle the final registration submission.
     */
    public function storeFinalRegister(Request $request)
    {
        $request->validate([
            'telephone' => [
                'required',
                'string',

            ],
            'promotion' => 'required|integer|min:1990|max:'.date('Y'),
            'filiere' => 'required|string',
            'etablissement' => 'required|string',
            'fonction' => 'nullable|string',
            'employeur' => 'nullable|string',
        ]);

        $initialData = session('request');

        $laureat = User::create([
            'nom' => $initialData['nom'],
            'prenom' => $initialData['prenom'],
            'email' => $initialData['email'],
            'password' => Hash::make($initialData['password']),
            'telephone' => $request->telephone,
            'promotion' => $request->promotion,
            'filiere' => $request->filiere,
            'etablissement' => $request->etablissement,
            'fonction' => $request->fonction,
            'employeur' => $request->employeur,
            'valide' => true,
        ]);

        // event(new Registered($laureat));
        // Auth::login($laureat);
        return redirect(route('login'));
    }
}
