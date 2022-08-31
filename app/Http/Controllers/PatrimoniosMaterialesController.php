<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\GeneralidadesController;
use App\Http\Controllers\CodigosController;
use App\Http\Controllers\CaracteristicasController;
use App\Http\Controllers\PuntajesController;
use App\Http\Controllers\RelevantesController;
use App\Http\Controllers\ActividadesController;
use App\Http\Controllers\ServiciosController;
use App\Http\Controllers\PromocionController;
use App\Http\Controllers\ServiciosEspecialesController;
use App\Http\Controllers\RedesController;
use App\Models\PatrimoniosMateriales;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;

class PatrimoniosMaterialesController extends Controller
{
    public static $rules = [
        'ID_MATERIAL' => 'required|numeric',
        'REF_BIBLIOGRAFICA' => 'max:300',
        'OBSERVACIONES' => 'max:300',
    ];

    public function mergeRules($state)
    {
        return array_merge(
            GeneralidadesController::rulesGeneralidades(),
            CaracteristicasController::rulesCaracteristicas($state),
            CodigosController::$rules,
            PuntajesController::rulesPuntajes('PATRIMONIOS_MATERIALES'),
            RelevantesController::rulesRelevantes(),
            ActividadesController::$rules,
            ServiciosController::$rules,
            PromocionController::$rules,
            ServiciosEspecialesController::$rules,
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
            $queryData = PatrimoniosMateriales::find($request->ID_MATERIAL);
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            $idGeneralidades = GeneralidadesController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $queryData->ID_GENERALIDAD = $idGeneralidades;
            $idCaracteristicas = CaracteristicasController::create($request);
            $queryData->ID_CARACTERISTICA = $idCaracteristicas;
            CodigosController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $idPuntajes = PuntajesController::create($request,"PATRIMONIOS_MATERIALES");
            $queryData->ID_VALORACION_MATERIAL = $idPuntajes;
            $idRelevante = RelevantesController::create($request); 
            $queryData->ID_RELEVANTE = $idRelevante;
            $idActividad = ActividadesController::create($request);
            $queryData->ID_ACTIVIDAD = $idActividad;
            $idServicio = ServiciosController::create($request);
            $queryData->ID_SERVICIO = $idServicio;
            $idPromocion = PromocionController::create($request);
            $queryData->ID_PROMOCION = $idPromocion;
            $idEspecial = ServiciosEspecialesController::create($request);
            $queryData->ID_SERVICIO_ESPECIAL = $idEspecial;
            $idRedes = RedesController::create($request);
            $queryData->ID_RED_SOCIAL = $idRedes;
            $queryData->REF_BIBLIOGRAFICA = $request->REF_BIBLIOGRAFICA;
            $queryData->OBSERVACIONES = $request->OBSERVACIONES;
            $queryData->save();
            HistorialController::createInsertDelete($ID_USUARIO,'Patrimonio Cultural Material',$queryData->ID_MATERIAL,2);
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
            $queryData = PatrimoniosMateriales::find($request->ID_MATERIAL);
            $fields = ['REF_BIBLIOGRAFICA','OBSERVACIONES'];
            $clientData = $request->all();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            GeneralidadesController::update($clientData,$queryData,$ID_USUARIO);
            CaracteristicasController::update($request,$queryData,$ID_USUARIO);
            CodigosController::update($clientData,$queryData,$ID_USUARIO);
            PuntajesController::update($clientData,$queryData,$ID_USUARIO,"PATRIMONIOS_MATERIALES");
            RelevantesController::update($clientData,$queryData,$ID_USUARIO); 
            ActividadesController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosController::update($clientData,$queryData,$ID_USUARIO); 
            PromocionController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosEspecialesController::update($clientData,$queryData,$ID_USUARIO);
            RedesController::update($clientData,$queryData,$ID_USUARIO);
            foreach ($fields as $value) {
                if($queryData[$value] != $clientData[$value]) {
                    HistorialController::createUpdate($ID_USUARIO,'patrimonios_materiales',$queryData->ID_MATERIAL,$value,$queryData[$value],$clientData[$value]);
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
            $queryData = PatrimoniosMateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_materiales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("patrimonios_materiales.ID_MATERIAL as ID","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
            ->where("patrimonios_materiales.EXIST","=",true)
            ->whereNull("codigos.id_tipo_patrimonio");
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("patrimonios_materiales.ID_MATERIAL","DESC")
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
            $queryData = PatrimoniosMateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_materiales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","listados_preliminares.UBICACION","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS")
            ->where("patrimonios_materiales.EXIST","=",true)
            ->whereNull("codigos.id_tipo_patrimonio")
            ->where("patrimonios_materiales.ID_MATERIAL","=",$request->REGISTRO)
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
            $queryData = PatrimoniosMateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_materiales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->join("valoraciones_material","valoraciones_material.ID_VALORACION_MATERIAL","=","patrimonios_materiales.ID_VALORACION_MATERIAL")
            ->join("generalidades","generalidades.ID_GENERALIDAD","=","patrimonios_materiales.ID_GENERALIDAD")
            ->select("patrimonios_materiales.ID_MATERIAL as ID","listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","valoraciones_material.TOTAL as CALIFICACION","listados_preliminares.UBICACION","generalidades.GEORREFERENCIACION")
            ->where("patrimonios_materiales.EXIST","=",true)
            ->whereNotNull("codigos.id_tipo_patrimonio");
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            if($request->BUSCAR) $queryData = $queryData->where("listados_preliminares.NOMBRE","LIKE","%".$request->BUSCAR."%");
            $queryData = $queryData->orderBy("patrimonios_materiales.ID_MATERIAL","DESC")
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
            $queryData = PatrimoniosMateriales::join("listados_preliminares","listados_preliminares.ID_LISTADO","=","patrimonios_materiales.ID_LISTADO")
            ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->select("patrimonios_materiales.*")
            ->where("patrimonios_materiales.EXIST","=",true)
            ->whereNotNull("codigos.id_tipo_patrimonio")
            ->where("patrimonios_materiales.ID_MATERIAL","=",$request->REGISTRO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $dataGeneralidades = GeneralidadesController::getRecord($queryData->ID_GENERALIDAD,$queryData->ID_LISTADO);
            $dataCaracteristicas = CaracteristicasController::getRecord($queryData->ID_CARACTERISTICA,$queryData->ID_LISTADO);
            $dataPuntajes = PuntajesController::getRecord($queryData->ID_VALORACION_MATERIAL,"PATRIMONIOS_MATERIALES");
            $dataRelevantes = RelevantesController::getRecord($queryData->ID_RELEVANTE);
            $dataActividades = ActividadesController::getRecord($queryData->ID_ACTIVIDAD);
            $dataServicios = ServiciosController::getRecord($queryData->ID_SERVICIO);
            $dataAc_Ser = ["ACTIVIDADES_SERVICIOS"=>array_merge($dataActividades,$dataServicios)];
            $dataPromocion = PromocionController::getRecord($queryData->ID_PROMOCION);
            $dataEspeciales =  ServiciosEspecialesController::getRecord($queryData->ID_PROMOCION);
            $dataRedes = RedesController::getRecord($queryData->ID_RED_SOCIAL);
            $dataRef_Ob = ["REF_BIBLIOGRAFICA"=>$queryData->REF_BIBLIOGRAFICA,"OBSERVACIONES"=>$queryData->OBSERVACIONES,"ID_MATERIAL"=>$queryData->ID_MATERIAL];
            $dataOtros = ["OTROS"=>array_merge($dataRedes,$dataRef_Ob)];
            $mergeQuery = array_merge($dataGeneralidades,$dataCaracteristicas,$dataPuntajes,$dataRelevantes,$dataAc_Ser,$dataPromocion,$dataEspeciales,$dataOtros);
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
