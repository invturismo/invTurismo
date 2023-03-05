<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promocion;
use App\Http\Controllers\HistorialController;

class PromocionController extends Controller
{
    /*Variable que define las reglas para la promocion del recurso turistico */
    public static $rules = [
        'FOLLETOS_GUIAS' => 'max:300',
        'PUBLICACIONES' => 'max:300',
        'TRIPADVISOR' => 'max:300',
        'CTRAVEL' => 'max:300',
        'GOOGLEM' => 'max:300',
        'PAGINA_WEB' => 'max:300',
        'YOUTUBE' => 'max:300',
        'OTROS2' => 'max:300',
    ];

    /*Metodo para crear un nuevo registro en la tabla de promocion */
    public static function create($clientData)
    {
        $promo = new Promocion();
        $promo->FOLLETOS_GUIAS = $clientData->FOLLETOS_GUIAS;
        $promo->PUBLICACIONES = $clientData->PUBLICACIONES;
        $promo->TRIPADVISOR = $clientData->TRIPADVISOR;
        $promo->CTRAVEL = $clientData->CTRAVEL;
        $promo->GOOGLEM = $clientData->GOOGLEM;
        $promo->PAGINA_WEB = $clientData->PAGINA_WEB;
        $promo->YOUTUBE = $clientData->YOUTUBE;
        $promo->OTROS = $clientData->OTROS2;
        $promo->save();
        return $promo->ID_PROMOCION;
    }

    /*Metodo para actualizar un registro de la tabla de promocion */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Promocion::find($queryUpdate->ID_PROMOCION);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'OTROS2' ? "OTROS" : $key;
            if($queryData[$valueUpdate] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'promocion',
                $queryUpdate->ID_LISTADO,
                $queryData->ID_PROMOCION,
                $valueUpdate,
                $queryData[$valueUpdate],
                $clientData[$key]
            );
            $queryData[$valueUpdate] = $clientData[$key];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de promocion */
    public static function getRecord($idPromocion)
    {
        $queryData = Promocion::find($idPromocion)->toArray();
        return ["PROMOCION"=>$queryData];
    }
}
