<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Climas;
use App\Http\Controllers\HistorialController;
use App\Rules\ValidateNumber;

class ClimaController extends Controller
{
    public static function rules()
    {
        return [
            'ID_TIPO_CLIMA' => [new ValidateNumber(),'max:1'],
            'TEMPERATURA' => 'max:2',
        ];
    }

    public static function create($clientData)
    {
        $clima = new Climas();
        $clima->ID_TIPO_CLIMA = $clientData->ID_TIPO_CLIMA;
        $clima->TEMPERATURA = $clientData->TEMPERATURA;
        $clima->save();
        return $clima->ID_CLIMA;
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {
        $queryData = Climas::find($queryUpdate->ID_CLIMA);
        foreach (self::rules() as $key => $value) {
            if($queryData[$key] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'climas',
                $idListado,
                $queryData->ID_CLIMA,
                $key,
                $queryData[$key],
                $clientData[$key]
            );
            $queryData[$key] = $clientData[$key];
            $queryData->save();
        }
    }

    public static function getRecord($idClima)
    {
        $queryData = Climas::find($idClima)->toArray();
        return $queryData;
    }
}
