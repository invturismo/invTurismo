<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Models\Codigos;
use App\Http\Controllers\HistorialController;

class CodigosController extends Controller
{
    public static $rules = [
        'ID_DEPARTAMENTOS'=>'required|max:2',
        'ID_MUNICIPIOS'=>'required|max:3',
        'ID_ELEMENTO' => 'required|max:2',
        'ID_COMPONENTE' => 'required|max:2',
        'ID_GRUPO' => 'required|max:2',
        'ID_TIPO_PATRIMONIO' => 'required|max:1',
    ];

    public static function create($clientData,$idListado,$idUsuario)
    {
        $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->select("codigos.ID_CODIGO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS")
        ->where("listados_preliminares.ID_LISTADO","=",$idListado)->first();
        $codigos = Codigos::find($queryData->ID_CODIGO);
        if($queryData->ID_MUNICIPIOS != $clientData->ID_MUNICIPIOS){
            HistorialController::createUpdate($idUsuario,'codigos',$idListado,'ID_MUNICIPIOS',$queryData->ID_MUNICIPIOS,$clientData->ID_MUNICIPIOS);
            $codigos->ID_MUNICIPIOS = $clientData->ID_MUNICIPIOS;
            $codigos->save();
        }
        if($queryData->ID_DEPARTAMENTOS != $clientData->ID_DEPARTAMENTOS){
            HistorialController::createUpdate($idUsuario,'codigos',$idListado,'ID_DEPARTAMENTOS',$queryData->ID_DEPARTAMENTOS,$clientData->ID_DEPARTAMENTOS);            
            $codigos->ID_DEPARTAMENTOS = $clientData->ID_DEPARTAMENTOS;
            $codigos->save();
        }
        $codigos->ID_ELEMENTO = $clientData->ID_ELEMENTO;
        $codigos->ID_COMPONENTE = $clientData->ID_COMPONENTE;
        $codigos->ID_GRUPO = $clientData->ID_GRUPO;
        $codigos->ID_TIPO_PATRIMONIO = $clientData->ID_TIPO_PATRIMONIO;
        $codigos->save();
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryListado = ListadosPreliminares::find($queryUpdate->ID_LISTADO);
        $queryData = Codigos::find($queryListado->ID_CODIGO);
        foreach (self::$rules as $key => $value) {
            if($queryData[$key] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'codigos',$queryData->ID_CODIGO,$key,$queryData[$key],$clientData[$key]);
                $queryData[$key] = $clientData[$key];
                $queryData->save();
            }
        }
    }
}
