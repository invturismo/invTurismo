<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Servicios;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Servicios>
 */
class ServiciosFactory extends Factory
{
    protected $model = Servicios::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'TIENDAS' => $this->faker->text($maxNbChars = 50),
            'GUIAS' => $this->faker->text($maxNbChars = 50),
            'BANOS' => $this->faker->text($maxNbChars = 50),
            'RESTAURANTES' => $this->faker->text($maxNbChars = 50),
            'PARQUEADERO' => $this->faker->text($maxNbChars = 50),
            'ALOJAMIENTO' => $this->faker->text($maxNbChars = 50),
            'OTROS' => $this->faker->text($maxNbChars = 50)
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'OTROS' => null,
                'OTROS1' => $attributes['OTROS']
            ];
        });
    }
}
