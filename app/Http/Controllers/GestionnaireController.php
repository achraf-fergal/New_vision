<?php

namespace App\Http\Controllers;

use App\Mail\AccountBlocked;
use App\Mail\AccountDeBlocked;
use App\Mail\AccountValidated;
use App\Mail\AdminCredentialsMail;
use App\Mail\DeletedAccount;
use App\Models\Gestionnaire;
use App\Models\User;
use App\Notifications\UserBlockedNotification;
use App\Notifications\UserUnblockedNotification;
use App\Notifications\UserValidatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class GestionnaireController extends Controller
{
    public function IndexLaureatWaiting()
    {
        $LaureatWaiting = User::where('is_blocked', false)->where('valide', false)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Gestionnaire/Tables/LaureatsWaiting', [
            'LaureatWaiting' => $LaureatWaiting,
        ]);
    }

    public function IndexLaureatAccepted()
    {
        $LaureatAccepted = User::where('is_blocked', false)->where('valide', true)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Gestionnaire/Tables/LaureatsAccepted', [
            'LaureatAccepted' => $LaureatAccepted,
        ]);
    }

    public function IndexLaureatBlocked()
    {
        $LaureatBlocked = User::where('is_blocked', true)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Gestionnaire/Tables/LaureatsBlocked', [
            'LaureatBlocked' => $LaureatBlocked,
        ]);
    }

    public function AcceptedBlocked(Request $request)
    {
        $FindLaureat = User::find($request->LaureatChosed);
        $FindLaureat->is_blocked = true;
        $FindLaureat->valide = false;
        $FindLaureat->update();

        $admin = auth()->user();
        $dateValidation = now();
        $loginUrl = route('login');

        $FindLaureat->notify(new UserBlockedNotification(auth()->user()));
        try {
            Mail::to($FindLaureat->email)->send(new AccountBlocked($admin, $FindLaureat, $dateValidation, $loginUrl));
        } catch (TransportExceptionInterface $exception) {
            Log::warning('Mail transport failed while blocking user', [
                'email' => $FindLaureat->email,
                'exception' => $exception->getMessage(),
            ]);
        }

        return redirect()->route('laureat.accepted');
    }

    public function WaitingAccepted(Request $request)
    {
        $FindLaureat = User::find($request->LaureatChosed);
        $FindLaureat->valide = true;
        $FindLaureat->update();

        $admin = auth()->user();
        $dateBloquage = now();
        $contactUrl = route('/');

        $FindLaureat->notify(new UserValidatedNotification(auth()->user()));
        try {
            Mail::to($FindLaureat->email)->send(new AccountValidated($admin, $FindLaureat, $dateBloquage, $contactUrl));
        } catch (TransportExceptionInterface $exception) {
            Log::warning('Mail transport failed while validating user', [
                'email' => $FindLaureat->email,
                'exception' => $exception->getMessage(),
            ]);
        }

        return redirect()->route('laureat.waiting');
    }

    public function WaitingRejected(Request $request)
    {
        $FindLaureat = User::find($request->LaureatChosed);
        $FindLaureat->delete();

        return redirect()->route('laureat.waiting');
    }

    public function BlockedUnblock(Request $request)
    {
        $FindLaureat = User::find($request->LaureatChosed);
        $FindLaureat->valide = true;
        $FindLaureat->is_blocked = false;
        $FindLaureat->update();

        $admin = auth()->user();
        $dateReactivation = now();
        $url = route('login');

        try {
            Mail::to($FindLaureat->email)->send(new AccountDeBlocked($admin, $FindLaureat, $dateReactivation, $url));
        } catch (TransportExceptionInterface $exception) {
            Log::warning('Mail transport failed while unblocking user', [
                'email' => $FindLaureat->email,
                'exception' => $exception->getMessage(),
            ]);
        }
        $FindLaureat->notify(new UserUnblockedNotification(auth()->user()));

        return redirect()->route('laureat.blocked');
    }

    public function CreateFormProfile()
    {
        return Inertia::render('Gestionnaire/Profile/EditGestionnnaire', [
            'Admin' => Gestionnaire::where('id', auth()->user()->id)->first(),
        ]);
    }

    public function update(Request $request)
    {

        // dd($request->all());

        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('gestionnaires', 'email')->ignore($request->id),
            ],
            'telephone' => [
                'required',
                Rule::unique('gestionnaires', 'telephone')->ignore($request->id),
            ],
            'CIN' => [
                'required',
                Rule::unique('gestionnaires', 'CIN')->ignore($request->id),
            ],
        ]);

        $Gestionnaire = Gestionnaire::find($request->id);
        $FindEmail = Gestionnaire::where('email', $request->email)->first();
        if ($FindEmail && $Gestionnaire->email !== $request->email) {
            return back()->withErrors(['EmailExists' => 'Email deja existant']);
        }

        $Gestionnaire->nom = $request->nom;
        $Gestionnaire->prenom = $request->prenom;
        $Gestionnaire->email = $request->email;
        $Gestionnaire->telephone = $request->telephone;

        if ($request->deleteImage) {
            Storage::disk('public')->delete($Gestionnaire->imageSRC);
            $Gestionnaire->imageSRC = null;
        }

        $Gestionnaire->update();

        return Redirect()->back()->with('Admin', Gestionnaire::find($request->id));
    }

    public function UploadImage(Request $request)
    {

        $request->validate([
            'imageSRC' => 'required|image|mimes:jpeg,png,jpg,svg',
        ]);

        $Gestionnaire = Gestionnaire::find($request->id);

        if ($request->hasFile('imageSRC')) {
            if ($Gestionnaire->imageSRC) {
                Storage::disk('public')->delete($Gestionnaire->imageSRC);
            }

            $Matricule = $Gestionnaire->matricule;

            $imageFile = $request->file('imageSRC');

            $imageName = 'profile_'.$Matricule.'_'.date('Y-m-d', time()).'.'.$imageFile->getClientOriginalExtension();

            $imagePath = $imageFile->storeAs("OFPPTConnect/GestionnaireProfile/{$Matricule}", $imageName, 'public');

            $Gestionnaire->imageSRC = $imagePath;
        }
        $Gestionnaire->update();

        return Redirect()->back()->with('Admin', Gestionnaire::find($request->id));
    }

    public function UpdatePassword(Request $request)
    {
        $Gestionnaire = Gestionnaire::find($request->id);
        if (! Hash::check($request->current_password, $Gestionnaire->password)) {
            return Redirect()->back()->withErrors(['current_password' => 'Mot de passe actuel incorrect']);
        }
        if (Hash::check($request->password, $Gestionnaire->password)) {
            return Redirect()->back()->withErrors(['CheckPassword' => 'Saisir un mot de passe différent a votre ancien mot de passe']);
        }
        $request->validate([
            'password' => ['required', Rules\Password::defaults()],
            'password_confirmation' => 'required|same:password',
        ]);
        $Gestionnaire->password = Hash::make($request->password);
        $Gestionnaire->update();
    }

    public function index()
    {
        $user = auth('gestionnaire')->user();
        $totalLauriates = User::count();
        $waitingLauriates = User::where('valide', false)->where('is_blocked', false)->count();
        $acceptedLauriates = User::where('valide', true)->where('is_blocked', false)->count();
        $blockedLauriates = User::where('is_blocked', true)->count();
        $recentLauriates = User::orderBy('created_at', 'desc')->limit(10)->get();

        return Inertia::render('Gestionnaire/Dashboard', [
            'totalLauriates' => $totalLauriates,
            'waitingLauriates' => $waitingLauriates,
            'acceptedLauriates' => $acceptedLauriates,
            'blockedLauriates' => $blockedLauriates,
            'recentLauriates' => $recentLauriates,
            'user' => $user,
        ]);
    }

    public function SuperAdminManage()
    {
        return Inertia::render('Gestionnaire/AdminManagement', [
            'admins' => Gestionnaire::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('gestionnaires', 'email'),
            ],
            'telephone' => [
                'required',
                Rule::unique('gestionnaires', 'telephone'),
            ],
            'cin' => [
                'required',
                Rule::unique('gestionnaires', 'CIN'),
            ],
            'role' => [
                'required',
                Rule::in(['superadmin', 'admin']),
            ],
            'sendCredentials' => 'boolean',
        ]);

        $LastAdmin = Gestionnaire::latest()->first();
        $Matricule = $LastAdmin->matricule + 1;

        $Password = $request->cin.$request->nom;

        $Gestionnaire = Gestionnaire::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'CIN' => $request->cin,
            'role' => $request->role,
            'matricule' => $Matricule,
            'password' => Hash::make($Password),
        ]);

        Mail::to($Gestionnaire->email)->send(new AdminCredentialsMail($Gestionnaire, $Password, $Matricule));
    }

    public function destroy(string $id)
    {
        $Gestionnaire = Gestionnaire::find($id);
        $Gestionnaire->delete();

        return response()->json(['message' => 'Gestionnaire deleted successfully']);
    }

    public function AccountDelete(string $id)
    {
        $User = User::find($id);

        if (! $User) {
            return redirect()->back()->withErrors(['user' => 'User not found']);
        }

        $dateSuppression = now();
        try {
            Mail::to($User->email)->send(new DeletedAccount($User, $dateSuppression));
        } catch (TransportExceptionInterface $exception) {
            Log::warning('Mail transport failed while deleting user account', [
                'email' => $User->email,
                'exception' => $exception->getMessage(),
            ]);
        }

        $User->delete();

        return redirect()->back();
    }

    public function toggleValide(string $id)
    {
        $Gestionnaire = Gestionnaire::find($id);
        $valide = $Gestionnaire->valide;
        $Gestionnaire->valide = ! $valide;
        $Gestionnaire->update();
    }
}
