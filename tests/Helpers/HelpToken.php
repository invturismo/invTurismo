<?php

namespace Tests\Helpers;
use App\Models\User;

class HelpToken
{
  /*Metodo que retorna las cabeceras para realizar una peticion al servidor */
  public static function headers()
  {
    $user = User::find(1);
    $token = $user->createToken('auth_token');
    $token->accessToken->expires_at = now()->addMinutes(3);
    $token->accessToken->save();
    return [
      'Authorization'=>'Bearer '.$token->plainTextToken,
			'Accept' => 'application/json'
    ];
  }
}

