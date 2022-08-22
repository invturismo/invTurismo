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
        'OTROS1' => 'max:300',
    ];

    public static function create($clientData)
    {
        $actividad = new Actividades();
        $actividad->CULTURALES = $clientData->CULTURALES;
        $actividad->ARTISTICAS = $clientData->ARTISTICAS;
        $actividad->FISICAS = $clientData->FISICAS;
        $actividad->RECREATIVAS = $clientData->RECREATIVAS;
        $actividad->OTROS = $clientData->OTROS1;
        $actividad->save();
        return $actividad->ID_ACTIVIDAD;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Actividades::find($queryUpdate->ID_ACTIVIDAD);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'OTROS1' ? "OTROS" : $key;
            if($queryData[$valueUpdate] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'actividades',$queryData->ID_ACTIVIDAD,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
                $queryData[$valueUpdate] = $clientData[$key];
                $queryData->save();
            }
        }
    }
}
