<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Historial_Update;
use App\Models\Historial_Insert_Delete;

class HistorialController extends Controller
{
    public static function createUpdate($ID_USUARIO,$TABLA_MODIFICADA,$ID_REGISTRO_MODIFICADO,$CAMPO_MODIFICADO,$VALOR_OLD,$VALOR_NEW) {
        $historial = new Historial_Update();
        $historial->ID_USUARIO = $ID_USUARIO;
        $historial->TABLA_MODIFICADA = $TABLA_MODIFICADA;
        $historial->ID_REGISTRO_MODIFICADO = $ID_REGISTRO_MODIFICADO;
        $historial->CAMPO_MODIFICADO = $CAMPO_MODIFICADO;
        $historial->VALOR_OLD = isset($VALOR_OLD) ? $VALOR_OLD : 0;
        $historial->VALOR_NEW = isset($VALOR_NEW) ? $VALOR_NEW : 0;
        $historial->save();
    }

    public static function createInsertDelete($ID_USUARIO,$TABLA_MOVIMIENTO,$ID_REGISTRO_MOVIMIENTO,$TIPO_MOVIMIENTO) {
        $historial = new Historial_Insert_Delete();
        $historial->ID_USUARIO = $ID_USUARIO;
        $historial->TABLA_MOVIMIENTO = $TABLA_MOVIMIENTO;
        $historial->ID_REGISTRO_MOVIMIENTO = $ID_REGISTRO_MOVIMIENTO;
        $historial->TIPO_MOVIMIENTO = $TIPO_MOVIMIENTO;
        $historial->save();
    }
}
