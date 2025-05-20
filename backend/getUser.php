<?php
<<<<<<< Updated upstream
    include 'db.php';
    session_start();

    header("Content-Type: application/json");
    if (isset($_SESSION['user'])) {
    echo json_encode(['status'=>'success','user'=>$_SESSION['user']]);
    } else {
    echo json_encode(['status'=>'error']);
    }
?>
=======
// backends/getUser.php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['status'=>'error']);
    exit;
}

// devolvemos el usuario en sesión
echo json_encode([
  'status' => 'success',
  'user'   => $_SESSION['user']
]);
>>>>>>> Stashed changes
