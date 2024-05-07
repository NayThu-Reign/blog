<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\BroadcastsEvents;

class Article extends Model
{
    use BroadcastsEvents, HasFactory;

    public function category() {
        return $this->belongsTo('App\Models\Category');
    }

    public function comments() {
        return $this->hasMany('App\Models\Comment');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    // /**
    //  * Get the channels that model events should broadcast on.
    //  *
    //  * @return array<int, \Illuminate\Broadcasting\Channel|\Illuminate\Database\Eloquent\Model>
    //  */
    // public function broadcastAs(string $article): string|null
    // {
    //     return match($article) {
    //         'created' => 'article.created',
    //         default => null,
    //     };
    // }


//     /**
//  * Get the data to broadcast for the model.
//  *
//  * @return array<string, mixed>
//  */
//     public function broadcastWith(string $article): array
//     {
//         return match ($article) {
//             'created' => ['title' => $this->title],
//             default => ['model' => $this],
//         };
//     }


}
