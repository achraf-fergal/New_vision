<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Gestionnaire extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'matricule',
        'nom',
        'telephone',
        'prenom',
        'email',
        'CIN',
        'password',
        'imageSRC',
        'role',
        'valide',
    ];

    protected $hidden = [
        'password',
        'matricule',
    ];
}
