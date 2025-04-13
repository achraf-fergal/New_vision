<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\souvenir;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request , $PosteId)
    {
        $comments = Comment::with('Laureat')->where('Souvenir_id', $PosteId)->latest()->get();

        return response()->json($comments);
    }

    public function AjouterComment(Request $request){
        $comment = new Comment();
        $comment->content = $request->comment;
        $comment->souvenir_id = $request->posteId;
        $comment->laureat_id = $request->LaureatId;
        $comment->save();

        $Poste = souvenir::find($request->posteId);
        $Poste->increment('comments_count');
        $Poste->update();
    }

    public function DeleteComment(Request $request , $CommentId){
        $comment = Comment::find($CommentId);
        $Poste = souvenir::find($comment->souvenir_id);
        $Poste->decrement('comments_count');
        $Poste->update();
        $comment->delete();
    }
}
