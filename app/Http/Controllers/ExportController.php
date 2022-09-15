<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Http\Controllers\CodigosController;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;
use App\Helpers\HelpersExport;
use App\Helpers\Joins;
use App\Helpers\HelperFilter;

class ExportController extends Controller
{
    public function ExportListadosPreliminares(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::join(
                "fuentes",
                "listados_preliminares.id_fuente",
                "=","fuentes.id_fuente"
            );
            $queryData = Joins::JoinGeneral($queryData)->select(
                "listados_preliminares.ID_LISTADO",
                "listados_preliminares.UBICACION",
                "departamentos.DEPARTAMENTO",
                "municipios.MUNICIPIO",
                "listados_preliminares.NOMBRE",
                "fuentes.FUENTE"
            )->where('EXIST','=',true);
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
            foreach ($queryData as $key => $value) {
                $queryHistorial = $queryHistorial = HelpersExport::templateHistorial(
                    'listados_preliminares',$value['ID_LISTADO'],1,$value['ID_LISTADO']
                );
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
            $queryData = ListadosPreliminares::join(
                "tipos_bien",
                "listados_preliminares.ID_TIPO_BIEN",
                "=","tipos_bien.ID_TIPO_BIEN"
            );
            $queryData = Joins::JoinGeneral($queryData)->select(
                "listados_preliminares.ID_LISTADO",
                "departamentos.DEPARTAMENTO",
                "municipios.MUNICIPIO",
                "listados_preliminares.NOMBRE",
                "tipos_bien.TIPO_BIEN",
                "tipos_bien.TIPO_BIEN as Formulario"
            )->where('EXIST','=',true);
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
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

    public function ExportPatrimonioMaterial(Request $request)
    {
        try {
            $queryData = PatrimoniosMateriales::join(
                "valoraciones_material",
                "valoraciones_material.ID_VALORACION_MATERIAL",
                "=","patrimonios_materiales.ID_VALORACION_MATERIAL"
            );
            $queryData = HelpersExport::templateQuery(
                $queryData,
                "patrimonios_materiales",
                "ID_MATERIAL",
                "valoraciones_material"
            );
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = HelpersExport::templateHistorial(
                    'Patrimonio Cultural Material',
                    $value['ID'],2,
                    $value['ID_LISTADO']
                );
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
            $queryData = PatrimoniosInmateriales::join(
                "valoraciones_inmaterial",
                "valoraciones_inmaterial.ID_VALORACION_INMATERIAL",
                "=","patrimonios_inmateriales.ID_VALORACION_INMATERIAL"
            );
            $queryData = HelpersExport::templateQuery(
                $queryData,
                "patrimonios_inmateriales",
                "ID_INMATERIAL",
                "valoraciones_inmaterial"
            );
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = HelpersExport::templateHistorial(
                    'Patrimonio Cultural Inmaterial',
                    $value['ID'],2,
                    $value['ID_LISTADO']
                );
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

    public function ExportGruposEspeciales(Request $request)
    {
        try {
            $queryData = GruposEspeciales::join(
                "valoraciones_grupos",
                "valoraciones_grupos.ID_VALORACION_GRUPOS",
                "=","grupos_especiales.ID_VALORACION_GRUPOS"
            );
            $queryData = HelpersExport::templateQuery(
                $queryData,
                "grupos_especiales",
                "ID_GRUPOS",
                "valoraciones_grupos"
            );
            $queryData = HelperFilter::FilterAll($request,$queryData)->get()->toArray();
            if(count($queryData)>0) $queryData = CodigosController::getExport($queryData);
            foreach ($queryData as $key => $value) {
                $queryHistorial = HelpersExport::templateHistorial(
                    'Grupos de Especial Interés',
                    $value['ID'],2,
                    $value['ID_LISTADO']
                );
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
