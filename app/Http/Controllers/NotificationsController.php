<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function NotificationsRequest(Request $request)
    {
        // dd($request->all());

        switch ($request->type) {
            case 'MaskAsRead':
                $notification = auth()->user()->notifications()->find($request->id);
                if ($notification) {
                    $notification->markAsRead();
                }
                break;

            case 'DeleteNotifications':
                $notification = auth()->user()->notifications()->find($request->id);
                if ($notification) {
                    $notification->delete();
                }
                break;

            case 'MaskAllAsRead':
                $notifications = auth()->user()->unreadNotifications;
                foreach ($notifications as $notification) {
                    $notification->markAsRead();
                }
                break;
            default:
                return response()->json(['error' => 'Invalid action'], 400);
        }
    }
}
