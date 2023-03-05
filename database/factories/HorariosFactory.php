<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Horarios;
use App\Models\Ingresos;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Horarios>
 */
class HorariosFactory extends Factory
{
    protected $model = Horarios::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_INGRESO' => Ingresos::factory(),
            'RESTRINGIDO' => rand(0,1),
            'PERMANENTE' => rand(0,1),
            'VISITA_EXTERIOR' => rand(0,1),
            'VISITA_INTERIOR' => rand(0,1)
        ];
    }

    public function withoutIngreso()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_INGRESO' => null,
                'RESTRINGIDO' => $this->faker->randomElement(['false','true']),
                'PERMANENTE' => $this->faker->randomElement(['false','true']),
                'VISITA_EXTERIOR' => $this->faker->randomElement(['false','true']),
                'VISITA_INTERIOR' => $this->faker->randomElement(['false','true']),
            ];
        });
    }
}
