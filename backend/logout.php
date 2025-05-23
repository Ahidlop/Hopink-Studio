<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    session_start();
    session_destroy();
    echo json_encode(['status'=>'success']);
?>