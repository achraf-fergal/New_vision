<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

/**
 * CommentModerationService
 *
 * This service handles text comment content moderation using an API.
 * It checks comments for inappropriate content such as profanity, hate speech, threats, etc.
 */
class CommentModerationService
{
    /**
     * Check a comment for inappropriate content
     *
     * @param  string  $commentText  The text content to be checked
     * @return array Returns [bool $isAppropriate, string|null $rejectionReason]
     */
    public static function check($commentText)
    {
        try {
            $response = Http::timeout(5)->asForm()->post('https://api.sightengine.com/1.0/text/check.json', [
                'text' => $commentText,
                'lang' => 'en',
                'categories' => 'profanity,drug,weapon,spam,extremism,violence,self-harm,medical',
                'mode' => 'rules',
                'api_user' => env('SIGHTENGINE_USER'),
                'api_secret' => env('SIGHTENGINE_SECRET'),
            ]);
            $data = $response->json();

            if (isset($data['profanity']['matches']) && count($data['profanity']['matches']) > 0) {
                return [false, 'The comment contains profanity'];
            }

            if (isset($data['spam']['matches']) && count($data['spam']['matches']) > 0) {
                return [false, 'The comment appears to be spam'];
            }

            if (isset($data['drug']['matches']) && count($data['drug']['matches']) > 0) {
                return [false, 'The comment contains drug-related content'];
            }

            if (isset($data['weapon']['matches']) && count($data['weapon']['matches']) > 0) {
                return [false, 'The comment contains weapon-related content'];
            }

            if (isset($data['medical']['matches']) && count($data['medical']['matches']) > 0) {
                return [false, 'The comment contains medical-related content'];
            }

            if (isset($data['extremism']['matches']) && count($data['extremism']['matches']) > 0) {
                return [false, 'The comment contains threatening or violent content'];
            }

            if (isset($data['violence']['matches']) && count($data['violence']['matches']) > 0) {
                return [false, 'The comment contains threatening or violent content'];
            }

            if (isset($data['self-harm']['matches']) && count($data['self-harm']['matches']) > 0) {
                return [false, 'The comment contains threatening or self-harm content'];
            }

            return [true, null];
        } catch (\Exception $e) {
            // If API is unreachable, allow the comment
            return [true, null];
        }
    }
}
