<?php
    header('Content-Type: application/json');

    $host     = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'hopink_db';

    $conn = new mysqli($host, $username, $password, $database);
    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode([
        'status'  => 'error',
        'message' => 'DB connection failed: ' . $conn->connect_error
        ]));
    }
?>
