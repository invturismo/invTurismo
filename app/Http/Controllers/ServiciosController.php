<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicios;
use App\Http\Controllers\HistorialController;

class ServiciosController extends Controller
{
    public static $rules = [
        'TIENDAS' => 'max:300',
        'GUIAS' => 'max:300',
        'BANOS' => 'max:300',
        'RESTAURANTES' => 'max:300',
        'PARQUEADERO' => 'max:300',
        'ALOJAMIENTO' => 'max:300',
        'OTROS1' => 'max:300',
    ];

    public static function create($clientData)
    {
        $servicio = new Servicios();
        $servicio->TIENDAS = $clientData->TIENDAS;
        $servicio->GUIAS = $clientData->GUIAS;
        $servicio->BANOS = $clientData->BANOS;
        $servicio->RESTAURANTES = $clientData->RESTAURANTES;
        $servicio->PARQUEADERO = $clientData->PARQUEADERO;
        $servicio->ALOJAMIENTO = $clientData->ALOJAMIENTO;
        $servicio->OTROS = $clientData->OTROS1;
        $servicio->save();
        return $servicio->ID_SERVICIO;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Servicios::find($queryUpdate->ID_SERVICIO);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'OTROS1' ? "OTROS" : $key;
            if($queryData[$valueUpdate] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'servicios',$queryData->ID_SERVICIO,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
                $queryData[$valueUpdate] = $clientData[$key];
                $queryData->save();
            }
        }
    }
}
