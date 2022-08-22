<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "admin_propietarios";
    protected $primaryKey = 'ID_ADMIN';
    public $timestamps = false;
    protected $fillable = [
        'NOMBRE',
        'DIRECCION_UBICACION',
        'CORREO',
        'TELEFONO1',
        'TELEFONO2'
    ];
}