<?php

require_once __DIR__ . '/bootstrap.php';
auth_require_login();

$user = auth_get_current_user();
$message = '';
$messageClass = 'auth-message';
$secret = '';
$qrUrl = '';
$recoveryCodes = [];

if (isset($_GET['generate']) || (empty($user['mfa_secret']) && !isset($_POST['confirm']))) {
    $secret = totp_generate_secret();
    $_SESSION['mfa_pending_secret'] = $secret;
    $qrUrl = totp_get_qr_code_url($secret, $user['email']);
}

if (isset($_POST['confirm'])) {

    $code1 = trim($_POST['code1']);
    $code2 = trim($_POST['code2']);
    $pendingSecret = $_SESSION['mfa_pending_secret'] ?? '';

    if (empty($pendingSecret)) {
        $message = 'Session expired. Please start again.';
        $messageClass = 'auth-message is-error';
    } elseif (empty($code1) || empty($code2)) {
        $message = 'Please enter both verification codes';
        $messageClass = 'auth-message is-error';
    } elseif (!totp_verify_code($pendingSecret, $code1)) {
        $message = 'First code is invalid';
        $messageClass = 'auth-message is-error';
    } elseif (!totp_verify_code($pendingSecret, $code2)) {
        $message = 'Second code is invalid';
        $messageClass = 'auth-message is-error';
    } else {
        $recoveryCodes = totp_generate_recovery_codes(8);

        auth_update_user($user['id'], [
            'mfa_secret' => $pendingSecret,
            'mfa_enabled' => true,
            'recovery_codes' => $recoveryCodes,
        ]);

        unset($_SESSION['mfa_pending_secret']);

        $message = 'MFA has been enabled successfully!';
        $messageClass = 'auth-message is-success';
        $secret = $pendingSecret;
    }
}

if (isset($_POST['disable'])) {

    auth_update_user($user['id'], [
        'mfa_secret' => null,
        'mfa_enabled' => false,
        'recovery_codes' => [],
    ]);

    unset($_SESSION['mfa_pending_secret']);

    $message = 'MFA has been disabled.';
    $messageClass = 'auth-message is-success';
    $secret = '';
}

if (empty($secret) && !empty($user['mfa_secret'])) {
    if (!isset($_GET['generate'])) {
        $secret = $user['mfa_secret'];
    } else {
        $secret = totp_generate_secret();
        $_SESSION['mfa_pending_secret'] = $secret;
    }
    $qrUrl = totp_get_qr_code_url($secret, $user['email']);
}

$mfaEnabled = !empty($user['mfa_enabled']);
$hasRecoveryCodes = !empty($user['recovery_codes']);

?>

<!DOCTYPE html>
<html>
<head>
<title>MFA Setup</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Multi-Factor Authentication</h2>

<p class="auth-subtitle">
<?php echo $mfaEnabled ? 'Manage your MFA settings.' : 'Set up an authenticator app (e.g. Google Authenticator).'; ?>
</p>

<p class="<?php echo $messageClass; ?>">
<?php echo $message; ?>
</p>

<?php if (!empty($secret) && !$mfaEnabled): ?>

<div class="qr-container">
<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=<?php echo urlencode($qrUrl); ?>"
alt="QR Code for authenticator app"
style="border-radius:12px;">
</div>

<p style="text-align:center;font-size:0.85rem;color:#5d6880;margin:8px 0;">
Or enter this key manually:
</p>

<div class="code-display">
<?php
$chunks = str_split($secret, 4);
echo htmlspecialchars(implode(' ', $chunks));
?>
</div>

<p style="font-size:0.85rem;color:#5d6880;margin:12px 0;">
Scan the QR code with your authenticator app, then enter two consecutive codes to verify.
</p>

<form method="POST" class="auth-form">

<input
type="text"
name="code1"
placeholder="First code"
required autocomplete="off"
pattern="[0-9]{6}"
inputmode="numeric"
maxlength="6"
style="font-size:1.2rem;letter-spacing:0.3em;text-align:center;">

<input
type="text"
name="code2"
placeholder="Second code (next interval)"
required autocomplete="off"
pattern="[0-9]{6}"
inputmode="numeric"
maxlength="6"
style="font-size:1.2rem;letter-spacing:0.3em;text-align:center;">

<button name="confirm">
Verify & Enable MFA
</button>

</form>

<div class="auth-footer">
<a class="auth-link" href="dashboard.php">Back to Dashboard</a>
</div>

<?php elseif ($mfaEnabled && !empty($recoveryCodes) && isset($recoveryCodes[0])): ?>

<div class="section-card" style="background:#fff7e6;border-color:#ffe0a0;">
<h3 style="color:#b45a0f;">Recovery Codes</h3>
<p style="font-size:0.85rem;color:#b45a0f;">
Save these codes in a secure place. Each code can be used once to regain access.
</p>
<pre style="font-family:monospace;font-size:1rem;background:#fff;padding:12px;border-radius:10px;margin:12px 0;">
<?php foreach ($recoveryCodes as $code): ?>
<?php echo htmlspecialchars($code); ?>

<?php endforeach; ?>
</pre>
</div>

<div class="auth-footer" style="display:flex;flex-direction:column;gap:10px;">
<a class="btn btn-sm" href="dashboard.php">Go to Dashboard</a>
</div>

<?php elseif ($mfaEnabled): ?>

<div class="section-card">
<h3>Status</h3>
<p><span class="badge badge-success">MFA is enabled</span></p>
<a class="btn btn-sm" href="?generate=1">Regenerate Secret</a>
</div>

<div class="section-card">
<h3>Recovery Codes</h3>
<p>You have <?php echo count($user['recovery_codes'] ?? []); ?> unused recovery code(s).</p>
<?php if ($hasRecoveryCodes): ?>
<details>
<summary style="cursor:pointer;font-size:0.85rem;color:#2f5cff;">View codes</summary>
<pre style="font-family:monospace;font-size:0.9rem;background:#fff;padding:12px;border-radius:10px;margin:8px 0;">
<?php foreach ($user['recovery_codes'] as $code): ?>
<?php echo htmlspecialchars($code); ?>
<?php endforeach; ?>
</pre>
</details>
<?php endif; ?>
</div>

<form method="POST" onsubmit="return confirm('Are you sure you want to disable MFA?');">
<button name="disable" class="btn-danger" style="width:100%;margin-top:12px;">
Disable MFA
</button>
</form>

<div class="auth-footer">
<a class="auth-link" href="dashboard.php">Back to Dashboard</a>
</div>

<?php else: ?>

<form method="POST" class="auth-form" action="?generate=1">
<button name="start">
Start MFA Setup
</button>
</form>

<div class="auth-footer">
<a class="auth-link" href="dashboard.php">Back to Dashboard</a>
</div>

<?php endif; ?>

</main>

</body>
</html>
