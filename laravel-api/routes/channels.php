<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Order;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('articlenotification', function (User $user) {
    return $user->id = auth()->user();
});
