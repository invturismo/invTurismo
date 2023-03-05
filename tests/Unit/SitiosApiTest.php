<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Helpers\HelpToken;
use Tests\Helpers\HelpDataRecursos;
use App\Models\ListadosPreliminares;
use App\Models\ValoracionesSitios;
use App\Models\CalidadSitios;
use App\Models\SitiosNaturales;
use App\Models\Codigos;

class SitiosApiTest extends TestCase
{
    /*Metodo que retorna los datos necesarios para crear o actualizar algun sitio natural */
    private function sendData($idSitio)
    {
        $dataCalidad = CalidadSitios::factory()->make()->toArray();
        $dataPuntaje = HelpDataRecursos::puntajeData(new ValoracionesSitios(),$dataCalidad);
        $otherData = SitiosNaturales::factory()->withMake()->make([
            'ID_SITIO' => $idSitio
        ])->toArray();
        return [$dataPuntaje,$otherData];
    }

    /*Metodo para testear el completar los datos necesarios de los sitios naturales */
    public function test_completar_recurso_sitios_naturales()
    {
        $listado = ListadosPreliminares::factory()->create(['ID_TIPO_BIEN' => 5]);
        $sitios = HelpDataRecursos::factoryClasificacion(5,['ID_LISTADO' => $listado->ID_LISTADO]);
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($sitios->ID_SITIO)
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/sitios-naturales/insertForm',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]);        
    }

    /*Metodo para testear la actualizacion de los datos necesarios para los sitios naturales */
    public function test_actualizar_recurso_sitios_naturales()
    {
        $listado = ListadosPreliminares::factory()->create([
            'ID_TIPO_BIEN' => 5,
            'ID_CODIGO' => Codigos::factory()->otherCodes()->create()->ID_CODIGO,
        ]);
        $idCaracteristica = HelpDataRecursos::caracteristicasData();
        $dataSitios = SitiosNaturales::factory()->classified()->create([
            'ID_LISTADO' => $listado->ID_LISTADO,
            'ID_CARACTERISTICA' => $idCaracteristica,
        ])->toArray();
        HelpDataRecursos::dataFecha($dataSitios['ID_SITIO'],'Sitios Naturales');
        $dataSend = HelpDataRecursos::dataSend(
            $listado->toArray(),...$this->sendData($dataSitios['ID_SITIO'])
        );
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/sitios-naturales/update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
