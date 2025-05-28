<?php
//Errores mientras depuras
ini_set('display_errors', 1);
error_reporting(E_ALL);

//CORS
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight CORS
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

//Sólo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

// Conexión y helpers
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/cart_helpers.php';

//Leer body y validar
$body     = json_decode(file_get_contents('php://input'), true) ?: [];
$email    = trim($body['email']    ?? '');
$password =            $body['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 4) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email o contraseña inválidos']);
    exit;
}

//Buscar usuario
$stmt = $conn->prepare("
    SELECT id, name, password
      FROM users
     WHERE email = ?
     LIMIT 1
");
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();

if ($user = $res->fetch_assoc()) {
    // Verificar contraseña
    if (password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['user'] = [
            'id'    => (int)$user['id'],
            'name'  => $user['name'],
            'email' => $email
        ];

        //Fusionar carrito invitado
        if (!empty($_SESSION['cart_id'])) {
            mergeCart((int)$_SESSION['cart_id'], (int)$_SESSION['user']['id']);
            unset($_SESSION['cart_id']);
        }

        // Obtener el ID de carrito “open” del usuario
        $cartId = getOrCreateCartByUserId((int)$_SESSION['user']['id']);


        // Recuperar los items de ese carrito
        $cartItems = getCartItemsByCartId($cartId);

        // Devolver JSON al cliente
        echo json_encode([
            'status' => 'success',
            'user'   => $_SESSION['user'],
            'cart'   => $cartItems
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Contraseña incorrecta
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
    exit;
}

// Usuario no encontrado
http_response_code(404);
echo json_encode(['status' => 'error', 'message' => 'Usuario no existe o no confirmado']);
exit;
