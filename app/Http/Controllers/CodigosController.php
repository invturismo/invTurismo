<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Models\Codigos;
use App\Http\Controllers\HistorialController;
use App\Helpers\Joins;

class CodigosController extends Controller
{
    /*Variable que define las reglas para los codigos del recurso turistico */
    public static $rules = [
        'ID_DEPARTAMENTOS'=>'required|max:2',
        'ID_MUNICIPIOS'=>'required|max:3',
        'ID_ELEMENTO' => 'required|max:2',
        'ID_COMPONENTE' => 'required|max:2',
        'ID_GRUPO' => 'required|max:2',
        'ID_TIPO_PATRIMONIO' => 'required|max:1',
    ];

    /*Metodo para crear un nuevo registro en la tabla de codigos */
    public static function create($clientData,$idListado,$idUsuario)
    {
        $queryData = Joins::JoinCodigo(new ListadosPreliminares())->select(
            "codigos.ID_CODIGO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS"
        )->where("listados_preliminares.ID_LISTADO","=",$idListado)->first();
        $codigos = Codigos::find($queryData->ID_CODIGO);
        if($queryData->ID_DEPARTAMENTOS != $clientData->ID_DEPARTAMENTOS){
            HistorialController::createUpdate(
                $idUsuario,
                'codigos',
                $idListado,
                $idListado,
                'ID_DEPARTAMENTOS',
                $queryData->ID_DEPARTAMENTOS,
                $clientData->ID_DEPARTAMENTOS
            );            
        }
        if($queryData->ID_MUNICIPIOS != $clientData->ID_MUNICIPIOS){
            HistorialController::createUpdate(
                $idUsuario,
                'codigos',
                $idListado,
                $idListado,
                'ID_MUNICIPIOS',
                $queryData->ID_MUNICIPIOS,
                $clientData->ID_MUNICIPIOS
            );
        }
        $codigos->ID_DEPARTAMENTOS = $clientData->ID_DEPARTAMENTOS;
        $codigos->ID_MUNICIPIOS = $clientData->ID_MUNICIPIOS;
        $codigos->ID_ELEMENTO = $clientData->ID_ELEMENTO;
        $codigos->ID_COMPONENTE = $clientData->ID_COMPONENTE;
        $codigos->ID_GRUPO = $clientData->ID_GRUPO;
        $codigos->ID_TIPO_PATRIMONIO = $clientData->ID_TIPO_PATRIMONIO;
        $codigos->save();
    }

    /*Metodo para actualizar un registro de la tabla de codigos */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryListado = ListadosPreliminares::find($queryUpdate->ID_LISTADO);
        $queryData = Codigos::find($queryListado->ID_CODIGO);
        foreach (self::$rules as $key => $value) {
            if($queryData[$key] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'codigos',
                $queryUpdate->ID_LISTADO,
                $queryData->ID_CODIGO,
                $key,$queryData[$key],
                $clientData[$key]
            );
        }
        $queryData->ID_DEPARTAMENTOS = $clientData['ID_DEPARTAMENTOS'];
        $queryData->ID_MUNICIPIOS = $clientData['ID_MUNICIPIOS'];
        $queryData->ID_ELEMENTO = $clientData['ID_ELEMENTO'];
        $queryData->ID_COMPONENTE = $clientData['ID_COMPONENTE'];
        $queryData->ID_GRUPO = $clientData['ID_GRUPO'];
        $queryData->ID_TIPO_PATRIMONIO = $clientData['ID_TIPO_PATRIMONIO'];
        $queryData->save();
    }

    /*Metodo que contiene la plantilla de consulta de la tabla de codigo */
    public static function templateQuery($queryListado)
    {
        $queryData = Joins::JoinCodigo(new ListadosPreliminares())
        ->where('codigos.ID_DEPARTAMENTOS',"=",$queryListado->ID_DEPARTAMENTOS)
        ->where('codigos.ID_MUNICIPIOS',"=",$queryListado->ID_MUNICIPIOS)
        ->where('codigos.ID_TIPO_PATRIMONIO',"=",$queryListado->ID_TIPO_PATRIMONIO)
        ->where('codigos.ID_GRUPO',"=",$queryListado->ID_GRUPO)
        ->where('codigos.ID_COMPONENTE',"=",$queryListado->ID_COMPONENTE)
        ->where('codigos.ID_ELEMENTO',"=",$queryListado->ID_ELEMENTO)
        ->where('listados_preliminares.EXIST','=',true);
        return $queryData;
    }

    /*Metodo que consulta un registro especifico de la tabla de listados preliminares y 
    que concatena con la tabla de codigos */
    public static function queryListado($idListado)
    {
        $queryListado = Joins::JoinCodigo(new ListadosPreliminares())
        ->select("codigos.*")
        ->where("listados_preliminares.ID_LISTADO","=",$idListado)->first();
        return $queryListado;
    }

    /*Metodo para generar el codigo de 7 digitos de un recurso especifico */
    public static function findRecord($idListado)
    {
        $queryListado = self::queryListado($idListado);
        if(!isset($queryListado)) return "";
        $queryData = self::templateQuery($queryListado);
        $queryData = $queryData->select("codigos.*","listados_preliminares.NOMBRE")
        ->orderBy('listados_preliminares.NOMBRE','ASC')->get()->toArray();
        $joinData = "";
        foreach ($queryData as $key => $value) {
            if($queryListado->ID_CODIGO != $value['ID_CODIGO']) continue;
            $joinData = $value['ID_DEPARTAMENTOS'].".".
            $value['ID_MUNICIPIOS'].".".
            $value['ID_TIPO_PATRIMONIO'].".".
            $value['ID_GRUPO'].".".
            $value['ID_COMPONENTE'].".".
            $value['ID_ELEMENTO'].".".
            ($key+1);
            if($queryListado->ID_CODIGO == $value['ID_CODIGO']) break;
        }
        return $joinData;
    }

    /*Metodo que retorna los codigos y otros datos de un recurso turistico en especifico */
    public static function validateListado($idListado)
    {
        $queryListado = self::queryListado($idListado);
        if(!isset($queryListado)) return false;
        $code = $queryListado->ID_DEPARTAMENTOS.".".
        $queryListado->ID_MUNICIPIOS.".".
        $queryListado->ID_TIPO_PATRIMONIO.".".
        $queryListado->ID_GRUPO.".".
        $queryListado->ID_COMPONENTE.".".
        $queryListado->ID_ELEMENTO;
        return [$code,$queryListado];
    }

    /*Metodo para generar el codigo de 7 digitos de los recursos turisticos para exportar a excel */
    public static function findExport($queryListado)
    {
        $queryData = self::templateQuery($queryListado);
        $queryData = $queryData->select("codigos.*","listados_preliminares.NOMBRE")
        ->orderBy('listados_preliminares.NOMBRE','ASC')->get()->toArray();
        $code = $queryListado->ID_DEPARTAMENTOS.".".
        $queryListado->ID_MUNICIPIOS.".".
        $queryListado->ID_TIPO_PATRIMONIO.".".
        $queryListado->ID_GRUPO.".".
        $queryListado->ID_COMPONENTE.".".
        $queryListado->ID_ELEMENTO;
        $finalArray = [];
        $finalArray[$code] = [];
        foreach ($queryData as $key => $value) {
            $joinData = $value['ID_DEPARTAMENTOS'].".".
            $value['ID_MUNICIPIOS'].".".
            $value['ID_TIPO_PATRIMONIO'].".".
            $value['ID_GRUPO'].".".
            $value['ID_COMPONENTE'].".".
            $value['ID_ELEMENTO'].".".
            ($key+1);
            $finalArray[$code][$value['NOMBRE']] = $joinData;
        }
        return $finalArray;
    }

    /*Metodo que retorna los codigos de 7 digitos de unos recursos turisticos en especifico */
    public static function getData($dataSend)
    {
        foreach ($dataSend['data'] as $key => $value) {
            $codigo = self::findRecord($value['ID_LISTADO']);
            $dataSend['data'][$key]['CODIGO'] = $codigo;
        }
        return $dataSend;
    }

    /*Metodo para consultar un registro especifico de la tabla de codigos */
    public static function getRecord($idListado,$idCodigo)
    {
        $codigo = self::findRecord($idListado);
        $queryCodigo = Codigos::find($idCodigo)->toArray();
        return [
            "CODIGOS" => array_merge(["CODIGO" => $codigo],$queryCodigo)
        ];
    }

    /*Metodo que agrega el codigo de 7 digitos a una consulta previa con el fin de exportar 
    dichos datos a excel */
    public static function getExport($dataSend)
    {
        $consultArray = [];
        foreach ($dataSend as $key => $value) {
            $queryListado = self::validateListado($value['ID_LISTADO']);
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

    /*Metodo para validar que el nombre del recurso turistico no exista en la base de datos 
    con el mismo codigo */
    public static function existName($idListado,$request,$update)
    {
        $queryData = self::templateQuery($request);
        $queryData = $queryData->where('listados_preliminares.NOMBRE','=',$request->NOMBRE);
        if($update) $queryData = $queryData->where("listados_preliminares.ID_LISTADO","!=",$idListado);
        $queryData = $queryData->first();
        return isset($queryData);
    }
}
