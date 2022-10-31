<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ListadosPreliminares;
use App\Http\Controllers\HistorialController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UpdateController;
use App\Helpers\HelperValidator;
use App\Helpers\HelpersClasificacion;
use App\Helpers\Joins;
use App\Helpers\HelperFilter;
use App\Helpers\HelpersExport;
use App\Helpers\HelperLogs;

class ClasificacionController extends Controller
{
    public function clasificacion(Request $request)
    {
        $rules = [
            'ID_LISTADO' => 'required|numeric',
            'ID_TIPO_BIEN'=>'required|max:1',
        ];
        $isValid = HelperValidator::Validate($rules,$request);
        if($isValid != 1) return response()->json($isValid);
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        DB::beginTransaction();
        try {
            $queryData = ListadosPreliminares::find($request->ID_LISTADO);
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            if($queryData->ID_TIPO_BIEN == $request->ID_TIPO_BIEN) return response()->json([
                'state' => false,
                'message' => "No modificó la clasificación del atractivo"
            ]);
            $previousBien = $queryData->ID_TIPO_BIEN;         
            $queryData->ID_TIPO_BIEN = $request->ID_TIPO_BIEN;
            $queryData->save();
            HelpersClasificacion::deleteForms(
                $previousBien,$request->ID_LISTADO,$ID_USUARIO
            );
            HistorialController::createUpdate(
                $ID_USUARIO,
                'listados_preliminares',
                $request->ID_LISTADO,
                $request->ID_LISTADO,
                'ID_TIPO_BIEN',
                $previousBien,
                $queryData->ID_TIPO_BIEN
            );
            $idRecord = HelpersClasificacion::insertForms(
                $request->ID_LISTADO,$queryData->ID_TIPO_BIEN,$ID_USUARIO
            );
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            DB::commit();
            return response()->json([
                "state" => true,
                "id" => $idRecord
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function templateQuery($selectArguments = [],$secondJoin = false)
    {
        $queryData = Joins::JoinGeneral(new ListadosPreliminares())->select(
            "listados_preliminares.ID_LISTADO",
            "codigos.ID_MUNICIPIOS",
            "codigos.ID_DEPARTAMENTOS",
            "departamentos.DEPARTAMENTO",
            "municipios.MUNICIPIO",
            "listados_preliminares.NOMBRE",
            ...$selectArguments
        )->where("listados_preliminares.EXIST","=",1);
        if($secondJoin) $queryData = $queryData->join(
            "tipos_bien","listados_preliminares.ID_TIPO_BIEN","=","tipos_bien.ID_TIPO_BIEN"
        );
        return $queryData;
    }

    public function getDataSin(Request $request)
    {
        try {
            $queryData = self::templateQuery()->whereNull("listados_preliminares.ID_TIPO_BIEN");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "listados_preliminares.ID_LISTADO","DESC"
            )->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function getRecordSin(Request $request)
    {
        try {
            $queryData = self::templateQuery()->whereNull("listados_preliminares.ID_TIPO_BIEN")
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
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function getDataCon(Request $request)
    {
        try {
            $queryData = self::templateQuery(["tipos_bien.ID_TIPO_BIEN","tipos_bien.TIPO_BIEN"],true)
            ->whereNotNull("listados_preliminares.ID_TIPO_BIEN");
            $queryData = HelperFilter::FilterAll($request,$queryData);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "listados_preliminares.ID_LISTADO","DESC"
            )->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function getRecordCon(Request $request)
    {
        try {
            $queryData = self::templateQuery(
                ["tipos_bien.ID_TIPO_BIEN","tipos_bien.TIPO_BIEN","codigos.ID_TIPO_PATRIMONIO"],true
            )->whereNotNull("listados_preliminares.ID_TIPO_BIEN")
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
                $queryHistorial = HelpersExport::historialClasificacion($queryData);
                $queryData = array_merge($queryData,$queryHistorial);
            }
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }
}
