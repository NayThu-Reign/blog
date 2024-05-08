<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;


class ArticleApiController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index() {
        return Article::latest()->paginate(5);
    }

    public function store(Request $request) {
        $title = $request->title;
        $body = $request->body;
        $category= request()->category_id;
        $user = auth()->user()->id;


        if(!$title and !$body ) return response("title or body required", 400);

        $article = new Article();
        $article->title = $title;
        $article->body = $body;
        $article->category_id = $category;
        $article->user_id = $user;
        $article->created_at = now();
        $article->save();

        return $article;
    }

    public function show(Article $article) {
        return $article;
    }

    public function update(Request $request, Article $article) {
        $title = $request->title;
        if(!$title) return response("name required", 400);

        $article->title = $title;
        $article->save();

        return $article;
    }

    public function destroy($id) {
        $article = Article::find($id);
        if( Gate::allows('article-delete', $article) ) {
            $article->delete();
            return $article;
        } else {
            return response()->json("Unauthorize", 401);
        }
    }

}
