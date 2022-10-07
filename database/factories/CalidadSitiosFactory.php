<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CalidadSitios;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalidadSitios>
 */
class CalidadSitiosFactory extends Factory
{
    protected $model = CalidadSitios::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $dataCalidad = [
            'S_C_AIRE' => rand(1,10),
            'S_C_AGUA' => rand(1,10),
            'S_C_VISUAL' => rand(1,10),
            'CONSERVACION' => rand(1,10),
            'S_C_SONORA' => rand(1,10),
            'DIVERSIDAD' => rand(1,10),
            'SINGULARIDAD' => rand(1,10)
        ];
        $dataCalidad['SUBTOTAL'] = array_sum($dataCalidad);
        return $dataCalidad;
    }
}
