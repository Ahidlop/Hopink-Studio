<?php
//Errores mientras depuro
ini_set('display_errors','1');
ini_set('display_startup_errors','1');
error_reporting(E_ALL);

//CORS
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

//Responder OPTIONS y salir
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

//Sesión y helpers
session_set_cookie_params([
  'lifetime' => 0,
  'path'     => '/',
  'domain'   => 'localhost',
  'secure'   => false,
  'httponly' => true,
  'samesite' => 'None'
]);
session_start();

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/cart_helpers.php';

// Tomamos user_id si existe, o null en caso contrario
$userId = $_SESSION['user']['id'] ?? null;

if (is_int($userId)) {
    // Usuario logueado
    $cartId = getOrCreateCartByUserId($userId);
} else {
    // Invitado
    if (empty($_SESSION['cart_id'])) {
        $_SESSION['cart_id'] = createGuestCart();
    }
    $cartId = $_SESSION['cart_id'];
}

$result = [];
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = getCartItemsByCartId($cartId);
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        if (isset($body['product_id'], $body['quantity'])) {
            addOrUpdateCartItem(
              $cartId,
              (int)$body['product_id'],
              (int)$body['quantity']
            );
        }
        $result = getCartItemsByCartId($cartId);
        break;

    case 'DELETE':
        //lee el raw body como JSON
        $body = json_decode(file_get_contents('php://input'), true);
        //si existe, borra
        if (isset($body['product_id'])) {
            removeCartItem($cartId, (int)$body['product_id']);
        }
        //devuelve el carrito actualizado
        $result = getCartItemsByCartId($cartId);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        exit;
}

//Salida
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
  'success' => true,
  'items'   => $result
], JSON_UNESCAPED_UNICODE);
exit;
