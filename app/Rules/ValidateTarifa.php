<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateTarifa implements Rule
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
        $regularExpression = '/^\d+$/';
        return preg_match($regularExpression,$value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El valor no es valido';
    }
}
