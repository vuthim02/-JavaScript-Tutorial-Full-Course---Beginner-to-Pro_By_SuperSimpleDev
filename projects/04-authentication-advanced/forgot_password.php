<?php

require_once __DIR__ . '/bootstrap.php';

$message = '';
$messageClass = 'auth-message';
$resetLink = '';

if (isset($_POST['forgot'])) {

    $email = trim($_POST['email']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Invalid email format';
        $messageClass = 'auth-message is-error';
    } else {

        $rateResult = rate_limit_middleware('forgot:' . $email);
        if (!$rateResult['success']) {
            $message = $rateResult['message'];
            $messageClass = 'auth-message is-error';
        } else {

            $user = auth_find_user_by_email($email);

            if ($user !== null) {
                $token = bin2hex(random_bytes(32));
                $expiry = date('c', strtotime('+1 hour'));
                auth_set_reset_token($email, $token, $expiry);
                $resetLink = 'reset_password.php?token=' . urlencode($token);
                $message = 'Reset link generated (simulated — no mail server)';
                $messageClass = 'auth-message is-success';
            } else {
                $message = 'If the email exists, a reset link will be generated.';
                $messageClass = 'auth-message is-success';
            }
        }
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Forgot Password</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Reset Password</h2>

<p class="auth-subtitle">Enter your email to receive a reset link.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if ($resetLink !== ''): ?>
<p style="word-break:break-all;margin-bottom:20px;background:#eef2f9;padding:12px;border-radius:10px;font-size:0.85rem;">
<a href="<?php echo htmlspecialchars($resetLink); ?>"><?php echo htmlspecialchars($resetLink); ?></a>
</p>
<?php endif; ?>

<form method="POST" class="auth-form">

<input
type="email"
name="email"
placeholder="Email"
required autocomplete="email">

<button name="forgot">
Send Reset Link
</button>

</form>

<div class="auth-footer">
<a class="auth-link" href="login.php">Back to Sign In</a>
</div>

</main>

</body>
</html>
