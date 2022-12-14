<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Codigos;
use App\Models\ListadosPreliminares;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use App\Helpers\Joins;
use App\Helpers\HelperValidator;
use App\Helpers\HelperFilter;
use App\Helpers\HelpersExport;
use App\Helpers\HelpersClasificacion;
use App\Helpers\HelperLogs;
use Illuminate\Support\Facades\DB;

class ListadosPreliminaresController extends Controller
{
    /*Metodo que retorna las reglas para los listados preliminares del recurso turistico */
    public static function rules($update=false)
    {
        $templateRules = [
            'ID_DEPARTAMENTOS'=>'required|max:2',
            'ID_MUNICIPIOS'=>'required|max:3',
            'NOMBRE'=>'required|max:200|regex:/^[A-ZÁÉÍÓÚÑ&\s]+$/i',
            'UBICACION'=>'max:200',
            'ID_FUENTE'=>'required|numeric'
        ];
        if(!$update) return $templateRules;
        $updateRules = ['ID_LISTADO' => 'required|numeric'];
        return array_merge($updateRules,$templateRules);
    }

    /*Metodo para validar si el nombre del recurso turistico ya se encuntra en la base de datos */
    public function validateName(Request $request) 
    {
        try {
            $queryData = Joins::JoinGeneral(new ListadosPreliminares())
            ->where("listados_preliminares.EXIST","=",1)
            ->where('departamentos.ID_DEPARTAMENTOS',$request->ID_DEPARTAMENTOS)
            ->where('municipios.ID_MUNICIPIOS',$request->ID_MUNICIPIOS)
            ->where('listados_preliminares.NOMBRE',$request->NOMBRE);
            if(isset($request->ID_LISTADO)) $queryData = $queryData->where(
                'listados_preliminares.ID_LISTADO',
                '!=',$request->ID_LISTADO
            );
            $queryData = $queryData->first();
            if(!isset($queryData)) return response()->json([
                'state' => true,
            ]);
            return response()->json([
                'state' => false,
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para crear un nuevo registro en la tabla de listados preliminares */
    public function create(Request $request) { 
        $isValid = HelperValidator::Validate(self::rules(),$request);
        if($isValid != 1) return response()->json($isValid);
        DB::beginTransaction();
        try {
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            $codigos = new Codigos();
            $codigos->ID_MUNICIPIOS = $request->ID_MUNICIPIOS;
            $codigos->ID_DEPARTAMENTOS = $request->ID_DEPARTAMENTOS;
            $codigos->save();
            $ID_CODIGO = $codigos->ID_CODIGO;
            $listadosPreliminares = new ListadosPreliminares();
            $listadosPreliminares->ID_FUENTE = $request->ID_FUENTE;
            $listadosPreliminares->ID_CODIGO = $ID_CODIGO;
            $listadosPreliminares->NOMBRE = $request->NOMBRE;
            $listadosPreliminares->UBICACION = $request->UBICACION;
            $listadosPreliminares->save();
            HistorialController::createInsertDelete(
                $ID_USUARIO,
                'listados_preliminares',
                $listadosPreliminares->ID_LISTADO,1
            );
            DB::commit();
            return response()->json([
                'state' => true,
                'id_listado' => $listadosPreliminares->ID_LISTADO
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para eliminar un registro en la tabla de lisatados preliminares */
    public function delete(Request $request)
    {
        $rules = ['ID_LISTADO' => 'required|numeric'];
        $isValid = HelperValidator::Validate($rules,$request);
        if($isValid != 1) return response()->json($isValid);
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        DB::beginTransaction();
        try {
            $listadoPreliminar = Joins::JoinCodigo(new ListadosPreliminares())
            ->select("listados_preliminares.*")
            ->where('listados_preliminares.EXIST','=',true)
            ->where('listados_preliminares.ID_LISTADO','=',$request->ID_LISTADO)
            ->whereNull('codigos.ID_TIPO_PATRIMONIO')->first();
            if(!isset($listadoPreliminar)) return response()->json([
                'state' => false,
                'message' => "El registro no existe o no se puede eliminar"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->ID_LISTADO,1,$idTokenUser,true);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta actualizando"
            ]);
            HelpersClasificacion::deleteForms(
                $listadoPreliminar['ID_TIPO_BIEN'],
                $request->ID_LISTADO,
                $ID_USUARIO
            );              
            $listadoPreliminar->EXIST = false;
            $listadoPreliminar->save();
            HistorialController::createInsertDelete(
                $ID_USUARIO,
                'listados_preliminares',
                $listadoPreliminar->ID_LISTADO,0
            );
            DB::commit();
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para actualizar un registro de la tabla de listados preliminares */
    public function update(Request $request) 
    {
        $isValid = HelperValidator::Validate(self::rules(true),$request);
        if($isValid != 1) return response()->json($isValid);
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        DB::beginTransaction();
        try {
            $queryData = Joins::JoinCodigo(new ListadosPreliminares())
            ->select(
                "listados_preliminares.ID_FUENTE",
                "codigos.ID_MUNICIPIOS",
                "codigos.ID_DEPARTAMENTOS",
                "listados_preliminares.NOMBRE",
                "listados_preliminares.UBICACION"
            )->where("listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO)
            ->first()->toArray();
            $clientData = $request->all();
            $counterChanges = 0;
            $codigoChanges = [];
            $listadoPreliminar = ListadosPreliminares::find($clientData['ID_LISTADO']);
            $codigo = Codigos::find($listadoPreliminar->ID_CODIGO);
            foreach ($queryData as $key => $value){
                if($clientData[$key]==$value) continue;
                if($key=="ID_DEPARTAMENTOS"||$key=="ID_MUNICIPIOS"){
                    $codigoChanges[$key] = $clientData[$key];
                    HistorialController::createUpdate(
                        $ID_USUARIO,
                        'codigos',
                        $clientData['ID_LISTADO'],
                        $codigo->ID_CODIGO,
                        $key,
                        $value,
                        $clientData[$key]
                    );
                }
                else {
                    $listadoPreliminar[$key] = $clientData[$key];
                    $listadoPreliminar->save();
                    HistorialController::createUpdate(
                        $ID_USUARIO,
                        'listados_preliminares',
                        $clientData['ID_LISTADO'],
                        $clientData['ID_LISTADO'],
                        $key,
                        $value,
                        $clientData[$key]
                    );
                }
                $counterChanges += 1;
            }
            if($counterChanges==0) return response()->json([
                'state' => false,
                'message' => "No modifico nigun dato"
            ]);
            $codigo->update($codigoChanges);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            DB::commit();
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo que contiene la plantilla para consultar un listado preliminar */
    public static function templateQuery()
    {
        $queryData = ListadosPreliminares::join(
            "fuentes",
            "listados_preliminares.id_fuente",
            "=","fuentes.id_fuente"
        );
        $queryData = Joins::JoinGeneral($queryData)
        ->select(
            "listados_preliminares.ID_LISTADO",
            "listados_preliminares.ID_FUENTE",
            "fuentes.FUENTE","codigos.ID_MUNICIPIOS",
            "codigos.ID_DEPARTAMENTOS",
            "departamentos.DEPARTAMENTO",
            "municipios.MUNICIPIO",
            "listados_preliminares.NOMBRE",
            "listados_preliminares.UBICACION",
            "listados_preliminares.ID_TIPO_BIEN",
            "codigos.ID_TIPO_PATRIMONIO"
        )->where("listados_preliminares.EXIST","=",1);
        return $queryData;
    }

    /*Metodo para consultar los registros de listados preliminares */
    public function getData(Request $request) 
    {
        try {
            $queryData = self::templateQuery();
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

    /*Metodo para consultar un registro especifico de listados preliminares */
    public function getRecord(Request $request)
    {
        try {
            $queryData = self::templateQuery()->where(
                "listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO
            )->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryHistorial = HelpersExport::templateHistorial(
                'listados_preliminares',
                $request->ID_LISTADO,1,
                $request->ID_LISTADO
            );
            $queryData = $queryData->toArray();
            $queryData = array_merge($queryData,$queryHistorial);
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un registro especifico de listados preliminares e informar 
    a la base de datos que ese registro se esta actualizando*/
    public function infoUpdate(Request $request)
    {
        try {
            $queryData = self::templateQuery()->where(
                "listados_preliminares.ID_LISTADO","=",$request->REGISTRO
            )->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->REGISTRO,1,$idTokenUser,false);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta actualizando"
            ]);            
            if(isset($queryData->ID_TIPO_PATRIMONIO)) return response()->json([
                'state' => false,
                'message' => "No es posible actualizar, tienes que actualizarlo en su correspondiente clasificacion"
            ]);
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }
}
