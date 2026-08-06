<?php

require_once __DIR__ . '/config.php';

$message = "";
$messageClass = "auth-message";
$resetLink = "";

if (isset($_POST['forgot'])) {

    $email = trim($_POST['email']);
    $user = auth_find_user_by_email($email);

    if ($user !== null) {

        $token = bin2hex(random_bytes(32));
        $expiry = date('c', strtotime('+1 hour'));

        auth_set_reset_token($email, $token, $expiry);

        $resetLink = "reset_password.php?token=" . urlencode($token);

        $message = "Reset link generated (simulated — no mail server)";
        $messageClass = "auth-message is-success";

    } else {
        $message = "Email not found";
        $messageClass = "auth-message is-error";
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

<h2 class="auth-title">Forgot Password</h2>

<p class="auth-subtitle">Enter your email to reset your password.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if ($resetLink !== ""): ?>
<p style="word-break:break-all;margin-bottom:20px;background:#eef2f9;padding:12px;border-radius:10px;font-size:0.85rem;">
<a href="<?php echo $resetLink; ?>"><?php echo $resetLink; ?></a>
</p>
<?php endif; ?>

<form method="POST" class="auth-form">

<input
type="email"
name="email"
placeholder="Email"
required>

<button name="forgot">
Send Reset Link
</button>

</form>

<div class="auth-footer">

<a class="auth-link" href="index.php">
Back to Login
</a>

</div>

</main>

</body>
</html>
