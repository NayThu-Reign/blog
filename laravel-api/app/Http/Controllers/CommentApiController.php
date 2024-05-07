<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


    public function index($id) {
        $comments = Comment::where('article_id', $id)->get();
        // return response()->json($comments);

        return $comments;

    }

    public function store(Request $request) {
        $content = $request->content;
        $article_id = $request->article_id;
        $user_id = auth()->user()->id;

        if(!$content ) return response(" You need to write something", 400);

        $comment = new Comment();
        $comment->content = $content;
        $comment->article_id = $article_id;
        $comment->user_id = $user_id;
        $comment->created_at = now();

        $comment->save();

        return $comment;
    }

    public function show(Comment $comment) {
        return $comment;
    }

    public function update(Request $request, Comment $comment) {
        $content = $request->content;
        if(!$content ) return response(" You need to write something", 400);

        $comment->content = $content;
        $comment->save();

        return $comment;
    }

    public function destroy(Comment $comment) {
        $comment->delete();

        return $comment;
    }
}

