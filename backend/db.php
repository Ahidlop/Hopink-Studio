<?php
// Todas las respuestas serán JSON
    header('Content-Type: application/json');

    // Datos de conexión
    $host     = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'hopink_db';

    // Creamos la conexión a MySQL
    $conn = new mysqli($host, $username, $password, $database);

    // Si falla la conexión, devolvemos 500 y un JSON con el error
    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode([
        'status'  => 'error',
        'message' => 'DB connection failed: ' . $conn->connect_error
        ]));
    }
