<?php

use App\Http\Controllers\ArticleApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryApiController;
use App\Http\Controllers\CommentApiController;
use App\Http\Controllers\UserApiController;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::apiResource('/categories', CategoryApiController::class);

Route::apiResource('/articles', ArticleApiController::class);

Route::apiResource('/users', UserApiController::class);

Route::apiResource('/comments', CommentApiController::class);

Route::get('/comments/article/{id}', [CommentApiController::class, 'index']);


Route::post("/login", function() {
    $email = request()->email;
    $password = request()->password;

    if(!$email or !$password) {
        return response(['msg' => 'email and password required', 400]);
    }

    $user = User::where('email', $email)->first();

    if($user) {
        if(password_verify($password, $user->password)) {
            return $user->createToken('api')->plainTextToken;
        }
    }

    return response((['msg' => 'email or password incorrect']), 401);
});

Route::post("/users", function() {
    $validator = Validator::make(request()->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    if($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $user = new User();
    $user->name = request()->name;
    $user->email = request()->email;
    $user->password = Hash::make(request()->password);
    $user->email_verified_at = now();

    $user->save();

    return response()->json([
        'user' => $user,
    ], 201);


});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->get('/verify', function (Request $request) {
    return $request->user();
});

// Route for user login
// Route::post('/login', function(Request $request) {
//     $credentials = $request->only('email', 'password');

//     if (!Auth::attempt($credentials)) {
//         return response()->json(['error' => 'Unauthorized'], 401);
//     }

//     $user = User::where('email', $request->email)->first();

//     return $user->createToken('AuthToken')->plainTextToken;
// });
