<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ValoracionInmaterial extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "valoraciones_inmaterial";
    protected $primaryKey = 'ID_VALORACION_INMATERIAL';
    public $timestamps = false;
    protected $fillable = [
        'ID_CALIDAD_INMATERIAL',
        'ID_SIGNIFICADO',
        'TOTAL'
    ];
}
