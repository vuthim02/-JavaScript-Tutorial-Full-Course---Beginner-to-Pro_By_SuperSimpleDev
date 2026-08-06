<?php

require_once __DIR__ . '/bootstrap.php';

$message = '';
$messageClass = 'auth-message';

if (empty($_SESSION['temp_user_id']) || empty($_SESSION['mfa_required'])) {
    header('Location: login.php');
    exit();
}

$tempUserId = $_SESSION['temp_user_id'];
$user = auth_find_user_by_id($tempUserId);

if ($user === null) {
    session_destroy();
    header('Location: login.php');
    exit();
}

$riskPrompt = !empty($_SESSION['risk_prompt']);

if (isset($_POST['verify'])) {

    $code = trim($_POST['code']);

    if (!empty($user['mfa_secret']) && totp_verify_code($user['mfa_secret'], $code)) {

        unset($_SESSION['mfa_required'], $_SESSION['temp_user_id'], $_SESSION['risk_prompt'], $_SESSION['risk_score'], $_SESSION['mfa_temp_token']);

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

    } else {
        $message = 'Invalid verification code';
        $messageClass = 'auth-message is-error';
    }
}

if (isset($_POST['recovery'])) {

    $recoveryCode = trim($_POST['recovery_code']);
    $storedCodes = $user['recovery_codes'] ?? [];

    foreach ($storedCodes as $index => $stored) {
        if (hash_equals($stored, $recoveryCode)) {
            unset($storedCodes[$index]);
            auth_update_user($user['id'], ['recovery_codes' => array_values($storedCodes)]);

            unset($_SESSION['mfa_required'], $_SESSION['temp_user_id'], $_SESSION['risk_prompt'], $_SESSION['risk_score'], $_SESSION['mfa_temp_token']);

            $accessToken = jwt_generate_access_token($user['id'], $user['username'], $user['roles'] ?? ['user']);
            $refreshToken = jwt_generate_refresh_token($user['id']);

            setcookie('access_token', $accessToken, ['expires' => time() + 900, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);
            setcookie('refresh_token', $refreshToken, ['expires' => time() + 604800, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);

            auth_start_session($user);
            header('Location: dashboard.php');
            exit();
        }
    }

    $message = 'Invalid recovery code';
    $messageClass = 'auth-message is-error';
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Verify MFA</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Verify Your Identity</h2>

<?php if ($riskPrompt): ?>
<p class="auth-subtitle">
Unusual sign-in detected (new device or location). Please verify your identity.
</p>
<?php else: ?>
<p class="auth-subtitle">Enter the code from your authenticator app.</p>
<?php endif; ?>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<form method="POST" class="auth-form">

<input
type="text"
name="code"
placeholder="6-digit code"
required autocomplete="off"
pattern="[0-9]{6}"
inputmode="numeric"
maxlength="6"
style="font-size:1.5rem;letter-spacing:0.3em;text-align:center;">

<button name="verify">
Verify
</button>

</form>

<hr class="separator">

<details style="margin-top:16px;">
<summary style="cursor:pointer;font-size:0.85rem;color:#5d6880;">Use recovery code</summary>
<form method="POST" class="auth-form" style="margin-top:12px;">
<input
type="text"
name="recovery_code"
placeholder="Recovery code (XXXX-XXXX-XXXX)"
required autocomplete="off">
<button name="recovery" class="btn-secondary" style="background:linear-gradient(135deg,#5d6880,#7a86a0);box-shadow:none;">
Use Recovery Code
</button>
</form>
</details>

<div class="auth-footer">
<a class="auth-link" href="logout.php">Cancel and sign out</a>
</div>

</main>

</body>
</html>
