<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\LaureatActivity;
use App\Models\souvenir;
use App\Notifications\CommentsNotification;
use App\Services\CommentModerationService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request, $PosteId)
    {
        $comments = Comment::with('user')->where('Souvenir_id', $PosteId)->latest()->get();
        // dd($comments);
        return response()->json($comments);
    }

    public function AjouterComment(Request $request)
    {
        $comment = new Comment();
        $comment->content = $request->comment;
        $comment->souvenir_id = $request->posteId;
        $comment->user_id = $request->LaureatId;
        $comment->save();

        $Poste = souvenir::find($request->posteId);

        if ($Poste->user_id !== $request->LaureatId) {
            $Poste->user->notify(new CommentsNotification(auth()->user(), $Poste->id, $request->comment));
        }


        $CommentCount = Comment::where('user_id', auth()->user()->id)->count();
        $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

        if (!CommentModerationService::check($comment->content)[0]) {
            $comment->delete();
            return back()->withErrors([
                'commenterrors' => CommentModerationService::check($comment->content)[1]
            ]);
        }

        if ($FindLaureat) {
            $FindLaureat->MyComments_Count = $CommentCount;
            $FindLaureat->update();
        } else {

            LaureatActivity::create([
                'Laureat_id' => (int) $request->LaureatId,
                'Liked_Poste' => [],
                'saved_Poste' => [],
                'Count_LikedPoste' => 0,
                'Count_SavedPoste' => 0,
                'MyPostes_Count' => 1,
                'Helpful_Avis' => [],
                'Report_Avis' => [],
                'MyComments_Count' => 1
            ]);
        }
    }

    public function DeleteComment(Request $request, $CommentId)
    {
        $comment = Comment::find($CommentId);
        $comment->delete();


        $CommentCount = Comment::where('user_id', auth()->user()->id)->count();
        $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

        if ($FindLaureat) {
            $FindLaureat->MyComments_Count = $CommentCount;
            $FindLaureat->update();
        }
    }



    public function UpdateComment(Request $request, $CommentId)
    {
        $comment = Comment::find($CommentId);
        if ($comment->content !== $request->content) {
            $comment->content = $request->content;
            $comment->edited = true;
            $comment->update();
        }
    }
}
