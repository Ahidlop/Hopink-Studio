<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
    }

    session_start();
    require_once __DIR__ . '/db.php';

    $body = json_decode(file_get_contents('php://input'), true);
    $email = $conn->real_escape_string(trim($body['email'] ?? ''));
    $pass  = $body['password'] ?? '';

    $stmt = $conn->prepare(
    "SELECT id,name,password FROM users
    WHERE email = ? AND status = 1"
    );
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($user = $res->fetch_assoc()) {
    if (password_verify($pass, $user['password'])) {
        $_SESSION['user'] = [
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $email
        ];
        echo json_encode(['status'=>'success','user'=>$_SESSION['user']]);
    } else {
        http_response_code(401);
        echo json_encode(['status'=>'error','message'=>'Contraseña incorrecta']);
    }
    } else {
    http_response_code(404);
    echo json_encode(['status'=>'error','message'=>'Usuario no existe o no confirmado']);
    }
    $stmt->close();
    $conn->close();
?>