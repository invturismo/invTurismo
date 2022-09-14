<?php

namespace App\Helpers;

class HelperFilter 
{
  public static function FilterDepartamento($request,$query)
  {
    $queryData = $query;
    if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where(
      "codigos.ID_DEPARTAMENTOS",
      "=",$request->ID_DEPARTAMENTOS
    );
    return $queryData;
  }

  public static function FilterMunicipio($request,$query)
  {
    $queryData = $query;
    if($request->ID_MUNICIPIOS) $queryData = $queryData->where(
      "codigos.ID_MUNICIPIOS",
      "=",$request->ID_MUNICIPIOS
    );
    return $queryData;
  }

  public static function FilterFind($request,$query)
  {
    $queryData = $query;
    if($request->BUSCAR) $queryData = $queryData->where(
      "listados_preliminares.NOMBRE",
      "LIKE","%".$request->BUSCAR."%"
    );
    return $queryData;
  }

  public static function FilterAll($request,$query)
  {
    $queryData = self::FilterDepartamento($request,$query);
    $queryData = self::FilterMunicipio($request,$queryData);
    return $queryData;
  }
}