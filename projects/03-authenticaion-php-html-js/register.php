<?php

require_once __DIR__ . '/config.php';

$message = "";
$messageClass = "auth-message";

if(isset($_POST['register'])){

    $username = trim($_POST['username']);
    $email    = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $users = auth_load_users();
    $existingUser = auth_find_user_by_email($email);

    if($existingUser !== null){

        $message = "Email already exists";
        $messageClass = "auth-message is-error";

    }else{

        $users[] = [
            'id' => auth_next_user_id($users),
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'created_at' => date('c'),
        ];

        auth_save_users($users);

        $message = "Registration successful";
        $messageClass = "auth-message is-success";
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

<p class="auth-subtitle">Register a new user profile.</p>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<form method="POST" class="auth-form">

<input
type="text"
name="username"
placeholder="Username"
required>

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

<button name="register">
Register
</button>

</form>

<div class="auth-footer">

<a class="auth-link" href="index.php">
Login
</a>

</div>

</main>

</body>
</html>