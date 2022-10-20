<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiciosEspeciales;
use App\Http\Controllers\HistorialController;

class ServiciosEspecialesController extends Controller
{
    /*Variable que define las reglas para los servicios especiales del recurso turistico */
    public static $rules = [
        'ASCENSORES' => 'max:300',
        'RAMPAS' => 'max:300',
        'DISCAP_AUDITIVA' => 'max:300',
        'BANOS2' => 'max:300',
        'MOVILIDAD' => 'max:300',
        'OTROS3' => 'max:300',
    ];

    /*Metodo para crear un nuevo registro en la tabla de servicios especiales */
    public static function create($clientData)
    {
        $especial = new ServiciosEspeciales();
        $especial->ASCENSORES = $clientData->ASCENSORES;
        $especial->RAMPAS = $clientData->RAMPAS;
        $especial->DISCAP_AUDITIVA = $clientData->DISCAP_AUDITIVA;
        $especial->BANOS = $clientData->BANOS2;
        $especial->MOVILIDAD = $clientData->MOVILIDAD;
        $especial->OTROS = $clientData->OTROS3;
        $especial->save();
        return $especial->ID_SERVICIO_ESPECIAL;
    }

    /*Metodo para actualizar un registro de la tabla de servicios especiales */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = ServiciosEspeciales::find($queryUpdate->ID_SERVICIO_ESPECIAL);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = "";
            switch ($key) {
                case 'OTROS3':
                    $valueUpdate = 'OTROS';
                break;
                case 'BANOS2':
                    $valueUpdate = 'BANOS';
                break;
                default:
                    $valueUpdate = $key;
                break;
            }
            if($queryData[$valueUpdate] == $clientData[$key]) continue;
            HistorialController::createUpdate($idUsuario,'servicios_especiales',$queryUpdate->ID_LISTADO,$queryData->ID_SERVICIO_ESPECIAL,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
            $queryData[$valueUpdate] = $clientData[$key];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de servicios especiales */
    public static function getRecord($idEspecial)
    {
        $queryData = ServiciosEspeciales::find($idEspecial)->toArray();
        return ["SERVICIOS_ESPECIALES"=>$queryData];
    }
}
