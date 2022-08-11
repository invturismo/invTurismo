<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class SitiosNaturales extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "sitios_naturales";
    protected $primaryKey = 'ID_SITIO';
    public $timestamps = false;
    protected $fillable = [
        'ID_LISTADO',
        'ID_GENERALIDAD',
        'ID_CARACTERISTICA',
        'ID_VALORACION_SITIO',
        'ID_RELEVANTE',
        'ID_ACTIVIDAD',
        'ID_SERVICIO',
        'ID_PROMOCION',
        'ID_SERVICIO_ESPECIAL',
        'ID_RED_SOCIAL',
        'REF_BIBLIOGRAFICA',
        'OBSERVACIONES',
        'EXIST'
    ];
}