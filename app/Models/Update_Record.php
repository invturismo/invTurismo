<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Update_Record extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "update_record";
    protected $primaryKey = 'ID_UPDATE';
    public $timestamps = false;
    protected $fillable = [
        'ID_TOKEN',
        'TABLA',
        'REGISTRO'
    ];
}
