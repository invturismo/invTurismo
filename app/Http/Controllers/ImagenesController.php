<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Imagenes;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\HistorialController;

class ImagenesController extends Controller
{
    public static function rules($newRules)
    {
        if($newRules == "-") return [];
        $rules = [
            'IMAGEN1' => 'required|image|max:1024',
            'IMAGEN2' => 'required|image|max:1024',
            'FUENTE' => 'required|max:200',
        ];
        if(!$newRules) return $rules;
        $arrayRules = explode('|',$newRules);
        $finalRules = [];
        foreach ($arrayRules as $key => $value) {
            $finalRules[$value] = $rules[$value];
        }
        return $finalRules;
    }

    public static function create($clientData)
    {
        $imagenes = new Imagenes();
        $imagenes->IMAGEN1 = time()."1_".$clientData->file('IMAGEN1')->getClientOriginalName();
        $imagenes->IMAGEN2 = time()."2_".$clientData->file('IMAGEN2')->getClientOriginalName();
        $imagenes->FUENTE = $clientData->FUENTE;
        $clientData->file('IMAGEN1')->storeAs('imagenes_inventario',$imagenes->IMAGEN1);
        $clientData->file('IMAGEN2')->storeAs('imagenes_inventario',$imagenes->IMAGEN2);
        $imagenes->save();
        return $imagenes->ID_IMAGEN;
    }

    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {   
        $imagenes = Imagenes::find($queryUpdate->ID_IMAGEN);
        $clientData2 = $clientData->all();
        $reglas = isset($clientData->REGLAS) ? $clientData->REGLAS : "-";
        $rules = self::rules($reglas);
        foreach ($rules as $key => $value) {
            if($key == 'IMAGEN1'|| $key == 'IMAGEN2') {
                Storage::delete('imagenes_inventario/'.$imagenes[$key]);
                $textConcat = $key == 'IMAGEN1' ? "1_" : "2_";
                $name = time().$textConcat.$clientData->file($key)->getClientOriginalName();
                $clientData->file($key)->storeAs('imagenes_inventario',$name);
                HistorialController::createUpdate(
                    $idUsuario,
                    'imagenes',
                    $idListado,
                    $imagenes->ID_IMAGEN,
                    $key,
                    $imagenes[$key],
                    $name
                );
                $imagenes[$key] = $name;
            }else{
                HistorialController::createUpdate(
                    $idUsuario,
                    'imagenes',
                    $idListado,
                    $imagenes->ID_IMAGEN,
                    $key,
                    $imagenes[$key],
                    $clientData2[$key]
                );
                $imagenes[$key] = $clientData2[$key];
            }
            $imagenes->save();
        }
    }

    public static function getRecord($idImagen)
    {
        return Imagenes::find($idImagen)->toArray();
    }
}
