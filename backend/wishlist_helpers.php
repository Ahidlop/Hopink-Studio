<?php
require_once __DIR__ . '/db.php';

/** Devuelve array de productos en la wishlist de un usuario */
function getWishlistByUserId(int $uid): array {
    global $conn;
    $sql = "
      SELECT p.id, p.name, p.price
        FROM wishlist w
   LEFT JOIN products p ON p.id = w.product_id
       WHERE w.user_id = ?
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $res = $stmt->get_result();
    $items = $res->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $items;
}

/** Añade un producto si no existe aún */
function addWishlistItem(int $uid, int $pid): void {
    global $conn;
    // evita duplicados
    $stmt = $conn->prepare("
      SELECT 1 FROM wishlist WHERE user_id = ? AND product_id = ? LIMIT 1
    ");
    $stmt->bind_param('ii', $uid, $pid);
    $stmt->execute();
    if (!$stmt->fetch()) {
      $stmt->close();
      $stmt = $conn->prepare("
        INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)
      ");
      $stmt->bind_param('ii', $uid, $pid);
      $stmt->execute();
    }
    $stmt->close();
}

/** Elimina de la wishlist */
function removeWishlistItem(int $uid, int $pid): void {
    global $conn;
    $stmt = $conn->prepare("
      DELETE FROM wishlist 
       WHERE user_id = ? 
         AND product_id = ?
    ");
    $stmt->bind_param('ii', $uid, $pid);
    $stmt->execute();
    $stmt->close();
}
