<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ImageModerationService
{
    public static function check($imagePath)
    {
        $imageUrl = 'https://fnh.ma/uploads/actualites/5ec7f0db4f420.jpg';

        $response = Http::get('https://api.sightengine.com/1.0/check.json', [
            'models' => 'nudity,recreational_drug,medical,gore-2.0,self-harm,gambling,wad,offensive',
            'api_user' => env('SIGHTENGINE_USER'),
            'api_secret' => env('SIGHTENGINE_SECRET'),
            'url' => $imageUrl,
        ]);

        $data = $response->json();
        // dd($djata);
        // فحص العري
        if (isset($data['nudity']) && $data['nudity']['safe'] < 0.90) {
            return (
                [
                    false,
                    'The image contains nudity',
                ]
            );
        }

        // فحص المخدرات
        if (isset($data['recreational_drug']) && $data['recreational_drug']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains recreational drugs',
                ]
            );
        }

        // فحص محتوى طبي
        if (isset($data['medical']) && $data['medical']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains medical content',
                ]
            );
        }

        // فحص العنف (دموي)
        if (isset($data['gore']) && $data['gore']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains gore content',
                ]
            );
        }

        // فحص الأذى الذاتي
        if (isset($data['self-harm']) && $data['self-harm']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains self-harm content',
                ]
            );
        }

        // فحص القمار
        if (isset($data['gambling']) && $data['gambling']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains gambling content',
                ]
            );
        }

        // فحص محتوى غير لائق
        if (isset($data['offensive']) && $data['offensive']['prob'] > 0.90) {
            return (
                [
                    false,
                    'The image contains offensive content',
                ]
            );
        }

        return (
            [
                true,
                null,
            ]
        );
    }
}
