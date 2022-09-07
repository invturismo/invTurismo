<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CalidadInmaterial extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "calidades_inmaterial";
    protected $primaryKey = 'ID_CALIDAD_INMATERIAL';
    public $timestamps = false;
    protected $fillable = [
        'COLECTIVA',
        'TRADICIONAL',
        'ANONIMA',
        'ESPONTANEA',
        'POPULAR',
        'SUBTOTAL'
    ];
}
