<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "usuarios";
    protected $primaryKey = 'ID_USUARIO';
    public $timestamps = false;
    protected $fillable = [
        'ID_TIPO_USUARIO',
        'PRIMER_NOMBRE',
        'SEGUNDO_NOMBRE',
        'PRIMER_APELLIDO',
        'SEGUNDO_APELLIDO',
        'USUARIO',
        'CORREO',
        'CLAVE',
        'EXIST'
    ];
}
