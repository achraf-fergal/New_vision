<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\gestionnaire>
 */
class GestionnaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matricule' => $this->faker->unique()->randomNumber(6, true),
            'email' => $this->faker->unique()->safeEmail(),
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'imageSRC' => $this->faker->optional()->imageUrl(200, 200, 'people'),
            'password' => Hash::make('password'), // Hash du mot de passe par défaut
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
