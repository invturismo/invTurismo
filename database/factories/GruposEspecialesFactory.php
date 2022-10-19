<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GruposEspeciales;
use App\Models\Historial_Insert_Delete;
use App\Models\Generalidades;
use App\Models\ValoracionesGrupos;
use App\Models\Relevantes;
use App\Models\Actividades;
use App\Models\Servicios;
use App\Models\Promocion;
use App\Models\ServiciosEspeciales;
use App\Models\Redes;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GruposEspeciales>
 */
class GruposEspecialesFactory extends Factory
{
    protected $model = GruposEspeciales::class;
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
                'ID_VALORACION_GRUPOS' => ValoracionesGrupos::factory(),
                'ID_RELEVANTE' => Relevantes::factory(),
                'ID_ACTIVIDAD' => Actividades::factory(),
                'ID_SERVICIO' => Servicios::factory(),
                'ID_PROMOCION' => Promocion::factory(),
                'ID_SERVICIO_ESPECIAL' => ServiciosEspeciales::factory(),
                'ID_RED_SOCIAL' => Redes::factory(),
                'REF_BIBLIOGRAFICA' => $this->faker->text($maxNbChars = 50),
                'OBSERVACIONES' => $this->faker->text($maxNbChars = 50),
                'APRO_INTERNACIONAL' => $this->faker->randomElement([0,1])
            ];
        });
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'REF_BIBLIOGRAFICA' => $this->faker->text($maxNbChars = 50),
                'OBSERVACIONES' => $this->faker->text($maxNbChars = 50),
                'APRO_INTERNACIONAL' => $this->faker->randomElement(['true','false'])
            ];
        });
    }

    public function configure()
    {
        return $this->afterCreating(function (GruposEspeciales $recurso) {
            Historial_Insert_Delete::factory()->create([
                'TABLA_MOVIMIENTO' => 'Grupos de Especial Interés',
                'ID_REGISTRO_MOVIMIENTO' => $recurso->ID_GRUPOS,
                'TIPO_MOVIMIENTO' => isset($recurso->ID_GENERALIDAD) ? '2' : '1'
            ]);
        });
    }
}
