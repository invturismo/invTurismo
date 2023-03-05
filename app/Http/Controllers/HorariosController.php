<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\IngresosController;
use App\Rules\ValidateBoolean;
use App\Models\Horarios;
use App\Http\Controllers\HistorialController;

class HorariosController extends Controller
{
    /*Metodo que retorna las reglas para los horarios del recurso turistico */
    public static function rules() {
        return [
            'RESTRINGIDO' => [new ValidateBoolean()],
            'PERMANENTE' => [new ValidateBoolean()],
            'VISITA_EXTERIOR' => [new ValidateBoolean()],
            'VISITA_INTERIOR' => [new ValidateBoolean()],
        ];
    }

    /*Metodo que une todas las reglas necesarias para la tabla de horarios */
    public static function rulesHorarios()
    {
        $rulesIngresos = IngresosController::rules();
        return array_merge(self::rules(),$rulesIngresos);
    }

    /*Metodo para crear un nuevo registro en la tabla de horarios */
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

    /*Metodo para actualizar un registro de la tabla de horarios */
    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {
        $queryData = Horarios::find($queryUpdate->ID_HORARIO);
        IngresosController::update($clientData,$queryData,$idUsuario,$idListado);
        foreach (self::rules() as $key => $value) {
            $data = $clientData[$key] == 'true';
            if($queryData[$key] == $data) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'horarios',
                $idListado,
                $queryData->ID_HORARIO,
                $key,
                $queryData[$key],
                $data
            );
            $queryData[$key] = $data;
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de climas */
    public static function getRecord($idHorario)
    {
        $queryData = Horarios::find($idHorario)->toArray();
        $queryIngresos = IngresosController::getRecord($queryData['ID_INGRESO']);
        return array_merge(
            ["ACCESO_HORARIOS" => $queryData],
            $queryIngresos
        );
    }
}
