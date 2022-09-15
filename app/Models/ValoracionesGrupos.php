<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ValoracionesGrupos extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "valoraciones_grupos";
    protected $primaryKey = 'ID_VALORACION_GRUPOS';
    public $timestamps = false;
    protected $fillable = [
        'R_COSTUMBRES',
        'ID_SIGNIFICADO',
        'TOTAL'
    ];
}
