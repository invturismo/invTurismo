<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Redes;
use App\Http\Controllers\HistorialController;

class RedesController extends Controller
{
    public static $rules = [
        'PAGINA_WEB2' => 'max:200',
        'FACEBOOK' => 'max:200',
        'TWITTER' => 'max:200',
        'INSTAGRAM' => 'max:200',
        'OTRA' => 'max:200',
    ];

    public static function create($clientData)
    {
        $red = new Redes();
        $red->PAGINA_WEB = $clientData->PAGINA_WEB2;
        $red->FACEBOOK = $clientData->FACEBOOK;
        $red->TWITTER = $clientData->TWITTER;
        $red->INSTAGRAM = $clientData->INSTAGRAM;
        $red->OTRA = $clientData->OTRA;
        $red->save();
        return $red->ID_RED_SOCIAL;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Redes::find($queryUpdate->ID_RED_SOCIAL);
        foreach (self::$rules as $key => $value) {
            $valueUpdate = $key == 'PAGINA_WEB2' ? "PAGINA_WEB" : $key;
            if($queryData[$valueUpdate] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'redes',$queryData->ID_RED_SOCIAL,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
                $queryData[$valueUpdate] = $clientData[$key];
                $queryData->save();
            }
        }
    }

    public static function getRecord($idRedes)
    {
        $queryData = Redes::find($idRedes)->toArray();
        return ["REDES"=>$queryData];
    }
}
