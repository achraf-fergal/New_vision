<?php

use App\Http\Controllers\Auth\GestionnaireAuthController;
use App\Http\Controllers\ContactLaureat;
use App\Http\Controllers\LaureatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SouvenirController;
use App\Models\Avis;
use App\Models\laureat;
use App\Models\LaureatActivity;
use App\Models\souvenir;
use App\Models\Souvenirmongo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Laravel\Prompts\search;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'AvisLauraet' => Avis::with("Laureat")->inRandomOrder()->limit(6)->get()
    ]);
})->name('/');

Route::post("/SendEmail", [ContactLaureat::class, "SendEmail"])->name("SendEmail");



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [LaureatController::class, 'index'])->name('dashboard');
    Route::get('Postes/bookmarked', [SouvenirController::class, 'getBookmarkedPosts'])->name('poste.bookmarked');
    Route::get('Laureat/Profile',[LaureatController::class, 'GetProfileInfo'])->name('laureat.profile');
    Route::get('Laureat/Postes',[LaureatController::class, 'GetMyPostes'])->name('laureat.postes');
    Route::get('Search',[LaureatController::class, 'Search'])->name('laureat.search');

});

Route::middleware('auth:gestionnaire')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





require __DIR__ . '/auth.php';
