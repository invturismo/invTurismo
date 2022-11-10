<?php

namespace Tests\Helpers;

use Illuminate\Http\UploadedFile;
use Faker\Factory;
use Illuminate\Http\Request;
use App\Http\Controllers\ImagenesController;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;
use App\Models\Generalidades;
use App\Models\Admin;
use App\Models\Caracteristicas;
use App\Models\Codigos;
use App\Models\Relevantes;
use App\Models\Horarios;
use App\Models\Ingresos;
use App\Models\Climas;
use App\Models\Tarifas;
use App\Models\Actividades;
use App\Models\Servicios;
use App\Models\Promocion;
use App\Models\ServiciosEspeciales;
use App\Models\Redes;
use App\Models\Historial_Insert_Delete;

class HelpDataRecursos
{
  /*Metodo que un objeto dependiendo del tipo de bien */
  public static function objectClasificacion($idClasificacion)
  {
    $typesClasificacion = [
      '1' => new PatrimoniosMateriales(),
      '2' => new PatrimoniosInmateriales(),
      '3' => new FestividadesEventos(),
      '4' => new GruposEspeciales(),
      '5' => new SitiosNaturales()
    ];
    return $typesClasificacion[$idClasificacion];
  }

  /*Metodo que retorna los datos de un nuevo registro dependiendo del tipo de bien */
  public static function factoryClasificacion($idClasificacion,$data)
  {
    return self::objectClasificacion($idClasificacion)->factory()->create($data);
  }

  /*Metodo que descarta los valores nulos de un array asociativo */
  public static function convertData(...$data)
  {
    $finalData = [];
    foreach ($data as $key => $value) {
      $open = true;
      while($open) {
        $skipData = array_search(null,$value);
        unset($value[$skipData]);
        if(!$skipData) $open = false;
      }
      $finalData = array_merge($finalData,$value);
    }
    return $finalData;
  }

  /*Metodo que retorna los datos para crear o actulizar un registro en la tabla de imagenes */
  public static function imagenesData()
  {
    $faker = Factory::create();
    return [
      "FUENTE" => $faker->text($maxNbChars = 50),
      "IMAGEN1" => UploadedFile::fake()->image('photo1.jpg'),
      "IMAGEN2" => UploadedFile::fake()->image('photo2.jpg'),
    ];
  }

  /*Metodo que retorna los datos de un puntaje para un recurso turistico */
  public static function puntajeData($valoracion,$calidad)
  {
    $arraySignificado = [6,12,18,30];
    $randomSignificado = rand(0,3);
    $dataValoracion = $valoracion->factory()->whitoutCalidad()->make([
      'ID_SIGNIFICADO' => $randomSignificado + 1,
      'TOTAL' => $calidad['SUBTOTAL'] + $arraySignificado[$randomSignificado]
    ])->toArray();
    return array_merge($calidad,$dataValoracion);
  }

  /*Metodo que retorna el id del nuevo registro en la tabla de caracteristicas */
  public static function caracteristicasData()
  {
    $faker = Factory::create();
    $request = new Request([
      "FUENTE" => $faker->text($maxNbChars = 50),
    ],[],[],[],[
      "IMAGEN1" => UploadedFile::fake()->image('photo1.jpg'),
      "IMAGEN2" => UploadedFile::fake()->image('photo2.jpg'),
    ]);
    $idImagenes = ImagenesController::create($request);
    $dataCaracteristicas = Caracteristicas::factory()->create([
      'ID_IMAGEN' => $idImagenes
    ]);
    return $dataCaracteristicas->ID_CARACTERISTICA;
  }

  /*Metodo que crea el historal de un nuevo registro */
  public static function dataFecha($idRecurso,$tabla)
  {
    Historial_Insert_Delete::factory()->create([
      'TABLA_MOVIMIENTO' => $tabla,
      'ID_REGISTRO_MOVIMIENTO' => $idRecurso,
      'TIPO_MOVIMIENTO' => '1'
    ]);
  }

  /*Metodo que retorna los datos necesarios para completar un recurso turistico dependiendo de su
  clasificacion */
  public static function dataSend($dataListado,$dataPuntaje,$otherData)
  {
    $dataAdmin = Admin::factory()->withMake()->make()->toArray();
    print_r($dataAdmin);
    $dataGeneralidades = Generalidades::factory()->withoutAdmin()->make()->toArray();
    $dataImagenes = self::imagenesData();
    $dataCaracteristicas = Caracteristicas::factory()->make()->toArray();
    $dataCodigos = Codigos::factory()->otherCodes()->make()->toArray();
    $dataRelevantes = Relevantes::factory()->withMake()->make()->toArray();
    $dataHorarios = Horarios::factory()->withoutIngreso()->make()->toArray();
    $dataIngresos = Ingresos::factory()->withMake()->make()->toArray();
    $dataClima = Climas::factory()->make()->toArray();
    $dataTarifas =  Tarifas::factory()->make()->toArray();
    $dataActividades = Actividades::factory()->make()->toArray();
    $dataServicios = Servicios::factory()->withMake()->make()->toArray();
    $dataPromocion = Promocion::factory()->withMake()->make()->toArray();
    $dataEspeciales = ServiciosEspeciales::factory()->withMake()->make()->toArray();
    $dataRedes = Redes::factory()->withMake()->make()->toArray();
    $finalData = self::convertData(
      $dataListado,
      $dataAdmin,
      $dataGeneralidades,
      $dataImagenes,
      $dataCaracteristicas,
      $dataCodigos,
      $dataPuntaje,
      $dataRelevantes,
      $dataHorarios,
      $dataIngresos,
      $dataClima,
      $dataTarifas,
      $dataActividades,
      $dataServicios,
      $dataPromocion,
      $dataEspeciales,
      $dataRedes,
      $otherData
    );
    return $finalData;
  }
}

