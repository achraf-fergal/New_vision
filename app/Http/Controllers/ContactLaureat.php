<?php

namespace App\Http\Controllers;

use App\Mail\LaureatMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactLaureat extends Controller
{
    public function sendEmail(Request $request)
    {

            $request->validate([
                'fullname' => 'required|string',
                'email' => 'required|email',
                'subject' => 'nullable|string',
                'message' => 'required|string',
            ]);

            $emailData = [
                'fullname' => $request->fullname,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
            ];



        Mail::to("antaranass2004@gmail.com")->send(new LaureatMail($emailData));

        return back()->with('success', 'Email envoyé avec succès');
    }
}
