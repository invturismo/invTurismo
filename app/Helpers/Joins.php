<?php

namespace App\Helpers;

class Joins 
{
  public static function JoinCodigo($query)
  {
    return $query->join(
      "codigos",
      "codigos.ID_CODIGO",
      "=","listados_preliminares.ID_CODIGO"
    );
  }

  public static function JoinMunicipio($query)
  {
    $sendFunction = function ($join) {
      $join->on(function($queryF){
          $queryF->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
          ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
      });
    };
    return $query->join(
      'municipios',
      $sendFunction
    );
  }

  public static function JoinDepartamento($query)
  {
    return $query->join(
      "departamentos",
      "municipios.ID_DEPARTAMENTOS",
      "=","departamentos.ID_DEPARTAMENTOS"
    );
  }

  public static function JoinGeneral($query)
  {
    $queryData = self::JoinCodigo($query);
    $queryData = self::JoinMunicipio($queryData);
    $queryData = self::JoinDepartamento($queryData);
    return $queryData;
  }
}
