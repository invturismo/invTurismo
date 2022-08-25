<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promocion;
use App\Http\Controllers\HistorialController;

class PromocionController extends Controller
{
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

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Promocion::find($queryUpdate->ID_PROMOCION);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'OTROS2' ? "OTROS" : $key;
            if($queryData[$valueUpdate] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'promocion',$queryData->ID_PROMOCION,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
                $queryData[$valueUpdate] = $clientData[$key];
                $queryData->save();
            }
        }
    }
}
