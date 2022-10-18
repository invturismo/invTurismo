<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CalidadInmaterial;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalidadInmaterial>
 */
class CalidadInmaterialFactory extends Factory
{
    protected $model = CalidadInmaterial::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $dataCalidad = [
            'COLECTIVA' => rand(1,14),
            'TRADICIONAL' => rand(1,14),
            'ANONIMA' => rand(1,14),
            'ESPONTANEA' => rand(1,14),
            'POPULAR' => rand(1,14),
        ];
        $dataCalidad['SUBTOTAL'] = array_sum($dataCalidad);
        return $dataCalidad;
    }
}
