<?php

use App\Http\Controllers\ContactLaureat;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SouvenirController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckIfBlocked;
use App\Models\Avis;
use App\Models\LaureatActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'AvisLaureat' => Avis::with('User')->inRandomOrder()->limit(6)->get(),
        'LaureatActivity' => auth()->user() ? LaureatActivity::where('Laureat_id', auth()->user()->id)->first() : [],
    ]);
})->name('/');

Route::get('/Confidentialite', function () {
    return Inertia::render('Confidentialite');
})->name('Confidentialite');

Route::get('/Conditions', function () {
    return Inertia::render('Conditions');
})->name('Conditions');

Route::get('/Cookies', function () {
    return Inertia::render('Cookies');
})->name('Cookies');

Route::post('/SendEmail', [ContactLaureat::class, 'SendEmail'])->name('SendEmail');

Route::middleware(['auth',  CheckIfBlocked::class])->group(function () {
    Route::get('dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('Postes/bookmarked', [SouvenirController::class, 'getBookmarkedPosts'])->name('poste.bookmarked');
    Route::get('Laureat/Profile', [UserController::class, 'GetProfileInfo'])->name('laureat.profile');
    Route::get('Laureat/Postes', [UserController::class, 'GetMyPostes'])->name('laureat.postes');
    Route::get('Poste/Categorie/{filter}', [UserController::class, 'PostesParCategorie'])->name('laureat.categorie');
    Route::get('Search', [UserController::class, 'Search'])->name('laureat.search');
    Route::get('Laureat/Avis', [UserController::class, 'GetAvis'])->name('laureat.avis');
});

Route::middleware('auth:gestionnaire')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/change-lang', function (Request $request) {
    // dd($request->all());
    $local = $request->locale;
    Session::put('locale', $local);
    App::setLocale($local);

    return back();
});

// Include authentication routes
require __DIR__.'/auth.php';

Route::fallback(function () {
    return Inertia::render('NotFound');
});
