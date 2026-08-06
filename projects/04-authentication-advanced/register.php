<?php

require_once __DIR__ . '/bootstrap.php';

if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit();
}

$message = '';
$messageClass = 'auth-message';

if (isset($_POST['register'])) {

    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Invalid email format';
        $messageClass = 'auth-message is-error';
    } elseif (strlen($password) < 8) {
        $message = 'Password must be at least 8 characters';
        $messageClass = 'auth-message is-error';
    } elseif ($password !== $confirm) {
        $message = 'Passwords do not match';
        $messageClass = 'auth-message is-error';
    } else {

        $rateResult = rate_limit_middleware('register:' . $email);
        if (!$rateResult['success']) {
            $message = $rateResult['message'];
            $messageClass = 'auth-message is-error';
        } else {

            $result = auth_create_user($username, $email, $password);

            if ($result['success']) {
                rate_limit_clear('register:' . $email);
                $message = 'Registration successful. Verify your email before signing in.';
                $messageClass = 'auth-message is-success';
                $verificationLink = 'verify_email.php?token=' . urlencode($result['verification_token']);
            } else {
                $message = $result['message'];
                $messageClass = 'auth-message is-error';
            }
        }
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Register</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Create Account</h2>

<p class="auth-subtitle">Register a new user profile with passwordless support.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if (isset($verificationLink)): ?>
<p style="word-break:break-all;margin-bottom:20px;background:#eef2f9;padding:12px;border-radius:10px;font-size:0.85rem;">
<a href="<?php echo htmlspecialchars($verificationLink); ?>"><?php echo htmlspecialchars($verificationLink); ?></a>
</p>
<?php endif; ?>

<form method="POST" class="auth-form">

<input
type="text"
name="username"
placeholder="Username"
required autocomplete="username"
minlength="3">

<input
type="email"
name="email"
placeholder="Email"
required autocomplete="email">

<input
type="password"
name="password"
placeholder="Password (min 8 chars)"
required autocomplete="new-password"
minlength="8">

<input
type="password"
name="confirm_password"
placeholder="Confirm Password"
required autocomplete="new-password"
minlength="8">

<button name="register">
Register
</button>

</form>

<div class="auth-footer">

<a class="auth-link" href="login.php">
Already have an account? Sign in
</a>

</div>

</main>

</body>
</html>
