<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rules\ValidateBoolean;
use Illuminate\Support\Facades\Auth;
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
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use App\Helpers\HelperQuerys;
use App\Helpers\HelperFilter;
use App\Helpers\HelperValidator;
use App\Helpers\HelpersExport;
use App\Helpers\HelperDelete;
use App\Models\GruposEspeciales;
use App\Helpers\HelperLogs;

class GruposEspecialesController extends Controller
{
    public static function rules()
    {
        return [
            'ID_GRUPOS' => 'required|numeric',
            'APRO_INTERNACIONAL' => [new ValidateBoolean()],
            'REF_BIBLIOGRAFICA' => 'max:300',
            'OBSERVACIONES' => 'max:300',
        ];
    }

    public function mergeRules($state)
    {
        return array_merge(
            GeneralidadesController::rulesGeneralidades(),
            CaracteristicasController::rulesCaracteristicas($state),
            CodigosController::$rules,
            PuntajesController::rulesPuntajes('GRUPOS_ESPECIALES'),
            RelevantesController::rulesRelevantes(),
            ActividadesController::$rules,
            ServiciosController::$rules,
            PromocionController::$rules,
            ServiciosEspecialesController::$rules,
            RedesController::$rules,
            self::rules()
        );
    }

    public function insertForm(Request $request) 
    {
        $isValid = HelperValidator::Validate($this->mergeRules(false),$request);
        if($isValid != 1) return response()->json($isValid);
        try {
            $queryData = GruposEspeciales::find($request->ID_GRUPOS);
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
            $idPuntajes = PuntajesController::create($request,"GRUPOS_ESPECIALES");
            $queryData->ID_VALORACION_GRUPOS = $idPuntajes;
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
            $queryData->APRO_INTERNACIONAL = $request->APRO_INTERNACIONAL == "true";
            $queryData->save();
            HistorialController::createInsertDelete(
                $ID_USUARIO,'Grupos de Especial Interés',$queryData->ID_GRUPOS,2
            );
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function delete(Request $request)
    {
        $arrayMessage = HelperDelete::delete(
            $request,
            'ID_GRUPOS',
            new GruposEspeciales(),
            "Grupos de Especial Interés"
        );
        return response()->json($arrayMessage);
    }

    public function update(Request $request)
    {
        $reglas = isset($request->REGLAS) ? $request->REGLAS : "-";
        $isValid = HelperValidator::Validate($this->mergeRules($reglas),$request);
        if($isValid != 1) return response()->json($isValid);
        try {
            $queryData = GruposEspeciales::find($request->ID_GRUPOS);
            $validateName = CodigosController::existName($queryData->ID_LISTADO,$request,true);
            if($validateName) return response()->json([
                'state' => false,
                'errors' => [
                    'NOMBRE' => ['El recurso ya esta en la base de datos con el mismo Codigo']
                ]
            ]);
            $fields = ['REF_BIBLIOGRAFICA','OBSERVACIONES','APRO_INTERNACIONAL'];
            $clientData = $request->all();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            GeneralidadesController::update($clientData,$queryData,$ID_USUARIO);
            CaracteristicasController::update($request,$queryData,$ID_USUARIO);
            CodigosController::update($clientData,$queryData,$ID_USUARIO);
            PuntajesController::update($clientData,$queryData,$ID_USUARIO,"GRUPOS_ESPECIALES");
            RelevantesController::update($clientData,$queryData,$ID_USUARIO); 
            ActividadesController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosController::update($clientData,$queryData,$ID_USUARIO); 
            PromocionController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosEspecialesController::update($clientData,$queryData,$ID_USUARIO);
            RedesController::update($clientData,$queryData,$ID_USUARIO);
            foreach ($fields as $value) {
                $data = $value == 'APRO_INTERNACIONAL' ? 
                $clientData[$value] == 'true' : $clientData[$value];
                if($queryData[$value] == $data) continue;
                HistorialController::createUpdate(
                    $ID_USUARIO,
                    'Grupos de Especial Interés',
                    $queryData->ID_LISTADO,
                    $queryData->ID_GRUPOS,
                    $value,
                    $queryData[$value],
                    $data
                );
                $queryData[$value] = $data;
                $queryData->save();
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function getDataSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new GruposEspeciales(),'grupos_especiales','ID_GRUPOS'
            )->whereNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "grupos_especiales.ID_GRUPOS","DESC"
            )->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function getRecordSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new GruposEspeciales(),'grupos_especiales','ID_GRUPOS'
            )->whereNull("codigos.id_tipo_patrimonio")
            ->where("grupos_especiales.ID_GRUPOS","=",$request->REGISTRO)
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

    public function getDataCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new GruposEspeciales(),
                'grupos_especiales',
                'ID_GRUPOS',
                ["valoraciones_grupos.TOTAL as CALIFICACION","generalidades.GEORREFERENCIACION"],
                ["valoraciones_grupos","ID_VALORACION_GRUPOS"]
            )->whereNotNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "grupos_especiales.ID_GRUPOS","DESC"
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
    
    public function getRecordCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryValidatePatrimonios(
                new GruposEspeciales(),
                'grupos_especiales',
                'ID_GRUPOS',
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
                $queryData->ID_VALORACION_GRUPOS,"GRUPOS_ESPECIALES"
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
                "APRO_INTERNACIONAL" =>$queryData->APRO_INTERNACIONAL ? "true" : "false",
                "ID_GRUPOS"=>$queryData->ID_GRUPOS
            ];
            $fechaCreacion = HelpersExport::templateHistorial(
                'Grupos de Especial Interés',
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
