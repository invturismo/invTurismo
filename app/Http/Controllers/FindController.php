<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Helpers\Joins;
use App\Helpers\HelperFilter;
use App\Helpers\HelperDataRecurso;
use App\Helpers\HelperLogs;

class FindController extends Controller
{
    /*Metodo para consultar el id del recurso turistico que ya se clasifico */
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

    /*Metodo para buscar un registro dependiendo del nombre del recurso turistico */
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
            return response()->json(HelperLogs::Log($th));
        }
    }
}
