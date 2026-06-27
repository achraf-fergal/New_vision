<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class UserValidatedNotification extends Notification
{
    use Queueable;

    protected $validator;

    public function __construct($validator = null)
    {
        $this->validator = $validator;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Account Has Been Validated')
            ->line('Your account has been successfully validated.')
            ->action('Go to Dashboard', url('/dashboard'))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Account Validated',
            'message' => 'Your account has been successfully validated. You now have full access to all features.',
            'details' => [
                'You can now access all platform features.',
                'You can now update your profile.',
                'You can now reconnect with old friends and share memories.'
            ],
            'action_text' => 'Go to Dashboard',
            'action_url' => url('/dashboard'),
            'sender_id' => $this->validator ? $this->validator->id : null,
            'type' => 'event',
            'created_at' => Carbon::now()->toISOString()
        ];
    }
}
