<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Codigos extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "codigos";
    protected $primaryKey = 'ID_CODIGO';
    public $timestamps = false;
    protected $fillable = [
        'ID_MUNICIPIOS',
        'ID_DEPARTAMENTOS',
        'ID_ELEMENTO',
        'ID_COMPONENTE',
        'ID_GRUPO',
        'ID_TIPO_PATRIMONIO',
        'ORDEN_ALFABETICO'
    ];
}
