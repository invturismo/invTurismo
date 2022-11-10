<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

//Regla para validar el nombre de usuario y el email en la base de datos

class ValidateUserNameAndEmail implements Rule
{
    public $message = "";
    public $id = null;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($id = null)
    {
        $this->id = $id;
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
        $queryData = User::where($attribute,$value)
        ->where('EXIST',true);
        if(isset($this->id)) $queryData = $queryData->where('ID_USUARIO',"!=",$this->id);
        $queryData = $queryData->exists();
        if($attribute == "USUARIO") $this->message = "El nombre de usuario ya existe";
        else $this->message = "El correo ya esta en uso";
        return !$queryData;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
