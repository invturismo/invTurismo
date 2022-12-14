<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;

class ClasificadoApiTest extends TestCase
{
    /*Metodo para generar un numero aleatorio */
    private function randomNumber($idBien)
    {
        $randomId = rand(1, 5);
        if(!$idBien) return $randomId;
        while($randomId == $idBien){
            $randomId = rand(1, 5);
        }
        return $randomId;
    }

    /*Metodo que retorna los datos necesarios para clasificar o actulizar una
    clasificacion de algun recurso turistico */
    private function dataSend($idListado,$idBien = false)
    {
        return [
            'ID_LISTADO' => $idListado,
            'ID_TIPO_BIEN'=> $this->randomNumber($idBien),
        ];
    }

    /*Metodo para testear la clasificacion de un recurso turistico */
    public function test_clasificar_recurso()
    {
        $listado = ListadosPreliminares::factory()->create();
        $dataCreate = $this->dataSend($listado->ID_LISTADO);
        $response = $this->withHeaders(HelpToken::headers())
        ->put('/api/clasificacion-recursos-atractivos/create',$dataCreate);
        $response->assertOk()
        ->assertJson(['state'=>true]);
    }

    /*Metodo para testear la actualizacion de la clasificacion de un recurso turistico */
    public function test_actulizar_clasificacion()
    {
        $idRandom = rand(1,5);
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => $idRandom]);
        HelpDataRecursos::factoryClasificacion($idRandom,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataCreate = $this->dataSend($listado->ID_LISTADO,$idRandom);
        $response = $this->withHeaders(HelpToken::headers())
        ->put('/api/clasificacion-recursos-atractivos/create',$dataCreate);
        $response->assertOk()
        ->assertJson(['state'=>true]);
    }
}
