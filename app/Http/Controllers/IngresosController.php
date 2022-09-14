<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rules\ValidateBoolean;
use App\Models\Ingresos;
use App\Http\Controllers\HistorialController;

class IngresosController extends Controller
{
    public static function rules()
    {
        return [
            'LUNES' => [new ValidateBoolean()],
            'MARTES' => [new ValidateBoolean()],
            'MIERCOLES' => [new ValidateBoolean()],
            'JUEVES' => [new ValidateBoolean()],
            'VIERNES' => [new ValidateBoolean()],
            'SABADO' => [new ValidateBoolean()],
            'DOMINGO' => [new ValidateBoolean()],
            'HORAS' => 'max:300',
        ];
    }

    public static function create($clientData)
    {
        $ingreso = new Ingresos();
        $ingreso->LUNES = $clientData->LUNES == 'true';
        $ingreso->MARTES = $clientData->MARTES == 'true';
        $ingreso->MIERCOLES = $clientData->MIERCOLES == 'true';
        $ingreso->JUEVES = $clientData->JUEVES == 'true';
        $ingreso->VIERNES = $clientData->VIERNES == 'true';
        $ingreso->SABADO = $clientData->SABADO == 'true';
        $ingreso->DOMINGO = $clientData->DOMINGO == 'true';
        $ingreso->HORAS = $clientData->HORAS;
        $ingreso->save();
        return $ingreso->ID_INGRESO;
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {
        $queryData = Ingresos::find($queryUpdate->ID_INGRESO);
        foreach (self::rules() as $key => $value) {
            $data = $key == 'HORAS' ? $clientData[$key] : $clientData[$key] == 'true';
            if($queryData[$key] == $data) return;
            HistorialController::createUpdate(
                $idUsuario,
                'ingresos',
                $idListado,
                $queryUpdate->ID_INGRESO,
                $key,$queryData[$key],
                $data
            );
            $queryData[$key] = $data;
            $queryData->save();
        }
    }

    public static function getRecord($idIngreso)
    {
        $queryData = Ingresos::find($idIngreso)->toArray();
        return [
            "DIAS_HORARIOS" => $queryData
        ];
    }
}
