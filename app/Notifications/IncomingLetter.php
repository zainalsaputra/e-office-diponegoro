<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use NotificationChannels\Telegram\TelegramMessage;
use romanzipp\QueueMonitor\Traits\IsMonitored;

class IncomingLetter extends Notification implements ShouldQueue
{
    use Queueable, IsMonitored;

    protected $data;

    public function __construct($data)
    {
        $this->afterCommit();
        $this->data = $data;
    }

    public function via($notifiable)
    {
        return ['telegram'];
    }

    public function toTelegram($notifiable)
    {
        $message = "\xF0\x9F\x93\xA8 *SURAT MASUK*\n\n";
        $message .= "DARI: {$this->data['from']}\n";
        $message .= "PERIHAL: __{$this->data['subject']}__\n";
        $message .= "TANGGAL: {$this->data['date']}\n";
        $message .= "NO. SURAT: {$this->data['number']}\n";

        return TelegramMessage::create()
            ->to(env('TELEGRAM_CHAT_ID'))
            ->content($message)
            ->button('Lihat Surat', $this->data['download']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }

    public function failed(\Exception $e)
    {
        Log::debug($e->getMessage());
    }
}
