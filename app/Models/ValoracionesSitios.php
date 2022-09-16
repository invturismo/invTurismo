<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ValoracionesSitios extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "valoraciones_sitios";
    protected $primaryKey = 'ID_VALORACION_SITIO';
    public $timestamps = false;
    protected $fillable = [
        'ID_CALIDAD_SITIO',
        'ID_SIGNIFICADO',
        'TOTAL'
    ];
}
