<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CalidadFestividades extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "calidades_festividades";
    protected $primaryKey = 'ID_CALIDAD_FESTIVIDAD';
    public $timestamps = false;
    protected $fillable = [
        'ORGANIZACION',
        'B_SOCIOCULTURALES',
        'B_ECONOMICOS',
        'SUBTOTAL'
    ];
}
