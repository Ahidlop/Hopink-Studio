<?php
    session_start();
    require_once 'db.php';

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
        exit;
    }

    $userId = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);

    $name     = $data['name']     ?? '';
    $email    = $data['email']    ?? '';
    $artist   = $data['artist']   ?? '';
    $service  = $data['service']  ?? '';
    $height   = $data['height']   ?? 0;
    $width    = $data['width']    ?? 0;
    $message  = $data['message']  ?? '';
    $budget   = $data['budget']   ?? 0;

    $stmt = $conn->prepare("INSERT INTO budgets (user_id, name, email, artist, service, height, width, message, budget, created_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("issssiisd", $userId, $name, $email, $artist, $service, $height, $width, $message, $budget);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar el presupuesto']);
    }
