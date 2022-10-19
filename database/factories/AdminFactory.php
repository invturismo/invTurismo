<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Admin;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    protected $model = Admin::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'NOMBRE' => $this->faker->name(),
            'DIRECCION_UBICACION' => $this->faker->streetAddress,
            'CORREO' => $this->faker->email,
            'TELEFONO1' => $this->faker->ean8,
            'TELEFONO2' => $this->faker->ean8,
        ];
    }

    public function withMake()
    {
        return $this->state(function (array $attributes) {
            return [
                'NOMBRE' => null,
                'NOMBRE_ADMIN' => $attributes['NOMBRE']
            ];
        });
    }
}
