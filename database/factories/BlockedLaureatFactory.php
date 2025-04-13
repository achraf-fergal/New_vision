<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlockedLaureat>
 */
class BlockedLaureatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // Mot de passe sécurisé
            'telephone' => $this->faker->phoneNumber(),
            'imageSRC' => $this->faker->optional()->imageUrl(200, 200, 'people'),
            'promotion' => $this->faker->year(),
            'filiere' => $this->faker->word(),
            'etablissement' => $this->faker->company(),
            'fonction' => $this->faker->optional()->jobTitle(),
            'employeur' => $this->faker->optional()->company(),
            'valide' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
