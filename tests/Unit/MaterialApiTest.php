<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;
use App\Models\ValoracionMaterial;
use App\Models\CalidadMaterial;
use App\Models\PatrimoniosMateriales;
use App\Models\Codigos;

class MaterialApiTest extends TestCase
{
    /*Metodo que retorna los datos necesarios para crear o actualizar algun patrimonio material */
    private function sendData($idMaterial)
    {
        $dataCalidad = CalidadMaterial::factory()->make()->toArray();
        $dataPuntaje = HelpDataRecursos::puntajeData(new ValoracionMaterial(),$dataCalidad);
        $otherData = PatrimoniosMateriales::factory()->withMake()->make([
            'ID_MATERIAL' => $idMaterial
        ])->toArray();
        return [$dataPuntaje,$otherData];
    }

    /*Metodo para testear el completar los datos necesarios de los patrimonios materiales */
    public function test_completar_recurso_patrimonio_material()
    {
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => 1]);
        $material = HelpDataRecursos::factoryClasificacion(1,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($material->ID_MATERIAL)
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/patrimonios-materiales/insertForm',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]);        
    }

    /*Metodo para testear la actualizacion de los datos necesarios para los patrimonios materiales */
    public function test_actualizar_recurso_patrimonio_material()
    {
        $listado = ListadosPreliminares::factory()->create([
            'ID_TIPO_BIEN' => 1,
            'ID_CODIGO' => Codigos::factory()->otherCodes()->create()->ID_CODIGO,
        ]);
        $idCaracteristica = HelpDataRecursos::caracteristicasData();
        $dataPatrimonio = PatrimoniosMateriales::factory()->classified()->create([
            'ID_LISTADO' => $listado->ID_LISTADO,
            'ID_CARACTERISTICA' => $idCaracteristica,
        ])->toArray();
        HelpDataRecursos::dataFecha($dataPatrimonio['ID_MATERIAL'],'Patrimonio Cultural Material');
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($dataPatrimonio['ID_MATERIAL'])
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/patrimonios-materiales/update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
