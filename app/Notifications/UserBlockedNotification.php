<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class UserBlockedNotification extends Notification
{
    use Queueable;

    protected $blocker;

    public function __construct($blocker)
    {
        $this->blocker = $blocker;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Account Access Restricted')
            ->line('Your account access has been restricted.')
            ->line('If you believe this is an error, please contact support.');
    }

    public function toArray(object $notifiable): array
    {
        $message = "Your account has been temporarily restricted";


        $details = [
            "You currently have limited access to platform features",
            "This restriction will remain until further review"
        ];


        return [
            'title' => 'Account Access Restricted',
            'message' => $message,
            'details' => $details,
            'action_text' => 'Contact Support',
            'action_url' => url('/support'),
            'sender_id' =>$this->blocker->id,
            'type' => 'event',
            'created_at' => Carbon::now()->toISOString()
        ];
    }
}
