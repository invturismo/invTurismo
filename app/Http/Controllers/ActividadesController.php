<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actividades;
use App\Http\Controllers\HistorialController;

class ActividadesController extends Controller
{
    public static $rules = [
        'CULTURALES' => 'max:300',
        'ARTISTICAS' => 'max:300',
        'FISICAS' => 'max:300',
        'RECREATIVAS' => 'max:300',
        'OTROS' => 'max:300',
    ];

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

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Actividades::find($queryUpdate->ID_ACTIVIDAD);
        foreach (self::$rules as $key => $value) {
            if($queryData[$key] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'actividades',$queryData->ID_ACTIVIDAD,$key,$queryData[$key],$clientData[$key]);
                $queryData[$key] = $clientData[$key];
                $queryData->save();
            }
        }
    }

    public static function getRecord($idActividad)
    {
        $queryData = Actividades::find($idActividad)->toArray();
        return ["ACTIVIDADES"=>$queryData];
    }
}
