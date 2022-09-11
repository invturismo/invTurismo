<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HistorialController;
use App\Models\ListadosPreliminares;
use App\Models\Generalidades;
use App\Models\Historial_Insert_Delete;

class GeneralidadesController extends Controller
{
    public static function fieldsUpdate($others)
    {
        $generalFields = [
            'ID_TIPO_ACCESO',
            'GEORREFERENCIACION',
            'CORREGIMIENTO_VEREDA_LOCALIDAD'
        ];
        if($others) return $generalFields;
        return array_merge($generalFields,['INDICACIONES_ACCESO']);
    }

    public static function rules($others)
    {
        $generalRules = [
            'NOMBRE' => 'required|max:200',
            'ID_TIPO_ACCESO' => 'required|numeric',
            'GEORREFERENCIACION' => 'required|max:50',
            'CORREGIMIENTO_VEREDA_LOCALIDAD' => 'max:200'
        ];
        $otherRules = [
            'UBICACION' => 'required|max:200',
            'INDICACIONES_ACCESO' => 'max:300',
        ];
        if(!$others) return array_merge($generalRules,$otherRules);
        return $generalRules;
    }

    public static function rulesGeneralidades($others=false)
    {
        if($others) return self::rules(true);
        $rulesAdmin = AdminController::rules();
        return array_merge(self::rules(false),$rulesAdmin);
    }

    public static function updateListado($clientData,$idListado,$idUsuario,$noData)
    {
        $queryData = ListadosPreliminares::find($idListado);
        if($queryData['NOMBRE'] != $clientData['NOMBRE']){
            HistorialController::createUpdate($idUsuario,'listados_preliminares',$idListado,$idListado,'NOMBRE',$queryData['NOMBRE'],$clientData['NOMBRE']);
            $queryData['NOMBRE'] = $clientData['NOMBRE'];
            $queryData->save();
        }
        if($noData) return;
        if($queryData['UBICACION'] != $clientData['UBICACION']){
            HistorialController::createUpdate($idUsuario,'listados_preliminares',$idListado,$idListado,'UBICACION',$queryData['UBICACION'],$clientData['UBICACION']);
            $queryData['UBICACION'] = $clientData['UBICACION'];
            $queryData->save();
        }
    }

    public static function create($clientData,$idListado,$idUsuario,$noData=false)
    {
        if(!$noData) $idAdmin = AdminController::create($clientData);
        self::updateListado($clientData->all(),$idListado,$idUsuario,$noData);
        $generalidad = new Generalidades();
        if(!$noData) $generalidad->ID_ADMIN = $idAdmin;
        $generalidad->ID_TIPO_ACCESO = $clientData->ID_TIPO_ACCESO;
        $generalidad->GEORREFERENCIACION = $clientData->GEORREFERENCIACION;
        $generalidad->INDICACIONES_ACCESO = $clientData->INDICACIONES_ACCESO;
        $generalidad->CORREGIMIENTO_VEREDA_LOCALIDAD = $clientData->CORREGIMIENTO_VEREDA_LOCALIDAD;
        $generalidad->save();
        return $generalidad->ID_GENERALIDAD;
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$noData=false)
    {
        $queryData = Generalidades::find($queryUpdate->ID_GENERALIDAD);
        if(!$noData) AdminController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        self::updateListado($clientData,$queryUpdate->ID_LISTADO,$idUsuario,$noData);
        foreach (self::fieldsUpdate($noData) as $value) {
            if($queryData[$value] != $clientData[$value]) {
                HistorialController::createUpdate($idUsuario,'generalidades',$queryUpdate->ID_LISTADO,$queryData->ID_GENERALIDAD,$value,$queryData[$value],$clientData[$value]);
                $queryData[$value] = $clientData[$value];
                $queryData->save();
            }
        }
    }

    public static function getRecord($idGeneralidad,$idListado,$noData=false)
    {
        $queryListado = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->join('municipios', function ($join) {
            $join->on(function($query){
                $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
        });})
        ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
        ->select("departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
        ->where("listados_preliminares.ID_LISTADO","=",$idListado)->first()->toArray();
        $queryData = Generalidades::join("tipos_acceso","tipos_acceso.ID_TIPO_ACCESO","=","generalidades.ID_TIPO_ACCESO")
        ->select("generalidades.*","tipos_acceso.ACCESO")
        ->where("generalidades.ID_GENERALIDAD","=",$idGeneralidad)->first()->toArray();
        if($noData) return ["GENERALIDADES"=>array_merge($queryData,$queryListado)];
        $queryAdmin = AdminController::getRecord($queryData['ID_ADMIN']);
        return [
            "GENERALIDADES" => array_merge($queryData,$queryListado,$queryAdmin)
        ];
    }
}
