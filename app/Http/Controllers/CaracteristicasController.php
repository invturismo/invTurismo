<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ImagenesController;
use App\Models\Caracteristicas;
use App\Http\Controllers\HistorialController;

class CaracteristicasController extends Controller
{
    public static $rules = [
        'DESCRIPCION' => 'max:300',
    ];

    public static function rulesCaracteristicas($state)
    {
        $rulesImagenes = ImagenesController::rules($state);
        return array_merge(self::$rules,$rulesImagenes);
    }

    public static function create($clientData)
    {
        $idImagen = ImagenesController::create($clientData);
        $caracteristicas = new Caracteristicas();
        $caracteristicas->DESCRIPCION = $clientData->DESCRIPCION;
        $caracteristicas->ID_IMAGEN = $idImagen;
        $caracteristicas->save();
        return $caracteristicas->ID_CARACTERISTICA;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Caracteristicas::find($queryUpdate->ID_CARACTERISTICA);
        ImagenesController::update($clientData,$queryData,$idUsuario);
        $clientData = $clientData->all();
        if($queryData['DESCRIPCION'] != $clientData['DESCRIPCION']){
            HistorialController::createUpdate($idUsuario,'caracteristicas',$queryData->ID_CARACTERISTICA,'DESCRIPCION',$queryData['DESCRIPCION'],$clientData['DESCRIPCION']);
            $queryData['DESCRIPCION'] = $clientData['DESCRIPCION'];
            $queryData->save();
        }
    }
}
