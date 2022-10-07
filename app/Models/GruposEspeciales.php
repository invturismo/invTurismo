<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class GruposEspeciales extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "grupos_especiales";
    protected $primaryKey = 'ID_GRUPOS';
    public $timestamps = false;
    protected $fillable = [
        'ID_LISTADO',
        'ID_GENERALIDAD',
        'ID_CARACTERISTICA',
        'ID_VALORACION_GRUPOS',
        'ID_RELEVANTE',
        'ID_ACTIVIDAD',
        'ID_SERVICIO',
        'ID_PROMOCION',
        'ID_SERVICIO_ESPECIAL',
        'ID_RED_SOCIAL',
        'REF_BIBLIOGRAFICA',
        'OBSERVACIONES',
        'APRO_INTERNACIONAL',
        'EXIST'
    ];
}