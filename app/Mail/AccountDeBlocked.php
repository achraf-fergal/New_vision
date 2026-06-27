<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class AccountDeBlocked extends Mailable
{
    use Queueable, SerializesModels;

    public $admin;
    public $FindLaureat;
    public $dateReactivation;
    public $url;

    /**
     * Create a new message instance.
     *
     * @param  mixed
     * @param  string
     * @param  string
     * @param  string
     * @return void
     */
    public function __construct($admin, $FindLaureat, $dateReactivation, string $url)
    {
        $this->admin = $admin;
        $this->FindLaureat = $FindLaureat;
        $this->dateReactivation = $dateReactivation;
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Account Blocked',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.admin.account-deblocked',
            with: [
                'admin' => $this->admin,
                'user' => $this->FindLaureat,
                'dateReactivation' => $this->dateReactivation,
                'url' => $this->url,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
