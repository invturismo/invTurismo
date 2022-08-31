<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Models\Historial_Insert_Delete;
use App\Http\Controllers\CodigosController;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;

class ExportController extends Controller
{
    public static function WhoAtractivo($tipoBien,$idListado)
    {
        $id = "";
        switch ($tipoBien) {
            case 'Patrimonio Cultural Material':
                $query = PatrimoniosMateriales::select()->where("ID_LISTADO",$idListado)->first();
                $id = $query->ID_MATERIAL;
                break;
            case 'Patrimonio Cultural Inmaterial':
                $query = PatrimoniosInmateriales::select()->where("ID_LISTADO",$idListado)->first();
                $id = $query->ID_INMATERIAL;
                break;
            case 'Festividades y Eventos':
                $query = FestividadesEventos::select()->where("ID_LISTADO",$idListado)->first();
                $id = $query->ID_EVENTO;
                break;
            case 'Grupos de Especial Interés':
                $query = GruposEspeciales::select()->where("ID_LISTADO",$idListado)->first();
                $id = $query->ID_GRUPO;
                break;
            case 'Sitios Naturales':
                $query = SitiosNaturales::select()->where("ID_LISTADO",$idListado)->first();
                $id = $query->ID_SITIO;
                break;
        }
        return $id;
    }

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
                $id = self::WhoAtractivo($value['TIPO_BIEN'],$value['ID_LISTADO']);
                $queryHistorial = Historial_Insert_Delete::join('usuarios',"historial_insert_delete.ID_USUARIO","=","usuarios.ID_USUARIO")
                ->select('historial_insert_delete.FECHA_MOVIMIENTO','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
                ->where('historial_insert_delete.TABLA_MOVIMIENTO','=',$value['TIPO_BIEN'])
                ->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$id)
                ->where('historial_insert_delete.TIPO_MOVIMIENTO',"=",1)
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

    public function ExportPatrimonioMaterial(Request $request)
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
            ->select("patrimonios_materiales.ID_MATERIAL as ID","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","valoraciones_material.TOTAL as CALIFICACION","listados_preliminares.UBICACION","generalidades.GEORREFERENCIACION")
            ->where("patrimonios_materiales.EXIST","=",true)
            ->whereNotNull("codigos.id_tipo_patrimonio");
            if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
            if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
            $queryData = $queryData->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = Historial_Insert_Delete::join('usuarios',"historial_insert_delete.ID_USUARIO","=","usuarios.ID_USUARIO")
                ->select('historial_insert_delete.FECHA_MOVIMIENTO','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
                ->where('historial_insert_delete.TABLA_MOVIMIENTO','=','Patrimonio Cultural Material')
                ->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$value['ID'])
                ->where('historial_insert_delete.TIPO_MOVIMIENTO',"=",2)
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
