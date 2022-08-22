<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CalidadMaterial;
use App\Models\ValoracionMaterial;
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
        ]
    ];

    public static function createValoracion($valoracion,$clientData)
    {
        $valoracion->ID_SIGNIFICADO = $clientData->ID_SIGNIFICADO;
        $valoracion->TOTAL = $clientData->TOTAL;
        $valoracion->save();
    }

    public static function updateValoracion($valoracion,$clientData,$name,$idValoracion,$idUsuario)
    {
        $fieldsValoracion = ['ID_SIGNIFICADO','TOTAL'];
        foreach ($fieldsValoracion as $value) {
            if($valoracion[$value] != $clientData[$value]) {
                HistorialController::createUpdate($idUsuario,$name,$idValoracion,$value,$valoracion[$value],$clientData[$value]);
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
        }
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$who)
    {
        switch ($who) {
            case 'PATRIMONIOS_MATERIALES':
                $queryData = ValoracionMaterial::find($queryUpdate->ID_VALORACION_MATERIAL);
                $calidad = CalidadMaterial::find($queryData->ID_CALIDAD_MATERIAL);
                foreach (self::$rulesCalidad[$who] as $key => $value) {
                    if($calidad[$key] != $clientData[$key]) {
                        HistorialController::createUpdate($idUsuario,'calidades_material',$calidad->ID_CALIDAD_MATERIAL,$key,$calidad[$key],$clientData[$key]);
                        $calidad[$key] = $clientData[$key];
                        $calidad->save();
                    }
                }
                self::updateValoracion($queryData,$clientData,'valoraciones_material',$queryData->ID_VALORACION_MATERIAL,$idUsuario);
            break;
        }
    }
}
