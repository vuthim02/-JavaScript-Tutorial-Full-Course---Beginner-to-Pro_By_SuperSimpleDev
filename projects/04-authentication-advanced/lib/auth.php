<?php

function auth_storage_path() {
    return __DIR__ . '/../data/users.json';
}

function auth_load_users() {
    $path = auth_storage_path();
    $dir = dirname($path);

    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    if (!file_exists($path)) {
        file_put_contents($path, json_encode([], JSON_PRETTY_PRINT));
    }

    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

function auth_save_users($users) {
    file_put_contents(
        auth_storage_path(),
        json_encode(array_values($users), JSON_PRETTY_PRINT),
        LOCK_EX
    );
}

function auth_find_user_by_email($email) {
    foreach (auth_load_users() as $user) {
        if (isset($user['email']) && strcasecmp($user['email'], $email) === 0) {
            return $user;
        }
    }
    return null;
}

function auth_find_user_by_id($id) {
    foreach (auth_load_users() as $user) {
        if (isset($user['id']) && (int) $user['id'] === (int) $id) {
            return $user;
        }
    }
    return null;
}

function auth_find_user_by_reset_token($token) {
    foreach (auth_load_users() as $user) {
        if (
            isset($user['reset_token'], $user['reset_expiry']) &&
            $user['reset_token'] === $token &&
            strtotime($user['reset_expiry']) > time()
        ) {
            return $user;
        }
    }
    return null;
}

function auth_next_user_id($users) {
    $maxId = 0;
    foreach ($users as $user) {
        $currentId = isset($user['id']) ? (int) $user['id'] : 0;
        if ($currentId > $maxId) {
            $maxId = $currentId;
        }
    }
    return $maxId + 1;
}

function auth_create_user($username, $email, $password) {
    $users = auth_load_users();

    if (auth_find_user_by_email($email) !== null) {
        return ['success' => false, 'message' => 'Email already exists'];
    }

    $verificationToken = bin2hex(random_bytes(32));

    $users[] = [
        'id' => auth_next_user_id($users),
        'username' => $username,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_ARGON2ID),
        'created_at' => date('c'),
        'mfa_secret' => null,
        'mfa_enabled' => false,
        'webauthn_credentials' => [],
        'last_login_at' => null,
        'last_login_ip' => null,
        'known_ips' => [],
        'known_devices' => [],
        'failed_attempts' => 0,
        'locked_until' => null,
        'password_changed_at' => date('c'),
        'roles' => ['user'],
        'email_verified' => false,
        'email_verification_token' => $verificationToken,
    ];

    auth_save_users($users);
    return ['success' => true, 'message' => 'Registration successful', 'verification_token' => $verificationToken];
}

function auth_verify_email($token) {
    $users = auth_load_users();

    foreach ($users as &$user) {
        if (
            isset($user['email_verification_token']) &&
            $user['email_verification_token'] === $token &&
            empty($user['email_verified'])
        ) {
            $user['email_verified'] = true;
            unset($user['email_verification_token']);
            auth_save_users($users);
            return ['success' => true, 'message' => 'Email verified successfully'];
        }
    }

    return ['success' => false, 'message' => 'Invalid or expired verification link'];
}

function auth_update_user($id, $data) {
    $users = auth_load_users();

    foreach ($users as &$user) {
        if ((int) $user['id'] === (int) $id) {
            foreach ($data as $key => $value) {
                $user[$key] = $value;
            }
            auth_save_users($users);
            return true;
        }
    }

    return false;
}

function auth_authenticate($email, $password) {
    $user = auth_find_user_by_email($email);

    if ($user === null) {
        return ['success' => false, 'message' => 'User not found'];
    }

    if (isset($user['locked_until']) && strtotime($user['locked_until']) > time()) {
        $remaining = strtotime($user['locked_until']) - time();
        return ['success' => false, 'message' => "Account locked. Try again in {$remaining} seconds."];
    }

    if (!password_verify($password, $user['password'])) {
        $user['failed_attempts'] = ($user['failed_attempts'] ?? 0) + 1;

        if ($user['failed_attempts'] >= 5) {
            $user['locked_until'] = date('c', time() + 900);
            $user['failed_attempts'] = 0;
        }

        auth_update_user($user['id'], [
            'failed_attempts' => $user['failed_attempts'],
            'locked_until' => $user['locked_until'] ?? null,
        ]);

        return ['success' => false, 'message' => 'Wrong password'];
    }

    if (empty($user['email_verified'])) {
        return ['success' => false, 'message' => 'Email not verified. Check your inbox for the verification link.'];
    }

    auth_update_user($user['id'], ['failed_attempts' => 0, 'locked_until' => null]);

    return ['success' => true, 'user' => $user];
}

function auth_start_session($user) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['roles'] = $user['roles'] ?? ['user'];
    $_SESSION['mfa_required'] = false;
    $_SESSION['temp_user_id'] = null;
    $_SESSION['login_at'] = time();
    $_SESSION['jti'] = bin2hex(random_bytes(16));

    session_regenerate_id(true);
}

function auth_require_login() {
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit();
    }
}

function auth_get_current_user() {
    if (!isset($_SESSION['user_id'])) {
        return null;
    }

    return auth_find_user_by_id($_SESSION['user_id']);
}

function auth_set_reset_token($email, $token, $expiry) {
    $users = auth_load_users();

    foreach ($users as &$user) {
        if (isset($user['email']) && strcasecmp($user['email'], $email) === 0) {
            $user['reset_token'] = $token;
            $user['reset_expiry'] = $expiry;
            break;
        }
    }

    unset($user);
    auth_save_users($users);
}

function auth_clear_reset_token($email) {
    $users = auth_load_users();

    foreach ($users as &$user) {
        if (isset($user['email']) && strcasecmp($user['email'], $email) === 0) {
            unset($user['reset_token'], $user['reset_expiry']);
            break;
        }
    }

    unset($user);
    auth_save_users($users);
}

function auth_get_client_ip() {
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
}

function auth_get_user_agent() {
    return $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
}

function auth_get_device_fingerprint() {
    $parts = [
        auth_get_user_agent(),
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '',
        $_SERVER['HTTP_ACCEPT_ENCODING'] ?? '',
    ];
    return hash('sha256', implode('|', $parts));
}
