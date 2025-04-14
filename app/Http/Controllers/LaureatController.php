<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\laureat;
use App\Models\LaureatActivity;
use App\Models\souvenir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class LaureatController extends Controller
{
    public function index(Request $request)
    {
        // sleep(3);
        if ($request->wantsJson()) {
            return response()->json(Souvenir::with('Laureat')->orderBy('created_at', 'desc')->paginate(5));
        }

        return Inertia::render('Laureat/Index', [
            'User' => auth()->user(),
            'Postes' => souvenir::with("Laureat")->orderBy('created_at', 'desc')->paginate(5),
            'Laureat_Activity' => LaureatActivity::all(),
            'Comments_Count' => Comment::where('laureat_id', auth()->user()->id)->get()->count()
        ]);
    }


    public function StatistiqueLaureat(Request $request, $id)
    {
        $CountPostes = souvenir::where('laureat_id', $id)->get();
        $CountComments = Comment::where('laureat_id', $id)->get();
        if ($request->wantsJson()) {
            return response()->json(
                [
                    'CountPostes' => $CountPostes->count(),
                    'CountComments' => $CountComments->count()
                ]
            );
        }
    }
    public function UpdateShareCount($id)
    {
        $Poste = souvenir::find($id);
        $Poste->increment('shares_count');
        $Poste->update();
    }




    public function GetMyPostes()
    {
        // $postes= souvenir::where('laureat_id', auth()->user()->id)->first();
        $postes = souvenir::where('laureat_id', auth()->user()->id)->get();
        return Inertia::render('Laureat/UserPostes', [
            'Postes' => $postes,
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }


    public function GetProfileInfo()
    {
        $laureat = laureat::find(auth()->user()->id);
        return Inertia::render('Laureat/UserProfile', [
            'user' => $laureat,
        ]);
    }

    public function UploadPhoto(Request $request)
    {

        // dd($request->all());
        $request->validate([
            'imageSRC' => 'required|image|mimes:jpeg,png,jpg,svg'
        ]);

        $laureat = laureat::find($request->id);

        if ($request->hasFile('imageSRC')) {
            if ($laureat->imageSRC) {
                Storage::disk('public')->delete($laureat->imageSRC);
            }

            $id = $laureat->id;

            $imageFile = $request->file('imageSRC');

            $imageName = 'profile_' . $id . '_' . time() . '.' . $imageFile->getClientOriginalExtension();

            $imagePath = $imageFile->storeAs("OFPPT_Talk/Laureats/{$id}/Profile", $imageName, 'public');

            $laureat->imageSRC = $imagePath;
        }
        $laureat->update();

        return Redirect()->back()->with('userup', laureat::find($request->id));
    }

    public function UpdateProfile(Request $request)
    {
        $request->validate([
            'nom'      => 'required|string|max:255',
            'prenom'   => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'telephone'     => [
                'required',
                'string',
                'regex:/^(0[5-7]\d{8}|212[5-7]\d{8})$/'
            ],
            'promotion'     => 'required|integer|min:1990|max:' . date("Y"),
            'filiere'       => 'required|string',
            'etablissement' => 'required|string',
            'fonction'      => 'nullable|string',
            'employeur'     => 'nullable|string',
            'bio'     => 'nullable|string|max:155',
        ]);


        $Laureat = laureat::find($request->id);
        $FindEmail = laureat::where('email', $request->email)->first();
        if ($FindEmail && $Laureat->email !== $request->email) {
            return back()->withErrors(['EmailExists' => 'Email deja existant']);
        }

        $Laureat->nom = $request->nom;
        $Laureat->prenom = $request->prenom;
        $Laureat->email = $request->email;
        $Laureat->telephone = $request->telephone;
        $Laureat->promotion = $request->promotion;
        $Laureat->filiere = $request->filiere;
        $Laureat->etablissement = $request->etablissement;
        $Laureat->fonction = $request->fonction;
        $Laureat->employeur = $request->employeur;
        $Laureat->bio = $request->bio;

        if ($request->deleteImage) {
            Storage::disk('public')->delete($Laureat->imageSRC);
            $Laureat->imageSRC = null;
        }

        $Laureat->update();

        return Redirect()->back()->with('user', laureat::find($request->id));
    }

    public function UpdatePassword(Request $request)
    {
        $laureat = laureat::find($request->id);
        if (!Hash::check($request->current_password, $laureat->password)) {
            return Redirect()->back()->withErrors(['current_password' => 'Mot de passe actuel incorrect']);
        }
        if (Hash::check($request->password, $laureat->password)) {
            return Redirect()->back()->withErrors(['CheckPassword' => 'Saisir un mot de passe différent a votre ancien mot de passe']);
        }
        $request->validate([
            'password' => ['required', Rules\Password::defaults()],
            'password_confirmation' => 'required|same:password'
        ]);
        $laureat->password = Hash::make($request->password);
        $laureat->update();
    }

    public function Search()
    {

        // $laureat = laureat::where('nom', 'LIKE', "%$search%")
        //     ->orWhere('prenom', 'LIKE', "%$search%")
        //     ->orWhere('email', 'LIKE', "%$search%")
        //     ->get();


        return Inertia::render('Laureat/Search', [
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }



    public function getCombinedSearch(Request $request)
    {

        $search = $request->search;
        $limit = $request->input('limit', 20);


        if (empty($search)) {

            if ($request->wantsJson()) {
                return response()->json([
                    'posts' => [],
                    'laureats' => []
                ]);
            }
        }


        $laureats = Laureat::where('nom', 'LIKE', "%{$search}%")
            ->orWhere('prenom', 'LIKE', "%{$search}%")
            ->orWhere('email', 'LIKE', "%{$search}%")
            ->select('id', 'nom', 'prenom', 'email', 'imageSRC', 'fonction')
            ->limit($limit)
            ->get();

        $posts = souvenir::where('content', 'LIKE', "%{$search}%")
            ->with('laureat')
            ->select('id', 'content', 'laureat_id', 'created_at', 'likes_count', 'comments_count')
            ->limit($limit)
            ->get();

        if ($request->wantsJson()) {
            return response()->json([
                'posts' => $posts,
                'laureats' => $laureats
            ]);
        }
    }
}
