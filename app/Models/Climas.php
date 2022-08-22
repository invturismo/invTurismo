<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Climas extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "climas";
    protected $primaryKey = 'ID_CLIMA';
    public $timestamps = false;
    protected $fillable = [
        'ID_TIPO_CLIMA',
        'TEMPERATURA'
    ];
}