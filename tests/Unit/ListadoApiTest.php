<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use App\Models\ListadosPreliminares;
use Faker\Factory;
use App\Models\Codigos;

class ListadoApiTest extends TestCase
{
    /*Metodo que retorna los datos necesarios para crear o actualizar un recurso turistico */
    private function dataSend($id = false)
    {
        $faker = Factory::create();
        $dataCodigos = Codigos::factory()->make();
        $templateData = [
            'ID_DEPARTAMENTOS'=> $dataCodigos->ID_DEPARTAMENTOS,
            'ID_MUNICIPIOS'=> $dataCodigos->ID_MUNICIPIOS,
            'NOMBRE'=> $faker->citySuffix." ".$faker->state,
            'UBICACION'=> $faker->streetAddress,
            'ID_FUENTE'=> rand(1, 7)
        ];
        if($id) $templateData['ID_LISTADO'] = $id;
        return $templateData;
    }

    /*Metodo que testea la creacion de un nuevo recurso turistico */
    public function test_crear_recurso()
    {
        $dataCreate = $this->dataSend();
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/listados-preliminares/create',$dataCreate);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }

    /*Metodo que testea la actualizacion un recurso turistico en listado preliminar */
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
