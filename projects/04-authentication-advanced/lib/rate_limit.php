<?php

define('RATE_LIMIT_MAX_ATTEMPTS', 5);
define('RATE_LIMIT_WINDOW', 900);
define('RATE_LIMIT_LOCKOUT_DURATION', 900);

function rate_limit_storage_path() {
    return __DIR__ . '/../data/rate_limits.json';
}

function rate_limit_load() {
    $path = rate_limit_storage_path();
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

function rate_limit_save($data) {
    $data = array_filter($data, function ($entry) {
        return $entry['window_end'] > time();
    });

    file_put_contents(
        rate_limit_storage_path(),
        json_encode($data, JSON_PRETTY_PRINT),
        LOCK_EX
    );
}

function rate_limit_key($identifier) {
    $ip = auth_get_client_ip();
    return "{$identifier}:{$ip}";
}

function rate_limit_check($identifier, $maxAttempts = RATE_LIMIT_MAX_ATTEMPTS, $window = RATE_LIMIT_WINDOW) {
    $key = rate_limit_key($identifier);
    $limits = rate_limit_load();
    $now = time();

    if (!isset($limits[$key])) {
        return ['allowed' => true, 'remaining' => $maxAttempts, 'retry_after' => 0];
    }

    $entry = $limits[$key];

    if (isset($entry['locked_until']) && $entry['locked_until'] > $now) {
        $retryAfter = $entry['locked_until'] - $now;
        return ['allowed' => false, 'remaining' => 0, 'retry_after' => $retryAfter, 'locked' => true];
    }

    if ($entry['window_end'] <= $now) {
        unset($limits[$key]);
        rate_limit_save($limits);
        return ['allowed' => true, 'remaining' => $maxAttempts, 'retry_after' => 0];
    }

    $remaining = $maxAttempts - $entry['attempts'];
    if ($remaining <= 0) {
        $retryAfter = $entry['window_end'] - $now;

        if ($entry['attempts'] >= $maxAttempts * 2) {
            $entry['locked_until'] = $now + RATE_LIMIT_LOCKOUT_DURATION;
            $limits[$key] = $entry;
            rate_limit_save($limits);
            $retryAfter = RATE_LIMIT_LOCKOUT_DURATION;
        }

        return ['allowed' => false, 'remaining' => 0, 'retry_after' => $retryAfter];
    }

    return ['allowed' => true, 'remaining' => $remaining, 'retry_after' => 0];
}

function rate_limit_record($identifier, $maxAttempts = RATE_LIMIT_MAX_ATTEMPTS, $window = RATE_LIMIT_WINDOW) {
    $key = rate_limit_key($identifier);
    $limits = rate_limit_load();
    $now = time();

    if (!isset($limits[$key]) || $limits[$key]['window_end'] <= $now) {
        $limits[$key] = [
            'attempts' => 1,
            'window_start' => $now,
            'window_end' => $now + $window,
            'locked_until' => null,
        ];
    } else {
        $limits[$key]['attempts']++;
    }

    if (isset($limits[$key]['locked_until']) && $limits[$key]['locked_until'] <= $now) {
        $limits[$key]['locked_until'] = null;
    }

    if ($limits[$key]['attempts'] >= $maxAttempts * 2) {
        $limits[$key]['locked_until'] = $now + RATE_LIMIT_LOCKOUT_DURATION;
    }

    rate_limit_save($limits);
}

function rate_limit_clear($identifier) {
    $key = rate_limit_key($identifier);
    $limits = rate_limit_load();
    unset($limits[$key]);
    rate_limit_save($limits);
}

function rate_limit_middleware($identifier) {
    $result = rate_limit_check($identifier);

    if (!$result['allowed']) {
        $message = $result['locked'] ?? false
            ? "Account temporarily locked due to suspicious activity. Retry after {$result['retry_after']}s."
            : "Too many attempts. Retry after {$result['retry_after']}s.";

        http_response_code(429);
        return ['success' => false, 'message' => $message];
    }

    return ['success' => true];
}
