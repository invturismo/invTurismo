<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Codigos;
use App\Models\ListadosPreliminares;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\PatrimoniosMaterialesController;

class ListadosPreliminaresController extends Controller
{
    public function create(Request $request) {   
        $rules = [
            'ID_DEPARTAMENTOS'=>'required|max:2',
            'ID_MUNICIPIOS'=>'required|max:3',
            'NOMBRE'=>'required|max:200',
            'UBICACION'=>'required|max:200',
            'ID_FUENTE'=>'required|numeric'
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
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
            HistorialController::createInsertDelete($ID_USUARIO,'listados_preliminares',$listadosPreliminares->ID_LISTADO,1);
            return response()->json([
                'state' => true,
                'id_listado' => $listadosPreliminares->ID_LISTADO
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function delete(Request $request)
    {
        $rules = [
            'ID_LISTADO' => 'required|numeric',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        try {
            $queryData = ListadosPreliminares::select("listados_preliminares.ID_LISTADO","listados_preliminares.ACTUALIZANDO","listados_preliminares.EXIST")
            ->where("listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO)
            ->where("listados_preliminares.ID_TIPO_BIEN","=",NULL)
            ->where("listados_preliminares.EXIST","=",true)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $listadoPreliminar = ListadosPreliminares::find($request['ID_LISTADO']);
            if($listadoPreliminar->ACTUALIZANDO == true){
                return response()->json([
                    "state" => false,
                    "message" => "El registro está siendo actualizado"
                ]);
            }
            $listadoPreliminar->EXIST = false;
            $listadoPreliminar->save();
            HistorialController::createInsertDelete($ID_USUARIO,'listados_preliminares',$listadoPreliminar->ID_LISTADO,0);
            return response()->json([
                "state" => true
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
        $rules = [
            'ID_LISTADO' => 'required|numeric',
            'ID_DEPARTAMENTOS'=>'required|max:2',
            'ID_MUNICIPIOS'=>'required|max:3',
            'NOMBRE'=>'required|max:200',
            'UBICACION'=>'required|max:200',
            'ID_FUENTE'=>'required|numeric',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->select("listados_preliminares.ID_FUENTE","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
            ->where("listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryData = $queryData->toArray();
            $clientData = $request->all();
            $changedFieldsListadoPreliminar = array();
            $changedFieldsCodigo = array();
            foreach ($queryData as $key => $value){
                if($clientData[$key]==$value) continue;
                if($key=="ID_DEPARTAMENTOS"||$key=="ID_MUNICIPIOS"){
                    $changedFieldsCodigo[$key] = $clientData[$key];
                }else{
                    $changedFieldsListadoPreliminar[$key] = $clientData[$key];
                }
            }
            if(empty($changedFieldsListadoPreliminar) && empty($changedFieldsCodigo)) return response()->json([
                'state' => false,
                'message' => "No modifico nigun dato"
            ]);
            $listadoPreliminar = ListadosPreliminares::find($clientData['ID_LISTADO']);
            $codigo = Codigos::find($listadoPreliminar->ID_CODIGO);
            if(!empty($changedFieldsCodigo)) {
                $codigo->update($changedFieldsCodigo);
                foreach ($changedFieldsCodigo as $key => $value){
                    HistorialController::createUpdate($ID_USUARIO,'codigos',$codigo->ID_CODIGO,$key,$queryData[$key],$value);
                }
            }
            if(!empty($changedFieldsListadoPreliminar)) {
                $listadoPreliminar->update($changedFieldsListadoPreliminar);
                foreach ($changedFieldsListadoPreliminar as $key => $value){
                    HistorialController::createUpdate($ID_USUARIO,'listados_preliminares',$listadoPreliminar->ID_LISTADO,$key,$queryData[$key],$value);
                }
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }

    public function getData(Request $request) 
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join("fuentes","listados_preliminares.id_fuente","=","fuentes.id_fuente")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","listados_preliminares.ID_FUENTE","fuentes.FUENTE","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
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

    public function getRecord(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join("fuentes","listados_preliminares.id_fuente","=","fuentes.id_fuente")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","listados_preliminares.ID_FUENTE","fuentes.FUENTE","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
            ->where("listados_preliminares.ID_TIPO_BIEN","=",NULL)
            ->where("listados_preliminares.EXIST","=",1)
            ->where("listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
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

    public function infoUpdate(Request $request)
    {
        try {
            $listadoPreliminar = ListadosPreliminares::find($request->REGISTRO);
            if(!isset($listadoPreliminar)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->REGISTRO,1,$idTokenUser);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta actualizando"
            ]);
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join("fuentes","listados_preliminares.id_fuente","=","fuentes.id_fuente")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","listados_preliminares.ID_FUENTE","fuentes.FUENTE","codigos.ID_MUNICIPIOS","codigos.ID_DEPARTAMENTOS","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.UBICACION")
            ->where("listados_preliminares.ID_LISTADO","=",$request->REGISTRO)
            ->first()->toArray();
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

    public function clasificacion(Request $request)
    {
        $rules = [
            'ID_LISTADO' => 'required|numeric',
            'ID_TIPO_BIEN'=>'required|max:1',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'message' => 'No pasó la validación',
                'errors' => $validator->errors()
            ]);
        }
        $ID_USUARIO = Auth::user()->ID_USUARIO;
        try {
            $queryData = ListadosPreliminares::select("listados_preliminares.ID_TIPO_BIEN")
            ->where("listados_preliminares.ID_LISTADO","=",$request->ID_LISTADO)
            ->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryData = $queryData->toArray();
            $clientData = $request->all();
            $changedFieldsListadoPreliminar = array();
            foreach ($queryData as $key => $value){
                if($clientData[$key]==$value) continue;
                    $changedFieldsListadoPreliminar[$key] = $clientData[$key];
                    PatrimoniosClasificacionController::deleteForms($value,$request->ID_LISTADO,$ID_USUARIO); 
            }
            if(empty($changedFieldsListadoPreliminar)) return response()->json([
                'state' => false,
                'message' => "No modificó la clasificación del atractivo"
            ]);
            $listadoPreliminar = ListadosPreliminares::find($clientData['ID_LISTADO']);
            if(!empty($changedFieldsListadoPreliminar)) {
                $listadoPreliminar->update($changedFieldsListadoPreliminar);
                foreach ($changedFieldsListadoPreliminar as $key => $value){
                    HistorialController::createUpdate($ID_USUARIO,'listados_preliminares',$listadoPreliminar->ID_LISTADO,$key,$queryData[$key],$value);
                }
                PatrimoniosClasificacionController::insertForms($listadoPreliminar->ID_LISTADO,$value,$ID_USUARIO);
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }
}
