<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; }
        .subtitle { font-size: 14px; color: #666; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        table th { background-color: #f2f2f2; }
        .chart { width: 100%; height: 300px; margin-bottom: 20px; }
        .footer { text-align: right; font-size: 12px; color: #666; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Rapport des Souvenirs</div>
        <div class="subtitle">Généré le {{ $generatedAt }}</div>
    </div>

    <div class="section">
        <div class="section-title">Aperçu Global</div>
        <table>
            <tr>
                <th>Total Souvenirs</th>
                <th>Souvenirs ce mois</th>
            </tr>
            <tr>
                <td>{{ $totalSouvenirs }}</td>
                <td>{{ $souvenirsThisMonth }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Répartition par Catégorie</div>
        <table>
            <tr>
                <th>Catégorie</th>
                <th>Nombre de souvenirs</th>
            </tr>
            @foreach($souvenirsByCategory as $category)
            <tr>
                <td>{{ $category->categorie }}</td>
                <td>{{ $category->count }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <div class="section-title">Activité Mensuelle</div>
        <table>
            <tr>
                <th>Mois</th>
                <th>Nombre de souvenirs</th>
            </tr>
            @foreach($monthlySouvenirs as $month)
            <tr>
                <td>{{ $month->month }}</td>
                <td>{{ $month->count }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <div class="section-title">Utilisateurs les plus Actifs</div>
        <table>
            <tr>
                <th>Utilisateur</th>
                <th>Nombre de souvenirs</th>
            </tr>
            @foreach($mostActiveUsers as $user)
            <tr>
                <td>{{ $user->prenom }} {{ $user->nom }}</td>
                <td>{{ $user->souvenirs_count }}</td>
            </tr>
            @endforeach
        </table>
    </div>

</body>
</html>
