<?php

session_start();

function auth_storage_path() {
    return __DIR__ . '/data/users.json';
}

function auth_load_users() {
    $path = auth_storage_path();
    $directory = dirname($path);

    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
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
            return true;
        }
    }

    return false;
}

?>