<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\LaureatActivity;
use App\Models\souvenir;
use App\Models\User;
use App\Notifications\PostLikedNotification;
use App\Services\ImageModerationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SouvenirController extends Controller
{
    public function LikedPost(Request $request)
    {

        $LikedPost = souvenir::find($request->PostId);
        if ($LikedPost) {
            $LikedPost->increment('likes_count');
            $LikedPost->update();

            if ($LikedPost->user_id !== $request->LaureatId) {
                $User = User::find($request->LaureatId);
                $LikedPost->user->notify(new PostLikedNotification($User, $LikedPost->id));
            }
        }

        $LikedPostMongo = LaureatActivity::where('Laureat_id', $request->LaureatId)->first();
        if ($LikedPostMongo) {
            $LikedPostMongo->push('Liked_Poste', $request->PostId, true);
            $LikedPostMongo->Count_LikedPoste = count($LikedPostMongo->Liked_Poste);
            $LikedPostMongo->update();
        } else {
            LaureatActivity::create([
                'Laureat_id' => $request->LaureatId,
                'Liked_Poste' => [$request->PostId],
                'saved_Poste' => [],
                'Count_LikedPoste' => 1,
                'Count_SavedPoste' => 0,
                'MyPostes_Count' => 0,
                'Helpful_Avis' => [],
                'Report_Avis' => [],
                'MyComments_Count' => 0,
            ]);
        }
    }

    public function UnLikedPost(Request $request)
    {
        $LikedPost = souvenir::find($request->PostId);
        if ($LikedPost) {
            $LikedPost->decrement('likes_count');
            $LikedPost->update();
        }

        $LikedPostMongo = LaureatActivity::where('Laureat_id', $request->LaureatId)->first();
        if ($LikedPostMongo) {
            $LikedPostMongo->pull('Liked_Poste', $request->PostId);
            $LikedPostMongo->Count_LikedPoste = count($LikedPostMongo->Liked_Poste);
            $LikedPostMongo->update();
        }
    }

    public function GetLikes($id)
    {
        $Post = souvenir::find($id);

        return $Post;
    }

    public function BookmarkPost(Request $request)
    {
        $SavedPost = souvenir::find($request->PostId);
        if ($SavedPost) {
            $SavedPost->increment('saves_count');
            $SavedPost->update();
        }

        $SavedPostMongo = LaureatActivity::where('Laureat_id', $request->LaureatId)->first();
        if ($SavedPostMongo) {
            $SavedPostMongo->push('saved_Poste', $request->PostId, true);
            $SavedPostMongo->Count_SavedPoste = count($SavedPostMongo->saved_Poste);
            $SavedPostMongo->update();
        } else {
            LaureatActivity::create([
                'Laureat_id' => $request->LaureatId,
                'Liked_Poste' => [],
                'saved_Poste' => [$request->PostId],
                'Count_LikedPoste' => 0,
                'Count_SavedPoste' => 1,
                'MyPostes_Count' => 0,
                'Helpful_Avis' => [],
                'Report_Avis' => [],
                'MyComments_Count' => 0,
            ]);
        }
    }

    public function UnBookmarkPost(Request $request)
    {
        $SavedPost = souvenir::find($request->PostId);
        if ($SavedPost) {
            $SavedPost->decrement('saves_count');
            $SavedPost->update();
        }

        $SavedPostMongo = LaureatActivity::where('Laureat_id', $request->LaureatId)->first();
        if ($SavedPostMongo) {
            $SavedPostMongo->pull('saved_Poste', $request->PostId);
            $SavedPostMongo->Count_SavedPoste = count($SavedPostMongo->saved_Poste);
            $SavedPostMongo->update();
        }
    }

    public function getBookmarkedPosts()
    {
        $Laureat = auth()->user()->id;
        $Find = LaureatActivity::where('Laureat_id', $Laureat)->first();
        $SavedPostes = [];
        if (! $Find) {
            return Inertia::render('Laureat/BookmarkedPostes', [
                'User' => Auth::user(),
                'SavedPostes' => $SavedPostes,
                'Laureat_Activity' => LaureatActivity::all(),
            ]);
        }
        foreach ($Find->saved_Poste as $value) {
            array_push($SavedPostes, souvenir::with('user')->orderBy('created_at', 'desc')->find($value));
        }

        return Inertia::render('Laureat/BookmarkedPostes', [
            'User' => Auth::user(),
            'SavedPostes' => $SavedPostes,
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }

    public function Store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'content' => 'nullable|max:150|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:5000',
        ]);

        $Laureat = User::find($request->laureat_id);

        $Poste = new souvenir;
        $Poste->content = $request->content;
        $Poste->user_id = $request->laureat_id;
        $Poste->categorie = $Laureat->filiere;
        $Poste->dateSouvenir = now();

        if ($request->hasFile('photo')) {
            $PosteFile = $request->file('photo');

            $PosteName = time().'_'.$Laureat->nom.'_'.$Laureat->prenom.'.'.$PosteFile->getClientOriginalExtension();

            $PosteTempPath = $PosteFile->storeAs("temp/{$Laureat->id}", $PosteName, 'public');

            if (! ImageModerationService::check($PosteTempPath)[0]) {
                Storage::disk('public')->delete($PosteTempPath);

                return back()->withErrors([
                    'photo' => ImageModerationService::check($PosteTempPath)[1],
                ]);
            }

            $PostePath = Storage::disk('public')->move("temp/{$Laureat->id}/".$PosteName, "OFPPTConnect/Laureats/{$Laureat->id}/".$PosteName);

            $Poste->photo = "OFPPTConnect/Laureats/{$Laureat->id}/".$PosteName;
        }

        $Poste->save();

        $PosteMongo = LaureatActivity::where('Laureat_id', (int) $request->laureat_id)->first();
        if ($PosteMongo) {
            $PosteMongo->MyPostes_Count += 1;
            $PosteMongo->update();
        } else {
            LaureatActivity::create([
                'Laureat_id' => (int) $request->laureat_id,
                'Liked_Poste' => [],
                'saved_Poste' => [],
                'Count_LikedPoste' => 0,
                'Count_SavedPoste' => 0,
                'MyPostes_Count' => 1,
                'Helpful_Avis' => [],
                'Report_Avis' => [],
                'MyComments_Count' => 0,
            ]);
        }

        return redirect()->back()->with('success', 'Post enregistré avec succès.');
    }

    public function Destroy(Request $request)
    {
        $Poste = souvenir::find($request->PostId);
        if ($Poste) {
            if ($Poste->photo) {
                Storage::disk('public')->delete($Poste->photo);
            }
            $Poste->delete();
            $PosteMongo = LaureatActivity::where('Laureat_id', $request->LaureatId)->first();
            if ($PosteMongo) {
                $PosteMongo->pull('saved_Poste', $request->PostId);
                $PosteMongo->pull('Liked_Poste', $request->PostId);
                $PosteMongo->Count_SavedPoste = count($PosteMongo->saved_Poste);
                $PosteMongo->Count_LikedPoste = count($PosteMongo->Liked_Poste);
                $PosteMongo->MyPostes_Count = $PosteMongo->MyPostes_Count - 1;
                $PosteMongo->update();
            }
        }

        $CommentCount = Comment::where('user_id', auth()->user()->id)->count();
        $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

        if ($FindLaureat) {
            $FindLaureat->MyComments_Count = $CommentCount;
            $FindLaureat->update();
        }

    }

    public function GetPoste($id)
    {
        $Poste = souvenir::with('User')->find($id);

        return Inertia::render('Laureat/PosteParId', [
            'Poste' => $Poste,
            'User' => Auth::user(),
            'Laureat_Activity' => LaureatActivity::all(),
        ]);
    }
}
