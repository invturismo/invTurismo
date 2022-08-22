<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Actividades extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "actividades";
    protected $primaryKey = 'ID_ACTIVIDAD';
    public $timestamps = false;
    protected $fillable = [
        'CULTURALES',
        'ARTISTICAS',
        'FISICAS',
        'RECREATIVAS',
        'OTROS'
    ];
}