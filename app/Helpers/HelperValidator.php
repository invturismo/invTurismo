<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Validator;

class HelperValidator
{
  public static function Validate($rules,$request)
  {
    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
      return [
        'state' => false,
        'errors' => $validator->errors()
      ];
    }
    return 1;
  }
}