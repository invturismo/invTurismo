<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
use App\Models\FestividadesEventos;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use App\Helpers\HelperQuerys;
use App\Helpers\HelperFilter;
use App\Helpers\HelperValidator;
use App\Helpers\HelpersExport;
use App\Helpers\HelperDelete;
use App\Helpers\HelperLogs;

class FestividadesController extends Controller
{
    /*Variable que define algunas reglas para las festividades y eventos */
    public static $rules = [
        'ID_EVENTO' => 'required|numeric',
        'REF_BIBLIOGRAFICA' => 'max:300',
        'OBSERVACIONES' => 'max:300',
    ];

    /*Metodo que une todas las reglas necesarias para las festividades y eventos */
    public function mergeRules($state)
    {
        return array_merge(
            GeneralidadesController::rulesGeneralidades(),
            CaracteristicasController::rulesCaracteristicas($state),
            CodigosController::$rules,
            PuntajesController::rulesPuntajes('FESTIVIDADES_EVENTOS'),
            RelevantesController::rulesRelevantes(),
            ActividadesController::$rules,
            ServiciosController::$rules,
            PromocionController::$rules,
            ServiciosEspecialesController::$rules,
            RedesController::$rules,
            self::$rules
        );
    }

    /*Metodo para completar un registro en la tabla de festividades y eventos */
    public function insertForm(Request $request) 
    {
        $isValid = HelperValidator::Validate($this->mergeRules(false),$request);
        if($isValid != 1) return response()->json($isValid);     
        DB::beginTransaction();
        try {
            $queryData = FestividadesEventos::find($request->ID_EVENTO);
            $validateName = CodigosController::existName($queryData->ID_LISTADO,$request,false);
            if($validateName) return response()->json([
                'state' => false,
                'errors' => [
                    'NOMBRE' => ['El recurso ya esta en la base de datos con el mismo Codigo']
                ]
            ]);
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            $idGeneralidades = GeneralidadesController::create(
                $request,$queryData->ID_LISTADO,$ID_USUARIO
            );
            $queryData->ID_GENERALIDAD = $idGeneralidades;
            $idCaracteristicas = CaracteristicasController::create($request);
            $queryData->ID_CARACTERISTICA = $idCaracteristicas;
            CodigosController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $idPuntajes = PuntajesController::create($request,"FESTIVIDADES_EVENTOS");
            $queryData->ID_VALORACION_FESTIVIDAD = $idPuntajes;
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
            HistorialController::createInsertDelete(
                $ID_USUARIO,'Festividades y Eventos',$queryData->ID_EVENTO,2
            );
            DB::commit();
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para eliminar un registro en la tabla de festividades y eventos */
    public function delete(Request $request)
    {
        $arrayMessage = HelperDelete::delete(
            $request,
            'ID_EVENTO',
            new FestividadesEventos(),
            "Festividades y Eventos"
        );
        return response()->json($arrayMessage);
    }

    /*Metodo para actualizar un registro de la tabla de festividades y eventos */
    public function update(Request $request)
    {
        $reglas = isset($request->REGLAS) ? $request->REGLAS : "-";
        $isValid = HelperValidator::Validate($this->mergeRules($reglas),$request);
        if($isValid != 1) return response()->json($isValid);
        DB::beginTransaction();
        try {
            $queryData = FestividadesEventos::find($request->ID_EVENTO);
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
            GeneralidadesController::update($clientData,$queryData,$ID_USUARIO);
            CaracteristicasController::update($request,$queryData,$ID_USUARIO);
            CodigosController::update($clientData,$queryData,$ID_USUARIO);
            PuntajesController::update($clientData,$queryData,$ID_USUARIO,"FESTIVIDADES_EVENTOS");
            RelevantesController::update($clientData,$queryData,$ID_USUARIO); 
            ActividadesController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosController::update($clientData,$queryData,$ID_USUARIO); 
            PromocionController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosEspecialesController::update($clientData,$queryData,$ID_USUARIO);
            RedesController::update($clientData,$queryData,$ID_USUARIO);
            foreach ($fields as $value) {
                if($queryData[$value] == $clientData[$value]) continue;
                HistorialController::createUpdate(
                    $ID_USUARIO,
                    'Festividades y Eventos',
                    $queryData->ID_LISTADO,
                    $queryData->ID_EVENTO,
                    $value,
                    $queryData[$value],
                    $clientData[$value]
                );
                $queryData[$value] = $clientData[$value];
                $queryData->save();
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            DB::commit();
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar los registros de festividades y eventos que no se han clasificado */
    public function getDataSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new FestividadesEventos(),'festividades_eventos','ID_EVENTO'
            )->whereNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "festividades_eventos.ID_EVENTO","DESC"
            )->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un registro especifico de festividades y eventos 
    que no se han clasificado */
    public function getRecordSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new FestividadesEventos(),'festividades_eventos','ID_EVENTO'
            )->whereNull("codigos.id_tipo_patrimonio")
            ->where("festividades_eventos.ID_EVENTO","=",$request->REGISTRO)
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
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar los registros de festividades y eventos que ya se clasificaron */
    public function getDataCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new FestividadesEventos(),
                'festividades_eventos',
                'ID_EVENTO',
                ["valoraciones_festividad.TOTAL as CALIFICACION","generalidades.GEORREFERENCIACION"],
                ["valoraciones_festividad","ID_VALORACION_FESTIVIDAD"]
            )->whereNotNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "festividades_eventos.ID_EVENTO","DESC"
            )->paginate(10)->toArray();
            $queryData = CodigosController::getData($queryData);
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un registro especifico de festividades y eventos 
    que ya se clasifico */
    public function getRecordCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryValidatePatrimonios(
                new FestividadesEventos(),
                'festividades_eventos',
                'ID_EVENTO',
                $request
            );
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $dataGeneralidades = GeneralidadesController::getRecord(
                $queryData->ID_GENERALIDAD,$queryData->ID_LISTADO
            );
            $dataCaracteristicas = CaracteristicasController::getRecord(
                $queryData->ID_CARACTERISTICA,$queryData->ID_LISTADO
            );
            $dataPuntajes = PuntajesController::getRecord(
                $queryData->ID_VALORACION_FESTIVIDAD,"FESTIVIDADES_EVENTOS"
            );
            $dataRelevantes = RelevantesController::getRecord($queryData->ID_RELEVANTE);
            $dataActividades = ActividadesController::getRecord($queryData->ID_ACTIVIDAD);
            $dataServicios = ServiciosController::getRecord($queryData->ID_SERVICIO);
            $dataAc_Ser = ["ACTIVIDADES_SERVICIOS"=>array_merge($dataActividades,$dataServicios)];
            $dataPromocion = PromocionController::getRecord($queryData->ID_PROMOCION);
            $dataEspeciales =  ServiciosEspecialesController::getRecord($queryData->ID_SERVICIO_ESPECIAL);
            $dataRedes = RedesController::getRecord($queryData->ID_RED_SOCIAL);
            $dataRef_Ob = [
                "REF_BIBLIOGRAFICA"=>$queryData->REF_BIBLIOGRAFICA,
                "OBSERVACIONES"=>$queryData->OBSERVACIONES,
                "ID_EVENTO"=>$queryData->ID_EVENTO
            ];
            $fechaCreacion = HelpersExport::templateHistorial(
                'Festividades y Eventos',
                $request->REGISTRO,2,
                $queryData->ID_LISTADO
            );
            $dataOtros = ["OTROS"=>array_merge($dataRedes,$dataRef_Ob,$fechaCreacion)];
            $mergeQuery = array_merge(
                $dataGeneralidades,
                $dataCaracteristicas,
                $dataPuntajes,
                $dataRelevantes,
                $dataAc_Ser,
                $dataPromocion,
                $dataEspeciales,
                $dataOtros
            );
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
            return response()->json(HelperLogs::Log($th));
        }
    }
}
