<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ListadosPreliminares;
use App\Models\Codigos;
use App\Models\Historial_Insert_Delete;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ListadosPreliminaresFactory extends Factory
{
    protected $model = ListadosPreliminares::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    public function definition()
    {
        return [
            'ID_FUENTE' => rand(1, 7),
            'ID_CODIGO' => Codigos::factory(),
            'NOMBRE' => $this->faker->text($maxNbChars = 10),
            'UBICACION' => $this->faker->streetAddress,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (ListadosPreliminares $listado) {
            Historial_Insert_Delete::factory()->create([
                'TABLA_MOVIMIENTO' => 'listados_preliminares',
                'ID_REGISTRO_MOVIMIENTO' => $listado->ID_LISTADO,
                'TIPO_MOVIMIENTO' => '1'
            ]);
        });
    }
}
