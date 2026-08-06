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

    auth_require_login();
    $user = auth_get_current_user();

    $options = webauthn_prepare_register(
        $user['id'],
        $user['email'],
        $user['username']
    );

    echo json_encode(['success' => true, 'options' => $options]);
    exit();

} elseif ($action === 'finish') {

    auth_require_login();
    $user = auth_get_current_user();

    $challenge = $input['challenge'] ?? '';
    $credential = $input['credential'] ?? [];

    if (empty($challenge) || empty($credential)) {
        echo json_encode(['success' => false, 'message' => 'Missing challenge or credential']);
        exit();
    }

    $result = webauthn_process_register($credential, $challenge);

    if (!$result['success']) {
        echo json_encode($result);
        exit();
    }

    $webauthnCreds = $user['webauthn_credentials'] ?? [];

    foreach ($webauthnCreds as $existing) {
        if ($existing['id'] === $result['credential']['id']) {
            echo json_encode(['success' => false, 'message' => 'Credential already registered']);
            exit();
        }
    }

    $webauthnCreds[] = $result['credential'];
    auth_update_user($user['id'], ['webauthn_credentials' => $webauthnCreds]);

    echo json_encode(['success' => true, 'message' => 'Credential registered successfully']);
    exit();

} else {

    echo json_encode(['success' => false, 'message' => 'Unknown action']);
    exit();
}
