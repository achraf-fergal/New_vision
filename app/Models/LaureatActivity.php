<?php

namespace App\Models;

use Mongodb\Laravel\Eloquent\Model;

class LaureatActivity extends Model
{
    protected $connection = 'mongodb';

    // fillable
    protected $fillable = [
        'Laureat_id',
        'Liked_Poste',
        'saved_Poste',
        'Count_SavedPoste',
        'Count_LikedPoste',
        'MyPostes_Count',
        'MyComments_Count'
    ];
}
