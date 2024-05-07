<?php

use App\Events\BookNotification;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\OrderShipmentController;
use App\Models\Article;
use Illuminate\Support\Facades\Route;


// Route::get('/', [OrderShipmentController::class, 'store']);
Route::get('/home', function(){
    \Illuminate\Support\Facades\Mail::send(new \App\Mail\OrderShipped());
});

Route::get('/event', function() {
    event(new BookNotification('This is book notification'));
});

Route::get('/listen', [ArticleController::class, 'listen']);

Route::get('/', [ArticleController::class, 'index']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/detail/{id}', [ArticleController::class, 'detail']);

Route::get('/articles/add', [ArticleController::class, 'add']);
Route::post('/articles/add', [ArticleController::class, 'create']);

Route::get('/articles/delete/{id}', [ArticleController::class, 'delete']);

Route::post('/comments/add', [CommentController::class, 'create']);

Route::get('/comments/delete/{id}', [CommentController::class, 'delete']);


Route::get('/articles/edit/{id}', [ArticleController::class, 'edit']);
Route::post('/articles/edit/{id}', [ArticleController::class, 'update']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
