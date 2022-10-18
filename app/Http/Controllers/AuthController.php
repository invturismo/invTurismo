<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Helpers\HelperLogs;

class AuthController extends Controller
{
    public function login(Request $request){
        $rules = [
            'user' => 'required',
            'clave' => 'required'
        ];
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()) return response()->json([
            'state' => false,
            'errors' => $validator->errors()
        ]);            
        try {
            $user = User::where('correo','=',$request->user)
            ->orWhere('usuario',"=",$request->user)->where('EXIST','1')->first();
            if(!isset($user)) return response()->json([
                'state' => false,
                'errors' => [
                    'user' => ['El usuario no existe']
                ]
            ]);
            if(!Hash::check($request->clave,$user->CLAVE)) return response()->json([
                'state' => false,
                'errors' => [
                    'clave' => ['La clave es incorrecta']
                ]
            ]);
            $token = $user->createToken('auth_token');
            $token->accessToken->expires_at = now()->addMinutes(61);
            $token->accessToken->save();
            $role = $user->ID_TIPO_USUARIO;
            return response()->json([
                'state' => true,
                'accecs_token' => $token->plainTextToken,
                'user_role' => $role
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public static function addTime()
    {
        $user = Auth::user();
        $user->currentAccessToken()->expires_at = now()->addMinutes(61);
        $user->currentAccessToken()->save();
        return $user;
    }

    public function updateSession()
    {
        try {
            self::addTime();
            return [
                'state' => true,
            ];
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function profile () {
        try {
            $user = self::addTime();
            DB::table('personal_access_tokens')->where('expires_at','<',now())->delete();
            return [
                'state' => true,
                'data' => $user
            ];
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        }
    }

    public function logout () {
        try {
            Auth::user()->currentAccessToken()->delete();
            return response()->json([
                'state' => true,
                'message' => ['Cerro sesion correctamente']
            ]);
        } catch (\Throwable $th) {
            return response()->json(HelperLogs::Log($th));
        } 
    }
}