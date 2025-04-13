<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\GestionnaireAuthController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GestionnaireController;
use App\Http\Controllers\LaureatController;
use App\Http\Controllers\SouvenirController;
use App\Models\laureat;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('FinalRegister', [RegisteredUserController::class, 'createFinalRegister'])
        ->name('FinalRegister');

    Route::post('FinalRegister', [RegisteredUserController::class, 'storeFinalRegister']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');



    Route::post('LikedPoste',[SouvenirController::class, 'LikedPost'])->name('poste.like');
    Route::post('Unlike',[SouvenirController::class, 'UnLikedPost'])->name('poste.Unlike');
    Route::post('Poste/{id}/Likes',[SouvenirController::class, 'GetLikes'])->name('poste.GrtLikes');
    Route::post('SavePoste',[SouvenirController::class, 'BookmarkPost'])->name('poste.save');
    Route::post('UnSavePoste',[SouvenirController::class, 'UnBookmarkPost'])->name('poste.Unsave');
    Route::post('SubmitPoste',[SouvenirController::class, 'Store'])->name('poste.store');
    Route::post('DeletePoste',[SouvenirController::class, 'Destroy'])->name('poste.delete');
    Route::get('Poste/{id}',[SouvenirController::class, 'GetPoste'])->name('poste.get');


    Route::post('GetComments/{PosteId}',[CommentController::class, 'index'])->name('comments.get');
    Route::post('AjouterComment',[CommentController::class, 'AjouterComment'])->name('AjouterComment');
    Route::delete('DeleteComment/{CommentId}',[CommentController::class, 'DeleteComment'])->name('DeleteComment');


    Route::post('laureat/statistique/{id}',[LaureatController::class, 'StatistiqueLaureat'])->name('laureat.statistique');
    Route::post('profile_upload',[LaureatController::class, 'UploadPhoto'])->name('laureat.profile.upload');
    Route::post('profile_update',[LaureatController::class, 'UpdateProfile'])->name('laureat.profile.update');
    Route::post('password_update',[LaureatController::class, 'UpdatePassword'])->name('laureat.password.update');
    Route::post('Poste/{id}/ShareCount',[LaureatController::class, 'UpdateShareCount'])->name('laureat.ShareCount');
    Route::post('Poste/Search',[LaureatController::class, 'GetPosteSearched'])->name('laureat.search.getpostes');








    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});



Route::middleware('guest:gestionnaire')->group(function () {
    Route::get('/gestionnaire/login', [GestionnaireAuthController::class, 'showLoginForm'])->name('gestionnaire.login');
    Route::post('/gestionnaire/login', [GestionnaireAuthController::class, 'login']);
    Route::get('/gestionnaire/register', [GestionnaireAuthController::class, 'showRegistrationForm'])->name('gestionnaire.register');
    Route::post('/gestionnaire/register', [GestionnaireAuthController::class, 'register']);
});

Route::middleware('auth:gestionnaire')->group(function () {

    Route::get('/gestionnaire/dashboard', [GestionnaireController::class , 'index'])->name('gestionnaire.dashboard');
    Route::get('/gestionnaire/WaitingLaureat', [GestionnaireController::class, 'IndexLaureatWaiting'])->name('laureat.waiting');
    Route::get('/gestionnaire/AcceptedLaureat', [GestionnaireController::class, 'IndexLaureatAccepted'])->name('laureat.accepted');
    Route::get('/gestionnaire/BlockedLaureat', [GestionnaireController::class, 'IndexLaureatBlocked'])->name('laureat.blocked');
    Route::post('/gestionnaire/accepted/blocked', [GestionnaireController::class , 'AcceptedBlocked'])->name('laureat.accepted.block');
    Route::post('/gestionnaire/waiting/accepted', [GestionnaireController::class , 'WaitingAccepted'])->name('laureat.waiting.accept');
    Route::post('/gestionnaire/waiting/rejected', [GestionnaireController::class , 'WaitingRejected'])->name('laureat.waiting.reject');
    Route::post('/gestionnaire/blocked/unblock', [GestionnaireController::class , 'BlockedUnblock'])->name('laureat.blocked.unblock');

    Route::get('/gestionnaire/Profile', [GestionnaireController::class, 'CreateFormProfile'])->name('profile.edit');
    Route::post('/gestionnaire/Profile/update', [GestionnaireController::class, 'update'])->name('gestionnaire.profile');
    Route::post('/gestionnaire/Profile/upload', [GestionnaireController::class, 'UploadImage'])->name('gestionnaire.profile.upload');

    Route::post('/gestionnaire/Password/update', [GestionnaireController::class, 'UpdatePassword'])->name('gestionnaire.password.update');


    Route::post('/gestionnaire/logout', [GestionnaireAuthController::class, 'logout'])->name('gestionnaire.logout');
});
