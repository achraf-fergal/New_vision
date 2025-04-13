<?php

namespace Database\Factories;

use App\Models\laureat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\avis>
 */
class AvisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'avis' => $this->faker->sentence(),
            'dateAvis' => $this->faker->date(),
            'laureat_id' => laureat::factory(), 
            'helpful' => $this->faker->numberBetween(0, 100),
            'report' => $this->faker->numberBetween(0, 50),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
