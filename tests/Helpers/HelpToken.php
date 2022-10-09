<?php

namespace Tests\Helpers;

class HelpToken
{
  public static $token = '38|qiPEG01HINDW1kl5XXMrbwhDO6GwosAd6ijWkI4v';

  public static function headers()
  {
    return [
      'Authorization'=>'Bearer '.self::$token,
			'Accept' => 'application/json'
    ];
  }
}

