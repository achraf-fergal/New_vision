<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class laureat extends Authenticatable
{
    use Notifiable;
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'imageSRC',
        'promotion',
        'filiere',
        'etablissement',
        'fonction',
        'employeur',
        'valide',
    ];

    protected $hidden = ['password'];
}
