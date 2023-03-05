<?php

namespace App\Helpers;
use App\Models\Logs_App;
use Illuminate\Support\Facades\DB;

class HelperLogs
{
  /*Metodo que permite guardar en la base de datos los errores inesperados que puedan surgir */
  public static function Log($error)
  {
    DB::rollBack();
    try {
      $log = new Logs_App();
      $log->MESSAGE_LOG = $error->getMessage();
      $log->FILE = $error->getFile();
      $log->LINE = $error->getLine();
      $log->save();
    } catch (\Throwable $th) {
    } finally {
      return [
        'state' => false,
        'message' => 'Error en la base de datos'
      ];
    }
  }
}