<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;
use App\Models\ValoracionesFestividades;
use App\Models\CalidadFestividades;
use App\Models\FestividadesEventos;
use App\Models\Codigos;

class EventosApiTest extends TestCase
{
    private function sendData($idEvento)
    {
        $dataCalidad = CalidadFestividades::factory()->make()->toArray();
        $dataPuntaje = HelpDataRecursos::puntajeData(new ValoracionesFestividades(),$dataCalidad);
        $otherData = FestividadesEventos::factory()->withMake()->make([
            'ID_EVENTO' => $idEvento
        ])->toArray();
        return [$dataPuntaje,$otherData];
    }

    public function test_completar_recurso_festividades_eventos()
    {
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => 3]);
        $evento = HelpDataRecursos::factoryClasificacion(3,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($evento->ID_EVENTO)
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/festividades-eventos/insertForm',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]);        
    }

    public function test_actualizar_recurso_festividades_eventos()
    {
        $listado = ListadosPreliminares::factory()->create([
            'ID_TIPO_BIEN' => 3,
            'ID_CODIGO' => Codigos::factory()->otherCodes()->create()->ID_CODIGO,
        ]);
        $idCaracteristica = HelpDataRecursos::caracteristicasData();
        $dataEvento = FestividadesEventos::factory()->classified()->create([
            'ID_LISTADO' => $listado->ID_LISTADO,
            'ID_CARACTERISTICA' => $idCaracteristica,
        ])->toArray();
        HelpDataRecursos::dataFecha($dataEvento['ID_EVENTO'],'Festividades y Eventos');
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($dataEvento['ID_EVENTO'])
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/festividades-eventos/update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
