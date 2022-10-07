<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CalidadFestividades;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalidadFestividades>
 */
class CalidadFestividadesFactory extends Factory
{
    protected $model = CalidadFestividades::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $dataCalidad = [
            'ORGANIZACION' => rand(1,30),
            'B_SOCIOCULTURALES' => rand(1,20),
            'B_ECONOMICOS' => rand(1,20)
        ];
        $dataCalidad['SUBTOTAL'] = array_sum($dataCalidad);
        return $dataCalidad;
    }
}
