<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tarifas;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tarifas>
 */
class TarifasFactory extends Factory
{
    protected $model = Tarifas::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'NINOS' => $this->faker->ean8,
            'ADULTOS' => $this->faker->ean8,
            'ADULTO_MAYOR' => $this->faker->ean8,
            'EXTRANJEROS' => $this->faker->ean8,
            'ESTUDIANTES' => $this->faker->ean8,
            'CITA_PREVIA' => $this->faker->ean8,
            'GENERAL' => $this->faker->ean8
        ];
    }
}
