<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use App\Models\ListadosPreliminares;
use Faker\Factory;
use App\Models\Codigos;

class ListadoApiTest extends TestCase
{
    private function dataSend($id = false)
    {
        $faker = Factory::create();
        $dataCodigos = Codigos::factory()->make();
        $templateData = [
            'ID_DEPARTAMENTOS'=> $dataCodigos->ID_DEPARTAMENTOS,
            'ID_MUNICIPIOS'=> $dataCodigos->ID_MUNICIPIOS,
            'NOMBRE'=> $faker->text($maxNbChars = 10),
            'UBICACION'=> $faker->streetAddress,
            'ID_FUENTE'=> rand(1, 7)
        ];
        if($id) $templateData['ID_LISTADO'] = $id;
        return $templateData;
    }

    public function test_crear_recurso()
    {
        $dataCreate = $this->dataSend();
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/listados-preliminares/create',$dataCreate);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }

    public function test_actualizar_recurso_listado()
    {
        $listado = ListadosPreliminares::factory()->create();
        $dataUpdate = $this->dataSend($listado->ID_LISTADO);
        $response = $this->withHeaders(HelpToken::headers())
        ->put('/api/listados-preliminares/update',$dataUpdate);
        $response->assertOk()
        ->assertJson(['state'=>true]);
    }
}