<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Servicios extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "servicios";
    protected $primaryKey = 'ID_SERVICIO';
    public $timestamps = false;
    protected $fillable = [
        'TIENDAS',
        'GUIAS',
        'BANOS',
        'RESTAURANTES',
        'PARQUEADERO',
        'ALOJAMIENTO',
        'OTROS'
    ];
}