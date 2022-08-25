<?php

namespace App\Helpers;

class helpData
{
  public static $calidad = [
    'PATRIMONIOS_MATERIALES' => [
      'ESTADO_CONSERVACION' => 'PuntajesController',
      'CONSTITUCION' => 'PuntajesController',
      'REPRESENTATIVIDAD' => 'PuntajesController',
    ]
  ];

  public static function templateData($who)
  {
    $data = [
      'NOMBRE' => 'GeneralidadesController',
      'UBICACION' => 'GeneralidadesController',
      'ID_TIPO_ACCESO' => 'GeneralidadesController',
      'GEORREFERENCIACION' => 'GeneralidadesController',
      'INDICACIONES_ACCESO' => 'GeneralidadesController',
      'NOMBRE_ADMIN' => 'GeneralidadesController',
      'DIRECCION_UBICACION' => 'GeneralidadesController',
      'CORREO' => 'GeneralidadesController',
      'TELEFONO1' => 'GeneralidadesController',
      'TELEFONO2' => 'GeneralidadesController',
      'DESCRIPCION' => 'CaracteristicasController',
      'IMAGEN1' => 'CaracteristicasController',
      'IMAGEN2' => 'CaracteristicasController',
      'FUENTE' => 'CaracteristicasController',
      'ID_DEPARTAMENTOS' => 'CodigosController',
      'ID_MUNICIPIOS' => 'CodigosController',
      'ID_ELEMENTO' => 'CodigosController',
      'ID_COMPONENTE' => 'CodigosController',
      'ID_GRUPO' => 'CodigosController',
      'ID_TIPO_PATRIMONIO' => 'CodigosController',
      'ID_ESTADO' => 'RelevantesController',
      'ID_TIPO_CLIMA' => 'RelevantesController',
      'TEMPERATURA' => 'RelevantesController',
      'RESTRINGIDO' => 'RelevantesController',
      'PERMANENTE' => 'RelevantesController',
      'VISITA_EXTERIOR' => 'RelevantesController',
      'VISITA_INTERIOR' => 'RelevantesController',
      'LUNES' => 'RelevantesController',
      'MARTES' => 'RelevantesController',
      'MIERCOLES' => 'RelevantesController',
      'JUEVES' => 'RelevantesController',
      'VIERNES' => 'RelevantesController',
      'SABADO' => 'RelevantesController',
      'DOMINGO' => 'RelevantesController',
      'HORAS' => 'RelevantesController',
      'NINOS' => 'RelevantesController',
      'ADULTOS' => 'RelevantesController',
      'ADULTO_MAYOR' => 'RelevantesController',
      'EXTRANJEROS' => 'RelevantesController',
      'ESTUDIANTES' => 'RelevantesController',
      'CITA_PREVIA' => 'RelevantesController',
      'GENERAL' => 'RelevantesController',
      'ID_ESTADO' => 'RelevantesController',
      'CULTURALES' => 'ActividadesController',
      'ARTISTICAS' => 'ActividadesController',
      'FISICAS' => 'ActividadesController',
      'RECREATIVAS' => 'ActividadesController',
      'OTROS1' => 'ActividadesController',
      'TIENDAS' => 'ServiciosController',
      'GUIAS' => 'ServiciosController',
      'BANOS' => 'ServiciosController',
      'RESTAURANTES' => 'ServiciosController',
      'PARQUEADERO' => 'ServiciosController',
      'ALOJAMIENTO' => 'ServiciosController',
      'OTROS2' => 'ServiciosController',
      'FOLLETOS_GUIAS' => 'PromocionController',
      'PUBLICACIONES' => 'PromocionController',
      'TRIPADVISOR' => 'PromocionController',
      'CTRAVEL' => 'PromocionController',
      'GOOGLEM' => 'PromocionController',
      'PAGINA_WEB' => 'PromocionController',
      'YOUTUBE' => 'PromocionController',
      'OTROS3' => 'PromocionController',
      'ASCENSORES' => 'ServiciosEspecialesController',
      'RAMPAS' => 'ServiciosEspecialesController',
      'DISCAP_AUDITIVA' => 'ServiciosEspecialesController',
      'BANOS2' => 'ServiciosEspecialesController',
      'MOVILIDAD' => 'ServiciosEspecialesController',
      'OTROS4' => 'ServiciosEspecialesController',
      'PAGINA_WEB2' => 'RedesController',
      'FACEBOOK' => 'RedesController',
      'TWITTER' => 'RedesController',
      'INSTAGRAM' => 'RedesController',
      'OTRA' => 'RedesController',
    ];
    $PC = [
      'TOTAL' => 'PuntajesController',
      'ID_SIGNIFICADO' => 'PuntajesController'
    ];
    $PC = array_merge($PC,self::$calidad[$who]);
    return array_merge($data,$PC);
  }

  public static function templateSend() {
    return [
      'GeneralidadesController' => [],
      'CaracteristicasController' => [],
      'CodigosController' => [],
      'PuntajesController' => [],
      'RelevantesController' => [],
      'ActividadesController' => [],
      'ServiciosController' => [],
      'PromocionController' => [],
      'ServiciosEspecialesController' => [],
      'RedesController' => []
    ];
  }

  public static function data($who,$clientData)
  {
    $template = self::templateData($who);
    $sendData = self::templateSend();
    foreach ($clientData as $key => $value) {
      if(!isset($template[$key])) continue;
      $keySend = $template[$key];
      $sendData[$keySend][$key] = $value;
    }
    return $sendData;
  }
}
