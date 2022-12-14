<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GeneralidadesController;
use App\Http\Controllers\CodigosController;
use App\Http\Controllers\CaracteristicasController;
use App\Http\Controllers\PuntajesController;
use App\Http\Controllers\ActividadesController;
use App\Http\Controllers\PromocionController;
use App\Http\Controllers\RedesController;
use App\Models\PatrimoniosInmateriales;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use App\Helpers\HelperQuerys;
use App\Helpers\HelperFilter;
use App\Helpers\HelperValidator;
use App\Helpers\HelpersExport;
use App\Helpers\HelperDelete;
use App\Helpers\HelperLogs;
use Illuminate\Support\Facades\DB;

class PatrimonioInmaterialController extends Controller
{
    /*Variable que define algunas reglas para los patrimonios inmateriales */
    public static $rules = [
        'ID_INMATERIAL' => 'required|numeric',
        'REF_BIBLIOGRAFICA' => 'max:300',
        'OBSERVACIONES' => 'max:300',
    ];

    /*Metodo que une todas las reglas necesarias para los patrimonios inmateriales */
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

    /*Metodo para completar un registro en la tabla de patrimonios inmateriales */
    public function insertForm(Request $request) 
    {
        $isValid = HelperValidator::Validate($this->mergeRules(false),$request);
        if($isValid != 1) return response()->json($isValid);
        DB::beginTransaction();
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
            $idGeneralidades = GeneralidadesController::create(
                $request,$queryData->ID_LISTADO,$ID_USUARIO,true
            );
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
            HistorialController::createInsertDelete(
                $ID_USUARIO,'Patrimonio Cultural Inmaterial',$queryData->ID_INMATERIAL,2
            );
            DB::commit();
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para eliminar un registro en la tabla de patrimonios inmateriales */
    public function delete(Request $request)
    {
        $arrayMessage = HelperDelete::delete(
            $request,
            'ID_INMATERIAL',
            new PatrimoniosInmateriales(),
            "Patrimonio Cultural Inmaterial"
        );
        return response()->json($arrayMessage);
    }

    /*Metodo para actualizar un registro de la tabla de patrimonios inmateriales */
    public function update(Request $request)
    {
        $reglas = isset($request->REGLAS) ? $request->REGLAS : "-";
        $isValid = HelperValidator::Validate($this->mergeRules($reglas),$request);
        if($isValid != 1) return response()->json($isValid);
        DB::beginTransaction();
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
                if($queryData[$value] == $clientData[$value]) continue;
                HistorialController::createUpdate(
                    $ID_USUARIO,
                    'Patrimonio Cultural Inmaterial',
                    $queryData->ID_LISTADO,
                    $queryData->ID_INMATERIAL,
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

    /*Metodo para consultar los registros de patrimonios inmateriales que no se han clasificado */
    public function getDataSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new PatrimoniosInmateriales(),'patrimonios_inmateriales','ID_INMATERIAL'
            )->whereNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "patrimonios_inmateriales.ID_INMATERIAL","DESC"
            )->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un registro especifico de patrimonios inmateriales 
    que no se han clasificado */
    public function getRecordSinCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new PatrimoniosInmateriales(),'patrimonios_inmateriales','ID_INMATERIAL'
            )->whereNull("codigos.id_tipo_patrimonio")
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
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar los registros de patrimonios inmateriales que ya se clasificaron */
    public function getDataCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryPatrimonios(
                new PatrimoniosInmateriales(),
                'patrimonios_inmateriales',
                'ID_INMATERIAL',
                ["valoraciones_inmaterial.TOTAL as CALIFICACION","generalidades.GEORREFERENCIACION"],
                ["valoraciones_inmaterial","ID_VALORACION_INMATERIAL"]
            )->whereNotNull("codigos.id_tipo_patrimonio");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "patrimonios_inmateriales.ID_INMATERIAL","DESC"
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

    /*Metodo para consultar un registro especifico de patrimonios inmateriales
    que ya se clasifico */
    public function getRecordCom(Request $request)
    {
        try {
            $queryData = HelperQuerys::queryValidatePatrimonios(
                new PatrimoniosInmateriales(),
                'patrimonios_inmateriales',
                'ID_INMATERIAL',
                $request
            );
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $dataGeneralidades = GeneralidadesController::getRecord(
                $queryData->ID_GENERALIDAD,$queryData->ID_LISTADO,true
            );
            $dataCaracteristicas = CaracteristicasController::getRecord(
                $queryData->ID_CARACTERISTICA,$queryData->ID_LISTADO
            );
            $dataPuntajes = PuntajesController::getRecord(
                $queryData->ID_VALORACION_INMATERIAL,"PATRIMONIOS_INMATERIALES"
            );
            $dataActividades = ActividadesController::getRecord($queryData->ID_ACTIVIDAD);
            $dataAc_Ser = ["ACTIVIDADES_SERVICIOS"=>$dataActividades];
            $dataPromocion = PromocionController::getRecord($queryData->ID_PROMOCION);
            $dataRedes = RedesController::getRecord($queryData->ID_RED_SOCIAL);
            $dataRef_Ob = [
                "REF_BIBLIOGRAFICA"=>$queryData->REF_BIBLIOGRAFICA,
                "OBSERVACIONES"=>$queryData->OBSERVACIONES,
                "ID_INMATERIAL"=>$queryData->ID_INMATERIAL
            ];
            $fechaCreacion = HelpersExport::templateHistorial(
                'Patrimonio Cultural Inmaterial',$request->REGISTRO,2,$queryData->ID_LISTADO
            );
            $dataOtros = ["OTROS"=>array_merge($dataRedes,$dataRef_Ob,$fechaCreacion)];
            $mergeQuery = array_merge(
                $dataGeneralidades,
                $dataCaracteristicas,
                $dataPuntajes,
                $dataAc_Ser,
                $dataPromocion,
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
