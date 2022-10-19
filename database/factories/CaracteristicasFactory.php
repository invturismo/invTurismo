<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Caracteristicas;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Caracteristicas>
 */
class CaracteristicasFactory extends Factory
{
    protected $model = Caracteristicas::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'DESCRIPCION' => $this->faker->text($maxNbChars = 70)
        ];
    }
}
