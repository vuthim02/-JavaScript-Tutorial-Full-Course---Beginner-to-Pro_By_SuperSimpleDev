<?php

require_once __DIR__ . '/../bootstrap.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

if ($action === 'init') {

    $email = $input['email'] ?? null;
    $userId = null;

    if ($email) {
        $user = auth_find_user_by_email($email);
        if ($user) {
            $userId = $user['id'];
        }
    }

    $options = webauthn_prepare_login($userId);

    echo json_encode(['success' => true, 'options' => $options]);
    exit();

} elseif ($action === 'finish') {

    $challenge = $input['challenge'] ?? '';
    $credential = $input['credential'] ?? [];

    if (empty($challenge) || empty($credential)) {
        echo json_encode(['success' => false, 'message' => 'Missing challenge or credential']);
        exit();
    }

    $result = webauthn_process_login($credential, $challenge);

    if (!$result['success']) {
        echo json_encode($result);
        exit();
    }

    $user = $result['user'];

    $fingerprint = auth_get_device_fingerprint();
    $ip = auth_get_client_ip();
    $knownIps = $user['known_ips'] ?? [];
    $knownDevices = $user['known_devices'] ?? [];

    if (!in_array($ip, $knownIps)) {
        $knownIps[] = $ip;
    }
    if (!in_array($fingerprint, $knownDevices)) {
        $knownDevices[] = $fingerprint;
    }

    auth_update_user($user['id'], [
        'last_login_at' => date('c'),
        'last_login_ip' => $ip,
        'known_ips' => $knownIps,
        'known_devices' => $knownDevices,
    ]);

    $accessToken = jwt_generate_access_token($user['id'], $user['username'], $user['roles'] ?? ['user']);
    $refreshToken = jwt_generate_refresh_token($user['id']);

    setcookie('access_token', $accessToken, [
        'expires' => time() + 900,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    setcookie('refresh_token', $refreshToken, [
        'expires' => time() + 604800,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    auth_start_session($user);

    echo json_encode(['success' => true, 'message' => 'Authentication successful']);
    exit();

} else {

    echo json_encode(['success' => false, 'message' => 'Unknown action']);
    exit();
}
