<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\CodigosController;
use App\Models\ListadosPreliminares;
use App\Helpers\Joins;
use App\Helpers\HelperDataRecurso;
use App\Helpers\HelperFilter;
use App\Helpers\HelperQuerys;
use App\Helpers\HelpersExport;
use App\Helpers\HelperLogs;

class CuadroResumenController extends Controller
{
    /*Metodo para generar el codigo a los recursos turisticos completados y la fecha en la que se crearon, 
    tambien consultar los datos necesarios para exportarlos a excel */
    public static function otherData($data,$get = false)
    {
        foreach ($data as $key => $value) {
            $response = HelperDataRecurso::WhoAtractivo(
                $value['ID_TIPO_BIEN'],$value['ID_LISTADO']
            );
            $query = $response['query'];
            $otherData = $response['otherData'];
            $queryData = HelperQuerys::queryPatrimonios(
                $query,
                $otherData['table'],
                $otherData['idKey'],
                $otherData['selectArguments'],
                $otherData['puntajeArguments'],
            )->where('listados_preliminares.ID_LISTADO','=',$value['ID_LISTADO'])->first()->toArray();
            $queryData['DEPARTAMENTO'] = $value['DEPARTAMENTO'];
            $queryData['MUNICIPIO'] = $value['MUNICIPIO'];
            if($get) {
                $codigo = CodigosController::getRecord(
                    $value['ID_LISTADO'],$value['ID_CODIGO']
                )['CODIGOS']['CODIGO'];
                $queryData['CODIGO'] = $codigo;
                $queryData['TABLA'] = $otherData['table'];
            }else {
                $fechaCreacion = HelpersExport::templateHistorial(
                    $value['TIPO_BIEN'],
                    $response['id'],2,
                    $value['ID_LISTADO']
                );
                $queryData = array_merge($queryData,$fechaCreacion);
                $queryData['TIPO_BIEN'] = $value['TIPO_BIEN'];
            }
            $data[$key] =  $queryData;
        }
        return $data;
    }

    /*Metodo que contiene la plantilla para consultar los datos que se muestran en el
    cuadro resumen */
    public static function templateQuery()
    {
        return Joins::JoinGeneral(new ListadosPreliminares())
        ->select(
            'listados_preliminares.*',
            'tipos_bien.TIPO_BIEN',
            'departamentos.DEPARTAMENTO',
            'municipios.MUNICIPIO'
        )->join( "tipos_bien","listados_preliminares.ID_TIPO_BIEN","=","tipos_bien.ID_TIPO_BIEN")
        ->whereNotNull('codigos.ID_TIPO_PATRIMONIO')
        ->where('listados_preliminares.EXIST','=',true);
    }

    /*Metodo para responder al usuario con todos los datos necesarios del cuadro resumen */
    public function getData(Request $request)
    {
        try {
            $queryData = self::templateQuery();
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "listados_preliminares.ID_LISTADO","DESC"
            )->paginate(10)->toArray();
            $queryData['data'] = self::otherData($queryData['data'],true);
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para responder al usuario con todos los datos necesarios para exportar
    el cuadro resumen */
    public function ExportCuadroResumen(Request $request)
    {
        try {
            $queryData = self::templateQuery();
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
            if(count($queryData)>0) $queryData = self::otherData($queryData);
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }
}
