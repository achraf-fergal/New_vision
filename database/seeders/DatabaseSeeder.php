<?php

namespace Database\Seeders;

use App\Models\Avis;
use App\Models\blockedlaureat;
use App\Models\Comment;
use App\Models\Gestionnaire;
use App\Models\laureat;
use App\Models\souvenir;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // laureat::factory(10)->create();
        // Avis::factory(12)->create();
        // Gestionnaire::factory(5)->create();
        // souvenir::factory(20)->create();
        // blockedlaureat::factory(10)->create();
        Comment::factory(10)->create();
    }
}
