<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // 1) Cabeceras CORS para permitir Angular en 4200
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder preflight
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
    }

    // 2) Sólo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Método no permitido']);
    exit;
    }

    require_once __DIR__ . '/db.php';

    $body = json_decode(file_get_contents('php://input'), true);
    $email    = trim($body['email']    ?? '');
    $password =            $body['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 4) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Email o contraseña inválidos']);
    exit;
    }

    $stmt = $conn->prepare(
    "SELECT id,name,password 
        FROM users 
        WHERE email = ? 
        LIMIT 1"
    );
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($user = $res->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        session_start();
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