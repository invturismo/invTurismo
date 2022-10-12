<?php

namespace Tests\Helpers;

class HelpToken
{
  public static $token = '5|5mKca983P8Hm0rnKn3iTWdFosrNfaw52Y7GqH9zw';

  public static function headers()
  {
    return [
      'Authorization'=>'Bearer '.self::$token,
			'Accept' => 'application/json'
    ];
  }
}

