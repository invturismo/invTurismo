<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rules\ValidatePhone;
use App\Models\Admin;
use App\Http\Controllers\HistorialController;

class AdminController extends Controller
{
    /*Metodo que retorna las reglas para el administrador o propietario del recurso turistico */
    public static function rules()
    {
        return [
            'NOMBRE_ADMIN' => 'required|max:200|regex:/^[A-ZÁÉÍÓÚÑ\s]+$/i',
            'DIRECCION_UBICACION' => 'required|max:200',
            'CORREO' => 'nullable|email|max:200',
            'TELEFONO1' => [new ValidatePhone()],
            'TELEFONO2' => [new ValidatePhone()],
        ];
    }

    /*Metodo para crear un nuevo registro en la tabla de admin */
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

    /*Metodo para actualizar un registro de la tabla de admin */
    public static function update($clientData,$queryUpdate,$idUsuario,$idListado)
    {
        $queryData = Admin::find($queryUpdate->ID_ADMIN);
        foreach (self::rules() as $key => $value) {
            $valueUpdate = $key == 'NOMBRE_ADMIN' ? "NOMBRE" : $key;
            if($queryData[$valueUpdate] == $clientData[$key]) continue;
            HistorialController::createUpdate(
                $idUsuario,
                'admin_propietarios',
                $idListado,
                $queryData->ID_ADMIN,
                $valueUpdate,
                $queryData[$valueUpdate],
                $clientData[$key]
            );
            $queryData[$valueUpdate] = $clientData[$key];
            $queryData->save();
        }
    }

    /*Metodo para consultar un registro especifico de la tabla de admin */
    public static function getRecord($idAdmin)
    {
        $queryData = Admin::find($idAdmin)->toArray();
        return [
            "ADMIN/PROPIETARIOS" => $queryData
        ];        
    }
}
