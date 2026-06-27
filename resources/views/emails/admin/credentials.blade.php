@component('mail::message')
# Vos informations de connexion

Bonjour {{ $admin->prenom }} {{ $admin->nom }},

Voici vos informations de connexion administrateur :

- Matricule : **{{ $matricule }}**
- Mot de passe : **{{ $password }}**

@component('mail::button', ['url' => $url])
Page de connexion administrateur
@endcomponent

Merci,

{{ config('app.name') }}
@endcomponent