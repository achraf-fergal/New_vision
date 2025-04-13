<?php

namespace Database\Factories;

use App\Models\laureat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\souvenir>
 */
class SouvenirFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'photo' => $this->faker->imageUrl(640, 480, 'memory'), // Image factice
            'content' => $this->faker->paragraph(), // Contenu factice
            'likes_count' => $this->faker->numberBetween(0, 100), // Nombre de likes factice
            'saves_count' => $this->faker->numberBetween(0, 100), // Nombre de sauvegardes factice
            'dateSouvenir' => $this->faker->date(),
            'laureat_id' => laureat::factory(), // Génère un laureat automatiquement
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
