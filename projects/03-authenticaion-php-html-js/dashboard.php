<?php

require_once __DIR__ . '/config.php';

if(!isset($_SESSION['user_id'])){
    header("Location: index.php");
    exit();
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="dashboard-card">

<h1 class="dashboard-name">
Welcome, <?php echo $_SESSION['username']; ?>
</h1>

<p class="dashboard-text">
You are authenticated.
</p>

<a class="auth-link" href="logout.php">
Logout
</a>

</main>

</body>
</html>