<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SitiosNaturales;
use App\Models\Historial_Insert_Delete;
use App\Models\Generalidades;
use App\Models\ValoracionesSitios;
use App\Models\Relevantes;
use App\Models\Actividades;
use App\Models\Servicios;
use App\Models\Promocion;
use App\Models\ServiciosEspeciales;
use App\Models\Redes;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SitiosNaturales>
 */
class SitiosNaturalesFactory extends Factory
{
    protected $model = SitiosNaturales::class;
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
                'ID_VALORACION_SITIO' => ValoracionesSitios::factory(),
                'ID_RELEVANTE' => Relevantes::factory(),
                'ID_ACTIVIDAD' => Actividades::factory(),
                'ID_SERVICIO' => Servicios::factory(),
                'ID_PROMOCION' => Promocion::factory(),
                'ID_SERVICIO_ESPECIAL' => ServiciosEspeciales::factory(),
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
        return $this->afterCreating(function (SitiosNaturales $recurso) {
            Historial_Insert_Delete::factory()->create([
                'TABLA_MOVIMIENTO' => 'Sitios Naturales',
                'ID_REGISTRO_MOVIMIENTO' => $recurso->ID_SITIO,
                'TIPO_MOVIMIENTO' => isset($recurso->ID_GENERALIDAD) ? '2' : '1'
            ]);
        });
    }
}
