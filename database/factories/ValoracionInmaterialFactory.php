<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ValoracionInmaterial;
use App\Models\CalidadInmaterial;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ValoracionInmaterial>
 */
class ValoracionInmaterialFactory extends Factory
{
    protected $model = ValoracionInmaterial::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $arraySignificado = [6,12,18,30];
        $randomSignificado = rand(0,3);
        return [
            'ID_CALIDAD_INMATERIAL' => CalidadInmaterial::factory(),
            'ID_SIGNIFICADO' => $randomSignificado + 1,
            'TOTAL' => function (array $attributes) {
                $arraySignificado = [6,12,18,30];
                $subtotal = CalidadInmaterial::find($attributes['ID_CALIDAD_INMATERIAL'])->SUBTOTAL;
                return $subtotal + $arraySignificado[$attributes['ID_SIGNIFICADO']-1];
            }
        ];
    }

    public function whitoutCalidad()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_CALIDAD_INMATERIAL' => null,
            ];
        });
    }
}
