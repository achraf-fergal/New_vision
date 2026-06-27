@component('mail::message')
# Compte bloqué

Bonjour {{ $user->prenom }} {{ $user->nom }},

Votre compte a été bloqué le {{ $dateBloquage->format('d/m/Y H:i') }} par {{ $admin->prenom }} {{ $admin->nom }}.

Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administration via le lien ci-dessous.

@component('mail::button', ['url' => $contactUrl])
Contacter le support
@endcomponent

Cordialement,

{{ config('app.name') }}
@endcomponent