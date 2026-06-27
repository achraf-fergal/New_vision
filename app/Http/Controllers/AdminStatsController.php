<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Souvenir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use PDF;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf as PDF;


class AdminStatsController extends Controller
{
    public function totalUsers()
    {
        return response()->json([
            'total' => User::count()
        ]);
    }

    public function totalSouvenirs()
    {
        return response()->json([
            'total' => Souvenir::count()
        ]);
    }

    public function monthlyUsers()
    {
            $stats = User::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(CASE WHEN valide = 1 THEN 1 ELSE 0 END) as validated_count')
            )
                ->groupBy('month')
                ->orderBy('month')
                ->get();

        return response()->json($stats);
    }

    public function monthlySouvenirs()
    {
        $stats = Souvenir::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($stats);
    }

    public function usersByFiliere()
    {
        $stats = User::select(
            'filiere',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('filiere')
            ->orderByDesc('count')
            ->get();

        return response()->json($stats);
    }

    public function usersByPromotion()
    {
        $stats = User::select(
            'promotion',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('promotion')
            ->orderByDesc('promotion')
            ->get();

        return response()->json($stats);
    }

    public function souvenirsByCategory()
    {
        $stats = Souvenir::select(
            'categorie as category',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('category')
            ->orderByDesc('count')
            ->get();

        return response()->json($stats);
    }

    public function engagementMetrics()
    {
        return response()->json([
            'likes' => Souvenir::sum('likes_count'),
            'comments' => Souvenir::sum('comments_count'),
            'saves' => Souvenir::sum('saves_count'),
            'shares' => Souvenir::sum('shares_count')
        ]);
    }



    public function generateSouvenirReport()
    {
        $totalSouvenirs = Souvenir::count();
        $souvenirsThisMonth = Souvenir::whereMonth('created_at', now()->month)->count();
        $souvenirsByCategory = Souvenir::select('categorie', DB::raw('COUNT(*) as count'))
            ->groupBy('categorie')
            ->orderByDesc('count')
            ->get();
        $monthlySouvenirs = Souvenir::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        $mostActiveUsers = User::withCount('souvenirs')
            ->orderByDesc('souvenirs_count')
            ->limit(5)
            ->get();

        $data = [
            'title' => 'Rapport Souvenirs - ' . Carbon::now()->format('d/m/Y'),
            'totalSouvenirs' => $totalSouvenirs,
            'souvenirsThisMonth' => $souvenirsThisMonth,
            'souvenirsByCategory' => $souvenirsByCategory,
            'monthlySouvenirs' => $monthlySouvenirs,
            'mostActiveUsers' => $mostActiveUsers,
            'generatedAt' => Carbon::now()->format('d/m/Y H:i')
        ];

        $pdf = PDF::loadView('reports.souvenirs', $data);
        return $pdf->download('rapport_souvenirs.pdf');
    }



    public function generateUserReport()
    {
        $totalUsers = User::count();
        $newUsersThisMonth = User::whereMonth('created_at', now()->month)->count();
        $validatedUsers = User::where('valide', true)->count();
        $usersByPromotion = User::select('promotion', DB::raw('COUNT(*) as count'))
            ->groupBy('promotion')
            ->orderByDesc('promotion')
            ->get();
        $usersByFiliere = User::select('filiere', DB::raw('COUNT(*) as count'))
            ->groupBy('filiere')
            ->orderByDesc('count')
            ->get();
        $monthlyUsers = User::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count'),
            DB::raw('SUM(CASE WHEN valide = 1 THEN 1 ELSE 0 END) as validated_count')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $data = [
            'title' => 'Rapport Utilisateurs - ' . Carbon::now()->format('d/m/Y'),
            'totalUsers' => $totalUsers,
            'newUsersThisMonth' => $newUsersThisMonth,
            'validatedUsers' => $validatedUsers,
            'usersByPromotion' => $usersByPromotion,
            'usersByFiliere' => $usersByFiliere,
            'monthlyUsers' => $monthlyUsers,
            'generatedAt' => Carbon::now()->format('d/m/Y H:i')
        ];

        $pdf = PDF::loadView('reports.users', $data);
        return $pdf->download('rapport_utilisateurs.pdf');
    }
}
