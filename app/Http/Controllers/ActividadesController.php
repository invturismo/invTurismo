<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actividades;
use App\Http\Controllers\HistorialController;

class ActividadesController extends Controller
{
    /*Variable que define las reglas para las actividades del recurso turistico */
    public static $rules = [
        'CULTURALES' => 'max:300',
        'ARTISTICAS' => 'max:300',
        'FISICAS' => 'max:300',
        'RECREATIVAS' => 'max:300',
        'OTROS' => 'max:300',
    ];

    /*Metodo para crear un nuevo registro en la tabla de actividades */
    public static function create($clientData)
    {
        $actividad = new Actividades();
        $actividad->CULTURALES = $clientData->CULTURALES;
        $actividad->ARTISTICAS = $clientData->ARTISTICAS;
        $actividad->FISICAS = $clientData->FISICAS;
        $actividad->RECREATIVAS = $clientData->RECREATIVAS;
        $actividad->OTROS = $clientData->OTROS;
        $actividad->save();
        return $actividad->ID_ACTIVIDAD;
    }

    /*Metodo para actualizar un registro de la tabla de actividades */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Actividades::find($queryUpdate->ID_ACTIVIDAD);
        foreach (self::$rules as $key => $value) {
            if($queryData[$key] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'actividades',
                $queryUpdate->ID_LISTADO,
                $queryData->ID_ACTIVIDAD,
                $key,$queryData[$key],
                $clientData[$key]
            );
            $queryData[$key] = $clientData[$key];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de actividades */
    public static function getRecord($idActividad)
    {
        $queryData = Actividades::find($idActividad)->toArray();
        return ["ACTIVIDADES"=>$queryData];
    }
}
