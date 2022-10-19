<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Relevantes;
use App\Models\Tarifas;
use App\Models\Climas;
use App\Models\Horarios;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Relevantes>
 */
class RelevantesFactory extends Factory
{
    protected $model = Relevantes::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_CLIMA' => Climas::factory(),
            'ID_HORARIO' => Horarios::factory(),
            'ID_TARIFA' => Tarifas::factory(),
            'ID_ESTADO' => rand(1,4)
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_CLIMA' => null,
                'ID_HORARIO' => null,
                'ID_TARIFA' => null,
            ];
        });
    }
}
