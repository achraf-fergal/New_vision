<!DOCTYPE html>
<html>
<head>
    <title>Contact Email</title>
</head>
<body>
    <h2>Contact Email</h2>
    <p><strong>Full Name:</strong> {{ $emailData['fullname'] }}</p>
    <p><strong>Email:</strong> {{ $emailData['email'] }}</p>
    @isset( $emailData['subject'] )
    <p><strong>Subject:</strong> {{ $emailData['subject'] }}</p>
    @endisset
    <p><strong>Message:</strong> {{ $emailData['message'] }}</p>
</body>
</html>
