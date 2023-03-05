<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HistorialController;
use App\Models\ListadosPreliminares;
use App\Models\Generalidades;
use App\Models\Historial_Insert_Delete;
use App\Helpers\Joins;

class GeneralidadesController extends Controller
{
    /*Metodo que retorna los campos base para actulizar la tabla de generalidades */
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

    /*Metodo que retorna las reglas para las generalidades del recurso turistico */
    public static function rules($others)
    {
        $generalRules = [
            'NOMBRE' => 'required|max:200|regex:/^[A-ZÁÉÍÓÚÑ&\s]+$/i',
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

    /*Metodo que une las reglas necesarias de la tabla de generalidades */
    public static function rulesGeneralidades($others=false)
    {
        if($others) return self::rules(true);
        $rulesAdmin = AdminController::rules();
        return array_merge(self::rules(false),$rulesAdmin);
    }

    /*Metodo para actualizar un registro de la tabla de listados preliminares */
    public static function updateListado($clientData,$idListado,$idUsuario,$noData)
    {
        $queryData = ListadosPreliminares::find($idListado);
        if($queryData['NOMBRE'] != $clientData['NOMBRE']){
            HistorialController::createUpdate(
                $idUsuario,
                'listados_preliminares',
                $idListado,
                $idListado,
                'NOMBRE',
                $queryData['NOMBRE'],
                $clientData['NOMBRE']
            );
            $queryData['NOMBRE'] = $clientData['NOMBRE'];
            $queryData->save();
        }
        if($noData) return;
        if($queryData['UBICACION'] != $clientData['UBICACION']){
            HistorialController::createUpdate(
                $idUsuario,
                'listados_preliminares',
                $idListado,
                $idListado,
                'UBICACION',
                $queryData['UBICACION'],
                $clientData['UBICACION']
            );
            $queryData['UBICACION'] = $clientData['UBICACION'];
            $queryData->save();
        }
    }

    /*Metodo para crear un nuevo registro en la tabla de generalidades */
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

    /*Metodo para actualizar un registro de la tabla de generalidades */
    public static function update($clientData,$queryUpdate,$idUsuario,$noData=false)
    {
        $queryData = Generalidades::find($queryUpdate->ID_GENERALIDAD);
        if(!$noData) AdminController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        self::updateListado($clientData,$queryUpdate->ID_LISTADO,$idUsuario,$noData);
        foreach (self::fieldsUpdate($noData) as $value) {
            if($queryData[$value] == $clientData[$value]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'generalidades',
                $queryUpdate->ID_LISTADO,
                $queryData->ID_GENERALIDAD,
                $value,
                $queryData[$value],
                $clientData[$value]
            );
            $queryData[$value] = $clientData[$value];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de generalidades */
    public static function getRecord($idGeneralidad,$idListado,$noData=false)
    {
        $queryListado = Joins::JoinGeneral(new ListadosPreliminares)
        ->select(
            "departamentos.DEPARTAMENTO",
            "municipios.MUNICIPIO",
            "listados_preliminares.NOMBRE",
            "listados_preliminares.UBICACION"
        )->where("listados_preliminares.ID_LISTADO","=",$idListado)->first()->toArray();
        $queryData = Generalidades::join(
            "tipos_acceso",
            "tipos_acceso.ID_TIPO_ACCESO",
            "=","generalidades.ID_TIPO_ACCESO"
        )->select("generalidades.*","tipos_acceso.ACCESO")
        ->where("generalidades.ID_GENERALIDAD","=",$idGeneralidad)->first()->toArray();
        if($noData) return ["GENERALIDADES"=>array_merge($queryData,$queryListado)];
        $queryAdmin = AdminController::getRecord($queryData['ID_ADMIN']);
        return [
            "GENERALIDADES" => array_merge($queryData,$queryListado,$queryAdmin)
        ];
    }
}
