<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Generalidades extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "generalidades";
    protected $primaryKey = 'ID_GENERALIDAD';
    public $timestamps = false;
    protected $fillable = [
        'ID_ADMIN',
        'ID_TIPO_ACCESO',
        'CORREGIMIENTO_VEREDA_LOCALIDAD',
        'GEORREFERENCIACION',
        'INDICACIONES_ACCESO'
    ];
}