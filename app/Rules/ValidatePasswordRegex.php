<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidatePasswordRegex implements Rule
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
        $regularExpression = '/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/';
        return preg_match($regularExpression,$value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula';
    }
}
