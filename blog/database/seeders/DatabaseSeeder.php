<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Article;
// use App\Models\Category;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Article::factory()->count(20)->create();
        Comment::factory()->count(40)->create();

        User::factory()->create([
            "name" => "Alice",
            "email" => "alice@gmail.com",
        ]);

        User::Factory()->create([
            "name" => "Bob",
            "email" => "bob@gmail.com",
        ]);

        $list = ['News', 'Tech', 'Mobile', 'Desktop', 'Web'];
        foreach($list as $name) {
            \App\Models\Category::create(['name'=> $name]);
        }
    }
}
