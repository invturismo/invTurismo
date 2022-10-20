<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rules\ValidateTarifa;
use App\Models\Tarifas;
use App\Http\Controllers\HistorialController;

class TarifasController extends Controller
{
    /*Metodo que retorna las reglas para las tarifas del recurso turistico */
    public static function rules()
    {
        return [
            'NINOS' => [new ValidateTarifa()],
            'ADULTOS' => [new ValidateTarifa()],
            'ADULTO_MAYOR' => [new ValidateTarifa()],
            'EXTRANJEROS' => [new ValidateTarifa()],
            'ESTUDIANTES' => [new ValidateTarifa()],
            'CITA_PREVIA' => [new ValidateTarifa()],
            'GENERAL' => [new ValidateTarifa()],
        ];
    }

    /*Metodo para crear un nuevo registro en la tabla de tarifas */
    public static function create($clientData)
    {
        $tarifa = new Tarifas();
        $tarifa->NINOS = $clientData->NINOS;
        $tarifa->ADULTOS = $clientData->ADULTOS;
        $tarifa->ADULTO_MAYOR = $clientData->ADULTO_MAYOR;
        $tarifa->EXTRANJEROS = $clientData->EXTRANJEROS;
        $tarifa->ESTUDIANTES = $clientData->ESTUDIANTES;
        $tarifa->CITA_PREVIA = $clientData->CITA_PREVIA;
        $tarifa->GENERAL = $clientData->GENERAL;
        $tarifa->save();
        return $tarifa->ID_TARIFA;
    }

    /*Metodo para actualizar un registro de la tabla de tarifas */
    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {
        $queryData = Tarifas::find($queryUpdate->ID_TARIFA);
        foreach (self::rules() as $key => $value) {
            if($queryData[$key] == $clientData[$key]) continue;
            HistorialController::createUpdate($idUsuario,'tarifas',$idListado,$queryData->ID_TARIFA,$key,$queryData[$key],$clientData[$key]);
            $queryData[$key] = $clientData[$key];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de tarifas */
    public static function getRecord($idTarifa)
    {
        $queryData = Tarifas::find($idTarifa)->toArray();
        return ["TARIFAS"=>$queryData];
    }
}
