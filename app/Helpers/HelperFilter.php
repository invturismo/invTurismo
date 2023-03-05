<?php

namespace App\Helpers;

class HelperFilter 
{
  /*Metodo que permite centralizar el filtro que se realiza segun el departamento */
  public static function FilterDepartamento($request,$query)
  {
    $queryData = $query;
    if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where(
      "codigos.ID_DEPARTAMENTOS",
      "=",$request->ID_DEPARTAMENTOS
    );
    return $queryData;
  }

  /*Metodo que permite centralizar el filtro que se realiza segun el municipio */
  public static function FilterMunicipio($request,$query)
  {
    $queryData = $query;
    if($request->ID_MUNICIPIOS) $queryData = $queryData->where(
      "codigos.ID_MUNICIPIOS",
      "=",$request->ID_MUNICIPIOS
    );
    return $queryData;
  }

  /*Metodo que permite centralizar el filtro que se realiza para una busqueda del usuario, 
  segun el nombre del recurso turistico */
  public static function FilterFind($request,$query)
  {
    $queryData = $query;
    if($request->BUSCAR) $queryData = $queryData->where(
      "listados_preliminares.NOMBRE",
      "LIKE","%".$request->BUSCAR."%"
    );
    return $queryData;
  }

  /*Metodo que une los filtros de municipio y departamento*/
  public static function FilterAll($request,$query)
  {
    $queryData = self::FilterDepartamento($request,$query);
    $queryData = self::FilterMunicipio($request,$queryData);
    return $queryData;
  }
}