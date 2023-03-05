<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ImagenesController;
use App\Models\Caracteristicas;
use App\Http\Controllers\HistorialController;
use App\Models\ListadosPreliminares;
use App\Http\Controllers\CodigosController;

class CaracteristicasController extends Controller
{
    /*Variable que define las reglas para las caracteristicas del recurso turistico */
    public static $rules = [
        'DESCRIPCION' => 'max:300',
    ];

    /*Metodo que retorna la union de las reglas de las caracteristicas e imagenes */
    public static function rulesCaracteristicas($state)
    {
        $rulesImagenes = ImagenesController::rules($state);
        return array_merge(self::$rules,$rulesImagenes);
    }

    /*Metodo para crear un nuevo registro en la tabla de caracteristicas */
    public static function create($clientData)
    {
        $idImagen = ImagenesController::create($clientData);
        $caracteristicas = new Caracteristicas();
        $caracteristicas->DESCRIPCION = $clientData->DESCRIPCION;
        $caracteristicas->ID_IMAGEN = $idImagen;
        $caracteristicas->save();
        return $caracteristicas->ID_CARACTERISTICA;
    }

    /*Metodo para actualizar un registro de la tabla de caracteristicas */
    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Caracteristicas::find($queryUpdate->ID_CARACTERISTICA);
        ImagenesController::update($clientData,$queryData,$idUsuario,$queryUpdate->ID_LISTADO);
        $clientData = $clientData->all();
        if($queryData['DESCRIPCION'] == $clientData['DESCRIPCION']) return;
        HistorialController::createUpdate(
            $idUsuario,
            'caracteristicas',
            $queryUpdate->ID_LISTADO,
            $queryData->ID_CARACTERISTICA,
            'DESCRIPCION',
            $queryData['DESCRIPCION'],
            $clientData['DESCRIPCION']
        );
        $queryData['DESCRIPCION'] = $clientData['DESCRIPCION'];
        $queryData->save();
    }

    /*Metodo para consultar un registro especifico de la tabla de caracteristicas */
    public static function getRecord($idCaracteristica,$idListado)
    {
        $queryData = Caracteristicas::find($idCaracteristica)->toArray();
        $queryImagenes = ImagenesController::getRecord($queryData['ID_IMAGEN']);
        $queryListado = ListadosPreliminares::find($idListado);
        $queryCodigo = CodigosController::getRecord($idListado,$queryListado->ID_CODIGO);
        return [
            "CARACTERISTICAS"=>array_merge($queryData,$queryCodigo,$queryImagenes)
        ];
    }
}
