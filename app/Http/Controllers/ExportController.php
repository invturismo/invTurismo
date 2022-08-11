<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListadosPreliminares;

class ExportController extends Controller
{
    public function ExportListadosPreliminares(Request $request)
    {
        try {
            $queryData = ListadosPreliminares::select()
            ->where('EXIST','=',true)
            ->get()->toArray();
            return response()->json([
                "state" => true,
                "data" => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }
}
