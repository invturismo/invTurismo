<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_TIPO_USUARIO' => '2',
            'PRIMER_NOMBRE' => $this->faker->firstName(),
            'SEGUNDO_NOMBRE' => $this->faker->firstName(),
            'PRIMER_APELLIDO' => $this->faker->firstName(),
            'SEGUNDO_APELLIDO' => $this->faker->firstName(),
            'USUARIO' => $this->faker->userName.$this->faker->buildingNumber,
            'CORREO' => $this->faker->email
        ];
    }
}
