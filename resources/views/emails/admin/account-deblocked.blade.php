@component('mail::message')
# Compte réactivé

Bonjour {{ $user->prenom }} {{ $user->nom }},

Votre compte a été réactivé le {{ $dateReactivation->format('d/m/Y H:i') }} par {{ $admin->prenom }} {{ $admin->nom }}.

Vous pouvez à nouveau vous connecter.

@component('mail::button', ['url' => $url])
Se connecter
@endcomponent

Cordialement,

{{ config('app.name') }}
@endcomponent