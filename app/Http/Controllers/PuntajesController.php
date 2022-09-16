<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CalidadMaterial;
use App\Models\CalidadInmaterial;
use App\Models\CalidadSitios;
use App\Models\ValoracionMaterial;
use App\Models\ValoracionInmaterial;
use App\Models\ValoracionesGrupos;
use App\Models\ValoracionesSitios;
use App\Http\Controllers\HistorialController;

class PuntajesController extends Controller
{
    public static $rules = [
        'TOTAL' => 'required|numeric|between:0,100',
        'ID_SIGNIFICADO' => 'required|max:1',
    ];

    public static $rulesCalidad = [
        'PATRIMONIOS_MATERIALES' => [
            'ESTADO_CONSERVACION' => 'required|numeric|between:0,21',
            'CONSTITUCION' => 'required|numeric|between:0,21',
            'REPRESENTATIVIDAD' => 'required|numeric|between:0,28',
            'SUBTOTAL' => 'required|numeric|between:0,70',
        ],
        'PATRIMONIOS_INMATERIALES' => [
            'COLECTIVA' => 'required|numeric|between:0,14',
            'TRADICIONAL' => 'required|numeric|between:0,14',
            'ANONIMA' => 'required|numeric|between:0,14',
            'ESPONTANEA' => 'required|numeric|between:0,14',
            'POPULAR' => 'required|numeric|between:0,14',
            'SUBTOTAL' => 'required|numeric|between:0,70',
        ],
        'GRUPOS_ESPECIALES' => [
            'R_COSTUMBRES' => 'required|numeric|between:0,70'
        ],
        'SITIOS_NATURALES' => [
            'S_C_AIRE' => 'required|numeric|between:0,10',
            'S_C_AGUA' => 'required|numeric|between:0,10',
            'S_C_VISUAL' => 'required|numeric|between:0,10',
            'CONSERVACION' => 'required|numeric|between:0,10',
            'S_C_SONORA' => 'required|numeric|between:0,10',
            'DIVERSIDAD' => 'required|numeric|between:0,10',
            'SINGULARIDAD' => 'required|numeric|between:0,10',
            'SUBTOTAL' => 'required|numeric|between:0,70'
        ]
    ];

    public static function createValoracion($valoracion,$clientData)
    {
        $valoracion->ID_SIGNIFICADO = $clientData->ID_SIGNIFICADO;
        $valoracion->TOTAL = $clientData->TOTAL;
        $valoracion->save();
    }

    public static function updateValoracion(
        $valoracion,$clientData,$name,$idValoracion,$idUsuario,$idListado
    )
    {
        $fieldsValoracion = ['ID_SIGNIFICADO','TOTAL'];
        foreach ($fieldsValoracion as $value) {
            if($valoracion[$value] != $clientData[$value]) {
                HistorialController::createUpdate(
                    $idUsuario,
                    $name,
                    $idListado,
                    $idValoracion,
                    $value,
                    $valoracion[$value],
                    $clientData[$value]
                );
                $valoracion[$value] = $clientData[$value];
                $valoracion->save();
            }
        }
    }

    public static function rulesPuntajes($who)
    {
        $rulesWho = self::$rulesCalidad[$who];
        return array_merge(self::$rules,$rulesWho);
    }

    public static function create($clientData,$who)
    {
        switch ($who) {
            case 'PATRIMONIOS_MATERIALES':
                $calidad = new CalidadMaterial();
                $calidad->ESTADO_CONSERVACION = $clientData->ESTADO_CONSERVACION;
                $calidad->CONSTITUCION = $clientData->CONSTITUCION;
                $calidad->REPRESENTATIVIDAD = $clientData->REPRESENTATIVIDAD;
                $calidad->SUBTOTAL = $clientData->SUBTOTAL;
                $calidad->save();
                $valoracion = new ValoracionMaterial();
                $valoracion->ID_CALIDAD_MATERIAL = $calidad->ID_CALIDAD_MATERIAL;
                self::createValoracion($valoracion,$clientData);
                return $valoracion->ID_VALORACION_MATERIAL;
            break;
            case 'PATRIMONIOS_INMATERIALES':
                $calidad = new CalidadInmaterial();
                $calidad->COLECTIVA = $clientData->COLECTIVA;
                $calidad->TRADICIONAL = $clientData->TRADICIONAL;
                $calidad->ANONIMA = $clientData->ANONIMA;
                $calidad->ESPONTANEA = $clientData->ESPONTANEA;
                $calidad->POPULAR = $clientData->POPULAR;
                $calidad->SUBTOTAL = $clientData->SUBTOTAL;
                $calidad->save();
                $valoracion = new ValoracionInmaterial();
                $valoracion->ID_CALIDAD_INMATERIAL = $calidad->ID_CALIDAD_INMATERIAL;
                self::createValoracion($valoracion,$clientData);
                return $valoracion->ID_VALORACION_INMATERIAL;
            break;
            case 'GRUPOS_ESPECIALES':
                $valoracion = new ValoracionesGrupos();
                $valoracion->R_COSTUMBRES = $clientData->R_COSTUMBRES;
                $valoracion->ID_SIGNIFICADO = $clientData->ID_SIGNIFICADO;
                $valoracion->TOTAL = $clientData->TOTAL;
                $valoracion->save();
                return $valoracion->ID_VALORACION_GRUPOS;
            break;
            case 'SITIOS_NATURALES':
                $calidad = new CalidadSitios();
                $calidad->S_C_AIRE = $clientData->S_C_AIRE;
                $calidad->S_C_AGUA = $clientData->S_C_AGUA;
                $calidad->S_C_VISUAL = $clientData->S_C_VISUAL;
                $calidad->CONSERVACION = $clientData->CONSERVACION;
                $calidad->S_C_SONORA = $clientData->S_C_SONORA;
                $calidad->DIVERSIDAD = $clientData->DIVERSIDAD;
                $calidad->SINGULARIDAD = $clientData->SINGULARIDAD;
                $calidad->SUBTOTAL = $clientData->SUBTOTAL;
                $calidad->save();
                $valoracion = new ValoracionesSitios();
                $valoracion->ID_CALIDAD_SITIO = $calidad->ID_CALIDAD_SITIO;
                self::createValoracion($valoracion,$clientData);
                return $valoracion->ID_VALORACION_SITIO;
            break;
        }
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$who)
    {
        switch ($who) {
            case 'PATRIMONIOS_MATERIALES':
                $queryData = ValoracionMaterial::find($queryUpdate->ID_VALORACION_MATERIAL);
                $calidad = CalidadMaterial::find($queryData->ID_CALIDAD_MATERIAL);
                foreach (self::$rulesCalidad[$who] as $key => $value) {
                    if($calidad[$key] == $clientData[$key]) continue;
                    HistorialController::createUpdate(
                        $idUsuario,
                        'calidades_material',
                        $queryUpdate->ID_LISTADO,
                        $calidad->ID_CALIDAD_MATERIAL,
                        $key,
                        $calidad[$key],
                        $clientData[$key]
                    );
                    $calidad[$key] = $clientData[$key];
                    $calidad->save();
                }
                self::updateValoracion(
                    $queryData,
                    $clientData,
                    'valoraciones_material',
                    $queryData->ID_VALORACION_MATERIAL,
                    $idUsuario,
                    $queryUpdate->ID_LISTADO
                );
            break;
            case 'PATRIMONIOS_INMATERIALES':
                $queryData = ValoracionInmaterial::find($queryUpdate->ID_VALORACION_INMATERIAL);
                $calidad = CalidadInmaterial::find($queryData->ID_CALIDAD_INMATERIAL);
                foreach (self::$rulesCalidad[$who] as $key => $value) {
                    if($calidad[$key] == $clientData[$key]) continue;
                    HistorialController::createUpdate(
                        $idUsuario,
                        'calidades_inmaterial',
                        $queryUpdate->ID_LISTADO,
                        $calidad->ID_CALIDAD_INMATERIAL,
                        $key,
                        $calidad[$key],
                        $clientData[$key]
                    );
                    $calidad[$key] = $clientData[$key];
                    $calidad->save();
                }
                self::updateValoracion(
                    $queryData,
                    $clientData,
                    'valoraciones_inmaterial',
                    $queryData->ID_VALORACION_INMATERIAL,
                    $idUsuario,
                    $queryUpdate->ID_LISTADO
                );
            break;
            case 'GRUPOS_ESPECIALES':
                $queryData = ValoracionesGrupos::find($queryUpdate->ID_VALORACION_GRUPOS);
                foreach ($queryData->toArray() as $key => $value) {
                    if(!isset($clientData[$key])) continue;
                    if($queryData[$key] == $clientData[$key]) continue;
                    HistorialController::createUpdate(
                        $idUsuario,
                        'calidades_inmaterial',
                        $queryUpdate->ID_LISTADO,
                        $calidad->ID_CALIDAD_INMATERIAL,
                        $key,
                        $calidad[$key],
                        $clientData[$key]
                    );
                    $queryData[$key] = $clientData[$key];
                    $queryData->save();
                }
            break;
            case 'SITIOS_NATURALES':
                $queryData = ValoracionesSitios::find($queryUpdate->ID_VALORACION_SITIO);
                $calidad = CalidadSitios::find($queryData->ID_CALIDAD_SITIO);
                foreach (self::$rulesCalidad[$who] as $key => $value) {
                    if($calidad[$key] == $clientData[$key]) continue;
                    HistorialController::createUpdate(
                        $idUsuario,
                        'calidades_sitios',
                        $queryUpdate->ID_LISTADO,
                        $calidad->ID_CALIDAD_SITIO,
                        $key,
                        $calidad[$key],
                        $clientData[$key]
                    );
                    $calidad[$key] = $clientData[$key];
                    $calidad->save();
                }
                self::updateValoracion(
                    $queryData,
                    $clientData,
                    'valoraciones_sitios',
                    $queryData->ID_VALORACION_SITIO,
                    $idUsuario,
                    $queryUpdate->ID_LISTADO
                );
            break;
        }
    }

    public static function getRecord($idPuntaje,$who)
    {
        switch ($who) {
            case 'PATRIMONIOS_MATERIALES':
                $queryData = ValoracionMaterial::find($idPuntaje)->toArray();
                $queryCalidad = CalidadMaterial::find($queryData["ID_CALIDAD_MATERIAL"]);
                return [
                    "PUNTAJES_VALORACION" => array_merge($queryData,["CALIDAD"=>$queryCalidad])
                ];
            break;
            case 'PATRIMONIOS_INMATERIALES':
                $queryData = ValoracionInmaterial::find($idPuntaje)->toArray();
                $queryCalidad = CalidadInmaterial::find($queryData["ID_CALIDAD_INMATERIAL"]);
                return [
                    "PUNTAJES_VALORACION" => array_merge($queryData,["CALIDAD"=>$queryCalidad])
                ];
            break;
            case 'GRUPOS_ESPECIALES':
                $queryData = ValoracionesGrupos::find($idPuntaje)->toArray();
                return [
                    "PUNTAJES_VALORACION" => array_merge(
                        $queryData,["CALIDAD"=>[
                            "R_COSTUMBRES" => $queryData['R_COSTUMBRES']
                        ]]
                    )
                ];
            break;
            case 'SITIOS_NATURALES':
                $queryData = ValoracionesSitios::find($idPuntaje)->toArray();
                $queryCalidad = CalidadSitios::find($queryData["ID_CALIDAD_SITIO"]);
                return [
                    "PUNTAJES_VALORACION" => array_merge($queryData,["CALIDAD"=>$queryCalidad])
                ];
            break;
        }
    }
}
