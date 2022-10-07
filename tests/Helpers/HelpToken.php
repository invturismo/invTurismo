<?php

namespace Tests\Helpers;

class HelpToken
{
  public static $token = '6|dO6nKUKSy89FfOesNBDoGDMNglCAnypPdFkOZ6sC';

  public static function headers()
  {
    return [
      'Authorization'=>'Bearer '.self::$token,
			'Accept' => 'application/json'
    ];
  }
}

