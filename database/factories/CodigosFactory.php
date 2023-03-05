<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Codigos;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CodigosFactory extends Factory
{
    protected $model = Codigos::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $data = DB::table('municipios')->inRandomOrder()->first();
        return [
            'ID_MUNICIPIOS' => $data->ID_MUNICIPIOS,
            'ID_DEPARTAMENTOS' => $data->ID_DEPARTAMENTOS,
        ];
    }

    public function otherCodes()
    {
        return $this->state(function (array $attributes) {
            $arrayRandom = [[1,1,1,4],[1,5,1,1],[1,7,1,1],[2,10,1,1],[1,7,3,1]];
            $dataRandom = $this->faker->randomElement($arrayRandom);
            return [
                'ID_TIPO_PATRIMONIO' => $dataRandom[0],
                'ID_GRUPO' => $dataRandom[1],
                'ID_COMPONENTE' => $dataRandom[2],
                'ID_ELEMENTO' => $dataRandom[3],
            ];
        });
    }
}
