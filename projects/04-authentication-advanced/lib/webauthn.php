<?php

const WEBAUTHN_RP_NAME = 'AuthSystem';
const WEBAUTHN_RP_ID = 'localhost';
const WEBAUTHN_ORIGIN = 'http://localhost';

function webauthn_storage_path() {
    return __DIR__ . '/../data/webauthn_challenges.json';
}

function webauthn_load_challenges() {
    $path = webauthn_storage_path();
    if (!file_exists($path)) {
        file_put_contents($path, json_encode([], JSON_PRETTY_PRINT));
    }
    return json_decode(file_get_contents($path), true) ?? [];
}

function webauthn_save_challenges($data) {
    $data = array_filter($data, function ($item) {
        return isset($item['expires']) && $item['expires'] > time();
    });
    file_put_contents(
        webauthn_storage_path(),
        json_encode($data, JSON_PRETTY_PRINT),
        LOCK_EX
    );
}

function webauthn_generate_challenge($userId) {
    $challenge = random_bytes(32);
    $challengeB64 = base64_encode($challenge);
    $challenges = webauthn_load_challenges();
    $challenges[$challengeB64] = [
        'user_id' => $userId,
        'expires' => time() + 300,
    ];
    webauthn_save_challenges($challenges);
    return $challenge;
}

function webauthn_verify_challenge($challengeB64) {
    $challenges = webauthn_load_challenges();
    if (!isset($challenges[$challengeB64])) {
        return null;
    }
    $data = $challenges[$challengeB64];
    unset($challenges[$challengeB64]);
    webauthn_save_challenges($challenges);
    if ($data['expires'] < time()) {
        return null;
    }
    return $data;
}

function webauthn_prepare_register($userId, $userName, $userDisplayName) {
    $challenge = webauthn_generate_challenge($userId);

    return [
        'challenge' => base64_encode($challenge),
        'rp' => [
            'name' => WEBAUTHN_RP_NAME,
            'id' => WEBAUTHN_RP_ID,
        ],
        'user' => [
            'id' => base64_encode(hash('sha256', (string) $userId, true)),
            'name' => $userName,
            'displayName' => $userDisplayName,
        ],
        'pubKeyCredParams' => [
            ['type' => 'public-key', 'alg' => -7],
            ['type' => 'public-key', 'alg' => -257],
        ],
        'timeout' => 60000,
        'attestation' => 'none',
        'authenticatorSelection' => [
            'residentKey' => 'preferred',
            'userVerification' => 'preferred',
        ],
    ];
}

function webauthn_prepare_login($userId = null) {
    $challenge = webauthn_generate_challenge($userId ?? 'anonymous');

    $options = [
        'challenge' => base64_encode($challenge),
        'timeout' => 60000,
        'userVerification' => 'preferred',
    ];

    if ($userId !== null) {
        $user = auth_find_user_by_id($userId);
        if ($user && isset($user['webauthn_credentials'])) {
            $options['allowCredentials'] = [];
            foreach ($user['webauthn_credentials'] as $cred) {
                $options['allowCredentials'][] = [
                    'type' => 'public-key',
                    'id' => $cred['id'],
                    'transports' => $cred['transports'] ?? ['usb', 'nfc', 'ble', 'internal'],
                ];
            }
        }
    }

    return $options;
}

function webauthn_cbor_decode_item($data, &$offset) {
    $first = ord($data[$offset]);
    $offset++;
    $majorType = ($first >> 5) & 0x07;
    $additional = $first & 0x1f;

    if ($additional < 24) {
        $value = $additional;
    } elseif ($additional === 24) {
        $value = ord($data[$offset]);
        $offset++;
    } elseif ($additional === 25) {
        $value = unpack('n', substr($data, $offset, 2))[1];
        $offset += 2;
    } elseif ($additional === 26) {
        $value = unpack('N', substr($data, $offset, 4))[1];
        $offset += 4;
    } elseif ($additional === 27) {
        $value = unpack('J', substr($data, $offset, 8))[1];
        $offset += 8;
    } else {
        return null;
    }

    switch ($majorType) {
        case 0: return $value;
        case 1: return -1 - $value;
        case 2:
            $str = substr($data, $offset, $value);
            $offset += $value;
            return $str;
        case 3:
            $str = substr($data, $offset, $value);
            $offset += $value;
            return $str;
        case 4:
            $arr = [];
            for ($i = 0; $i < $value; $i++) {
                $arr[] = webauthn_cbor_decode_item($data, $offset);
            }
            return $arr;
        case 5:
            $map = [];
            for ($i = 0; $i < $value; $i++) {
                $k = webauthn_cbor_decode_item($data, $offset);
                $v = webauthn_cbor_decode_item($data, $offset);
                $map[$k] = $v;
            }
            return $map;
        case 7:
            if ($additional === 20) { return false; }
            if ($additional === 21) { return true; }
            if ($additional === 22) { return null; }
            if ($additional === 25) { return null; }
            if ($additional === 26) { return unpack('G', pack('N', $value))[1]; }
            if ($additional === 27) { return unpack('E', pack('J', $value))[1]; }
            return $value;
        default: return null;
    }
}

function webauthn_cbor_decode($data) {
    $offset = 0;
    return webauthn_cbor_decode_item($data, $offset);
}

function webauthn_parse_auth_data($authData) {
    $offset = 0;
    $rpIdHash = substr($authData, $offset, 32);
    $offset += 32;

    $flags = ord($authData[$offset]);
    $offset++;

    $signCount = unpack('N', substr($authData, $offset, 4))[1];
    $offset += 4;

    $result = [
        'rpIdHash' => $rpIdHash,
        'flags' => $flags,
        'userPresent' => (bool) ($flags & 0x01),
        'userVerified' => (bool) (($flags >> 2) & 0x01),
        'hasAttestedData' => (bool) (($flags >> 6) & 0x01),
        'hasExtensions' => (bool) (($flags >> 5) & 0x01),
        'signCount' => $signCount,
    ];

    if ($result['hasAttestedData']) {
        $aaguid = substr($authData, $offset, 16);
        $offset += 16;

        $credIdLen = unpack('n', substr($authData, $offset, 2))[1];
        $offset += 2;

        $credId = substr($authData, $offset, $credIdLen);
        $offset += $credIdLen;

        $coseKey = webauthn_cbor_decode(substr($authData, $offset));
        $result['attestedData'] = [
            'aaguid' => $aaguid,
            'credentialId' => $credId,
            'credentialIdB64' => base64_encode($credId),
            'coseKey' => $coseKey,
        ];
    }

    return $result;
}

function webauthn_extract_public_key($coseKey) {
    $keyType = $coseKey[1] ?? null;
    $algorithm = $coseKey[3] ?? null;

    if ($algorithm === -7) {
        $crv = $coseKey[-1] ?? null;
        $x = $coseKey[-2] ?? null;
        $y = $coseKey[-3] ?? null;

        if ($crv === 1 && $x !== null && $y !== null) {
            return [
                'algorithm' => 'ES256',
                'curve' => 'P-256',
                'x' => base64_encode($x),
                'y' => base64_encode($y),
            ];
        }
    } elseif ($algorithm === -257) {
        $n = $coseKey[-1] ?? null;
        $e = $coseKey[-2] ?? null;

        if ($n !== null && $e !== null) {
            return [
                'algorithm' => 'RS256',
                'modulus' => base64_encode($n),
                'exponent' => base64_encode($e),
            ];
        }
    }

    return ['algorithm' => 'unknown', 'raw' => base64_encode(serialize($coseKey))];
}

function webauthn_process_register($credential, $challengeB64) {
    $challengeData = webauthn_verify_challenge($challengeB64);
    if ($challengeData === null) {
        return ['success' => false, 'message' => 'Challenge expired or invalid'];
    }

    $clientDataJSON = base64_decode($credential['response']['clientDataJSON']);
    $clientData = json_decode($clientDataJSON, true);

    if (!$clientData || $clientData['type'] !== 'webauthn.create') {
        return ['success' => false, 'message' => 'Invalid client data type'];
    }

    $expectedChallenge = base64_encode(base64_decode($challengeB64));
    $receivedChallenge = $clientData['challenge'];
    if ($receivedChallenge !== $expectedChallenge && $receivedChallenge !== $challengeB64) {
        return ['success' => false, 'message' => 'Challenge mismatch'];
    }

    if ($clientData['origin'] !== WEBAUTHN_ORIGIN) {
        return ['success' => false, 'message' => 'Origin mismatch'];
    }

    $attestationObject = base64_decode($credential['response']['attestationObject']);
    $attestation = webauthn_cbor_decode($attestationObject);

    if (!$attestation || !isset($attestation['authData'])) {
        return ['success' => false, 'message' => 'Invalid attestation object'];
    }

    $authDataParsed = webauthn_parse_auth_data($attestation['authData']);

    if (!$authDataParsed['hasAttestedData']) {
        return ['success' => false, 'message' => 'No attested credential data'];
    }

    $coseKey = $authDataParsed['attestedData']['coseKey'];
    $publicKey = webauthn_extract_public_key($coseKey);

    return [
        'success' => true,
        'credential' => [
            'id' => $credential['id'],
            'publicKey' => $publicKey,
            'counter' => $authDataParsed['signCount'],
            'transports' => $credential['response']['transports'] ?? ['internal'],
            'name' => $credential['response']['credentialName'] ?? 'Security Key',
            'created_at' => date('c'),
        ],
    ];
}

function webauthn_process_login($assertion, $challengeB64) {
    $challengeData = webauthn_verify_challenge($challengeB64);
    if ($challengeData === null) {
        return ['success' => false, 'message' => 'Challenge expired or invalid'];
    }

    $clientDataJSON = base64_decode($assertion['response']['clientDataJSON']);
    $clientData = json_decode($clientDataJSON, true);

    if (!$clientData || $clientData['type'] !== 'webauthn.get') {
        return ['success' => false, 'message' => 'Invalid client data type'];
    }

    $expectedChallenge = base64_encode(base64_decode($challengeB64));
    if (($clientData['challenge'] ?? '') !== $expectedChallenge) {
        return ['success' => false, 'message' => 'Challenge mismatch'];
    }

    if (($clientData['origin'] ?? '') !== WEBAUTHN_ORIGIN) {
        return ['success' => false, 'message' => 'Origin mismatch'];
    }

    $credentialId = $assertion['id'];
    $authenticatorData = base64_decode($assertion['response']['authenticatorData']);
    $signature = base64_decode($assertion['response']['signature']);
    $userHandle = $assertion['response']['userHandle'] ?? null;

    $authDataParsed = webauthn_parse_auth_data($authenticatorData);

    $expectedRpIdHash = hash('sha256', WEBAUTHN_RP_ID, true);
    if (!hash_equals($expectedRpIdHash, $authDataParsed['rpIdHash'])) {
        return ['success' => false, 'message' => 'RP ID hash mismatch'];
    }

    $userId = $challengeData['user_id'];
    if ($userId === 'anonymous') {
        $userId = null;
    }

    $users = auth_load_users();
    $foundUser = null;
    $foundCredential = null;

    foreach ($users as $user) {
        if (!isset($user['webauthn_credentials'])) continue;
        foreach ($user['webauthn_credentials'] as $cred) {
            if ($cred['id'] === $credentialId) {
                if ($userId !== null && (int) $user['id'] !== (int) $userId) continue;
                $foundUser = $user;
                $foundCredential = $cred;
                break 2;
            }
        }
    }

    if ($foundUser === null) {
        return ['success' => false, 'message' => 'Credential not found'];
    }

    $clientDataHash = hash('sha256', $clientDataJSON, true);
    $verificationData = $authenticatorData . $clientDataHash;

    $publicKey = $foundCredential['publicKey'];
    $pem = webauthn_cose_to_pem($publicKey);

    if ($pem === null) {
        return ['success' => false, 'message' => 'Unsupported key type'];
    }

    $algorithm = $publicKey['algorithm'] ?? '';
    $verifyResult = webauthn_verify_signature($pem, $verificationData, $signature, $algorithm);

    if (!$verifyResult) {
        return ['success' => false, 'message' => 'Signature verification failed'];
    }

    if ($authDataParsed['signCount'] > 0 && $foundCredential['counter'] > 0) {
        if ($authDataParsed['signCount'] <= $foundCredential['counter']) {
            return ['success' => false, 'message' => 'Potential cloned authenticator detected'];
        }
    }

    foreach ($users as &$user) {
        if ((int) $user['id'] === (int) $foundUser['id']) {
            foreach ($user['webauthn_credentials'] as &$cred) {
                if ($cred['id'] === $credentialId) {
                    $cred['counter'] = $authDataParsed['signCount'];
                    break;
                }
            }
            break;
        }
    }
    auth_save_users($users);

    return ['success' => true, 'user' => $foundUser];
}

function webauthn_cose_to_pem($publicKey) {
    if ($publicKey['algorithm'] === 'ES256') {
        $x = base64_decode($publicKey['x']);
        $y = base64_decode($publicKey['y']);

        $der = "\x30\x59" .
            "\x30\x13" .
            "\x06\x07\x2a\x86\x48\xce\x3d\x02\x01" .
            "\x06\x08\x2a\x86\x48\xce\x3d\x03\x01\x07" .
            "\x03\x42\x00" .
            "\x04" . $x . $y;

        return "-----BEGIN PUBLIC KEY-----\n" .
            chunk_split(base64_encode($der), 64, "\n") .
            "-----END PUBLIC KEY-----";
    }

    if ($publicKey['algorithm'] === 'RS256') {
        $n = base64_decode($publicKey['modulus']);
        $e = base64_decode($publicKey['exponent']);

        $lenN = strlen($n);
        $lenE = strlen($e);

        $seqN = "\x02" . chr(strlen($n)) . $n;
        $seqE = "\x02" . chr(strlen($e)) . $e;

        $bitString = "\x00" . $seqN . $seqE;
        $seqBitString = "\x03" . chr(strlen($bitString)) . $bitString;

        $seqAlgo = "\x30\x0d" .
            "\x06\x09\x2a\x86\x48\x86\xf7\x0d\x01\x01\x01" .
            "\x05\x00";

        $seqAll = "\x30" . chr(strlen($seqAlgo) + strlen($seqBitString)) .
            $seqAlgo . $seqBitString;

        $der = "\x30" . chr(strlen($seqAll)) . $seqAll;

        return "-----BEGIN PUBLIC KEY-----\n" .
            chunk_split(base64_encode($der), 64, "\n") .
            "-----END PUBLIC KEY-----";
    }

    return null;
}

function webauthn_verify_signature($pem, $data, $signature, $algorithm) {
    $key = openssl_get_publickey($pem);
    if ($key === false) {
        return false;
    }

    if ($algorithm === 'ES256') {
        if (strlen($signature) === 64) {
            $derSig = "\x30" . chr(68) .
                "\x02" . chr(32) . substr($signature, 0, 32) .
                "\x02" . chr(32) . substr($signature, 32, 32);
            return openssl_verify($data, $derSig, $key, OPENSSL_ALGO_SHA256) === 1;
        }
        return openssl_verify($data, $signature, $key, OPENSSL_ALGO_SHA256) === 1;
    }

    if ($algorithm === 'RS256') {
        return openssl_verify($data, $signature, $key, OPENSSL_ALGO_SHA256) === 1;
    }

    return false;
}
