<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Update_Record;
use App\Models\ListadosPreliminares;
use Illuminate\Support\Facades\Auth;

class UpdateController extends Controller
{
  public static function stateUpdate($REGISTRO,$TABLA,$idTokenUser,$delete) {
    try {
      $queryData = Update_Record::where('REGISTRO',"=",$REGISTRO)
      ->where("TABLA","=",$TABLA)
      ->where("ID_TOKEN","!=",$idTokenUser)->first();
      if(isset($queryData)) {
        $record = DB::table('personal_access_tokens')->select()
        ->where('id','=',$queryData->ID_TOKEN)->first();
        if(isset($record)) return ["state" => 1];
        $queryData->delete();
      }
      if(!$delete) {
        $recordsToken = Update_Record::where('ID_TOKEN',"=",$idTokenUser);
        $validateRecord = $recordsToken->get()->toArray();
        if(!empty($validateRecord)) $recordsToken->delete();
        $updateRecord = new Update_Record();
        $updateRecord->ID_TOKEN = $idTokenUser;
        $updateRecord->TABLA = $TABLA;
        $updateRecord->REGISTRO = $REGISTRO;
        $updateRecord->save();
      }
      return ["state" => 2];
    } catch (\Throwable $th) {
      return [
        "state" => 0,
        "message" => $th->getMessage()
      ];
    }
  }

  public static function actionCancelUpdate($idTokenUser) {
    try {
      $recordsToken = Update_Record::where('ID_TOKEN',"=",$idTokenUser);
      $validateRecord = $recordsToken->get()->toArray();
      if(!empty($validateRecord)) $recordsToken->delete();
      return ["state" => true];
    } catch (\Throwable $th) {
      return [
        "state" => false,
        "message" => $th->getMessage()
      ];
    }
  }

  public function cancelUpdate() {
    try {
      $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
      $response = $this->actionCancelUpdate($idTokenUser);
      if(!$response['state']) throw new Error($response['message']);
      return response()->json([
        "state" => true,
      ]);
    } catch (\Throwable $th) {
      return response()->json([
          "state" => false,
          "message" => "Error en la base de datos",
          'phpMessage' => $th->getMessage()
      ]);
    }
  }
}
