<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Historial_Update extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "historial_update";
    protected $primaryKey = 'ID_HISTORIAL_UP';
    public $timestamps = false;
    protected $fillable = [
        'ID_USUARIO',
        'TABLA_MODIFICADA',
        'ID_LISTADO_MODIFICADO',
        'ID_REGISTRO_MODIFICADO',
        'CAMPO_MODIFICADO',
        'VALOR_OLD',
        'VALOR_NEW'
    ];
}
