<?php
/**
 * RabbitPay lead endpoint (Hostinger / PHP).
 *
 * Receives { email, phone } from the site's demo form and sends a notification
 * email via Resend. This replaces the local FastAPI backend in production so no
 * separate Python server is needed — everything runs on Hostinger.
 *
 * The frontend posts to /api/leads (rewritten to this file by .htaccess).
 */

require __DIR__ . '/config.php';

header('Content-Type: application/json');

// Only POST is allowed.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'detail' => 'Method not allowed']);
    exit;
}

// Parse the JSON body (fall back to form-encoded).
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');

// Validate email + phone.
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'detail' => 'Invalid email address']);
    exit;
}
$digits = preg_replace('/[^0-9]/', '', $phone);
if (strlen($digits) < 10 || strlen($digits) > 15) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'detail' => 'Invalid phone number']);
    exit;
}

// Build the email body (Email / Phone / Timestamp).
$timestamp = gmdate('Y-m-d H:i:s') . ' UTC';
$safeEmail = htmlspecialchars($email, ENT_QUOTES);
$safePhone = htmlspecialchars($phone, ENT_QUOTES);
$html =
    '<pre style="font-family: sans-serif; font-size:14px; line-height:1.5; color:#0F172A; white-space:pre-wrap; margin:0;">'
    . "Email:\n$safeEmail\n\nPhone:\n$safePhone\n\nTimestamp:\n$timestamp</pre>";

$payload = json_encode([
    'from'     => EMAIL_FROM,
    'to'       => [EMAIL_TO],
    'subject'  => 'New RabbitPay Demo Request',
    'html'     => $html,
    'reply_to' => $email,
]);

// Send via Resend.
$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . RESEND_API_KEY,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_TIMEOUT        => 20,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$emailId   = null;
$emailSent = false;
if ($response !== false && $httpCode >= 200 && $httpCode < 300) {
    $respData = json_decode($response, true);
    $emailId  = $respData['id'] ?? null;
    $emailSent = $emailId !== null;
}

if (!$emailSent) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'email_sent' => false, 'detail' => 'Email not sent']);
    exit;
}

echo json_encode(['status' => 'ok', 'email_sent' => true, 'email_id' => $emailId]);
