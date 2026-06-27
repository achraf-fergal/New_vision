<?php

use App\Http\Controllers\AdminStatsController;
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
use App\Http\Controllers\AvisController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GestionnaireController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\SouvenirController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckIfBlocked;
use App\Http\Middleware\RoleMiddleware;
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

    Route::get('/login/{provider}', [SocialAuthController::class, 'redirect'])->name('socialite.redirect');

    Route::get('/auth/{provider}/callback', [SocialAuthController::class,  'callback'])->name('socialite.callback');

    // Route::get("/gestionnaire/any", function () {
    //     return redirect()->route('gestionnaire.login');
    // });

});

Route::middleware(['auth',  CheckIfBlocked::class])->group(function () {
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

    Route::post('LikedPoste', [SouvenirController::class, 'LikedPost'])->name('poste.like');
    Route::post('Unlike', [SouvenirController::class, 'UnLikedPost'])->name('poste.Unlike');
    Route::post('Poste/{id}/Likes', [SouvenirController::class, 'GetLikes'])->name('poste.GrtLikes');
    Route::post('SavePoste', [SouvenirController::class, 'BookmarkPost'])->name('poste.save');
    Route::post('UnSavePoste', [SouvenirController::class, 'UnBookmarkPost'])->name('poste.Unsave');
    Route::post('SubmitPoste', [SouvenirController::class, 'Store'])->name('poste.store');
    Route::post('DeletePoste', [SouvenirController::class, 'Destroy'])->name('poste.delete');
    Route::get('Poste/{id}', [SouvenirController::class, 'GetPoste'])->name('poste.get');

    Route::post('GetComments/{PosteId}', [CommentController::class, 'index'])->name('comments.get');
    Route::post('AjouterComment', [CommentController::class, 'AjouterComment'])->name('AjouterComment');
    Route::delete('DeleteComment/{CommentId}', [CommentController::class, 'DeleteComment'])->name('DeleteComment');
    Route::put('UpdateComment/{CommentId}', [CommentController::class, 'UpdateComment'])->name('UpdateComment');

    Route::post('laureat/statistique/{id}', [UserController::class, 'StatistiqueLaureat'])->name('laureat.statistique');
    Route::post('profile_upload', [UserController::class, 'UploadPhoto'])->name('laureat.profile.upload');
    Route::post('profile_update', [UserController::class, 'UpdateProfile'])->name('laureat.profile.update');
    Route::post('password_update', [UserController::class, 'UpdatePassword'])->name('laureat.password.update');
    Route::post('Poste/{id}/ShareCount', [UserController::class, 'UpdateShareCount'])->name('laureat.ShareCount');
    Route::post('Poste/Search', [UserController::class, 'getCombinedSearch'])->name('laureat.search.combined');
    Route::post('Laureat/Delete', [UserController::class, 'Delete'])->name('account.delete');

    Route::get('/Notificatons', function () {
        return Inertia::render('Laureat/Notifications');
    })->name('laureat.notifications');

    Route::post('/Notificatons/methodes', [NotificationsController::class, 'NotificationsRequest'])->name('notification.methodes');

    Route::post('Avis/store', [AvisController::class, 'store'])->name('avis.store');
    Route::post('Avis/destroy/{id}', [AvisController::class, 'destroy'])->name('avis.destroy');
    Route::post('Avis/helpful/{id}', [AvisController::class, 'helpful'])->name('avis.helpful');
    Route::post('Avis/report/{id}', [AvisController::class, 'report'])->name('avis.report');

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

    Route::get('/gestionnaire/dashboard', [GestionnaireController::class, 'index'])->name('gestionnaire.dashboard');
    Route::get('/gestionnaire/WaitingLaureat', [GestionnaireController::class, 'IndexLaureatWaiting'])->name('laureat.waiting');
    Route::get('/gestionnaire/AcceptedLaureat', [GestionnaireController::class, 'IndexLaureatAccepted'])->name('laureat.accepted');
    Route::get('/gestionnaire/BlockedLaureat', [GestionnaireController::class, 'IndexLaureatBlocked'])->name('laureat.blocked');
    Route::post('/gestionnaire/accepted/blocked', [GestionnaireController::class, 'AcceptedBlocked'])->name('laureat.accepted.block');
    Route::post('/gestionnaire/waiting/accepted', [GestionnaireController::class, 'WaitingAccepted'])->name('laureat.waiting.accept');
    Route::post('/gestionnaire/waiting/rejected', [GestionnaireController::class, 'WaitingRejected'])->name('laureat.waiting.reject');
    Route::post('/gestionnaire/blocked/unblock', [GestionnaireController::class, 'BlockedUnblock'])->name('laureat.blocked.unblock');

    Route::get('/gestionnaire/Profile', [GestionnaireController::class, 'CreateFormProfile'])->name('profile.edit');
    Route::post('/gestionnaire/Profile/update', [GestionnaireController::class, 'update'])->name('gestionnaire.profile');
    Route::post('/gestionnaire/Profile/upload', [GestionnaireController::class, 'UploadImage'])->name('gestionnaire.profile.upload');

    Route::post('/gestionnaire/Password/update', [GestionnaireController::class, 'UpdatePassword'])->name('gestionnaire.password.update');
    Route::post('/gestionnaire/Ajouter_Gestionnaires', [GestionnaireController::class, 'store'])->name('gestionnaire.store');
    Route::post('/gestionnaire/valide_Gestionnaires/{id}', [GestionnaireController::class, 'toggleValide'])->name('gestionnaire.toggleValide');
    Route::post('/gestionnaire/Supprimer_Gestionnaires/{id}', [GestionnaireController::class, 'destroy'])->name('gestionnaire.destroy');
    Route::post('/gestionnaire/Supprimer_Account/{id}', [GestionnaireController::class, 'AccountDelete'])->name('gestionnaire.account.delete');

    Route::post('/gestionnaire/logout', [GestionnaireAuthController::class, 'logout'])->name('gestionnaire.logout');
});

Route::middleware(['auth:gestionnaire', RoleMiddleware::class.':superadmin'])->group(function () {
    Route::get('/gestionnaire/Management', [GestionnaireController::class, 'SuperAdminManage'])->name('Superadmin.manage');
});

Route::middleware('auth:gestionnaire')->prefix('admin/stats')->group(function () {
    Route::post('/users', [AdminStatsController::class, 'totalUsers']);
    Route::post('/souvenirs', [AdminStatsController::class, 'totalSouvenirs']);
    Route::post('/monthly-users', [AdminStatsController::class, 'monthlyUsers']);
    Route::post('/monthly-souvenirs', [AdminStatsController::class, 'monthlySouvenirs']);
    Route::post('/users-by-filiere', [AdminStatsController::class, 'usersByFiliere']);
    Route::post('/users-by-promotion', [AdminStatsController::class, 'usersByPromotion']);
    Route::post('/souvenirs-by-category', [AdminStatsController::class, 'souvenirsByCategory']);
    Route::post('/engagement-metrics', [AdminStatsController::class, 'engagementMetrics']);
});

Route::middleware('auth:gestionnaire')->prefix('admin/reports')->group(function () {
    Route::get('/users', [AdminStatsController::class, 'generateUserReport']);
    Route::get('/souvenirs', [AdminStatsController::class, 'generateSouvenirReport']);
});
