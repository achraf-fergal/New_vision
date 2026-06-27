<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Models\Comment;
use App\Models\Gestionnaire;
use App\Models\LaureatActivity;
use App\Models\souvenir;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {

        if ($request->wantsJson()) {
            return response()->json(souvenir::with('User')->orderBy('created_at', 'desc')->paginate(5));
        }
        // $Postes = souvenir::with("User")->orderBy('created_at', 'desc')->paginate(5);

        // dd($Postes);

        return Inertia::render('Laureat/Index', [
            'User' => auth()->user(),
            'Postes' => souvenir::with("User")->orderBy('created_at', 'desc')->paginate(5),
            'Laureat_Activity' => LaureatActivity::where('Laureat_id', auth()->user()->id)->get(),
            'Comments_Count' => Comment::where('user_id', auth()->user()->id)->get()->count()
        ]);
    }


    public function StatistiqueLaureat(Request $request, $id)
    {
        $CountPostes = souvenir::where('user_id', $id)->get();
        $CountComments = Comment::where('user_id', $id)->get();
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
        $postes = souvenir::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Laureat/UserPostes', [
            'Postes' => $postes,
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }


    public function GetProfileInfo()
    {
        $laureat = User::find(auth()->user()->id);
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

        $laureat = User::find($request->id);


        if ($request->hasFile('imageSRC')) {
            if ($laureat->imageSRC) {
                Storage::disk('public')->delete($laureat->imageSRC);
            }

            $id = $laureat->id;

            $imageFile = $request->file('imageSRC');

            $imageName = 'profile_' . $id . '_' . time() . '.' . $imageFile->getClientOriginalExtension();

            $imagePath = $imageFile->storeAs("OFPPTConnect/Laureats/{$id}/Profile", $imageName, 'public');

            $laureat->imageSRC = $imagePath;
        }
        $laureat->update();

        return Redirect()->back()->with('userup', User::find($request->id));
    }

    public function UpdateProfile(Request $request)
    {
        $Lang = app()->getLocale();

        // dd($request->all());
        $request->validate([
            'nom'      => 'required|string|max:255',
            'prenom'   => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($request->id),
                Rule::unique('gestionnaires')->ignore($request->id),
            ],
            'telephone' => [
                'required',
                'string',
                'regex:/^(0[5-7]\d{8}|212[5-7]\d{8})$/',
                Rule::unique('users')->ignore($request->id),
                Rule::unique('gestionnaires')->ignore($request->id),
            ],
            'promotion'     => 'required|integer|min:1990|max:' . date("Y"),
            'filiere'       => 'required|string',
            'etablissement' => 'required|string',
            'fonction'      => 'nullable|string',
            'employeur'     => 'nullable|string',
            'bio'     => 'nullable|string|max:155',
        ]);


        $Laureat = User::find($request->id);
        $FindEmail2 = Gestionnaire::where('email', $request->email)->first();

        if ($FindEmail2 && $Laureat->email !== $request->email) {
            return back()->withErrors(['EmailExists' => $Lang === 'en' ? 'Email already exists' : ($Lang === 'fr' ? 'L\'email existe déjà' : 'البريد الإلكتروني موجود')]);
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

        // dd($request->all());
        if ($request->deleteImage) {
            Storage::disk('public')->delete($Laureat->imageSRC);
            $Laureat->imageSRC = null;
        }

        $Laureat->update();

        return Redirect()->back()->with('user', User::find($request->id));
    }

    public function UpdatePassword(Request $request)
    {
        $Lang = app()->getLocale();

        $laureat = User::find($request->id);
        if (!Hash::check($request->current_password, $laureat->password)) {
            return Redirect()->back()->withErrors([
                'current_password' => $Lang === 'fr' ? 'Mot de passe actuel incorrect' : ($Lang === 'ar' ? 'كلمة المرور الحالية غير صحيحة' : 'Incorrect current password')
            ]);
        }
        if (Hash::check($request->password, $laureat->password)) {
            return Redirect()->back()->withErrors([
                'CheckPassword' => $Lang === 'fr' ? 'Saisir un mot de passe différent de votre ancien mot de passe' : ($Lang === 'ar' ? 'يرجى إدخال كلمة مرور مختلفة عن كلمة المرور القديمة' : 'Please enter a password different from your old password')
            ]);
        }
        $request->validate([
            'current_password' => [
                'required',
                'not_in:None',
            ],
            'password' => ['required', Rules\Password::defaults()],
            'password_confirmation' => 'required|same:password'
        ]);
        $laureat->password = Hash::make($request->password);
        $laureat->update();
    }

    public function Search()
    {
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
                ]);
            }
        }


        $posts = souvenir::where('content', 'LIKE', "%{$search}%")
            ->with('user')
            ->select('id', 'content', 'user_id', 'created_at', 'likes_count', 'comments_count', 'categorie')
            ->limit($limit)
            ->get();



        // $posts = souvenir::where(function ($query) use ($search) {
        //     $query->where('content', 'LIKE', "%{$search}%")
        //         ->orWhereHas('user', function ($q) use ($search) {
        //             $q->where('nom', 'LIKE', "%{$search}%")
        //                 ->orWhere('prenom', 'LIKE', "%{$search}%");
        //         });
        // })
        //     ->with('user')
        //     ->select('id', 'content', 'user_id', 'created_at', 'likes_count', 'comments_count', 'categorie')
        //     ->limit($limit)
        //     ->get();



        if ($request->wantsJson()) {
            return response()->json([
                'posts' => $posts,
            ]);
        }
    }


    public function PostesParCategorie(Request $request, string $filter)
    {
        $Postes = souvenir::with('user')->where('categorie', $filter)->orderBy('likes_count', 'desc')->orderBy('comments_count', 'desc')->limit(10)->get();

        return Inertia::render('Laureat/CategoriePoste', [
            'Categorie' => $filter,
            'Postes' => $Postes,
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }
    public function GetAvis()
    {

        $Avis = Avis::with('user')->where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Laureat/MyAvis', [
            'Avis' => $Avis,
            'Laureat_Activity' =>  LaureatActivity::where('Laureat_id', auth()->user()->id)->first()
        ]);
    }


    public function Delete()
    {
        $User = User::find(auth()->user()->id);
        $User->delete();

        $UserActivity = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();
        $UserActivity->delete();
    }
}
