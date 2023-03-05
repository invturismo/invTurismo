<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Promocion;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promocion>
 */
class PromocionFactory extends Factory
{
    protected $model = Promocion::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'FOLLETOS_GUIAS' => $this->faker->text($maxNbChars = 50),
            'PUBLICACIONES' => $this->faker->text($maxNbChars = 50),
            'TRIPADVISOR' => $this->faker->text($maxNbChars = 50),
            'CTRAVEL' => $this->faker->text($maxNbChars = 50),
            'GOOGLEM' => $this->faker->text($maxNbChars = 50),
            'PAGINA_WEB' => $this->faker->text($maxNbChars = 50),
            'YOUTUBE' => $this->faker->text($maxNbChars = 50),
            'OTROS' => $this->faker->text($maxNbChars = 50)
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'OTROS' => null,
                'OTROS2' => $attributes['OTROS']
            ];
        });
    }
}
