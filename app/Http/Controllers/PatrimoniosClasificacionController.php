<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;
use App\Models\ListadosPreliminares;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UpdateController;

class PatrimoniosClasificacionController extends Controller
{
    public static function insertForms ($ID_LISTADO,$ID_TIPO_BIEN,$ID_USUARIO)
    {
        switch ($ID_TIPO_BIEN) {
            case 1:
                $material = new PatrimoniosMateriales();
                $material -> ID_LISTADO = $ID_LISTADO;
                $material -> save();
                HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Material',$material->ID_MATERIAL,1);
                return $material->ID_MATERIAL;
                break;
            case 2:
                $inmaterial = new PatrimoniosInmateriales();
                $inmaterial -> ID_LISTADO = $ID_LISTADO;
                $inmaterial -> save();
                HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Inmaterial',$inmaterial->ID_INMATERIAL,1);
                return $inmaterial->ID_INMATERIAL;
                break;
            case 3:
                $eventos = new FestividadesEventos();
                $eventos -> ID_LISTADO = $ID_LISTADO;
                $eventos -> save();
                HistorialController::createInsertDelete($ID_USUARIO,'Festividades y Eventos',$eventos->ID_EVENTO,1);
                return $eventos->ID_EVENTO;
                break;
            case 4:
                $grupos = new GruposEspeciales();
                $grupos -> ID_LISTADO = $ID_LISTADO;
                $grupos -> save();
                HistorialController::createInsertDelete($ID_USUARIO,'Grupos de Especial Interés',$grupos->ID_GRUPO,1);
                return $grupos->ID_GRUPO;
                break;
            case 5:
                $sitios = new SitiosNaturales();
                $sitios -> ID_LISTADO = $ID_LISTADO;
                $sitios -> save();
                HistorialController::createInsertDelete($ID_USUARIO,'Sitios Naturales',$sitios->ID_SITIO,1);
                return $sitios->ID_SITIO;
                break;
        }
    }

    public static function deleteForms($FORMULARIO,$ID_REGISTRO,$ID_USUARIO)
    {
        if (!empty($FORMULARIO)){
            switch ($FORMULARIO) {
                case 1:
                    $registro = PatrimoniosMateriales::select("patrimonios_materiales.ID_MATERIAL")
                    ->where("patrimonios_materiales.ID_LISTADO","=",$ID_REGISTRO)
                    ->first();;
                    HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Material',$registro->ID_MATERIAL,0);
                    $registro -> delete();
                    break;
                case 2:
                    $registro = PatrimoniosInmateriales::select("patrimonios_inmateriales.ID_INMATERIAL")
                    ->where("patrimonios_inmateriales.ID_LISTADO","=",$ID_REGISTRO)
                    ->first();;
                    HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Inmaterial',$registro->ID_INMATERIAL,0);
                    $registro -> delete();
                    break;
                case 3:
                    $registro = FestividadesEventos::select("festividades_eventos.ID_EVENTO")
                    ->where("festividades_eventos.ID_LISTADO","=",$ID_REGISTRO)
                    ->first();;
                    HistorialController::createInsertDelete($ID_USUARIO,'Festividades y Eventos',$registro->ID_EVENTO,0);
                    $registro -> delete();
                    break;
                case 4:
                    $registro = GruposEspeciales::select("grupos_especiales.ID_GRUPO")
                    ->where("grupos_especiales.ID_LISTADO","=",$ID_REGISTRO)
                    ->first();;
                    HistorialController::createInsertDelete($ID_USUARIO,'Grupos de Especial Interés',$registro->ID_GRUPO,0);
                    $registro -> delete();
                    break;
                case 5:
                    $registro = SitiosNaturales::select("sitios_naturales.ID_SITIO")
                    ->where("sitios_naturales.ID_LISTADO","=",$ID_REGISTRO)
                    ->first();;
                    HistorialController::createInsertDelete($ID_USUARIO,'Sitios Naturales',$registro->ID_SITIO,0);
                    $registro -> delete();
                    break;
            }
        }
    }

    public function getDataSin(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE")
            ->whereNull("listados_preliminares.ID_TIPO_BIEN")
            ->where("listados_preliminares.EXIST","=",1);
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("listados_preliminares.ID_LISTADO","DESC")
            ->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function getRecordSin(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE")
            ->where("listados_preliminares.ID_TIPO_BIEN","=",NULL)
            ->where("listados_preliminares.EXIST","=",1)
            ->where("listados_preliminares.ID_LISTADO","=",$request->REGISTRO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->REGISTRO,1,$idTokenUser,false);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta modificando actualmente"
            ]);
            $queryData = $queryData->toArray();
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function getDataCon(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->join("tipos_bien","listados_preliminares.ID_TIPO_BIEN","=","tipos_bien.ID_TIPO_BIEN")
            ->select("listados_preliminares.ID_LISTADO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","tipos_bien.ID_TIPO_BIEN","tipos_bien.TIPO_BIEN")
            ->whereNotNull("listados_preliminares.ID_TIPO_BIEN")
            ->where("listados_preliminares.EXIST","=",1);
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("listados_preliminares.ID_LISTADO","DESC")
            ->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function getRecordCon(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->join("tipos_bien","listados_preliminares.ID_TIPO_BIEN","=","tipos_bien.ID_TIPO_BIEN")
            ->select("listados_preliminares.ID_LISTADO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","tipos_bien.ID_TIPO_BIEN","tipos_bien.TIPO_BIEN","codigos.ID_TIPO_PATRIMONIO")
            ->whereNotNull("listados_preliminares.ID_TIPO_BIEN")
            ->where("listados_preliminares.EXIST","=",1)
            ->where("listados_preliminares.ID_LISTADO","=",$request->REGISTRO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryData = $queryData->toArray();
            if(isset($request->ACTUALIZANDO)) {
                if(isset($queryData['ID_TIPO_PATRIMONIO'])) return response()->json([
                    'state' => false,
                    'message' => "No es posible actualizar, tienes que borrar el registro en su correspondiente clasificacion"
                ]);
                $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
                $response = UpdateController::stateUpdate($request->REGISTRO,1,$idTokenUser,false);
                if($response['state']==0) throw new Error($response['message']);
                if($response['state']==1) return response()->json([
                    'state' => false,
                    'message' => "El registro se esta modificando actualmente"
                ]);
            } else {
                $queryHistorial = ExportController::historialClasificacion($queryData);
                $queryData = array_merge($queryData,$queryHistorial);
            }
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }
}
