<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rules\ValidatePhone;
use App\Models\Admin;
use App\Http\Controllers\HistorialController;

class AdminController extends Controller
{
    public static function rules()
    {
        return [
            'NOMBRE_ADMIN' => 'required|max:200',
            'DIRECCION_UBICACION' => 'required|max:200',
            'CORREO' => 'email|max:200',
            'TELEFONO1' => [new ValidatePhone()],
            'TELEFONO2' => [new ValidatePhone()],
        ];
    }

    public static function create($clientData)
    {
        $admin = new Admin();
        $admin->NOMBRE = $clientData->NOMBRE_ADMIN;
        $admin->DIRECCION_UBICACION = $clientData->DIRECCION_UBICACION;
        $admin->CORREO = $clientData->CORREO;
        $admin->TELEFONO1 = $clientData->TELEFONO1;
        $admin->TELEFONO2 = $clientData->TELEFONO2;
        $admin->save();
        return $admin->ID_ADMIN;
    }

    public static function update($clientData,$queryUpdate,$idUsuario)
    {
        $queryData = Admin::find($queryUpdate->ID_ADMIN);
        foreach (self::rules() as $key => $value) {
            $valueUpdate = $key == 'NOMBRE_ADMIN' ? "NOMBRE" : $key;
            if($queryData[$valueUpdate] != $clientData[$key]) {
                HistorialController::createUpdate($idUsuario,'admin_propietarios',$queryData->ID_ADMIN,$valueUpdate,$queryData[$valueUpdate],$clientData[$key]);
                $queryData[$valueUpdate] = $clientData[$key];
                $queryData->save();
            }
        }
    }

    public static function getRecord($idAdmin)
    {
        $queryData = Admin::find($idAdmin)->toArray();
        return [
            "ADMIN/PROPIETARIOS" => $queryData
        ];        
    }
}
