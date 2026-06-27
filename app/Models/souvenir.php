<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * @property string|null $content
 * @property int $user_id
 * @property string|null $categorie
 * @property string|null $dateSouvenir
 * @property string|null $photo
 * @property int $likes_count
 * @property int $saves_count
 * @property int $comments_count
 * @property int $shares_count
 */
class souvenir extends Model
{
    use HasFactory;
    use Notifiable;

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
