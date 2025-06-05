<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true'); // ← esto es obligatorio si Angular usa withCredentials
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejo de preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "hopink_db");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

// Recoger datos
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['name'], $data['email'], $data['artist'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

// Guardar en la base de datos
$stmt = $conn->prepare("INSERT INTO appointments (name, email, artist, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data['name'], $data['email'], $data['artist'], $data['message']);
$stmt->execute();
$stmt->close();
$conn->close();

// Respuesta OK
echo json_encode(["success" => true, "message" => "Cita recibida correctamente"]);
