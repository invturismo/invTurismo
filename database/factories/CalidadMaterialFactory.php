<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CalidadMaterial;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalidadMaterial>
 */
class CalidadMaterialFactory extends Factory
{
    protected $model = CalidadMaterial::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $dataCalidad = [
            'ESTADO_CONSERVACION' => rand(1,21),
            'CONSTITUCION' => rand(1,21),
            'REPRESENTATIVIDAD' => rand(1,28)
        ];
        $dataCalidad['SUBTOTAL'] = array_sum($dataCalidad);
        return $dataCalidad;
    }
}
