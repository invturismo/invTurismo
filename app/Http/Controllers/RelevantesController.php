<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ClimaController;
use App\Http\Controllers\HorariosController;
use App\Http\Controllers\TarifasController;
use App\Models\Relevantes;
use App\Http\Controllers\HistorialController;
use App\Rules\ValidateNumber;

class RelevantesController extends Controller
{
    public static function rules()
    {
        return [
            'ID_ESTADO' => [new ValidateNumber(),'max:1']
        ];
    }

    public static function rulesRelevantes()
    {
        $merge = [
            ClimaController::rules(),
            HorariosController::rulesHorarios(),
            TarifasController::rules(),
        ];
        return array_merge(self::rules(),...$merge);
    }

    public static function create($clientData)
    {
        $idClima = ClimaController::create($clientData);
        $idHorario = HorariosController::create($clientData);
        $idTarifa = TarifasController::create($clientData);
        $relevante = new Relevantes();
        $relevante->ID_CLIMA = $idClima;
        $relevante->ID_HORARIO = $idHorario;
        $relevante->ID_TARIFA = $idTarifa;
        $relevante->ID_ESTADO = $clientData->ID_ESTADO;
        $relevante->save();
        return $relevante->ID_RELEVANTE;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Relevantes::find($queryUpdate->ID_RELEVANTE);
        ClimaController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        HorariosController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        TarifasController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        if($queryData['ID_ESTADO'] == $clientData['ID_ESTADO']) return;
        HistorialController::createUpdate(
            $idUsuario,
            'caracteristicas_relevantes',
            $queryUpdate->ID_LISTADO,
            $queryData->ID_RELEVANTE,
            'ID_ESTADO',
            $queryData['ID_ESTADO'],
            $clientData['ID_ESTADO']
        );
        $queryData['ID_ESTADO'] = $clientData['ID_ESTADO'];
        $queryData->save();
    }

    public static function getRecord($idRelevantes)
    {
        $queryData = Relevantes::find($idRelevantes)->toArray();
        $queryClima = ClimaController::getRecord($queryData['ID_CLIMA']);
        $queryHorarios = HorariosController::getRecord($queryData['ID_HORARIO']);
        $queryTarifas = TarifasController::getRecord($queryData['ID_TARIFA']);
        return [
            "CARACTERISTICAS_RELEVANTES" => array_merge(
                $queryData,
                $queryClima,
                $queryHorarios,
                $queryTarifas
            )
        ];
    }
}
