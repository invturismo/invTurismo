<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

//Regla para validar que las contraseñas coinciden
class ConfirmPassword implements Rule
{   
    protected $password;
    protected $textMessage = 'La clave no cumple las politicas';
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($password)
    {
        $this->password = $password;
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
        if(is_null($this->password)) return false;
        if($this->password!=$value){
            $this->textMessage = 'Las contraseñas no coinciden';
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->textMessage;
    }
}
