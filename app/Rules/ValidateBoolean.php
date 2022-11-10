<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

//Regla para validar si se esta ingresando un booleano por cadena de texto

class ValidateBoolean implements Rule
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
        if($value=='true' || $value=='false'){
            return true;
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El valor debe ser verdadero o falso';
    }
}
