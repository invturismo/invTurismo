<?php

namespace App\Helpers;

use App\Helpers\Joins;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;
use App\Http\Controllers\HistorialController;

class HelpersClasificacion
{
  public static function insertForms ($ID_LISTADO,$ID_TIPO_BIEN,$ID_USUARIO)
  {
    switch ($ID_TIPO_BIEN) {
      case 1:
        $material = new PatrimoniosMateriales();
        $material -> ID_LISTADO = $ID_LISTADO;
        $material -> save();
        HistorialController::createInsertDelete(
          $ID_USUARIO,
          'Patrimonio Cultural Material',
          $material->ID_MATERIAL,1
        );
        return $material->ID_MATERIAL;
        break;
      case 2:
        $inmaterial = new PatrimoniosInmateriales();
        $inmaterial -> ID_LISTADO = $ID_LISTADO;
        $inmaterial -> save();
        HistorialController::createInsertDelete(
          $ID_USUARIO,
          'Patrimonio Cultural Inmaterial',
          $inmaterial->ID_INMATERIAL,1
        );
        return $inmaterial->ID_INMATERIAL;
        break;
      case 3:
        $eventos = new FestividadesEventos();
        $eventos -> ID_LISTADO = $ID_LISTADO;
        $eventos -> save();
        HistorialController::createInsertDelete(
          $ID_USUARIO,
          'Festividades y Eventos',
          $eventos->ID_EVENTO,1
        );
        return $eventos->ID_EVENTO;
        break;
      case 4:
        $grupos = new GruposEspeciales();
        $grupos -> ID_LISTADO = $ID_LISTADO;
        $grupos -> save();
        HistorialController::createInsertDelete(
          $ID_USUARIO,
          'Grupos de Especial Interés',
          $grupos->ID_GRUPOS,1
        );
        return $grupos->ID_GRUPOS;
        break;
      case 5:
        $sitios = new SitiosNaturales();
        $sitios -> ID_LISTADO = $ID_LISTADO;
        $sitios -> save();
        HistorialController::createInsertDelete(
          $ID_USUARIO,
          'Sitios Naturales',
          $sitios->ID_SITIO,1
        );
        return $sitios->ID_SITIO;
        break;
    }
  }

  public static function deleteForms($FORMULARIO,$ID_REGISTRO,$ID_USUARIO)
  {
    if (!empty($FORMULARIO)){
      switch ($FORMULARIO) {
        case 1:
          $registro = PatrimoniosMateriales::select("patrimonios_materiales.ID_MATERIAL")
          ->where("patrimonios_materiales.ID_LISTADO","=",$ID_REGISTRO)
          ->first();;
          HistorialController::createInsertDelete(
            $ID_USUARIO,
            'Patrimonio Cultural Material',
            $registro->ID_MATERIAL,0
          );
          $registro -> delete();
          break;
        case 2:
          $registro = PatrimoniosInmateriales::select("patrimonios_inmateriales.ID_INMATERIAL")
          ->where("patrimonios_inmateriales.ID_LISTADO","=",$ID_REGISTRO)
          ->first();;
          HistorialController::createInsertDelete(
            $ID_USUARIO,
            'Patrimonio Cultural Inmaterial',
            $registro->ID_INMATERIAL,0
          );
          $registro -> delete();
          break;
        case 3:
          $registro = FestividadesEventos::select("festividades_eventos.ID_EVENTO")
          ->where("festividades_eventos.ID_LISTADO","=",$ID_REGISTRO)
          ->first();;
          HistorialController::createInsertDelete(
            $ID_USUARIO,
            'Festividades y Eventos',
            $registro->ID_EVENTO,0
          );
          $registro -> delete();
          break;
        case 4:
          $registro = GruposEspeciales::select("grupos_especiales.ID_GRUPOS")
          ->where("grupos_especiales.ID_LISTADO","=",$ID_REGISTRO)
          ->first();;
          HistorialController::createInsertDelete(
            $ID_USUARIO,
            'Grupos de Especial Interés',
            $registro->ID_GRUPOS,0
          );
          $registro -> delete();
          break;
        case 5:
          $registro = SitiosNaturales::select("sitios_naturales.ID_SITIO")
          ->where("sitios_naturales.ID_LISTADO","=",$ID_REGISTRO)
          ->first();;
          HistorialController::createInsertDelete(
            $ID_USUARIO,
            'Sitios Naturales',
            $registro->ID_SITIO,0
          );
          $registro -> delete();
          break;
      }
    }
  }
}