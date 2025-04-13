<?php

namespace App\Http\Controllers;

use App\Models\blockedlaureat;
use App\Models\Gestionnaire;
use App\Models\laureat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class GestionnaireController extends Controller
{
    public function index(){
        $LaureatAccepted=laureat::where('valide',true)->get();
        $LaureatWaiting=laureat::where('valide',false)->get();
        $LaureatBlocked=blockedlaureat::all();
        $Admin = Gestionnaire::where('id',auth()->user()->id)->first();
        $recentLaureatsInscrire = laureat::latest()->take(6)->get();
        return Inertia::render('Gestionnaire/Index')
        ->with([
            'LaureatAccepted'=>$LaureatAccepted,
            'LaureatWaiting'=>$LaureatWaiting,
            'LaureatBlocked'=>$LaureatBlocked,
            'Admin'=>$Admin,
            'recentLaureatsInscrire'=>$recentLaureatsInscrire,
        ]);
    }

    public function IndexLaureatWaiting()
    {
        $LaureatWaiting = laureat::where('valide', false)->get();
        return Inertia::render('Gestionnaire/Tables/LaureatsWaiting', [
            'LaureatWaiting' => $LaureatWaiting,
        ]);
    }

    public function IndexLaureatAccepted()
    {
        $LaureatAccepted = laureat::where('valide', true)->get();
        return Inertia::render('Gestionnaire/Tables/LaureatsAccepted', [
            'LaureatAccepted' => $LaureatAccepted,
        ]);
    }

    public function IndexLaureatBlocked()
    {
        $LaureatBlocked = blockedlaureat::all();
        return Inertia::render('Gestionnaire/Tables/LaureatsBlocked', [
            'LaureatBlocked' => $LaureatBlocked,
        ]);
    }


    public function AcceptedBlocked(Request $request){
        $FindLaureat=laureat::find($request->LaureatChosed);
        $FindLaureat->delete();
    }

    public function WaitingAccepted(Request $request){
        $FindLaureat=laureat::find($request->LaureatChosed);
        $FindLaureat->valide=true;
        $FindLaureat->update();
    }

    public function WaitingRejected(Request $request){
        $FindLaureat=laureat::find($request->LaureatChosed);
        $FindLaureat->delete();
    }

    public function BlockedUnblock(Request $request){
        $FindLaureat=blockedlaureat::find($request->LaureatChosed);
        $FindLaureat->delete();
    }


    public function CreateFormProfile(){
        return Inertia::render('Gestionnaire/Profile/EditGestionnnaire',[
            'Admin' => Gestionnaire::where('id',auth()->user()->id)->first(),
        ]);
    }

    public function update(Request $request){

        // dd($request->all());

        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email',
        ]);


        $Gestionnaire=Gestionnaire::find($request->id);
        $FindEmail=Gestionnaire::where('email',$request->email)->first();
        if($FindEmail && $Gestionnaire->email!==$request->email){
            return back()->withErrors(['EmailExists'=>'Email deja existant']);
        }

        $Gestionnaire->nom=$request->nom;
        $Gestionnaire->prenom=$request->prenom;
        $Gestionnaire->email=$request->email;

        if($request->deleteImage){
            Storage::disk('public')->delete($Gestionnaire->imageSRC);
            $Gestionnaire->imageSRC = null;
        }

        $Gestionnaire->update();

        return Redirect()->back()->with('Admin',Gestionnaire::find($request->id));
}

    public function UploadImage(Request $request){

        $request->validate([
            'imageSRC' => 'required|image|mimes:jpeg,png,jpg,svg'
        ]);

        $Gestionnaire=Gestionnaire::find($request->id);

        if ($request->hasFile('imageSRC')) {
            if ($Gestionnaire->imageSRC) {
                Storage::disk('public')->delete($Gestionnaire->imageSRC);
            }

            $Matricule = $Gestionnaire->matricule;

            $imageFile = $request->file('imageSRC');

            $imageName = 'profile_' . $Matricule. '_' . date("Y-m-d", time()) . '.' . $imageFile->getClientOriginalExtension();

            $imagePath = $imageFile->storeAs("OFPPT_Talk/GestionnaireProfile/{$Matricule}", $imageName, 'public');

            $Gestionnaire->imageSRC = $imagePath;
        }
        $Gestionnaire->update();

        return Redirect()->back()->with('Admin',Gestionnaire::find($request->id));
    }


    public function UpdatePassword(Request $request){
        $Gestionnaire=Gestionnaire::find($request->id);
        if(!Hash::check($request->current_password,$Gestionnaire->password)){
            return Redirect()->back()->withErrors(['current_password'=>'Mot de passe actuel incorrect']);
        }
        if(Hash::check($request->password , $Gestionnaire->password)){
            return Redirect()->back()->withErrors(['CheckPassword'=>'Saisir un mot de passe différent a votre ancien mot de passe']);
        }
        $request->validate([
            'password' => ['required', Rules\Password::defaults()],
            'password_confirmation'=> 'required|same:password'
        ]);
        $Gestionnaire->password=Hash::make($request->password);
        $Gestionnaire->update();
    }
}
