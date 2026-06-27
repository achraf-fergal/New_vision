<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class UserUnblockedNotification extends Notification
{
    use Queueable;

    protected $unblocker;

    public function __construct($unblocker)
    {
        $this->unblocker = $unblocker;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Account Access Restored')
            ->line('Good news! Your account access has been fully restored.')
            ->line('You now have full access to all platform features.')
            ->action('Go to Dashboard', url('/dashboard'))
            ->line('Thank you for your patience.');
    }

    public function toArray(object $notifiable): array
    {
        $Message = 'Your account access has been fully restored. You now have complete access to all platform features.';

        return [
            'title' => 'Account Access Restored',
            'message' => $Message,
            'details' => [
                'All account restrictions have been removed',
                'You now have full access to all platform features',
                'Your profile and content are visible again'
            ],
            'action_text' => 'Go to Dashboard',
            'action_url' => url('/dashboard'),
            'sender_id' =>$this->unblocker->id,
            'type' => 'event',
            'created_at' => Carbon::now()->toISOString()
        ];
    }
}
