<?php

require_once __DIR__ . '/bootstrap.php';

if (isset($_SESSION['user_id'])) {
    $user = auth_get_current_user();
    if ($user) {
        $sessions = $user['sessions'] ?? [];
        $jti = $_SESSION['jti'] ?? '';
        $sessions = array_filter($sessions, function ($s) use ($jti) {
            return ($s['jti'] ?? '') !== $jti;
        });
        auth_update_user($user['id'], ['sessions' => array_values($sessions)]);
    }
}

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 42000,
        'path' => $params['path'],
        'domain' => $params['domain'],
        'secure' => $params['secure'],
        'httponly' => $params['httponly'],
        'samesite' => 'Lax',
    ]);
}

setcookie('access_token', '', ['expires' => time() - 3600, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);
setcookie('refresh_token', '', ['expires' => time() - 3600, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);

session_destroy();

header('Location: login.php');
exit();
