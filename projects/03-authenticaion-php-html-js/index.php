<?php

require_once __DIR__ . '/config.php';

$message = "";
$messageClass = "auth-message";

if(isset($_POST['login'])){

    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $message = "Invalid email format";
        $messageClass = "auth-message is-error";
    }else{

    $user = auth_find_user_by_email($email);

    if($user !== null){

        if(password_verify(
            $password,
            $user['password']
        )){

            if(empty($user['email_verified'])){
                $token = $user['email_verification_token'] ?? '';
                $message = "Email not verified.";
                $messageClass = "auth-message is-error";
                if($token){
                    $message .= ' <a href="verify_email.php?token=' . urlencode($token) . '">Verify now</a>';
                }
            }else{

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            header("Location: dashboard.php");
            exit();

            }

        }else{
            $message = "Wrong password";
            $messageClass = "auth-message is-error";
        }

    }else{
        $message = "User not found";
        $messageClass = "auth-message is-error";
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

<h2 class="auth-title">Login</h2>

<p class="auth-subtitle">Sign in to continue.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<form method="POST" class="auth-form">

<input
type="email"
name="email"
placeholder="Email"
required>

<input
type="password"
name="password"
placeholder="Password"
required>

<button name="login">
Login
</button>

</form>

<div class="auth-footer">

<a class="auth-link" href="register.php">
Create Account
</a>

&middot;

<a class="auth-link" href="forgot_password.php">
Forgot Password?
</a>

</div>

</main>

</body>
</html>