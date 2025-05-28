<?php
require_once __DIR__ . '/db.php';

// Coge o crea el carrito del usuario 
function getOrCreateCartByUserId(int $uid): int {
    global $conn;
    //Intentar recuperarlo
    $stmt = $conn->prepare("
      SELECT id
        FROM cart
       WHERE user_id = ?
         AND status = 'open'
       LIMIT 1
    ");
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $stmt->bind_result($cid);
    if ($stmt->fetch()) {
        $stmt->close();
        return $cid;
    }
    $stmt->close();
    //Si no existe, lo crea
    $stmt = $conn->prepare("
      INSERT INTO cart (user_id, status)
           VALUES (?, 'open')
    ");
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $newId = $stmt->insert_id;
    $stmt->close();
    return $newId;
}

//Crear carrito de invitado
function createGuestCart(): int {
  global $conn;
  $stmt = $conn->prepare("
    INSERT INTO cart (user_id, status)
         VALUES (NULL, 'open')
  ");
  $stmt->execute();
  $newId = $stmt->insert_id;
  $stmt->close();
  return $newId;
}


//Devuelve productos del carrito
function getCartItemsByCartId(int $cid): array {
    global $conn;
    $sql = "
      SELECT p.id, p.name, p.price, ci.quantity
        FROM cart_items ci
   LEFT JOIN products    p ON p.id = ci.product_id
       WHERE ci.cart_id = ?
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $cid);
    $stmt->execute();
    $res = $stmt->get_result();
    $items = $res->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $items;
}

//Añade o actualiza un producto del carrito
function addOrUpdateCartItem(int $cid, int $pid, int $qty): void {
    global $conn;
    $stmt = $conn->prepare("
      UPDATE cart_items
         SET quantity = quantity + ?
       WHERE cart_id    = ?
         AND product_id  = ?
    ");
    $stmt->bind_param('iii', $qty, $cid, $pid);
    $stmt->execute();
    if ($stmt->affected_rows === 0) {
        $stmt->close();
        $stmt = $conn->prepare("
          INSERT INTO cart_items (cart_id, product_id, quantity)
               VALUES (?, ?, ?)
        ");
        $stmt->bind_param('iii', $cid, $pid, $qty);
        $stmt->execute();
    }
    $stmt->close();
}

//Elimina producto del carrito
function removeCartItem(int $cid, int $pid): void {
    global $conn;
    $stmt = $conn->prepare("
      DELETE
        FROM cart_items
       WHERE cart_id    = ?
         AND product_id = ?
    ");
    $stmt->bind_param('ii', $cid, $pid);
    $stmt->execute();
    $stmt->close();
}
