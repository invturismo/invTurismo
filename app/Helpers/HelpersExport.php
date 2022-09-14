<?php

namespace App\Helpers;

use App\Helpers\Joins;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;
use App\Models\Historial_Update;
use App\Models\Historial_Insert_Delete;

class HelpersExport 
{
  public static function WhoAtractivo($tipoBien,$idListado)
  {
      $id = "";
      switch ($tipoBien) {
        case 'Patrimonio Cultural Material':
          $query = PatrimoniosMateriales::select()->where("ID_LISTADO",$idListado)->first();
          $id = $query->ID_MATERIAL;
          break;
        case 'Patrimonio Cultural Inmaterial':
          $query = PatrimoniosInmateriales::select()->where("ID_LISTADO",$idListado)->first();
          $id = $query->ID_INMATERIAL;
          break;
        case 'Festividades y Eventos':
          $query = FestividadesEventos::select()->where("ID_LISTADO",$idListado)->first();
          $id = $query->ID_EVENTO;
          break;
        case 'Grupos de Especial Interés':
          $query = GruposEspeciales::select()->where("ID_LISTADO",$idListado)->first();
          $id = $query->ID_GRUPO;
          break;
        case 'Sitios Naturales':
          $query = SitiosNaturales::select()->where("ID_LISTADO",$idListado)->first();
          $id = $query->ID_SITIO;
          break;
    }
    return $id;
  }

  public static function JoinUsuarioFecha($query,$table,$nameKey)
  {
      $queryData = $query->join(
        'usuarios',
        "{$table}.ID_USUARIO",
        "=","usuarios.ID_USUARIO"
      )->select(
        "{$table}.{$nameKey}",
        'usuarios.PRIMER_NOMBRE',
        'usuarios.PRIMER_APELLIDO'
      );
      return $queryData;
  }

  public static function templateHistorial($tabla,$id,$movimiento,$idListado)
  {
      $queryHistorial = Historial_Insert_Delete::where(
        'historial_insert_delete.TABLA_MOVIMIENTO','=',$tabla
      )->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$id)
      ->where('historial_insert_delete.TIPO_MOVIMIENTO',"=",$movimiento);
      $queryHistorial = self::JoinUsuarioFecha(
        $queryHistorial,"historial_insert_delete","FECHA_MOVIMIENTO"
      )->first()->toArray();
      $queryUpdate = Historial_Update::where('historial_update.ID_LISTADO_MODIFICADO',"=",$idListado)
      ->orderBy("historial_update.FECHA_MODIFICACION","DESC");
      $queryUpdate = self::JoinUsuarioFecha(
        $queryUpdate,"historial_update","FECHA_MODIFICACION"
      )->first();
      $queryHistorial = [
        'FECHA_MOVIMIENTO'=> $queryHistorial['FECHA_MOVIMIENTO'],
        'USUARIO' => $queryHistorial['PRIMER_NOMBRE'].' '.$queryHistorial['PRIMER_APELLIDO'],
        'FECHA_MODIFICACION'=> isset($queryUpdate) ? $queryUpdate->FECHA_MODIFICACION : "",
        'USUARIO_AC' => isset($queryUpdate) ? $queryUpdate->PRIMER_NOMBRE.' '.$queryUpdate->PRIMER_APELLIDO : ""
      ];
      return $queryHistorial;
  }

  public static function historialClasificacion($value)
  {
    $id = self::WhoAtractivo($value['TIPO_BIEN'],$value['ID_LISTADO']);
    $queryHistorial = self::templateHistorial($value['TIPO_BIEN'],$id,1,$value['ID_LISTADO']);
    return $queryHistorial;
  }

  public static function templateQuery($query,$table,$id,$valoracion)
  {
    $queryData = $query->join(
      "listados_preliminares",
      "listados_preliminares.ID_LISTADO",
      "=","{$table}.ID_LISTADO"
    );
    $queryData = Joins::JoinGeneral($queryData)->join(
      "generalidades",
      "generalidades.ID_GENERALIDAD",
      "=","{$table}.ID_GENERALIDAD"
    )->select(
      "{$table}.{$id} as ID",
      "departamentos.DEPARTAMENTO",
      "municipios.MUNICIPIO",
      "listados_preliminares.NOMBRE",
      "listados_preliminares.ID_LISTADO",
      "{$valoracion}.TOTAL as CALIFICACION",
      "listados_preliminares.UBICACION",
      "generalidades.GEORREFERENCIACION"
    )->where("{$table}.EXIST","=",true)
    ->whereNotNull("codigos.id_tipo_patrimonio");
    return $queryData;
  }
}