<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ValoracionMaterial extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "valoraciones_material";
    protected $primaryKey = 'ID_VALORACION_MATERIAL';
    public $timestamps = false;
    protected $fillable = [
        'ID_CALIDAD_MATERIAL',
        'ID_SIGNIFICADO',
        'TOTAL'
    ];
}