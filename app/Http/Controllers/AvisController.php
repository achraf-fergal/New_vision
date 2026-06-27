<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Models\LaureatActivity;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'avis' => 'required|string',
        ]);

        $avis = new Avis;
        $avis->avis = $request->avis;
        $avis->dateAvis = $request->dateAvis;
        $avis->user_id = auth()->user()->id;
        $avis->report = 0;
        $avis->helpful = 0;
        $avis->save();
    }

    public function destroy(string $id)
    {
        $avis = Avis::find($id);
        $avis->delete();

        $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

        if ($FindLaureat) {
            $reportArray = $FindLaureat->Report_Avis ?? [];
            $helpfulArray = $FindLaureat->Helpful_Avis ?? [];
            $reportArray = array_values(array_filter($reportArray, fn ($item) => $item != $avis->id));
            $helpfulArray = array_values(array_filter($helpfulArray, fn ($item) => $item != $avis->id));
            $FindLaureat->Report_Avis = $reportArray;
            $FindLaureat->Helpful_Avis = $helpfulArray;
            $FindLaureat->update();
        }
        $avis->delete();
    }

    public function helpful(string $id)
    {
        $avis = Avis::find($id);
        $avis->helpful += 1;

        $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

        if ($FindLaureat) {
            $helpfulArray = $FindLaureat->Helpful_Avis ?? [];
            $reportArray = $FindLaureat->Report_Avis ?? [];

            if (! in_array($avis->id, $helpfulArray)) {
                $helpfulArray[] = $avis->id;
            }

            $reportArray = array_values(array_filter($reportArray, fn ($item) => $item != $avis->id));
            if (in_array($avis->id, $reportArray)) {
                $avis->report -= 1;
            }

            $FindLaureat->Helpful_Avis = $helpfulArray;
            $FindLaureat->Report_Avis = $reportArray;
            $FindLaureat->update();
        } else {
            LaureatActivity::create([
                'Laureat_id' => (int) auth()->user()->id,
                'Liked_Poste' => [],
                'saved_Poste' => [],
                'Count_LikedPoste' => 0,
                'Count_SavedPoste' => 0,
                'MyPostes_Count' => 0,
                'Helpful_Avis' => [$avis->id],
                'Report_Avis' => [],
                'MyComments_Count' => 0,
            ]);
        }

        $avis->update();
    }

    public function report(string $id)
    {
        $avis = Avis::find($id);
        $avis->report += 1;

        if ($avis->report >= 30) {

            $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

            if ($FindLaureat) {
                $reportArray = $FindLaureat->Report_Avis ?? [];
                $helpfulArray = $FindLaureat->Helpful_Avis ?? [];
                $reportArray = array_values(array_filter($reportArray, fn ($item) => $item != $avis->id));
                $helpfulArray = array_values(array_filter($helpfulArray, fn ($item) => $item != $avis->id));
                $FindLaureat->Report_Avis = $reportArray;
                $FindLaureat->Helpful_Avis = $helpfulArray;
                $FindLaureat->update();
            }
            $avis->delete();
        } else {
            $FindLaureat = LaureatActivity::where('Laureat_id', auth()->user()->id)->first();

            if ($FindLaureat) {
                $reportArray = $FindLaureat->Report_Avis ?? [];
                $helpfulArray = $FindLaureat->Helpful_Avis ?? [];

                if (! in_array($avis->id, $reportArray)) {
                    $reportArray[] = $avis->id;
                }

                $helpfulArray = array_values(array_filter($helpfulArray, fn ($item) => $item != $avis->id));
                if (in_array($avis->id, $helpfulArray)) {
                    $avis->helpful -= 1;
                }

                $FindLaureat->Report_Avis = $reportArray;
                $FindLaureat->Helpful_Avis = $helpfulArray;
                $FindLaureat->update();
            } else {
                LaureatActivity::create([
                    'Laureat_id' => (int) auth()->user()->id,
                    'Liked_Poste' => [],
                    'saved_Poste' => [],
                    'Count_LikedPoste' => 0,
                    'Count_SavedPoste' => 0,
                    'MyPostes_Count' => 0,
                    'Helpful_Avis' => [],
                    'Report_Avis' => [$avis->id],
                    'MyComments_Count' => 0,
                ]);
            }
        }
        $avis->update();
    }
}
