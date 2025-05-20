<?php
<<<<<<< Updated upstream
    include 'db.php';
    session_start();

    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time()-42000, '/');
    }
    session_destroy();

    echo json_encode(['status'=>'success']);
=======
// backends/logout.php
session_start();
header('Content-Type: application/json');

// destruimos sesión
$_SESSION = [];
session_destroy();

echo json_encode(['status'=>'success']);
>>>>>>> Stashed changes
?>