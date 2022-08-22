<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Caracteristicas extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "caracteristicas";
    protected $primaryKey = 'ID_CARACTERISTICA';
    public $timestamps = false;
    protected $fillable = [
        'ID_IMAGEN',
        'DESCRIPCION'
    ];
}