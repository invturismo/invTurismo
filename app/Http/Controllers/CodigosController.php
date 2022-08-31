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

    public static function findRecord($idListado)
    {
        $queryListado = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->select("codigos.*")
        ->where("listados_preliminares.ID_LISTADO","=",$idListado)->first();
        if(!isset($queryListado)) return "";
        $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->where('codigos.ID_DEPARTAMENTOS',"=",$queryListado->ID_DEPARTAMENTOS)
        ->where('codigos.ID_MUNICIPIOS',"=",$queryListado->ID_MUNICIPIOS)
        ->where('codigos.ID_TIPO_PATRIMONIO',"=",$queryListado->ID_TIPO_PATRIMONIO)
        ->where('codigos.ID_GRUPO',"=",$queryListado->ID_GRUPO)
        ->where('codigos.ID_COMPONENTE',"=",$queryListado->ID_COMPONENTE)
        ->where('codigos.ID_ELEMENTO',"=",$queryListado->ID_ELEMENTO)
        ->select("codigos.*","listados_preliminares.NOMBRE")
        ->orderBy('listados_preliminares.NOMBRE','ASC')->get()->toArray();
        $joinData = "";
        foreach ($queryData as $key => $value) {
            if($queryListado->ID_CODIGO != $value['ID_CODIGO']) continue;
            $joinData = $value['ID_DEPARTAMENTOS'].".".$value['ID_MUNICIPIOS'].".".$value['ID_TIPO_PATRIMONIO'].".".$value['ID_GRUPO'].".".$value['ID_COMPONENTE'].".".$value['ID_ELEMENTO'].".".($key+1);
            if($queryListado->ID_CODIGO == $value['ID_CODIGO']) break;
        }
        return $joinData;
    }

    public static function consultListado($idListado)
    {
        $queryListado = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->select("codigos.*")
        ->where("listados_preliminares.ID_LISTADO","=",$idListado)->first();
        if(!isset($queryListado)) return false;
        $code = $queryListado->ID_DEPARTAMENTOS.".".$queryListado->ID_MUNICIPIOS.".".$queryListado->ID_TIPO_PATRIMONIO.".".$queryListado->ID_GRUPO.".".$queryListado->ID_COMPONENTE.".".$queryListado->ID_ELEMENTO;
        return [$code,$queryListado];
    }

    public static function findExport($queryListado)
    {
        $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->where('codigos.ID_DEPARTAMENTOS',"=",$queryListado->ID_DEPARTAMENTOS)
        ->where('codigos.ID_MUNICIPIOS',"=",$queryListado->ID_MUNICIPIOS)
        ->where('codigos.ID_TIPO_PATRIMONIO',"=",$queryListado->ID_TIPO_PATRIMONIO)
        ->where('codigos.ID_GRUPO',"=",$queryListado->ID_GRUPO)
        ->where('codigos.ID_COMPONENTE',"=",$queryListado->ID_COMPONENTE)
        ->where('codigos.ID_ELEMENTO',"=",$queryListado->ID_ELEMENTO)
        ->select("codigos.*","listados_preliminares.NOMBRE")
        ->orderBy('listados_preliminares.NOMBRE','ASC')->get()->toArray();
        $code = $queryListado->ID_DEPARTAMENTOS.".".$queryListado->ID_MUNICIPIOS.".".$queryListado->ID_TIPO_PATRIMONIO.".".$queryListado->ID_GRUPO.".".$queryListado->ID_COMPONENTE.".".$queryListado->ID_ELEMENTO;
        $finalArray = [];
        $finalArray[$code] = [];
        foreach ($queryData as $key => $value) {
            $joinData = $value['ID_DEPARTAMENTOS'].".".$value['ID_MUNICIPIOS'].".".$value['ID_TIPO_PATRIMONIO'].".".$value['ID_GRUPO'].".".$value['ID_COMPONENTE'].".".$value['ID_ELEMENTO'].".".($key+1);
            $finalArray[$code][$value['NOMBRE']] = $joinData;
        }
        return $finalArray;
    }

    public static function getData($dataSend)
    {
        foreach ($dataSend['data'] as $key => $value) {
            $codigo = self::findRecord($value['ID_LISTADO']);
            $dataSend['data'][$key]['CODIGO'] = $codigo;
        }
        return $dataSend;
    }

    public static function getRecord($idListado,$idCodigo)
    {
        $codigo = self::findRecord($idListado);
        $queryCodigo = Codigos::find($idCodigo)->toArray();
        return [
            "CODIGOS" => array_merge(["CODIGO" => $codigo],$queryCodigo)
        ];
    }

    public static function getExport($dataSend)
    {
        $consultArray = [];
        foreach ($dataSend as $key => $value) {
            $queryListado = self::consultListado($value['ID_LISTADO']);
            if(!$queryListado) continue;
            if(isset($consultArray[$queryListado[0]])) {
                $dataSend[$key]['CODIGO'] = $consultArray[$queryListado[0]][$dataSend[$key]['NOMBRE']];
            }else{
                $codeArray = self::findExport($queryListado[1]);
                $consultArray = array_merge($consultArray,$codeArray);
                $dataSend[$key]['CODIGO'] = $consultArray[$queryListado[0]][$dataSend[$key]['NOMBRE']];
            }            
        }
        return $dataSend;
    }
}
