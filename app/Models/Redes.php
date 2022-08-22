<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Redes extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "redes";
    protected $primaryKey = 'ID_RED_SOCIAL';
    public $timestamps = false;
    protected $fillable = [
        'PAGINA_WEB',
        'FACEBOOK',
        'TWITTER',
        'INSTAGRAM',
        'OTRA'
    ];
}