<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Generalidades;
use App\Models\Admin;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Generalidades>
 */
class GeneralidadesFactory extends Factory
{
    protected $model = Generalidades::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_ADMIN' => Admin::factory(),
            'ID_TIPO_ACCESO' => rand(1,3),
            'CORREGIMIENTO_VEREDA_LOCALIDAD' => $this->faker->state,
            'GEORREFERENCIACION' => $this->faker->localIpv4,
            'INDICACIONES_ACCESO' => $this->faker->text($maxNbChars = 100)
        ];
    }

    public function withoutAdmin()
    {
        return $this->state(function (array $attributes) {
            return [
                'ID_ADMIN' => null,
            ];
        });
    }
}
