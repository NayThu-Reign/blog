<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function Index() {
        return User::all();
    }


    public function show(User $user) {
        return $user;
    }
}
