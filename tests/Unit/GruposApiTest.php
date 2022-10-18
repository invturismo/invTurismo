<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;
use App\Models\ValoracionesGrupos;
use App\Models\GruposEspeciales;
use App\Models\Codigos;

class GruposApiTest extends TestCase
{
    private function sendData($idGrupo)
    {
        $dataPuntaje = ValoracionesGrupos::factory()->make()->toArray();
        $otherData = GruposEspeciales::factory()->withMake()->make([
            'ID_GRUPOS' => $idGrupo
        ])->toArray();
        return [$dataPuntaje,$otherData];
    }

    public function test_completar_recurso_grupos_especiales()
    {
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => 4]);
        $grupo = HelpDataRecursos::factoryClasificacion(4,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($grupo->ID_GRUPOS)
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/grupos-especiales/insertForm',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]);        
    }

    public function test_actualizar_recurso_grupos_especiales()
    {
        $listado = ListadosPreliminares::factory()->create([
            'ID_TIPO_BIEN' => 4,
            'ID_CODIGO' => Codigos::factory()->otherCodes()->create()->ID_CODIGO,
        ]);
        $idCaracteristica = HelpDataRecursos::caracteristicasData();
        $dataGrupo = GruposEspeciales::factory()->classified()->create([
            'ID_LISTADO' => $listado->ID_LISTADO,
            'ID_CARACTERISTICA' => $idCaracteristica,
        ])->toArray();
        HelpDataRecursos::dataFecha($dataGrupo['ID_GRUPOS'],'Grupos de Especial Interés');
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($dataGrupo['ID_GRUPOS'])
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/grupos-especiales/update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
