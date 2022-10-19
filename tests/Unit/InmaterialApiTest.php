<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;
use App\Models\ValoracionInmaterial;
use App\Models\CalidadInmaterial;
use App\Models\PatrimoniosInmateriales;
use App\Models\Codigos;

class InmaterialApiTest extends TestCase
{
    private function sendData($idInmaterial)
    {
        $dataCalidad = CalidadInmaterial::factory()->make()->toArray();
        $dataPuntaje = HelpDataRecursos::puntajeData(new ValoracionInmaterial(),$dataCalidad);
        $otherData = PatrimoniosInmateriales::factory()->withMake()->make([
            'ID_INMATERIAL' => $idInmaterial
        ])->toArray();
        return [$dataPuntaje,$otherData];
    }

    public function test_completar_recurso_patrimonio_inmaterial()
    {
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => 2]);
        $material = HelpDataRecursos::factoryClasificacion(2,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($material->ID_INMATERIAL)
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/patrimonios-inmateriales/insertForm',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]);
    }

    public function test_actualizar_recurso_patrimonio_material()
    {
        $listado = ListadosPreliminares::factory()->create([
            'ID_TIPO_BIEN' => 2,
            'ID_CODIGO' => Codigos::factory()->otherCodes()->create()->ID_CODIGO,
        ]);
        $idCaracteristica = HelpDataRecursos::caracteristicasData();
        $dataPatrimonio = PatrimoniosInmateriales::factory()->classified()->create([
            'ID_LISTADO' => $listado->ID_LISTADO,
            'ID_CARACTERISTICA' => $idCaracteristica,
        ])->toArray();
        HelpDataRecursos::dataFecha($dataPatrimonio['ID_INMATERIAL'],'Patrimonio Cultural Inmaterial');
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($dataPatrimonio['ID_INMATERIAL'])
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/patrimonios-inmateriales/update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
