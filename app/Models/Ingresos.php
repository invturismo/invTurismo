<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Ingresos extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "ingresos";
    protected $primaryKey = 'ID_INGRESO';
    public $timestamps = false;
    protected $fillable = [
        'LUNES',
        'MARTES',
        'MIERCOLES',
        'JUEVES',
        'VIERNES',
        'SABADO',
        'DOMINGO',
        'HORAS'
    ];
}
