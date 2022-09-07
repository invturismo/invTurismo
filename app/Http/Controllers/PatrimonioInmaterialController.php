<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\GeneralidadesController;
use App\Http\Controllers\CodigosController;
use App\Http\Controllers\CaracteristicasController;
use App\Http\Controllers\PuntajesController;
use App\Http\Controllers\ActividadesController;
use App\Http\Controllers\PromocionController;
use App\Http\Controllers\RedesController;
use App\Models\PatrimoniosInmateriales;

class PatrimonioInmaterialController extends Controller
{
    public static $rules = [
        'ID_INMATERIAL' => 'required|numeric',
        'REF_BIBLIOGRAFICA' => 'max:300',
        'OBSERVACIONES' => 'max:300',
    ];

    public function mergeRules($state)
    {
        return array_merge(
            GeneralidadesController::rulesGeneralidades(true),
            CaracteristicasController::rulesCaracteristicas($state),
            CodigosController::$rules,
            PuntajesController::rulesPuntajes('PATRIMONIOS_INMATERIALES'),
            ActividadesController::$rules,
            PromocionController::$rules,
            RedesController::$rules,
            self::$rules
        );
    }

    public function insertForm(Request $request) 
    {
        $rules = $this->mergeRules(false);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
            $queryData = PatrimoniosInmateriales::find($request->ID_INMATERIAL);
            $validateName = CodigosController::existName($queryData->ID_LISTADO,$request,false);
            if($validateName) return response()->json([
                'state' => false,
                'errors' => [
                    'NOMBRE' => ['El recurso ya esta en la base de datos con el mismo Codigo']
                ]
            ]);
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            $idGeneralidades = GeneralidadesController::create($request,$queryData->ID_LISTADO,$ID_USUARIO,true);
            $queryData->ID_GENERALIDAD = $idGeneralidades;
            $idCaracteristicas = CaracteristicasController::create($request);
            $queryData->ID_CARACTERISTICA = $idCaracteristicas;
            CodigosController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $idPuntajes = PuntajesController::create($request,"PATRIMONIOS_INMATERIALES");
            $queryData->ID_VALORACION_INMATERIAL = $idPuntajes;
            $idActividad = ActividadesController::create($request);
            $queryData->ID_ACTIVIDAD = $idActividad;
            $idPromocion = PromocionController::create($request);
            $queryData->ID_PROMOCION = $idPromocion;
            $idRedes = RedesController::create($request);
            $queryData->ID_RED_SOCIAL = $idRedes;
            $queryData->REF_BIBLIOGRAFICA = $request->REF_BIBLIOGRAFICA;
            $queryData->OBSERVACIONES = $request->OBSERVACIONES;
            $queryData->save();
            HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Inmaterial',$queryData->ID_INMATERIAL,2);
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function update(Request $request)
    {
        $reglas = isset($request->REGLAS) ? $request->REGLAS : "-";
        $rules = $this->mergeRules($reglas);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
            $queryData = PatrimoniosInmateriales::find($request->ID_INMATERIAL);
            $validateName = CodigosController::existName($queryData->ID_LISTADO,$request,true);
            if($validateName) return response()->json([
                'state' => false,
                'errors' => [
                    'NOMBRE' => ['El recurso ya esta en la base de datos con el mismo Codigo']
                ]
            ]);
            $fields = ['REF_BIBLIOGRAFICA','OBSERVACIONES'];
            $clientData = $request->all();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            GeneralidadesController::update($clientData,$queryData,$ID_USUARIO,true);
            CaracteristicasController::update($request,$queryData,$ID_USUARIO);
            CodigosController::update($clientData,$queryData,$ID_USUARIO);
            PuntajesController::update($clientData,$queryData,$ID_USUARIO,"PATRIMONIOS_INMATERIALES");
            ActividadesController::update($clientData,$queryData,$ID_USUARIO);
            PromocionController::update($clientData,$queryData,$ID_USUARIO);
            RedesController::update($clientData,$queryData,$ID_USUARIO);
            foreach ($fields as $value) {
                if($queryData[$value] != $clientData[$value]) {
                    HistorialController::createUpdate($ID_USUARIO,'Patrimonio Cultural Inmaterial',$queryData->ID_INMATERIAL,$value,$queryData[$value],$clientData[$value]);
                    $queryData[$value] = $clientData[$value];
                    $queryData->save();
                }
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function getDataSinCom(Request $request)
    {
        try {
            $queryData = PatrimoniosInmateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_inmateriales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("patrimonios_inmateriales.ID_INMATERIAL as ID","listados_preliminares.NOMBRE")
            ->where("patrimonios_inmateriales.EXIST","=",true)
            ->whereNull("codigos.id_tipo_patrimonio");
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("patrimonios_inmateriales.ID_INMATERIAL","DESC")
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

    public function getRecordSinCom(Request $request)
    {
        try {
            $queryData = PatrimoniosInmateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_inmateriales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS")
            ->where("patrimonios_inmateriales.EXIST","=",true)
            ->whereNull("codigos.id_tipo_patrimonio")
            ->where("patrimonios_inmateriales.ID_INMATERIAL","=",$request->REGISTRO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($queryData->ID_LISTADO,1,$idTokenUser,false);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta modificando actualmente"
            ]);
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

    public function getDataCom(Request $request)
    {
        try {
            $queryData = PatrimoniosInmateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_inmateriales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->join("valoraciones_inmaterial","valoraciones_inmaterial.ID_VALORACION_INMATERIAL","=","patrimonios_inmateriales.ID_VALORACION_INMATERIAL")
            ->join("generalidades","generalidades.ID_GENERALIDAD","=","patrimonios_inmateriales.ID_GENERALIDAD")
            ->select("patrimonios_inmateriales.ID_INMATERIAL as ID","listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","valoraciones_inmaterial.TOTAL as CALIFICACION","listados_preliminares.UBICACION","generalidades.GEORREFERENCIACION")
            ->where("patrimonios_inmateriales.EXIST","=",true)
            ->whereNotNull("codigos.id_tipo_patrimonio");
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("patrimonios_inmateriales.ID_INMATERIAL","DESC")
            ->paginate(10)->toArray();
            $queryData = CodigosController::getData($queryData);
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

    public function getRecordCom(Request $request)
    {
        try {
            $queryData = PatrimoniosInmateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_inmateriales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->select("patrimonios_inmateriales.*")
            ->where("patrimonios_inmateriales.EXIST","=",true)
            ->whereNotNull("codigos.id_tipo_patrimonio")
            ->where("patrimonios_inmateriales.ID_INMATERIAL","=",$request->REGISTRO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $dataGeneralidades = GeneralidadesController::getRecord($queryData->ID_GENERALIDAD,$queryData->ID_LISTADO,true);
            $dataCaracteristicas = CaracteristicasController::getRecord($queryData->ID_CARACTERISTICA,$queryData->ID_LISTADO);
            $dataPuntajes = PuntajesController::getRecord($queryData->ID_VALORACION_INMATERIAL,"PATRIMONIOS_INMATERIALES");
            $dataActividades = ActividadesController::getRecord($queryData->ID_ACTIVIDAD);
            $dataAc_Ser = ["ACTIVIDADES_SERVICIOS"=>$dataActividades];
            $dataPromocion = PromocionController::getRecord($queryData->ID_PROMOCION);
            $dataRedes = RedesController::getRecord($queryData->ID_RED_SOCIAL);
            $dataRef_Ob = ["REF_BIBLIOGRAFICA"=>$queryData->REF_BIBLIOGRAFICA,"OBSERVACIONES"=>$queryData->OBSERVACIONES,"ID_INMATERIAL"=>$queryData->ID_INMATERIAL];
            $fechaCreacion = GeneralidadesController::getFecha('Patrimonio Cultural Inmaterial',$request->REGISTRO);
            $dataOtros = ["OTROS"=>array_merge($dataRedes,$dataRef_Ob,$fechaCreacion)];
            $mergeQuery = array_merge($dataGeneralidades,$dataCaracteristicas,$dataPuntajes,$dataAc_Ser,$dataPromocion,$dataOtros);
            if(isset($request->ACTUALIZANDO)) {
                $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
                $response = UpdateController::stateUpdate($queryData->ID_LISTADO,1,$idTokenUser,false);
                if($response['state']==0) throw new Error($response['message']);
                if($response['state']==1) return response()->json([
                    'state' => false,
                    'message' => "El registro se esta modificando actualmente"
                ]);
            }
            return response()->json([
                "state" => true,
                "data" => $mergeQuery
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
