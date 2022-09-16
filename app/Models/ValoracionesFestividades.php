<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ValoracionesFestividades extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "valoraciones_festividad";
    protected $primaryKey = 'ID_VALORACION_FESTIVIDAD';
    public $timestamps = false;
    protected $fillable = [
        'ID_CALIDAD_FESTIVIDAD',
        'ID_SIGNIFICADO',
        'TOTAL'
    ];
}
