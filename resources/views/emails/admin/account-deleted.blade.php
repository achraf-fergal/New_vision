@component('mail::message')
# Compte supprimé

Bonjour {{ $user->prenom }} {{ $user->nom }},

Votre compte a été supprimé le {{ $dateSuppression->format('d/m/Y H:i') }}.

Si vous avez des questions, contactez l'administration.

Cordialement,

{{ config('app.name') }}
@endcomponent