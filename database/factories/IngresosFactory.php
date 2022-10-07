<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ingresos;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingresos>
 */
class IngresosFactory extends Factory
{
    protected $model = Ingresos::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'LUNES' => rand(0,1),
            'MARTES' => rand(0,1),
            'MIERCOLES' => rand(0,1),
            'JUEVES' => rand(0,1),
            'VIERNES' => rand(0,1),
            'SABADO' => rand(0,1),
            'DOMINGO' => rand(0,1),
            'HORAS' => $this->faker->text($maxNbChars = 70)
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'LUNES' => $this->faker->randomElement(['false','true']),
                'MARTES' => $this->faker->randomElement(['false','true']),
                'MIERCOLES' => $this->faker->randomElement(['false','true']),
                'JUEVES' => $this->faker->randomElement(['false','true']),
                'VIERNES' => $this->faker->randomElement(['false','true']),
                'SABADO' => $this->faker->randomElement(['false','true']),
                'DOMINGO' => $this->faker->randomElement(['false','true']),
            ];
        });
    }
}
