<?php

namespace App\Helpers;

use App\Helpers\HelperValidator;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UpdateController;
use App\Models\ListadosPreliminares;
use App\Http\Controllers\HistorialController;
use App\Helpers\HelperLogs;

class HelperDelete 
{
  /* Metodo que centraliza la opcion de eliminar algun registro segun su clasifiacion */
  public static function delete($request,$id,$queryData,$table)
  {
    try {
      $rules = ["REGISTRO" => 'required|numeric'];
      $isValid = HelperValidator::Validate($rules,$request);
      if($isValid != 1) return $isValid;
      $ID_USUARIO = Auth::user()->ID_USUARIO;
      $queryData = $queryData->where('EXIST','=',true)
      ->where("$id",'=',$request->REGISTRO)->first();
      if(!isset($queryData)) return [
        'state' => false,
        'message' => "El registro no existe o no se puede eliminar"
      ];
      $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
      $response = UpdateController::stateUpdate($queryData->ID_LISTADO,1,$idTokenUser,true);
      if($response['state']==0) throw new Error($response['message']);
      if($response['state']==1) return [
        'state' => false,
        'message' => "El registro se esta actualizando"
      ];
      $listadoPreliminar = ListadosPreliminares::find($queryData->ID_LISTADO);              
      $listadoPreliminar->EXIST = false;
      $listadoPreliminar->save();
      $queryData->EXIST = false;
      $queryData->save();
      HistorialController::createInsertDelete(
        $ID_USUARIO,
        'listados_preliminares',
        $listadoPreliminar->ID_LISTADO,0
      );
      HistorialController::createInsertDelete(
        $ID_USUARIO,
        $table,
        $request->REGISTRO,0
      );
      return [
        "state" => true
      ];
    } catch (\Throwable $th) {
      return HelperLogs::Log($th);
    }
  }
}