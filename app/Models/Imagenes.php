<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Imagenes extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "imagenes";
    protected $primaryKey = 'ID_IMAGEN';
    public $timestamps = false;
    protected $fillable = [
        'IMAGEN1',
        'IMAGEN2',
        'FUENTE'
    ];
}