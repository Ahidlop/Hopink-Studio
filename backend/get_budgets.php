<?php
    session_start();

    // CORS HEADERS:
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

// Preflight OPTIONS response:
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

    $user_id = $_SESSION['user_id'];

    $sql = "SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $budgets = [];
    while ($row = $result->fetch_assoc()) {
        $budgets[] = $row;
    }

    echo json_encode($budgets);
