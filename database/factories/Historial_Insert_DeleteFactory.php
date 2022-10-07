<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Historial_Insert_Delete;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Historial_Insert_Delete>
 */
class Historial_Insert_DeleteFactory extends Factory
{
    protected $model = Historial_Insert_Delete::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_USUARIO' => '1',
        ];
    }
}
