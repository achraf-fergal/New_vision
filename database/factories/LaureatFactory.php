<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\laureat>
 */
class LaureatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'), // Default password
            'telephone' => $this->faker->phoneNumber,
            'imageSRC' => $this->faker->imageUrl(640, 480),
            'promotion' => $this->faker->year,
            'filiere' => $this->faker->randomElement(['Informatique', 'Génie Civil', 'Mécanique']),
            'etablissement' => $this->faker->company,
            'fonction' => $this->faker->jobTitle,
            'employeur' => $this->faker->company,
            'valide' => $this->faker->boolean, // Random true/false value
        ];
    }
}
