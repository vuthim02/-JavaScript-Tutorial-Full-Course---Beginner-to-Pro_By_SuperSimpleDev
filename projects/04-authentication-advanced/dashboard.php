<?php

require_once __DIR__ . '/bootstrap.php';
auth_require_login();

$user = auth_get_current_user();

?>

<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="dashboard-card">

<div class="card-header">
<h1>Dashboard</h1>
<a class="auth-link" href="logout.php">Sign Out</a>
</div>

<h2 class="dashboard-name">
Welcome, <?php echo htmlspecialchars($_SESSION['username'] ?? $user['username']); ?>
</h2>

<p class="dashboard-text">
You are authenticated with <strong>short-lived JWT tokens</strong> and
<strong>session management</strong>.
</p>

<div class="dashboard-sections">

<div class="section-card">
<h3>Password</h3>
<p>Last changed: <?php echo htmlspecialchars($user['password_changed_at'] ?? 'N/A'); ?></p>
<a class="btn btn-secondary btn-sm" href="forgot_password.php">Change Password</a>
</div>

<div class="section-card">
<h3>Multi-Factor Authentication (MFA)</h3>
<p>
Status:
<?php if (!empty($user['mfa_enabled'])): ?>
<span class="badge badge-success">Enabled</span>
<?php else: ?>
<span class="badge badge-muted">Disabled</span>
<?php endif; ?>
</p>
<a class="btn btn-secondary btn-sm" href="mfa_setup.php">
<?php echo empty($user['mfa_enabled']) ? 'Enable MFA' : 'Manage MFA'; ?>
</a>
</div>

<div class="section-card">
<h3>Passkeys & Security Keys</h3>
<p>
<?php
$credCount = count($user['webauthn_credentials'] ?? []);
echo "{$credCount} credential(s) registered";
?>
</p>
<a class="btn btn-secondary btn-sm" href="profile.php">Manage Keys</a>
</div>

<div class="section-card">
<h3>Session Info</h3>
<p style="font-size:0.8rem;color:#5d6880;">
IP: <?php echo htmlspecialchars($user['last_login_ip'] ?? 'N/A'); ?><br>
Login: <?php echo htmlspecialchars($user['last_login_at'] ?? 'N/A'); ?><br>
Password hash: <?php echo defined('PASSWORD_ARGON2ID') ? 'Argon2id' : 'bcrypt'; ?>
</p>
</div>

</div>

</main>

</body>
</html>
