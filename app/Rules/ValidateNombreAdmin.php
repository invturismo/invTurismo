<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateNombreAdmin implements Rule
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
        $regularExpression = '/^[A-ZÁÉÍÓÚÑ]+$/i';
        return preg_match($regularExpression,$value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Solo puede contener letras';
    }
}
