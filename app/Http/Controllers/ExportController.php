<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Models\Historial_Insert_Delete;

class ExportController extends Controller
{
    public function ExportListadosPreliminares(Request $request)
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
            ->select("listados_preliminares.ID_LISTADO","listados_preliminares.UBICACION","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","fuentes.FUENTE")
            ->where('EXIST','=',true);
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            $queryData = $queryData->get()->toArray();
            foreach ($queryData as $key => $value) {
                $queryHistorial = Historial_Insert_Delete::join('usuarios',"historial_insert_delete.ID_USUARIO","=","usuarios.ID_USUARIO")
                ->select('historial_insert_delete.FECHA_MOVIMIENTO','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
                ->where('historial_insert_delete.TABLA_MOVIMIENTO','=','listados_preliminares')
                ->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$value['ID_LISTADO'])
                ->first()->toArray();
                $queryHistorial = [
                    'FECHA_MOVIMIENTO'=> $queryHistorial['FECHA_MOVIMIENTO'],
                    'USUARIO' => $queryHistorial['PRIMER_NOMBRE'].' '.$queryHistorial['PRIMER_APELLIDO']
                ];
                $queryData[$key] = array_merge($value,$queryHistorial);
            }
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function ExportClasificacion(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
            ->join("tipos_bien","listados_preliminares.ID_TIPO_BIEN","=","tipos_bien.ID_TIPO_BIEN")
            ->join('municipios', function ($join) {
                $join->on(function($query){
                    $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                    ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
            });})
            ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
            ->select("listados_preliminares.ID_LISTADO","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","tipos_bien.TIPO_BIEN","tipos_bien.TIPO_BIEN as Formulario")
            ->where('EXIST','=',true);
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            $queryData = $queryData->get()->toArray();
            foreach ($queryData as $key => $value) {
                $queryHistorial = Historial_Insert_Delete::join('usuarios',"historial_insert_delete.ID_USUARIO","=","usuarios.ID_USUARIO")
                ->select('historial_insert_delete.FECHA_MOVIMIENTO','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
                ->where('historial_insert_delete.TABLA_MOVIMIENTO','=','listados_preliminares')
                ->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$value['ID_LISTADO'])
                ->first()->toArray();
                $queryHistorial = [
                    'FECHA_MOVIMIENTO'=> $queryHistorial['FECHA_MOVIMIENTO'],
                    'USUARIO' => $queryHistorial['PRIMER_NOMBRE'].' '.$queryHistorial['PRIMER_APELLIDO']
                ];
                $queryData[$key] = array_merge($value,$queryHistorial);
            }
            return response()->json([
                "state" => true,
                "data" => $queryData
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
