<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CalidadMaterial extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "calidades_material";
    protected $primaryKey = 'ID_CALIDAD_MATERIAL';
    public $timestamps = false;
    protected $fillable = [
        'ESTADO_CONSERVACION',
        'CONSTITUCION',
        'REPRESENTATIVIDAD',
        'SUBTOTAL'
    ];
}