<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class PatrimoniosInmateriales extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "patrimonios_inmateriales";
    protected $primaryKey = 'ID_INMATERIAL';
    public $timestamps = false;
    protected $fillable = [
        'ID_LISTADO',
        'ID_GENERALIDAD',
        'ID_CARACTERISTICA',
        'ID_VALORACION_INMATERIAL',
        'ID_ACTIVIDAD',
        'ID_PROMOCION',
        'ID_RED_SOCIAL',
        'REF_BIBLIOGRAFICA',
        'OBSERVACIONES',
        'EXIST'
    ];
}