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
        <div class="title">Rapport des Utilisateurs</div>
        <div class="subtitle">Généré le {{ $generatedAt }}</div>
    </div>

    <div class="section">
        <div class="section-title">Aperçu Global</div>
        <table>
            <tr>
                <th>Total Utilisateurs</th>
                <th>Nouveaux ce mois</th>
                <th>Comptes Validés</th>
            </tr>
            <tr>
                <td>{{ $totalUsers }}</td>
                <td>{{ $newUsersThisMonth }}</td>
                <td>{{ $validatedUsers }} ({{ round(($validatedUsers/$totalUsers)*100, 2) }}%)</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Répartition par Promotion</div>
        <table>
            <tr>
                <th>Promotion</th>
                <th>Nombre d'utilisateurs</th>
            </tr>
            @foreach($usersByPromotion as $promo)
            <tr>
                <td>{{ $promo->promotion }}</td>
                <td>{{ $promo->count }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <div class="section-title">Répartition par Filière</div>
        <table>
            <tr>
                <th>Filière</th>
                <th>Nombre d'utilisateurs</th>
            </tr>
            @foreach($usersByFiliere as $filiere)
            <tr>
                <td>{{ $filiere->filiere }}</td>
                <td>{{ $filiere->count }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <div class="section-title">Inscriptions Mensuelles</div>
        <table>
            <tr>
                <th>Mois</th>
                <th>Nouvelles inscriptions</th>
                <th>Comptes validés</th>
            </tr>
            @foreach($monthlyUsers as $month)
            <tr>
                <td>{{ $month->month }}</td>
                <td>{{ $month->count }}</td>
                <td>{{ $month->validated_count }} ({{ round(($month->validated_count/$month->count)*100, 2) }}%)</td>
            </tr>
            @endforeach
        </table>
    </div>

</body>
</html>
