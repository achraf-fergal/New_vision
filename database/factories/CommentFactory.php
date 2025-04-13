<?php

namespace Database\Factories;

use App\Models\laureat;
use App\Models\souvenir;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'laureat_id' => laureat::factory(),
            'souvenir_id' => souvenir::factory(),
            'content' => $this->faker->text(200),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
