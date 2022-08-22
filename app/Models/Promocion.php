<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Promocion extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "promocion";
    protected $primaryKey = 'ID_PROMOCION';
    public $timestamps = false;
    protected $fillable = [
        'FOLLETOS_GUIAS',
        'PUBLICACIONES',
        'TRIPADVISOR',
        'CTRAVEL',
        'GOOGLEM',
        'PAGINA_WEB',
        'YOUTUBE',
        'OTROS'
    ];
}