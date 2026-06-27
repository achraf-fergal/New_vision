@component('mail::message')
# Compte validé

Bonjour {{ $user->prenom }} {{ $user->nom }},

Votre compte a été validé le {{ $dateValidation->format('d/m/Y H:i') }} par {{ $admin->prenom }} {{ $admin->nom }}.

Vous pouvez maintenant vous connecter et accéder à votre espace.

@component('mail::button', ['url' => $url])
Se connecter
@endcomponent

À bientôt,

{{ config('app.name') }}
@endcomponent