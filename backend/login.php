<?php
    include 'db.php';
    session_start();

    $data = json_decode(file_get_contents("php://input"), true);
    $email    = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($result->num_rows===0) {
    echo json_encode(['status'=>'error','message'=>'Email no encontrado']);
    exit;
    }

    $user = $result->fetch_assoc();
    if (!password_verify($password, $user['password'])) {
    echo json_encode(['status'=>'error','message'=>'Contraseña incorrecta']);
    exit;
    }

    // Login OK: guarda en $_SESSION
    unset($user['password']);
    $_SESSION['user'] = $user;

    // envía la cookie de sesión (PHPSESSID) automáticamente
    echo json_encode(['status'=>'success','user'=>$user]);
