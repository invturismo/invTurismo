<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ListadosPreliminares extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "listados_preliminares";
    protected $primaryKey = 'ID_LISTADO';
    public $timestamps = false;
    protected $fillable = [
        'ID_FUENTE',
        'ID_TIPO_BIEN',
        'ID_CODIGO',
        'NOMBRE',
        'UBICACION',
        'EXIST'
    ];
}
