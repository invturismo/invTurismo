<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Historial_Insert_Delete extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "historial_insert_delete";
    protected $primaryKey = 'ID_HISTORIAL_IN_DE';
    public $timestamps = false;
    protected $fillable = [
        'ID_USUARIO',
        'TABLA_MOVIMIENTO',
        'ID_REGISTRO_MOVIMIENTO',
        'TIPO_MOVIMIENTO'
    ];
}
