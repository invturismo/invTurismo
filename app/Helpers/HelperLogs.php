<?php

namespace App\Helpers;
use App\Models\Logs_App;

class HelperLogs
{
  public static function Log($error)
  {
    $log = new Logs_App();
    $log->MESSAGE_LOG = $error->getMessage();
    $log->FILE = $error->getFile();
    $log->LINE = $error->getLine();
    $log->save();
    return [
      'state' => false,
      'message' => 'Error en la base de datos'
    ];
  }
}