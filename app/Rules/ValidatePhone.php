<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

//Regla para validar si es un numero de telefono

class ValidatePhone implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(!isset($value)) return true;
        $regularExpression = '/^\d{5,10}$/';
        return preg_match($regularExpression,$value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El numero no es valido.';
    }
}
