<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Validator;
use App\Helpers\Joins;

class HelperQuerys
{
  /*Metodo que permite consultar los datos relevantes de los recursos turisticos ya clasificados, 
  dependiendo del tipo de bien */
  public static function queryPatrimonios($query,$table,$idKey,$selectArguments = [],$puntajeArguments = [])
  {
    $queryData = $query->join(
      "listados_preliminares",
      "listados_preliminares.ID_LISTADO",
      "=","{$table}.ID_LISTADO"
    );
    $queryData = Joins::JoinGeneral($queryData)
    ->select(
      "{$table}.{$idKey} as ID",
      "listados_preliminares.NOMBRE",
      "listados_preliminares.UBICACION",
      "listados_preliminares.ID_LISTADO",
      "codigos.ID_MUNICIPIOS",
      "codigos.ID_DEPARTAMENTOS",
      ...$selectArguments
    )->where("{$table}.EXIST","=",true);
    if(!empty($puntajeArguments)) $queryData = $queryData->join(
      "generalidades",
      "generalidades.ID_GENERALIDAD",
      "=","{$table}.ID_GENERALIDAD"
    )->join(
      "{$puntajeArguments[0]}",
      "{$puntajeArguments[0]}.{$puntajeArguments[1]}",
      "=","{$table}.{$puntajeArguments[1]}"
    );
    return $queryData;
  }

  /*Metodo que valida si el registro existe y retorna la informacion necesaria,
  dependiendo del tipo de bien  */
  public static function queryValidatePatrimonios($query,$table,$idKey,$request)
  {
    $queryData = $query->join(
      "listados_preliminares",
      "listados_preliminares.ID_LISTADO",
      "=","{$table}.ID_LISTADO"
    );
    $queryData = Joins::JoinCodigo($queryData)
    ->select("{$table}.*")
    ->where("{$table}.EXIST","=",true)
    ->whereNotNull("codigos.id_tipo_patrimonio")
    ->where("{$table}.{$idKey}","=",$request->REGISTRO)->first();
    return $queryData;
  }
}