<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Climas;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Climas>
 */
class ClimasFactory extends Factory
{
    protected $model = Climas::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ID_TIPO_CLIMA' => rand(1,7),
            'TEMPERATURA' => rand(10,20)
        ];
    }
}
