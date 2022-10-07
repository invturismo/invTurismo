<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Actividades;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Actividades>
 */
class ActividadesFactory extends Factory
{
    protected $model = Actividades::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'CULTURALES' => $this->faker->text($maxNbChars = 50),
            'ARTISTICAS' => $this->faker->text($maxNbChars = 50),
            'FISICAS' => $this->faker->text($maxNbChars = 50),
            'RECREATIVAS' => $this->faker->text($maxNbChars = 50),
            'OTROS' => $this->faker->text($maxNbChars = 50)
        ];
    }
}
