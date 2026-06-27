<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class DeletedAccount extends Mailable
{
    use Queueable, SerializesModels;

    public $FindLaureat;
    public $dateSuppression;

    /**
     * Create a new message instance.
     *
     * @param  mixed
     * @param  string
     * @param  string
     * @return void
     */
    public function __construct($FindLaureat, $dateSuppression)
    {
        $this->FindLaureat = $FindLaureat;
        $this->dateSuppression = $dateSuppression;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Account Deleted',
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
            markdown: 'emails.admin.account-deleted',
            with: [
                'user' => $this->FindLaureat,
                'dateSuppression' => $this->dateSuppression,
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
