<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Horarios extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "horarios";
    protected $primaryKey = 'ID_HORARIO';
    public $timestamps = false;
    protected $fillable = [
        'ID_INGRESO',
        'RESTRINGIDO',
        'PERMANENTE',
        'VISITA_EXTERIOR',
        'VISITA_INTERIOR'
    ];
}