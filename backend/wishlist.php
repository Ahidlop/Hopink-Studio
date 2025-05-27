<?php
// 1) Errores
ini_set('display_errors','1');
error_reporting(E_ALL);

// 2) CORS
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 3) Sesión
session_set_cookie_params(['lifetime'=>0,'path'=>'/','domain'=>'localhost','secure'=>false,'httponly'=>true,'samesite'=>'None']);
session_start();

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/wishlist_helpers.php';

// 4) Sólo usuarios logueados
if (empty($_SESSION['user']['id'])) {
    http_response_code(401);
    echo json_encode(['status'=>'error','message'=>'Login required']);
    exit;
}
$uid = (int)$_SESSION['user']['id'];

$result = [];
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = getWishlistByUserId($uid);
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        if (isset($body['product_id'])) {
            addWishlistItem($uid, (int)$body['product_id']);
        }
        $result = getWishlistByUserId($uid);
        break;

    case 'DELETE':
        // Cambiamos aquí:
        if (isset($_GET['product_id'])) {
            removeWishlistItem($uid, (int)$_GET['product_id']);
        }
        $result = getWishlistByUserId($uid);
        break;

    default:
        http_response_code(405);
        exit;
}

// 5) Devolver JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['status'=>'success','items'=>$result], JSON_UNESCAPED_UNICODE);
exit;
