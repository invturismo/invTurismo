<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateUserRegex implements Rule
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
        $regularExpression = '/^[a-z_]([a-z0-9_\-\.]{5,31}|[a-z0-9_\-\.]{5,30}\$)$/i';
        return preg_match($regularExpression,$value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El nombre de usuario no es valido';
    }
}
