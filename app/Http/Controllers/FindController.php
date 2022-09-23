<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Helpers\Joins;
use App\Helpers\HelperFilter;
use App\Helpers\HelperDataRecurso;

class FindController extends Controller
{
    public static function whoId($data)
    {
        foreach ($data as $key => $value) {
            if(!isset($value['ID_TIPO_BIEN'])) continue;
            $data[$key]['ID_RECURSO'] = HelperDataRecurso::WhoAtractivo(
                $value['ID_TIPO_BIEN'],$value['ID_LISTADO']
            )['id'];
        }
        return $data;
    }

    public function find(Request $request)
    {
        try {
            $queryData = Joins::JoinCodigo(new ListadosPreliminares())
            ->select('listados_preliminares.*','codigos.ID_TIPO_PATRIMONIO')
            ->where('listados_preliminares.EXIST','=',true);
            $queryData = HelperFilter::FilterFind($request,$queryData)->orderBy(
                "listados_preliminares.ID_LISTADO","DESC"
            )->paginate(15)->toArray();
            $queryData['data'] = self::whoId($queryData['data']);
            return response()->json(array_merge(
                $queryData,
                ["state" => true]
            ));
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }
}
