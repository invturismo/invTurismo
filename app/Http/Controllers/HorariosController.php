<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\IngresosController;
use App\Rules\ValidateBoolean;
use App\Models\Horarios;
use App\Http\Controllers\HistorialController;

class HorariosController extends Controller
{
    public static function rules() {
        return $rules = [
            'RESTRINGIDO' => [new ValidateBoolean()],
            'PERMANENTE' => [new ValidateBoolean()],
            'VISITA_EXTERIOR' => [new ValidateBoolean()],
            'VISITA_INTERIOR' => [new ValidateBoolean()],
        ];
    }

    public static function rulesHorarios()
    {
        $rulesIngresos = IngresosController::rules();
        return array_merge(self::rules(),$rulesIngresos);
    }

    public static function create($clientData)
    {
        $idIngreso = IngresosController::create($clientData);
        $horario = new Horarios();
        $horario->ID_INGRESO = $idIngreso;
        $horario->RESTRINGIDO = $clientData->RESTRINGIDO == 'true';
        $horario->PERMANENTE = $clientData->PERMANENTE == 'true';
        $horario->VISITA_EXTERIOR = $clientData->VISITA_EXTERIOR == 'true';
        $horario->VISITA_INTERIOR = $clientData->VISITA_INTERIOR == 'true';
        $horario->save();
        return $horario->ID_HORARIO;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Horarios::find($queryUpdate->ID_HORARIO);
        IngresosController::update($clientData,$queryData,$idUsuario);
        foreach (self::rules() as $key => $value) {
            $data = $clientData[$key] == 'true';
            if($queryData[$key] != $data) {
                HistorialController::createUpdate($idUsuario,'horarios',$queryData->ID_HORARIO,$key,$queryData[$key],$data);
                $queryData[$key] = $data;
                $queryData->save();
            }
        }
    }
}
