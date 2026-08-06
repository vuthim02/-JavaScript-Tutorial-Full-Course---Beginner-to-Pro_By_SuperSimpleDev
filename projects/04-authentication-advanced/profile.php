<?php

require_once __DIR__ . '/bootstrap.php';
auth_require_login();

$user = auth_get_current_user();
$message = '';
$messageClass = 'auth-message';

$webauthnCreds = $user['webauthn_credentials'] ?? [];

if (isset($_POST['remove_credential'])) {
    $credId = $_POST['credential_id'];
    $updated = false;

    foreach ($webauthnCreds as $i => $cred) {
        if ($cred['id'] === $credId) {
            unset($webauthnCreds[$i]);
            $updated = true;
            break;
        }
    }

    if ($updated) {
        auth_update_user($user['id'], ['webauthn_credentials' => array_values($webauthnCreds)]);
        $message = 'Credential removed successfully.';
        $messageClass = 'auth-message is-success';
        $webauthnCreds = array_values($webauthnCreds);
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Profile & Security</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="dashboard-card">

<div class="card-header">
<h1>Profile & Security</h1>
<a class="auth-link" href="dashboard.php">Dashboard</a>
</div>

<p class="<?php echo $messageClass; ?>"><?php echo $message; ?></p>

<div class="dashboard-sections">

<div class="section-card">
<h3>Account Info</h3>
<table style="width:100%;font-size:0.85rem;color:#5d6880;">
<tr><td style="padding:4px 0;"><strong>Username</strong></td><td><?php echo htmlspecialchars($user['username']); ?></td></tr>
<tr><td style="padding:4px 0;"><strong>Email</strong></td><td><?php echo htmlspecialchars($user['email']); ?></td></tr>
<tr><td style="padding:4px 0;"><strong>Password Hash</strong></td><td>Argon2id</td></tr>
<tr><td style="padding:4px 0;"><strong>Last Login</strong></td><td><?php echo htmlspecialchars($user['last_login_at'] ?? 'N/A'); ?></td></tr>
<tr><td style="padding:4px 0;"><strong>Last IP</strong></td><td><?php echo htmlspecialchars($user['last_login_ip'] ?? 'N/A'); ?></td></tr>
</table>
</div>

<div class="section-card">
<h3>Multi-Factor Authentication</h3>
<p>Status: 
<?php if (!empty($user['mfa_enabled'])): ?>
<span class="badge badge-success">Enabled</span>
<?php else: ?>
<span class="badge badge-muted">Disabled</span>
<?php endif; ?>
</p>
<a class="btn btn-secondary btn-sm" href="mfa_setup.php">Configure</a>
</div>

<div class="section-card">
<h3>Passkeys & Security Keys</h3>
<p><?php echo count($webauthnCreds); ?> credential(s) registered.</p>

<?php if (!empty($webauthnCreds)): ?>
<ul class="security-key-list">
<?php foreach ($webauthnCreds as $cred): ?>
<li>
<span>
<strong><?php echo htmlspecialchars($cred['name'] ?? 'Security Key'); ?></strong><br>
<span style="font-size:0.75rem;color:#5d6880;">
Algorithm: <?php echo htmlspecialchars($cred['publicKey']['algorithm'] ?? 'Unknown'); ?>
&middot; Counter: <?php echo (int) ($cred['counter'] ?? 0); ?>
</span>
</span>
<form method="POST" style="display:inline;"
onsubmit="return confirm('Remove this credential?');">
<input type="hidden" name="credential_id" value="<?php echo htmlspecialchars($cred['id']); ?>">
<button name="remove_credential" class="btn btn-sm btn-danger">Remove</button>
</form>
</li>
<?php endforeach; ?>
</ul>
<?php endif; ?>

<button class="btn btn-secondary btn-sm" id="registerPasskeyBtn" style="margin-top:10px;">
Register New Passkey
</button>

</div>

<div class="section-card">
<h3>Risk & Adaptive Auth</h3>
<p style="font-size:0.85rem;color:#5d6880;">
Known IPs: <?php echo count($user['known_ips'] ?? []); ?><br>
Known Devices: <?php echo count($user['known_devices'] ?? []); ?><br>
When signing in from an unknown device or location,<br>
MFA will be prompted as an additional security measure.
</p>
</div>

<div class="section-card">
<h3>Token Management</h3>
<p style="font-size:0.85rem;color:#5d6880;">
Access tokens are short-lived (15 min).<br>
Refresh tokens last 7 days.<br>
All sessions are invalidated on logout.
</p>
<a class="btn btn-secondary btn-sm" href="logout.php">Sign Out All Sessions</a>
</div>

</div>

</main>

<script>
document.getElementById('registerPasskeyBtn')?.addEventListener('click', async function() {

    try {

        const initResp = await fetch('api/webauthn_register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'init' }),
        });
        const initData = await initResp.json();

        if (!initData.success) {
            alert('Error: ' + initData.message);
            return;
        }

        const publicKey = {
            challenge: Uint8Array.from(atob(initData.options.challenge), c => c.charCodeAt(0)),
            rp: initData.options.rp,
            user: {
                id: Uint8Array.from(atob(initData.options.user.id), c => c.charCodeAt(0)),
                name: initData.options.user.name,
                displayName: initData.options.user.displayName,
            },
            pubKeyCredParams: initData.options.pubKeyCredParams,
            timeout: initData.options.timeout,
            attestation: initData.options.attestation,
            authenticatorSelection: initData.options.authenticatorSelection,
        };

        const credential = await navigator.credentials.create({ publicKey });

        const finishResp = await fetch('api/webauthn_register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'finish',
                challenge: initData.options.challenge,
                credential: {
                    id: credential.id,
                    type: credential.type,
                    response: {
                        clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                        attestationObject: arrayBufferToBase64(credential.response.attestationObject),
                        transports: credential.response.getTransports ? credential.response.getTransports() : ['internal'],
                        credentialName: prompt('Name this credential:', 'My Passkey') || 'Security Key',
                    },
                },
            }),
        });
        const finishData = await finishResp.json();

        if (finishData.success) {
            location.reload();
        } else {
            alert('Registration failed: ' + finishData.message);
        }

    } catch (err) {
        if (err.name === 'InvalidStateError') {
            alert('This credential has already been registered.');
            return;
        }
        if (err.name === 'NotAllowedError') {
            return;
        }
        alert('Error: ' + err.message);
    }
});

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
</script>

</body>
</html>
