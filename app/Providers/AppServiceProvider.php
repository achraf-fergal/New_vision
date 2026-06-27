<?php

namespace App\Providers;

use App\Models\souvenir;
use App\Models\User;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share('Filieres', function () {
            if (auth()->user()) {

                $Filieres = souvenir::select('categorie')
                    ->selectRaw('COUNT(*) as total')
                    ->groupBy('categorie')
                    ->orderByDesc('total')
                    ->limit(10)
                    ->pluck('categorie');

                return $Filieres;
            }
            return [];
        });



        Inertia::share('Notifications', function () {
            if (auth()->user()) {

                $notifications = auth()->user()->notifications;

                foreach ($notifications as $notification) {
                    $notification->sender = [];
                    $FindSender = $notification->notifiable_type::find($notification->data['sender_id']);
                    $notification->sender = [$FindSender];
                }

                return $notifications;
            }
            return [];
        });
    }
}
