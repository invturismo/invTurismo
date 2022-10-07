<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ServiciosEspeciales;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiciosEspeciales>
 */
class ServiciosEspecialesFactory extends Factory
{
    protected $model = ServiciosEspeciales::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ASCENSORES' => $this->faker->text($maxNbChars = 50),
            'RAMPAS' => $this->faker->text($maxNbChars = 50),
            'DISCAP_AUDITIVA' => $this->faker->text($maxNbChars = 50),
            'BANOS' => $this->faker->text($maxNbChars = 50),
            'MOVILIDAD' => $this->faker->text($maxNbChars = 50),
            'OTROS' => $this->faker->text($maxNbChars = 50),
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'OTROS' => null,
                'BANOS' => null,
                'OTROS3' => $attributes['OTROS'],
                'BANOS2' => $attributes['BANOS'],
            ];
        });
    }
}
