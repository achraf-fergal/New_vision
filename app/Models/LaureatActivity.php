<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaureatActivity extends Model
{
    // fillable
    protected $fillable = [
        'Laureat_id',
        'Liked_Poste',
        'saved_Poste',
        'Helpful_Avis',
        'Report_Avis',
        'Count_SavedPoste',
        'Count_LikedPoste',
        'MyPostes_Count',
        'MyComments_Count',
    ];

    protected function casts(): array
    {
        return [
            'Liked_Poste' => 'json',
            'saved_Poste' => 'json',
            'Helpful_Avis' => 'json',
            'Report_Avis' => 'json',
        ];

    }
}
