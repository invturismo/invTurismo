<?php

namespace App\Helpers;

use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;

class HelperDataRecurso 
{
  /*Metodo para saber con cual atractivo se esta interactuando actualmete,
  crea un objeto del mismo y retorna datos relevantes para posterior uso*/
  public static function WhoAtractivo($tipoBien,$idListado)
  {
    switch ($tipoBien) {
      case 1:
        $query = new PatrimoniosMateriales();
        $id = $query->where("ID_LISTADO",$idListado)->first()->ID_MATERIAL;
        $otherData = [
          'table' => 'patrimonios_materiales',
          'idKey' => 'ID_MATERIAL',
          'selectArguments' => [
            "valoraciones_material.TOTAL as CALIFICACION",
            "generalidades.GEORREFERENCIACION"
          ],
          'puntajeArguments' => ["valoraciones_material","ID_VALORACION_MATERIAL"]
        ];
      break;
      case 2:
        $query = new PatrimoniosInmateriales();
        $id = $query->where("ID_LISTADO",$idListado)->first()->ID_INMATERIAL;
        $otherData = [
          'table' => 'patrimonios_inmateriales',
          'idKey' => 'ID_INMATERIAL',
          'selectArguments' => [
            "valoraciones_inmaterial.TOTAL as CALIFICACION",
            "generalidades.GEORREFERENCIACION"
          ],
          'puntajeArguments' => ["valoraciones_inmaterial","ID_VALORACION_INMATERIAL"]
        ];
      break;
      case 3:
        $query = new FestividadesEventos();
        $id = $query->where("ID_LISTADO",$idListado)->first()->ID_EVENTO;
        $otherData = [
          'table' => 'festividades_eventos',
          'idKey' => 'ID_EVENTO',
          'selectArguments' => [
            "valoraciones_festividad.TOTAL as CALIFICACION",
            "generalidades.GEORREFERENCIACION"
          ],
          'puntajeArguments' => ["valoraciones_festividad","ID_VALORACION_FESTIVIDAD"]
        ];
      break;
      case 4:
        $query = new GruposEspeciales();
        $id = $query->where("ID_LISTADO",$idListado)->first()->ID_GRUPOS;
        $otherData = [
          'table' => 'grupos_especiales',
          'idKey' => 'ID_GRUPOS',
          'selectArguments' => [
            "valoraciones_grupos.TOTAL as CALIFICACION",
            "generalidades.GEORREFERENCIACION"
          ],
          'puntajeArguments' => ["valoraciones_grupos","ID_VALORACION_GRUPOS"]
        ];
      break;
      case 5:
        $query = new SitiosNaturales();
        $id = $query->where("ID_LISTADO",$idListado)->first()->ID_SITIO;
        $otherData = [
          'table' => 'sitios_naturales',
          'idKey' => 'ID_SITIO',
          'selectArguments' => [
            "valoraciones_sitios.TOTAL as CALIFICACION",
            "generalidades.GEORREFERENCIACION"
          ],
          'puntajeArguments' => ["valoraciones_sitios","ID_VALORACION_SITIO"]
        ];
      break;
    }
    return [
      'id' => $id,
      'query' => $query,
      'otherData' => $otherData
    ];
  }
}