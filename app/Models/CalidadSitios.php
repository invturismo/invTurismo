<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CalidadSitios extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "calidades_sitios";
    protected $primaryKey = 'ID_CALIDAD_SITIO';
    public $timestamps = false;
    protected $fillable = [
        'S_C_AIRE',
        'S_C_AGUA',
        'S_C_VISUAL',
        'CONSERVACION',
        'S_C_SONORA',
        'DIVERSIDAD',
        'SINGULARIDAD',
        'SUBTOTAL'
    ];
}
