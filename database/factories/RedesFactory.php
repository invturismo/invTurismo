<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Redes;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Redes>
 */
class RedesFactory extends Factory
{
    protected $model = Redes::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'PAGINA_WEB' => $this->faker->text($maxNbChars = 50),
            'FACEBOOK' => $this->faker->text($maxNbChars = 50),
            'TWITTER' => $this->faker->text($maxNbChars = 50),
            'INSTAGRAM' => $this->faker->text($maxNbChars = 50),
            'OTRA' => $this->faker->text($maxNbChars = 50)
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'PAGINA_WEB' => null,
                'PAGINA_WEB2' => $attributes['PAGINA_WEB']
            ];
        });
    }
}
