<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ListadosPreliminaresController;
use App\Http\Controllers\ClasificacionController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\PatrimoniosMaterialesController;
use App\Http\Controllers\PatrimonioInmaterialController;
use App\Http\Controllers\GruposEspecialesController;
use App\Http\Controllers\SitiosNaturalesController;
use App\Http\Controllers\FestividadesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FindController;
use App\Http\Controllers\CuadroResumenController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Metodo de la API para iniciar sesion */
Route::post("login",[AuthController::class,'login']);

/*Metodos de la API que necesitan token para poder acceder */
Route::middleware('auth:sanctum')->group(function () {
    Route::post("profile",[AuthController::class,'profile']);
    Route::post("logout",[AuthController::class,'logout']);
    Route::post("add-time-session",[AuthController::class,'updateSession']);

    Route::post("register",[UsersController::class,'register']);
    Route::post("user-get",[UsersController::class,'getData']);
    Route::post("user",[UsersController::class,'getRecord']);
    Route::post("user-update",[UsersController::class,'infoUpdate']);
    Route::put("user-update",[UsersController::class,'update']);
    Route::delete("user-delete",[UsersController::class,'delete']);
    Route::put("reset-password",[UsersController::class,'resetPassword']);
    Route::post("validate-tokens",[UsersController::class,'validateTokens']);

    Route::delete("cancel-update",[UpdateController::class,'cancelUpdate']);
    Route::post("find",[FindController::class,'find']);
    Route::post("cuadro-resumen",[CuadroResumenController::class,'getData']);

    Route::post("/export/listado-preliminar",[ExportController::class,'ExportListadosPreliminares']);
    Route::post("/export/clasificacion-atractivos",[ExportController::class,'ExportClasificacion']);
    Route::post("/export/patrimonio-material",[ExportController::class,'ExportPatrimonioMaterial']);
    Route::post("/export/patrimonio-inmaterial",[ExportController::class,'ExportPatrimonioInmaterial']);
    Route::post("/export/grupos-especiales",[ExportController::class,'ExportGruposEspeciales']);
    Route::post("/export/sitios-naturales",[ExportController::class,'ExportSitiosNaturales']);
    Route::post("/export/festividades-eventos",[ExportController::class,'ExportFestividadesEventos']);
    Route::post("/export/cuadro-resumen",[CuadroResumenController::class,'ExportCuadroResumen']);

    Route::post("/listados-preliminares/create",[ListadosPreliminaresController::class,'create']);
    Route::post("/listados-preliminares/validate-name",[ListadosPreliminaresController::class,'validateName']);
    Route::put("/listados-preliminares/update",[ListadosPreliminaresController::class,'update']);
    Route::post("/listados-preliminares/update",[ListadosPreliminaresController::class,'infoUpdate']);
    Route::delete("/listados-preliminares/delete",[ListadosPreliminaresController::class,'delete']);
    Route::post("/listados-preliminares-get/",[ListadosPreliminaresController::class,'getData']);
    Route::post("/listados-preliminares/",[ListadosPreliminaresController::class,'getRecord']);

    Route::post("/clasificacion-recursos-atractivos/sinclas-get",[ClasificacionController::class,'getDataSin']);
    Route::post("/clasificacion-recursos-atractivos/sinclas",[ClasificacionController::class,'getRecordSin']);
    Route::post("/clasificacion-recursos-atractivos/clas-get",[ClasificacionController::class,'getDataCon']);
    Route::post("/clasificacion-recursos-atractivos/clas",[ClasificacionController::class,'getRecordCon']);
    Route::put("/clasificacion-recursos-atractivos/create",[ClasificacionController::class,'clasificacion']);

    Route::post("/patrimonios-materiales/insertForm",[PatrimoniosMaterialesController::class,'insertForm']);
    Route::post("/patrimonios-materiales/update",[PatrimoniosMaterialesController::class,'update']);
    Route::post("/patrimonios-materiales/getdatasincom",[PatrimoniosMaterialesController::class,'getDataSinCom']);
    Route::post("/patrimonios-materiales/getrecordsincom",[PatrimoniosMaterialesController::class,'getRecordSinCom']);
    Route::post("/patrimonios-materiales/getdatacom",[PatrimoniosMaterialesController::class,'getDataCom']);
    Route::post("/patrimonios-materiales/getrecordcom",[PatrimoniosMaterialesController::class,'getRecordCom']);
    Route::delete("/patrimonios-materiales/delete",[PatrimoniosMaterialesController::class,'delete']);
    
    Route::post("/patrimonios-inmateriales/insertForm",[PatrimonioInmaterialController::class,'insertForm']);
    Route::post("/patrimonios-inmateriales/update",[PatrimonioInmaterialController::class,'update']);
    Route::post("/patrimonios-inmateriales/getdatasincom",[PatrimonioInmaterialController::class,'getDataSinCom']);
    Route::post("/patrimonios-inmateriales/getrecordsincom",[PatrimonioInmaterialController::class,'getRecordSinCom']);
    Route::post("/patrimonios-inmateriales/getdatacom",[PatrimonioInmaterialController::class,'getDataCom']);
    Route::post("/patrimonios-inmateriales/getrecordcom",[PatrimonioInmaterialController::class,'getRecordCom']);
    Route::delete("/patrimonios-inmateriales/delete",[PatrimonioInmaterialController::class,'delete']);

    Route::post("/grupos-especiales/insertForm",[GruposEspecialesController::class,'insertForm']);
    Route::post("/grupos-especiales/update",[GruposEspecialesController::class,'update']);
    Route::post("/grupos-especiales/getdatasincom",[GruposEspecialesController::class,'getDataSinCom']);
    Route::post("/grupos-especiales/getrecordsincom",[GruposEspecialesController::class,'getRecordSinCom']);
    Route::post("/grupos-especiales/getdatacom",[GruposEspecialesController::class,'getDataCom']);
    Route::post("/grupos-especiales/getrecordcom",[GruposEspecialesController::class,'getRecordCom']);
    Route::delete("/grupos-especiales/delete",[GruposEspecialesController::class,'delete']);

    Route::post("/sitios-naturales/insertForm",[SitiosNaturalesController::class,'insertForm']);
    Route::post("/sitios-naturales/update",[SitiosNaturalesController::class,'update']);
    Route::post("/sitios-naturales/getdatasincom",[SitiosNaturalesController::class,'getDataSinCom']);
    Route::post("/sitios-naturales/getrecordsincom",[SitiosNaturalesController::class,'getRecordSinCom']);
    Route::post("/sitios-naturales/getdatacom",[SitiosNaturalesController::class,'getDataCom']);
    Route::post("/sitios-naturales/getrecordcom",[SitiosNaturalesController::class,'getRecordCom']);
    Route::delete("/sitios-naturales/delete",[SitiosNaturalesController::class,'delete']);

    Route::post("/festividades-eventos/insertForm",[FestividadesController::class,'insertForm']);
    Route::post("/festividades-eventos/update",[FestividadesController::class,'update']);
    Route::post("/festividades-eventos/getdatasincom",[FestividadesController::class,'getDataSinCom']);
    Route::post("/festividades-eventos/getrecordsincom",[FestividadesController::class,'getRecordSinCom']);
    Route::post("/festividades-eventos/getdatacom",[FestividadesController::class,'getDataCom']);
    Route::post("/festividades-eventos/getrecordcom",[FestividadesController::class,'getRecordCom']);
    Route::delete("/festividades-eventos/delete",[FestividadesController::class,'delete']);
});
