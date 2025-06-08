<?php
// Arranca sesión para validar usuario y conexión a base datos
    session_start();
    require_once 'db.php';

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    // Preflight CORS: aceptamos OPTIONS sin ejecutar lógica    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
    }

    // Validamos que el usuario está autenticado
    if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'message' => 'No autenticado']);
    exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    $userId = $_SESSION['user_id'];

    if (!$id) {
        // Si falta el ID, devolvemos error
    echo json_encode(['ok' => false, 'message' => 'Falta el ID']);
    exit;
    }

    
// Preparamos y ejecutamos borrado seguro
    $stmt = $conn->prepare("DELETE FROM budgets WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $id, $userId);

    if ($stmt->execute()) {
    echo json_encode(['ok' => true]);
    } else {
        // Error al eliminar
    echo json_encode(['ok' => false, 'message' => 'Error al eliminar']);
    }
