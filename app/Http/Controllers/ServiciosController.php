<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicios;
use App\Http\Controllers\HistorialController;

class ServiciosController extends Controller
{
    /*Variable que define las reglas para los servicios del recurso turistico */
    public static $rules = [
        'TIENDAS' => 'max:300',
        'GUIAS' => 'max:300',
        'BANOS' => 'max:300',
        'RESTAURANTES' => 'max:300',
        'PARQUEADERO' => 'max:300',
        'ALOJAMIENTO' => 'max:300',
        'OTROS1' => 'max:300',
    ];

    /*Metodo para crear un nuevo registro en la tabla de servicios */
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

    /*Metodo para actualizar un registro de la tabla de servicios */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Servicios::find($queryUpdate->ID_SERVICIO);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'OTROS1' ? "OTROS" : $key;
            if($queryData[$valueUpdate] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'servicios',
                $queryUpdate->ID_LISTADO,
                $queryData->ID_SERVICIO,
                $valueUpdate,
                $queryData[$valueUpdate],
                $clientData[$key]
            );
            $queryData[$valueUpdate] = $clientData[$key];
            $queryData->save();
        }
    }
    
    /*Metodo para consultar un registro especifico de la tabla de servicios */
    public static function getRecord($idServicio)
    {
        $queryData = Servicios::find($idServicio)->toArray();
        return ["SERVICIOS"=>$queryData];
    }
}
