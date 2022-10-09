<?php

namespace Tests\Helpers;

class HelpToken
{
  public static $token = '40|bkyVQcHkx8eJwuSHyMXr12WwpFmX56ztS2BCh5FC';

  public static function headers()
  {
    return [
      'Authorization'=>'Bearer '.self::$token,
			'Accept' => 'application/json'
    ];
  }
}

