<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // CORS
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    // Responde a preflight CORS
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Methods: POST,OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        exit;
    }
    // Solo métodos POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['status'=>'error','message'=>'Método no permitido']);
        exit;
    }
    // Incluye conexión
    require_once __DIR__ . '/db.php';

    // Lee datos JSON del body
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if (!$body) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'JSON inválido o vacío']);
        exit;
    }

    $name  = $conn->real_escape_string(trim($body['name']  ?? ''));
    $email = $conn->real_escape_string(trim($body['email'] ?? ''));
    $pass  =           trim($body['password']    ?? '');

    if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pass) < 4) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Datos inválidos']);
        exit;
    }

    // Hasheamos la contraseña(que no se almacene en texto plano)
    $hash  = password_hash($pass, PASSWORD_DEFAULT);
    $token = bin2hex(random_bytes(16));

    // Preparamos inserción segura
    $stmt = $conn->prepare(
        "INSERT INTO users (name,email,password,token,status) VALUES (?, ?, ?, ?, 0)"
    );
    $stmt->bind_param('ssss', $name, $email, $hash, $token);

    // Usuario registrado
    if ($stmt->execute()) {
        echo json_encode(['status'=>'success','message'=>'Usuario creado']);
    } else {
        //Email duplicado
        http_response_code(409);
        echo json_encode(['status'=>'error','message'=>'Email ya registrado']);
    }
    $stmt->close();
    $conn->close();
?>