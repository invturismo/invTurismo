<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Rules\ValidateUserRegex;
use App\Rules\ValidatePasswordRegex;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Rules\ConfirmPassword;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\UpdateController;

class AuthController extends Controller
{
    public function register(Request $request) {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        $rules = [
            'ID_TIPO_USUARIO'=>'required|numeric',
            'PRIMER_NOMBRE'=>'required|max:50',
            'SEGUNDO_NOMBRE'=>'max:50',
            'PRIMER_APELLIDO'=>'required|alpha|max:50',
            'SEGUNDO_APELLIDO'=>'max:50',
            'USUARIO'=>['required',new ValidateUserRegex(),'unique:usuarios,USUARIO'],
            'CORREO'=>'required|email|unique:usuarios,CORREO|max:100',
            'CLAVE'=>['required',new ValidatePasswordRegex()],
            'CONFIRMAR_CLAVE'=>['required',new ConfirmPassword($request->input('CLAVE'))]
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
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
            $user->ID_TIPO_USUARIO = $dataForm['ID_TIPO_USUARIO'];
            $user->save();
            $ID_USUARIO = Auth::user()->ID_USUARIO;
            HistorialController::createInsertDelete($ID_USUARIO,'usuarios',$user->ID_USUARIO,1);
            return response()->json([
                'state' => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        $rules = [
            'ID_USUARIO'=>'required|numeric',
            'ID_TIPO_USUARIO'=>'required|numeric',
            'PRIMER_NOMBRE'=>'required|max:50',
            'SEGUNDO_NOMBRE'=>'max:50',
            'PRIMER_APELLIDO'=>'required|alpha|max:50',
            'SEGUNDO_APELLIDO'=>'max:50',
            'USUARIO'=>['required',new ValidateUserRegex(),Rule::unique('usuarios','USUARIO')->ignore(isset($request->ID_USUARIO)?$request->ID_USUARIO:'','ID_USUARIO')],
            'CORREO'=>['required','email',Rule::unique('usuarios','CORREO')->ignore(isset($request->ID_USUARIO)?$request->ID_USUARIO:'','ID_USUARIO'),'max:100']
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
            $queryData = User::select('ID_USUARIO','ID_TIPO_USUARIO','PRIMER_NOMBRE','SEGUNDO_NOMBRE','PRIMER_APELLIDO','SEGUNDO_APELLIDO','USUARIO','CORREO')
            ->where('EXIST','=',true)
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $queryData = $queryData->toArray();
            $clientData = $request->all();
            $changes = array();
            foreach ($queryData as $key => $value) {
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
                HistorialController::createUpdate($ID_USUARIO,'usuarios',$user->ID_USUARIO,$key,$queryData[$key],$value);
            }
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function getData(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = User::select('ID_USUARIO','ID_TIPO_USUARIO','PRIMER_NOMBRE','SEGUNDO_NOMBRE','PRIMER_APELLIDO','SEGUNDO_APELLIDO','USUARIO','CORREO')
            ->where('EXIST','=',true);
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
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function getRecord(Request $request)
    {  
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = User::select('ID_USUARIO','ID_TIPO_USUARIO','PRIMER_NOMBRE','SEGUNDO_NOMBRE','PRIMER_APELLIDO','SEGUNDO_APELLIDO','USUARIO','CORREO')
            ->where('EXIST','=',true)
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
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function infoUpdate(Request $request)
    {
        if(Auth::user()->ID_TIPO_USUARIO != 1) return response()->json([
            'state' => false,
            'message' => 'No es posible el acceso'
        ]);
        try {
            $queryData = User::select('ID_USUARIO','ID_TIPO_USUARIO','PRIMER_NOMBRE','SEGUNDO_NOMBRE','PRIMER_APELLIDO','SEGUNDO_APELLIDO','USUARIO','CORREO')
            ->where('EXIST','=',true)
            ->where('ID_USUARIO','=',$request->ID_USUARIO)->first();
            if(!isset($queryData)) return response()->json([
                'state' => false,
                'message' => "El registro no existe"
            ]);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            $response = UpdateController::stateUpdate($request->ID_USUARIO,2,$idTokenUser);
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
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

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
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
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
            HistorialController::createUpdate($ID_USUARIO,'usuarios',$queryData->ID_USUARIO,'CLAVE',$old,$queryData->CLAVE);
            $idTokenUser = Auth::user()->currentAccessToken()->toArray()['id'];
            UpdateController::actionCancelUpdate($idTokenUser);
            return response()->json([
                "state" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function login(Request $request){
        $rules = [
            'correo' => 'required|email',
            'clave' => 'required'
        ];
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json([
                'state' => false,
                'errors' => $validator->errors()
            ]);
        }
        try {
            $user = User::where('correo','=',$request->correo)->where('EXIST','1')->first();
            if(!isset($user)) return response()->json([
                'state' => false,
                'errors' => [
                    'correo' => ['El usuario no existe']
                ]
            ]);
            if(!Hash::check($request->clave,$user->CLAVE)) return response()->json([
                'state' => false,
                'errors' => [
                    'clave' => ['La clave es incorrecta']
                ]
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;
            $role = $user->ID_TIPO_USUARIO;
            return response()->json([
                'state' => true,
                'accecs_token' => $token,
                'user_role' => $role
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'state' => false,
                'message' => 'Error en la base de datos',
                'phpMessage' => $th->getMessage(),
            ]);
        }
    }

    public function profile () {
        return [
            'state' => true,
            'data' => Auth::user()
        ];
    }

    public function logout () {
        Auth::user()->tokens()->delete();
        return response()->json([
            'state' => true,
            'message' => ['Cerro sesion correctamente']
        ]); 
    }
}
