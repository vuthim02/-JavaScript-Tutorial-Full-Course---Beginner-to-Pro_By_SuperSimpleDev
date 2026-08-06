<?php

require_once __DIR__ . '/bootstrap.php';

$message = '';
$messageClass = 'auth-message';
$success = false;

$token = $_GET['token'] ?? '';

if (empty($token)) {
    $message = 'Missing verification token';
    $messageClass = 'auth-message is-error';
} else {
    $result = auth_verify_email($token);

    if ($result['success']) {
        $message = $result['message'] . ' — you can now sign in.';
        $messageClass = 'auth-message is-success';
        $success = true;
    } else {
        $message = $result['message'];
        $messageClass = 'auth-message is-error';
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Verify Email</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="auth-shell">

<h2 class="auth-title">Email Verification</h2>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<div class="auth-footer">
<a class="auth-link" href="login.php">
<?php echo $success ? 'Sign In Now' : 'Back to Sign In'; ?>
</a>
</div>

</main>

</body>
</html>
