<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Relevantes extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "caracteristicas_relevantes";
    protected $primaryKey = 'ID_RELEVANTE';
    public $timestamps = false;
    protected $fillable = [
        'ID_CLIMA',
        'ID_HORARIO',
        'ID_TARIFA',
        'ID_ESTADO'
    ];
}