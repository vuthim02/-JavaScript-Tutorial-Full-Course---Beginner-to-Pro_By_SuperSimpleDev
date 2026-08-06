<?php

require_once __DIR__ . '/config.php';

$message = "";
$messageClass = "auth-message";
$showForm = false;
$token = "";

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $user = auth_find_user_by_reset_token($token);

    if ($user !== null) {
        $showForm = true;
    } else {
        $message = "Invalid or expired reset link";
        $messageClass = "auth-message is-error";
    }
}

if (isset($_POST['reset'])) {

    $token = $_POST['token'];
    $password = $_POST['password'];
    $user = auth_find_user_by_reset_token($token);

    if ($user !== null) {

        $users = auth_load_users();

        foreach ($users as &$u) {
            if ((int) $u['id'] === (int) $user['id']) {
                $u['password'] = password_hash($password, PASSWORD_DEFAULT);
                unset($u['reset_token'], $u['reset_expiry']);
                break;
            }
        }

        unset($u);
        auth_save_users($users);

        $message = "Password reset successful. You can now login.";
        $messageClass = "auth-message is-success";
        $showForm = false;

    } else {
        $message = "Invalid or expired reset link";
        $messageClass = "auth-message is-error";
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

<h2 class="auth-title">Reset Password</h2>

<p class="auth-subtitle">Enter your new password.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<?php if ($showForm): ?>
<form method="POST" class="auth-form">

<input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">

<input
type="password"
name="password"
placeholder="New password"
required minlength="6">

<button name="reset">
Reset Password
</button>

</form>
<?php endif; ?>

<div class="auth-footer">

<a class="auth-link" href="index.php">
Back to Login
</a>

</div>

</main>

</body>
</html>
