<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;
use App\Helpers\Joins;
use App\Helpers\HelperFilter;
use App\Models\PatrimoniosMateriales;
use App\Models\PatrimoniosInmateriales;
use App\Models\FestividadesEventos;
use App\Models\GruposEspeciales;
use App\Models\SitiosNaturales;

class FindController extends Controller
{

    public static function WhoAtractivo($tipoBien,$idListado)
    {
        $id = "";
        switch ($tipoBien) {
            case 1:
            $query = PatrimoniosMateriales::select()->where("ID_LISTADO",$idListado)->first();
            $id = $query->ID_MATERIAL;
            break;
            case 2:
            $query = PatrimoniosInmateriales::select()->where("ID_LISTADO",$idListado)->first();
            $id = $query->ID_INMATERIAL;
            break;
            case 3:
            $query = FestividadesEventos::select()->where("ID_LISTADO",$idListado)->first();
            $id = $query->ID_EVENTO;
            break;
            case 4:
            $query = GruposEspeciales::select()->where("ID_LISTADO",$idListado)->first();
            $id = $query->ID_GRUPOS;
            break;
            case 5:
            $query = SitiosNaturales::select()->where("ID_LISTADO",$idListado)->first();
            $id = $query->ID_SITIO;
            break;
        }
        return $id;
    }

    public static function whoId($data)
    {
        foreach ($data as $key => $value) {
            if(!isset($value['ID_TIPO_BIEN'])) continue;
            $data[$key]['ID_RECURSO'] = self::WhoAtractivo($value['ID_TIPO_BIEN'],$value['ID_LISTADO']);
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
