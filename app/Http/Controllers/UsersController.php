<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Rules\ValidateUserRegex;
use App\Rules\ValidatePasswordRegex;
use App\Rules\ValidateUserNameAndEmail;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Rules\ConfirmPassword;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;
use Illuminate\Support\Facades\DB;
use App\Helpers\HelperValidator;
use App\Helpers\HelperLogs;
use App\Rules\ValidateNombreAdmin;

class UsersController extends Controller
{
    /*Metodo que retorna las reglas para los usuarios de la app */
    public static function rules($clave,$id=false)
    {
        $unique = new ValidateUserNameAndEmail();
        if($id) $unique = new ValidateUserNameAndEmail($id);
        $rules = [
            'PRIMER_NOMBRE'=>['required','max:50',new ValidateNombreAdmin()],
            'SEGUNDO_NOMBRE'=>['max:50',new ValidateNombreAdmin()],
            'PRIMER_APELLIDO'=>['required','max:50',new ValidateNombreAdmin()],
            'SEGUNDO_APELLIDO'=>['max:50',new ValidateNombreAdmin()],
            'USUARIO'=>['required',new ValidateUserRegex(),$unique],
            'CORREO'=>['required','email',$unique,'max:100']
        ];
        $ruleUpdate = [
            'ID_USUARIO'=>'required|numeric',
        ];
        $rulesCreate = [
            'CLAVE'=>['required',new ValidatePasswordRegex()],
            'CONFIRMAR_CLAVE'=>['required',new ConfirmPassword($clave)]
        ];
        if($id) return array_merge($ruleUpdate,$rules);
        return array_merge($rulesCreate,$rules);
    }

    /*Metodo para crear un nuevo registro en la tabla de usuarios */
    public function register(Request $request) {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        DB::beginTransaction();
        try {
            $rules = self::rules($request->input('CLAVE'));
            $isValid = HelperValidator::Validate($rules,$request);
            if($isValid != 1) return response()->json($isValid);
            $dataForm = $request->all();
            $dataForm['CLAVE'] = Hash::make($dataForm['CLAVE']);
            $user = new User();
            $user->PRIMER_NOMBRE = $dataForm['PRIMER_NOMBRE'];
            $user->SEGUNDO_NOMBRE = $dataForm['SEGUNDO_NOMBRE'];
            $user->PRIMER_APELLIDO = $dataForm['PRIMER_APELLIDO'];
            $user->SEGUNDO_APELLIDO = $dataForm['SEGUNDO_APELLIDO'];
            $user->USUARIO = $dataForm['USUARIO'];
            $user->CORREO = $dataForm['CORREO'];
            $user->CLAVE = $dataForm['CLAVE'];
            $user->ID_TIPO_USUARIO = 2;
            $user->save();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            HistorialController::createInsertDelete($ID_USUARIO,'usuarios',$user->ID_USUARIO,1);
            DB::commit();
            return response()->json([
                'state' => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para eliminar el token de sesion del usuario que se este manipulando */
    public static function deleteTokens($idUsuario)
    {
        DB::table('personal_access_tokens')->where('tokenable_id','=',$idUsuario)
        ->delete();
    }

    /*Metodo que contiene la plantilla para consultar un usuario */
    public static function templateQuery()
    {
        return User::select(
            'ID_USUARIO',
            'ID_TIPO_USUARIO',
            'PRIMER_NOMBRE',
            'SEGUNDO_NOMBRE',
            'PRIMER_APELLIDO',
            'SEGUNDO_APELLIDO',
            'USUARIO',
            'CORREO'
        )->where('EXIST','=',true);
    }

    /*Metodo para actualizar un registro de la tabla de usuarios */
    public function update(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        DB::beginTransaction();
        try {
            $rules = self::rules($request->input('CLAVE'),$request->ID_USUARIO);
            $isValid = HelperValidator::Validate($rules,$request);
            if($isValid != 1) return response()->json($isValid);
            $queryData = self::templateQuery()
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryData = $queryData->toArray();
            $clientData = $request->all();
            $changes = array();
            foreach ($queryData as $key => $value) {
                if(!isset($clientData[$key])) continue;
                if($clientData[$key]==$value) continue;
                $changes[$key] = $clientData[$key];
            }
            if(empty($changes)) return response()->json([
                'state' => false,
                'message' => "No modifico nigun dato"
            ]);
            $user = User::find($clientData['ID_USUARIO']);
            $user->update($changes);
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            foreach ($changes as $key => $value) {
                HistorialController::createUpdate(
                    $ID_USUARIO,'usuarios',0,$user->ID_USUARIO,$key,$queryData[$key],$value
                );
            }
            self::deleteTokens($request->ID_USUARIO);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            DB::commit();
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar los usuarios registrados en la base de datos */
    public function getData(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = self::templateQuery();
            if($request->BUSCAR) {
                $queryData->where("PRIMER_NOMBRE","LIKE","%".$request->BUSCAR."%")
                ->orWhere("SEGUNDO_NOMBRE","LIKE","%".$request->BUSCAR."%")
                ->orWhere("PRIMER_APELLIDO","LIKE","%".$request->BUSCAR."%")
                ->orWhere("SEGUNDO_APELLIDO","LIKE","%".$request->BUSCAR."%")
                ->orWhere("USUARIO","LIKE","%".$request->BUSCAR."%");
            }
            $queryData = $queryData->paginate(10)->toArray();
            return response()->json(array_merge(
                $queryData,
                ['state' => true]
            ));
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un usuario especifico registrado en la base de datos */
    public function getRecord(Request $request)
    {  
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = self::templateQuery()
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            return response()->json([
                'state' => true,
                'data' => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para saber si el usuario que se desea manipular se encuentra en sesion */
    public function validateTokens(Request $request)
    {
        try {
            $queryData = DB::table('personal_access_tokens')->select()
            ->where('tokenable_id','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json(['state' => true]);
            $idUsuario = Auth::user()->ID_USUARIO;
            if($request->ACTUALIZANDO) return response()->json([
                'state' => false,
                'equal' => $idUsuario == $request->ID_USUARIO
            ]);
            if($idUsuario == $request->ID_USUARIO) return response()->json([
                'state' => false,
                'deleteMessage' => 'No es posible eliminar este usuario', 
            ]);
            return response()->json(['state' => false]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para consultar un usuario registrado en la base de datos e informar 
    a la base de datos que ese registro se esta actualizando */
    public function infoUpdate(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = self::templateQuery()
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->ID_USUARIO,2,$idTokenUser,false);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta actualizando"
            ]);
            return response()->json([
                'state' => true,
                'data' => $queryData
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo para cambiar la contraseña de algun usuario */
    public function resetPassword(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        $rules = [
            'ID_USUARIO'=>'required|numeric',
            'CLAVE'=>['required',new ValidatePasswordRegex()],
            'CONFIRMAR_CLAVE'=>['required',new ConfirmPassword($request->input('CLAVE'))]
        ];
        $isValid = HelperValidator::Validate($rules,$request);
        if($isValid != 1) return response()->json($isValid);
        try {
            $queryData = User::find($request->ID_USUARIO);
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $old = $queryData->CLAVE;
            $queryData->CLAVE = Hash::make($request->CLAVE);
            $queryData->save();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            HistorialController::createUpdate(
                $ID_USUARIO,'usuarios',0,$queryData->ID_USUARIO,'CLAVE',$old,$queryData->CLAVE
            );
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            self::deleteTokens($request->ID_USUARIO);
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    /*Metodo eliminar un usuario de la base de datos */
    public function delete(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        DB::beginTransaction();
        try {
            $queryData = User::where('EXIST','=',true)
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->ID_USUARIO,2,$idTokenUser,true);
            if($response['state']==0) throw new Error($response['message']);
            if($response['state']==1) return response()->json([
                'state' => false,
                'message' => "El registro se esta actualizando"
            ]);
            $queryData->EXIST = false;
            $queryData->save();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            HistorialController::createInsertDelete(
                $ID_USUARIO,'listados_preliminares',$queryData->ID_USUARIO,0
            );
            self::deleteTokens($request->ID_USUARIO);
            DB::commit();
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }
}
