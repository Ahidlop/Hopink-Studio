<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // Permitir Angular dev-server
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
    }
    include 'db.php';
    session_start();

    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time()-42000, '/');
    }
    session_destroy();

    echo json_encode(['status'=>'success']);
?>