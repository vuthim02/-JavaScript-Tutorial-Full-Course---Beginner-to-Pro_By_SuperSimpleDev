<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.use_only_cookies', 1);

session_start();

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/jwt.php';
require_once __DIR__ . '/lib/totp.php';
require_once __DIR__ . '/lib/webauthn.php';
require_once __DIR__ . '/lib/rate_limit.php';
