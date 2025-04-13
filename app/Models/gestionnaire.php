<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Gestionnaire extends Authenticatable
{
    use Notifiable;
    use HasFactory;

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'email',
        'password',
        'imageSRC'
    ];

    protected $hidden = [
        'password',
        'maticule'
    ];
}
