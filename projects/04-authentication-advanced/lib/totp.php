<?php

function totp_base32_decode($data) {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $data = strtoupper($data);
    $data = str_replace('=', '', $data);
    $bits = '';
    $len = strlen($data);

    for ($i = 0; $i < $len; $i++) {
        $val = strpos($alphabet, $data[$i]);
        if ($val === false) {
            return false;
        }
        $bits .= str_pad(decbin($val), 5, '0', STR_PAD_LEFT);
    }

    $bytes = [];
    for ($i = 0; $i + 7 < strlen($bits); $i += 8) {
        $bytes[] = bindec(substr($bits, $i, 8));
    }

    return pack('C*', ...$bytes);
}

function totp_generate_secret($length = 32) {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $secret = '';

    for ($i = 0; $i < $length; $i++) {
        $secret .= $alphabet[random_int(0, 31)];
    }

    return $secret;
}

function totp_generate_code($secret, $timeSlice = null) {
    if ($timeSlice === null) {
        $timeSlice = intdiv(time(), 30);
    }

    $key = totp_base32_decode($secret);

    if ($key === false) {
        return false;
    }

    $msg = pack('J', $timeSlice);
    $hash = hash_hmac('sha1', $msg, $key, true);
    $offset = ord($hash[19]) & 0x0f;
    $code = (unpack('N', substr($hash, $offset, 4))[1] & 0x7fffffff) % 1000000;

    return str_pad($code, 6, '0', STR_PAD_LEFT);
}

function totp_verify_code($secret, $code, $discrepancy = 1) {
    $timeSlice = intdiv(time(), 30);

    for ($i = -$discrepancy; $i <= $discrepancy; $i++) {
        if (hash_equals(totp_generate_code($secret, $timeSlice + $i), $code)) {
            return true;
        }
    }

    return false;
}

function totp_get_qr_code_url($secret, $label, $issuer = 'AuthSystem') {
    $encodedLabel = urlencode($label);
    $encodedIssuer = urlencode($issuer);
    return "otpauth://totp/{$encodedIssuer}:{$encodedLabel}?secret={$secret}&issuer={$encodedIssuer}&algorithm=SHA1&digits=6&period=30";
}

function totp_generate_recovery_codes($count = 8) {
    $codes = [];

    for ($i = 0; $i < $count; $i++) {
        $codes[] = strtoupper(
            implode('-', [
                substr(bin2hex(random_bytes(3)), 0, 4),
                substr(bin2hex(random_bytes(3)), 0, 4),
                substr(bin2hex(random_bytes(3)), 0, 4),
            ])
        );
    }

    return $codes;
}
