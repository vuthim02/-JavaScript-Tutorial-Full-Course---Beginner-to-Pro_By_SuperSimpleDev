<?php

define('JWT_SECRET', 'CHANGE_ME_TO_A_SECURE_RANDOM_SECRET_IN_PRODUCTION');
define('JWT_ACCESS_EXPIRY', 900);
define('JWT_REFRESH_EXPIRY', 604800);

function jwt_base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function jwt_base64url_decode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode($payload, $secret = JWT_SECRET) {
    $header = jwt_base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payloadEncoded = jwt_base64url_encode(json_encode($payload));
    $signature = jwt_base64url_encode(
        hash_hmac('sha256', "{$header}.{$payloadEncoded}", $secret, true)
    );

    return "{$header}.{$payloadEncoded}.{$signature}";
}

function jwt_decode($token, $secret = JWT_SECRET) {
    $parts = explode('.', $token);

    if (count($parts) !== 3) {
        return null;
    }

    [$header, $payload, $signature] = $parts;

    $expectedSignature = jwt_base64url_encode(
        hash_hmac('sha256', "{$header}.{$payload}", $secret, true)
    );

    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }

    $data = json_decode(jwt_base64url_decode($payload), true);

    if ($data === null || !isset($data['exp']) || $data['exp'] < time()) {
        return null;
    }

    return $data;
}

function jwt_generate_access_token($userId, $username, $roles = ['user']) {
    return jwt_encode([
        'sub' => $userId,
        'username' => $username,
        'roles' => $roles,
        'iat' => time(),
        'exp' => time() + JWT_ACCESS_EXPIRY,
        'jti' => bin2hex(random_bytes(16)),
        'type' => 'access',
    ]);
}

function jwt_generate_refresh_token($userId) {
    return jwt_encode([
        'sub' => $userId,
        'iat' => time(),
        'exp' => time() + JWT_REFRESH_EXPIRY,
        'jti' => bin2hex(random_bytes(16)),
        'type' => 'refresh',
    ]);
}

function jwt_generate_temp_token($userId, $purpose = 'mfa') {
    return jwt_encode([
        'sub' => $userId,
        'purpose' => $purpose,
        'iat' => time(),
        'exp' => time() + 300,
        'jti' => bin2hex(random_bytes(16)),
    ]);
}

function jwt_verify_access_token($token) {
    $data = jwt_decode($token);
    if ($data === null || ($data['type'] ?? '') !== 'access') {
        return null;
    }
    return $data;
}

function jwt_verify_refresh_token($token) {
    $data = jwt_decode($token);
    if ($data === null || ($data['type'] ?? '') !== 'refresh') {
        return null;
    }
    return $data;
}

function jwt_verify_temp_token($token, $purpose = 'mfa') {
    $data = jwt_decode($token);
    if ($data === null || ($data['purpose'] ?? '') !== $purpose) {
        return null;
    }
    return $data;
}
