<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Logs_App extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "logs_app";
    protected $primaryKey = 'ID_LOG';
    public $timestamps = false;
    protected $fillable = [
        'MESSAGE_LOG',
        'FILE',
        'LINE'
    ];
}
