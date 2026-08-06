<?php

require_once __DIR__ . '/bootstrap.php';

if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit();
}

$message = '';
$messageClass = 'auth-message';

if (isset($_POST['login'])) {

    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Invalid email format';
        $messageClass = 'auth-message is-error';
    } else {

    $rateResult = rate_limit_middleware($email);
    if (!$rateResult['success']) {
        $message = $rateResult['message'];
        $messageClass = 'auth-message is-error';
    } else {

        $authResult = auth_authenticate($email, $password);

        if ($authResult['success']) {

            rate_limit_clear($email);

            $user = $authResult['user'];

            $fingerprint = auth_get_device_fingerprint();
            $ip = auth_get_client_ip();
            $knownIps = $user['known_ips'] ?? [];
            $knownDevices = $user['known_devices'] ?? [];

            $isNewIp = !in_array($ip, $knownIps);
            $isNewDevice = !in_array($fingerprint, $knownDevices);
            $isAfterHours = (int) date('H') < 6 || (int) date('H') > 22;

            $riskScore = 0;
            if ($isNewIp) $riskScore += 2;
            if ($isNewDevice) $riskScore += 3;
            if ($isAfterHours) $riskScore += 1;

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

            if (!empty($user['mfa_enabled'])) {

                $_SESSION['temp_user_id'] = $user['id'];
                $_SESSION['mfa_required'] = true;
                $_SESSION['risk_score'] = $riskScore;
                $_SESSION['mfa_temp_token'] = jwt_generate_temp_token($user['id'], 'mfa');

                header('Location: mfa_verify.php');
                exit();

            } else {

                if ($riskScore >= 3) {
                    $_SESSION['temp_user_id'] = $user['id'];
                    $_SESSION['mfa_required'] = true;
                    $_SESSION['risk_score'] = $riskScore;
                    $_SESSION['risk_prompt'] = true;
                    $_SESSION['mfa_temp_token'] = jwt_generate_temp_token($user['id'], 'mfa');

                    header('Location: mfa_verify.php');
                    exit();
                }

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
                header('Location: dashboard.php');
                exit();
            }

        } else {

            if ($authResult['message'] === 'Email not verified. Check your inbox for the verification link.') {
                $user = auth_find_user_by_email($email);
                if ($user && isset($user['email_verification_token'])) {
                    $resendLink = 'verify_email.php?token=' . urlencode($user['email_verification_token']);
                }
            } else {
                rate_limit_record($email);
            }
            $message = $authResult['message'];
            $messageClass = 'auth-message is-error';
        }
    }
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Sign In</h2>

<p class="auth-subtitle">Multi-factor authentication system.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if (isset($resendLink)): ?>
<p style="word-break:break-all;margin-bottom:20px;background:#eef2f9;padding:12px;border-radius:10px;font-size:0.85rem;">
Verification link: <a href="<?php echo htmlspecialchars($resendLink); ?>"><?php echo htmlspecialchars($resendLink); ?></a>
</p>
<?php endif; ?>

<form method="POST" class="auth-form" id="loginForm">

<input
type="email"
name="email"
placeholder="Email"
required autocomplete="email">

<input
type="password"
name="password"
placeholder="Password"
required autocomplete="current-password">

<button name="login" id="loginBtn">
Sign In
</button>

</form>

<div class="auth-footer" style="display:flex;flex-direction:column;gap:10px;">

<a class="auth-link" href="register.php">Create Account</a>

<a class="auth-link" href="forgot_password.php">Forgot Password?</a>

<hr class="separator">

<button class="btn btn-secondary btn-sm" id="passkeyBtn" style="width:100%;">
Sign in with Passkey
</button>

</div>

</main>

<script>
document.getElementById('passkeyBtn')?.addEventListener('click', async function() {

    const email = document.querySelector('input[name="email"]').value;

    try {

        const initResp = await fetch('api/webauthn_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'init', email: email || null }),
        });
        const initData = await initResp.json();

        if (!initData.success) {
            alert('Error: ' + initData.message);
            return;
        }

        const publicKey = {
            challenge: Uint8Array.from(atob(initData.options.challenge), c => c.charCodeAt(0)),
            timeout: initData.options.timeout,
            userVerification: initData.options.userVerification,
        };

        if (initData.options.allowCredentials) {
            publicKey.allowCredentials = initData.options.allowCredentials.map(c => ({
                type: c.type,
                id: Uint8Array.from(atob(c.id), c => c.charCodeAt(0)),
                transports: c.transports,
            }));
        }

        const assertion = await navigator.credentials.get({ publicKey });

        const finishResp = await fetch('api/webauthn_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'finish',
                challenge: initData.options.challenge,
                credential: {
                    id: assertion.id,
                    type: assertion.type,
                    response: {
                        authenticatorData: arrayBufferToBase64(assertion.response.authenticatorData),
                        clientDataJSON: arrayBufferToBase64(assertion.response.clientDataJSON),
                        signature: arrayBufferToBase64(assertion.response.signature),
                        userHandle: assertion.response.userHandle
                            ? arrayBufferToBase64(assertion.response.userHandle)
                            : null,
                    },
                },
            }),
        });
        const finishData = await finishResp.json();

        if (finishData.success) {
            window.location.href = 'dashboard.php';
        } else {
            alert('Authentication failed: ' + finishData.message);
        }

    } catch (err) {
        if (err.name === 'NotAllowedError') {
            return;
        }
        alert('Error: ' + err.message);
    }
});

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
</script>

</body>
</html>
