<?php

namespace App\Mail;

use App\Models\Gestionnaire;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;

class AdminCredentialsMail extends Mailable
{
    use Queueable, SerializesModels;

    public $admin;
    public $password;
    public $matricule;

    /**
     * Create a new message instance.
     */
    public function __construct(Gestionnaire $admin, $password, $matricule)
    {
        $this->admin = $admin;
        $this->password = $password;
        $this->matricule = $matricule;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Vos informations de connexion'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.admin.credentials',
            with: [
                'admin' => $this->admin,
                'password' => $this->password,
                'matricule' => $this->matricule,
                'url' => route('gestionnaire.login')
            ]
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
