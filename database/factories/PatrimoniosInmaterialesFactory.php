<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PatrimoniosInmateriales;
use App\Models\Historial_Insert_Delete;
use App\Models\Generalidades;
use App\Models\ValoracionInmaterial;
use App\Models\Actividades;
use App\Models\Promocion;
use App\Models\Redes;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PatrimoniosInmateriales>
 */
class PatrimoniosInmaterialesFactory extends Factory
{
    protected $model = PatrimoniosInmateriales::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [];
    }

    public function classified()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_GENERALIDAD' => Generalidades::factory(),
                'ID_VALORACION_INMATERIAL' => ValoracionInmaterial::factory(),
                'ID_ACTIVIDAD' => Actividades::factory(),
                'ID_PROMOCION' => Promocion::factory(),
                'ID_RED_SOCIAL' => Redes::factory(),
                'REF_BIBLIOGRAFICA' => $this->faker->text($maxNbChars = 50),
                'OBSERVACIONES' => $this->faker->text($maxNbChars = 50),
            ];
        });
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'REF_BIBLIOGRAFICA' => $this->faker->text($maxNbChars = 50),
                'OBSERVACIONES' => $this->faker->text($maxNbChars = 50),
            ];
        });
    }

    public function configure()
    {
        return $this->afterCreating(function (PatrimoniosInmateriales $recurso) {
            Historial_Insert_Delete::factory()->create([
                'TABLA_MOVIMIENTO' => 'Patrimonio Cultural Inmaterial',
                'ID_REGISTRO_MOVIMIENTO' => $recurso->ID_INMATERIAL,
                'TIPO_MOVIMIENTO' => isset($recurso->ID_GENERALIDAD) ? '2' : '1'
            ]);
        });
    }
}