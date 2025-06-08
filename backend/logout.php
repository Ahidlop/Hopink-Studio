<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    // Destruye la sesión actual
    session_start();
    session_unset();
    session_destroy();
    // Confirmamos cierre de sesión
    echo json_encode(['status'=>'success']);
?>