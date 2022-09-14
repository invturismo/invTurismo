<?php

namespace App\Helpers;

class Joins 
{
  public static function JoinCodigo($query)
  {
    $queryData = $query->join(
      "codigos",
      "codigos.ID_CODIGO",
      "=","listados_preliminares.ID_CODIGO"
    );
    return $queryData;
  }

  public static function JoinMunicipio($query)
  {
    $sendFunction = function ($join) {
      $join->on(function($queryF){
          $queryF->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
          ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
      });
    };
    $queryData = $query->join(
      'municipios',
      $sendFunction
    );
    return $queryData;
  }

  public static function JoinDepartamento($query)
  {
    $queryData = $query->join(
      "departamentos",
      "municipios.ID_DEPARTAMENTOS",
      "=","departamentos.ID_DEPARTAMENTOS"
    );
    return $queryData;
  }

  public static function JoinGeneral($query)
  {
    $queryData = self::JoinCodigo($query);
    $queryData = self::JoinMunicipio($queryData);
    $queryData = self::JoinDepartamento($queryData);
    return $queryData;
  }
}
