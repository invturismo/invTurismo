<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Climas;
use App\Http\Controllers\HistorialController;

class ClimaController extends Controller
{
    public static $rules = [
        'ID_TIPO_CLIMA' => 'numeric|max:1',
        'TEMPERATURA' => 'max:4',
    ];

    public static function create($clientData)
    {
        $clima = new Climas();
        $clima->ID_TIPO_CLIMA = $clientData->ID_TIPO_CLIMA;
        $clima->TEMPERATURA = $clientData->TEMPERATURA;
        $clima->save();
        return $clima->ID_CLIMA;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Climas::find($queryUpdate->ID_CLIMA);
        foreach (self::$rules as $key => $value) {
            if($queryData[$key] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'climas',$queryData->ID_CLIMA,$key,$queryData[$key],$clientData[$key]);
                $queryData[$key] = $clientData[$key];
                $queryData->save();
            }
        }
    }
}
