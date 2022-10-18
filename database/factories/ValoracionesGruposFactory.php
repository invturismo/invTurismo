<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ValoracionesGrupos;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ValoracionesGrupos>
 */
class ValoracionesGruposFactory extends Factory
{
    protected $model = ValoracionesGrupos::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $arraySignificado = [6,12,18,30];
        $randomSignificado = rand(0,3);
        $R_COSTUMBRES = rand(1,70);
        return [
            'R_COSTUMBRES' => $R_COSTUMBRES,
            'ID_SIGNIFICADO' => $randomSignificado+1,
            'TOTAL' => $R_COSTUMBRES + $arraySignificado[$randomSignificado]
        ];
    }
}
