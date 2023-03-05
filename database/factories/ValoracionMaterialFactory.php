<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ValoracionMaterial;
use App\Models\CalidadMaterial;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ValoracionMaterial>
 */
class ValoracionMaterialFactory extends Factory
{
    protected $model = ValoracionMaterial::class;
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
            'ID_CALIDAD_MATERIAL' => CalidadMaterial::factory(),
            'ID_SIGNIFICADO' => $randomSignificado + 1,
            'TOTAL' => function (array $attributes) {
                $arraySignificado = [6,12,18,30];
                $subtotal = CalidadMaterial::find($attributes['ID_CALIDAD_MATERIAL'])->SUBTOTAL;
                return $subtotal + $arraySignificado[$attributes['ID_SIGNIFICADO']-1];
            }
        ];
    }

    public function whitoutCalidad()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_CALIDAD_MATERIAL' => null,
            ];
        });
    }
}
