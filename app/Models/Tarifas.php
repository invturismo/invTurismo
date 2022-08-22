<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Tarifas extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "tarifas";
    protected $primaryKey = 'ID_TARIFA';
    public $timestamps = false;
    protected $fillable = [
        'NINOS',
        'ADULTOS',
        'ADULTO_MAYOR',
        'EXTRANJEROS',
        'ESTUDIANTES',
        'CITA_PREVIA',
        'GENERAL'
    ];
}