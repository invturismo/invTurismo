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
use App\Models\Historial_Update;

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

    public static function templateHistorial($tabla,$id,$movimiento,$idListado)
    {
        $queryHistorial = Historial_Insert_Delete::join('usuarios',"historial_insert_delete.ID_USUARIO","=","usuarios.ID_USUARIO")
        ->select('historial_insert_delete.FECHA_MOVIMIENTO','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
        ->where('historial_insert_delete.TABLA_MOVIMIENTO','=',$tabla)
        ->where('historial_insert_delete.ID_REGISTRO_MOVIMIENTO',"=",$id)
        ->where('historial_insert_delete.TIPO_MOVIMIENTO',"=",$movimiento)
        ->first()->toArray();
        $queryUpdate = Historial_Update::join('usuarios',"historial_update.ID_USUARIO","=","usuarios.ID_USUARIO")
        ->select('historial_update.FECHA_MODIFICACION','usuarios.PRIMER_NOMBRE','usuarios.PRIMER_APELLIDO')
        ->where('historial_update.ID_LISTADO_MODIFICADO',"=",$idListado)
        ->orderBy("historial_update.FECHA_MODIFICACION","DESC")
        ->first();
        $queryHistorial = [
            'FECHA_MOVIMIENTO'=> $queryHistorial['FECHA_MOVIMIENTO'],
            'USUARIO' => $queryHistorial['PRIMER_NOMBRE'].' '.$queryHistorial['PRIMER_APELLIDO'],
            'FECHA_MODIFICACION'=> isset($queryUpdate) ? $queryUpdate->FECHA_MODIFICACION : "",
            'USUARIO_AC' => isset($queryUpdate) ? $queryUpdate->PRIMER_NOMBRE.' '.$queryUpdate->PRIMER_APELLIDO : ""
        ];
        return $queryHistorial;
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
                $queryHistorial = $queryHistorial = self::templateHistorial('listados_preliminares',$value['ID_LISTADO'],1,$value['ID_LISTADO']);
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

    public static function historialClasificacion($value)
    {
        $id = self::WhoAtractivo($value['TIPO_BIEN'],$value['ID_LISTADO']);
        $queryHistorial = self::templateHistorial($value['TIPO_BIEN'],$id,1,$value['ID_LISTADO']);
        return $queryHistorial;
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
                $queryHistorial = self::templateHistorial($value['TIPO_BIEN'],$id,1,$value['ID_LISTADO']);
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

    public static function templateQuery($query,$table,$id,$valoracion)
    {
        $queryData = $query->join("listados_preliminares","listados_preliminares.ID_LISTADO","=","{$table}.ID_LISTADO")
        ->join("codigos","codigos.ID_CODIGO","=","listados_preliminares.ID_CODIGO")
        ->join('municipios', function ($join) {
            $join->on(function($query){
                $query->on('codigos.ID_MUNICIPIOS', '=', 'municipios.ID_MUNICIPIOS')
                ->on("codigos.ID_DEPARTAMENTOS",'municipios.ID_DEPARTAMENTOS');
        });})
        ->join("departamentos","municipios.ID_DEPARTAMENTOS","=","departamentos.ID_DEPARTAMENTOS")
        ->join("generalidades","generalidades.ID_GENERALIDAD","=","{$table}.ID_GENERALIDAD")
        ->select("{$table}.{$id} as ID","departamentos.DEPARTAMENTO","municipios.MUNICIPIO","listados_preliminares.NOMBRE","listados_preliminares.ID_LISTADO","{$valoracion}.TOTAL as CALIFICACION","listados_preliminares.UBICACION","generalidades.GEORREFERENCIACION")
        ->where("{$table}.EXIST","=",true)
        ->whereNotNull("codigos.id_tipo_patrimonio");
        return $queryData;
    }

    public static function filtersExport($request,$queryData)
    {
        if($request->ID_DEPARTAMENTOS) $queryData = $queryData->where("codigos.ID_DEPARTAMENTOS","=",$request->ID_DEPARTAMENTOS);
        if($request->ID_MUNICIPIOS) $queryData = $queryData->where("codigos.ID_MUNICIPIOS","=",$request->ID_MUNICIPIOS);
        return $queryData;
    }

    public function ExportPatrimonioMaterial(Request $request)
    {
        try {
            $queryData = PatrimoniosMateriales::join("valoraciones_material","valoraciones_material.ID_VALORACION_MATERIAL","=","patrimonios_materiales.ID_VALORACION_MATERIAL");
            $queryData = self::templateQuery($queryData,"patrimonios_materiales","ID_MATERIAL","valoraciones_material");
            $queryData = self::filtersExport($request,$queryData);
            $queryData = $queryData->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = self::templateHistorial('Patrimonio Cultural Material',$value['ID'],2,$value['ID_LISTADO']);
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

    public function ExportPatrimonioInmaterial(Request $request)
    {
        try {
            $queryData = PatrimoniosInmateriales::join("valoraciones_inmaterial","valoraciones_inmaterial.ID_VALORACION_INMATERIAL","=","patrimonios_inmateriales.ID_VALORACION_INMATERIAL");
            $queryData = self::templateQuery($queryData,"patrimonios_inmateriales","ID_INMATERIAL","valoraciones_inmaterial");
            $queryData = self::filtersExport($request,$queryData);
            $queryData = $queryData->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = self::templateHistorial('Patrimonio Cultural Inmaterial',$value['ID'],2,$value['ID_LISTADO']);
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
