<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ServiciosEspeciales extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "servicios_especiales";
    protected $primaryKey = 'ID_SERVICIO_ESPECIAL';
    public $timestamps = false;
    protected $fillable = [
        'ASCENSORES',
        'RAMPAS',
        'DISCAP_AUDITIVA',
        'BAÑOS',
        'MOVILIDAD',
        'OTROS'
    ];
}