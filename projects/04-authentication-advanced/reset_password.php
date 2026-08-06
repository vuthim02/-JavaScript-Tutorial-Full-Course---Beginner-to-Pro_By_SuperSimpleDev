<?php

require_once __DIR__ . '/bootstrap.php';

$message = '';
$messageClass = 'auth-message';
$showForm = false;
$token = '';

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $user = auth_find_user_by_reset_token($token);

    if ($user !== null) {
        $showForm = true;
    } else {
        $message = 'Invalid or expired reset link';
        $messageClass = 'auth-message is-error';
    }
}

if (isset($_POST['reset'])) {

    $token = $_POST['token'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'] ?? '';
    $user = auth_find_user_by_reset_token($token);

    if ($user === null) {
        $message = 'Invalid or expired reset link';
        $messageClass = 'auth-message is-error';
    } elseif (strlen($password) < 8) {
        $message = 'Password must be at least 8 characters';
        $messageClass = 'auth-message is-error';
        $showForm = true;
    } elseif ($password !== $confirm) {
        $message = 'Passwords do not match';
        $messageClass = 'auth-message is-error';
        $showForm = true;
    } else {
        auth_update_user($user['id'], [
            'password' => password_hash($password, PASSWORD_ARGON2ID),
            'password_changed_at' => date('c'),
        ]);
        auth_clear_reset_token($user['email']);

        $message = 'Password reset successful. You can now sign in.';
        $messageClass = 'auth-message is-success';
        $showForm = false;
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Reset Password</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">New Password</h2>

<p class="auth-subtitle">Enter your new password.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if ($showForm): ?>
<form method="POST" class="auth-form">

<input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">

<input
type="password"
name="password"
placeholder="New password (min 8 chars)"
required autocomplete="new-password"
minlength="8">

<input
type="password"
name="confirm_password"
placeholder="Confirm password"
required autocomplete="new-password"
minlength="8">

<button name="reset">
Reset Password
</button>

</form>
<?php endif; ?>

<div class="auth-footer">
<a class="auth-link" href="login.php">Back to Sign In</a>
</div>

</main>

</body>
</html>
