<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
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
use App\Models\PatrimoniosMateriales;
use App\Http\Controllers\HistorialController;

class PatrimoniosMaterialesController extends Controller
{
    public static $rules = [
        'ID_MATERIAL' => 'required|numeric',
        'REF_BIBLIOGRAFICA' => 'max:300',
        'OBSERVACIONES' => 'max:300',
    ];

    public function mergeRules($state)
    {
        return array_merge(
            GeneralidadesController::rulesGeneralidades(),
            CaracteristicasController::rulesCaracteristicas($state),
            CodigosController::$rules,
            PuntajesController::rulesPuntajes('PATRIMONIOS_MATERIALES'),
            RelevantesController::rulesRelevantes(),
            ActividadesController::$rules,
            ServiciosController::$rules,
            PromocionController::$rules,
            ServiciosEspecialesController::$rules,
            RedesController::$rules,
            self::$rules
        );
    }

    public function insertForm(Request $request) 
    {
        $rules = $this->mergeRules(false);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }        
        try {
            $queryData = PatrimoniosMateriales::find($request->ID_MATERIAL);
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            $idGeneralidades = GeneralidadesController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $queryData->ID_GENERALIDAD = $idGeneralidades;
            $idCaracteristicas = CaracteristicasController::create($request);
            $queryData->ID_CARACTERISTICA = $idCaracteristicas;
            CodigosController::create($request,$queryData->ID_LISTADO,$ID_USUARIO);
            $idPuntajes = PuntajesController::create($request,"PATRIMONIOS_MATERIALES");
            $queryData->ID_VALORACION_MATERIAL = $idPuntajes;
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
            return response()->json([
                "state" => true,
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
        $reglas = isset($request->REGLAS) ? $request->REGLAS : "-";
        $rules = $this->mergeRules($reglas);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
            $queryData = PatrimoniosMateriales::find($request->ID_MATERIAL);
            $fields = ['REF_BIBLIOGRAFICA','OBSERVACIONES'];
            $clientData = $request->all();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            GeneralidadesController::update($clientData,$queryData,$ID_USUARIO);
            CaracteristicasController::update($request,$queryData,$ID_USUARIO);
            CodigosController::update($clientData,$queryData,$ID_USUARIO);
            PuntajesController::update($clientData,$queryData,$ID_USUARIO,"PATRIMONIOS_MATERIALES");
            RelevantesController::update($clientData,$queryData,$ID_USUARIO); 
            ActividadesController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosController::update($clientData,$queryData,$ID_USUARIO); 
            PromocionController::update($clientData,$queryData,$ID_USUARIO); 
            ServiciosEspecialesController::update($clientData,$queryData,$ID_USUARIO);
            RedesController::update($clientData,$queryData,$ID_USUARIO);
            foreach ($fields as $value) {
                if($queryData[$value] != $clientData[$value]) {
                    HistorialController::createUpdate($ID_USUARIO,'patrimonios_materiales',$queryData->ID_MATERIAL,$value,$queryData[$value],$clientData[$value]);
                    $queryData[$value] = $clientData[$value];
                    $queryData->save();
                }
            }
            return response()->json([
                "state" => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "state" => false,
                "message" => "Error en la base de datos",
                'phpMessage' => $th->getMessage()
            ]);
        }
    }
}
