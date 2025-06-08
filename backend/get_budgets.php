<?php
// Inicia sesión, conexión a BD y CORS
    session_start();
    require_once 'db.php';

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    // Preflight CORS
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    // Solo usuarios autenticados
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'message' => 'No autenticado']);
        exit;
    }

    $userId = $_SESSION['user_id'];
    // Preparamos consulta para obtener presupuestos
    $stmt = $conn->prepare("SELECT id, artist, service, budget, height, width, message, created_at FROM budgets WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $budgets = [];
    while ($row = $result->fetch_assoc()) {
        $budgets[] = $row;
    }

    // Devolvemos lista de presupuestos en JSON
    echo json_encode(['ok' => true, 'budgets' => $budgets]);
