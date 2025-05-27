<?php
// ————————————————
// 1) Errores mientras depuras
// ————————————————
ini_set('display_errors','1');
ini_set('display_startup_errors','1');
error_reporting(E_ALL);

// ————————————————
// 2) CORS (¡antes de cualquier salida!)
// ————————————————
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// ————————————————
// 3) Responder OPTIONS y salir
// ————————————————
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ————————————————
// 4) Sesión y helpers
// ————————————————
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

// ————————————————
// 5) Lógica del carrito (igual que antes)
// ————————————————
if (!empty($_SESSION['user']['id'])) {
    $cartId = getOrCreateCartByUserId((int)$_SESSION['user']['id']);
} else {
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
        parse_str(file_get_contents('php://input'), $body);
        if (isset($body['product_id'])) {
            removeCartItem($cartId, (int)$body['product_id']);
        }
        $result = getCartItemsByCartId($cartId);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        exit;
}

// ————————————————
// 6) ¡Salida limpia!
// ————————————————
header('Content-Type: application/json; charset=utf-8');
// QUITAR cualquier ob_clean() u ob_start() si lo había
echo json_encode([
  'success' => true,
  'items'   => $result
], JSON_UNESCAPED_UNICODE);
exit;
?>