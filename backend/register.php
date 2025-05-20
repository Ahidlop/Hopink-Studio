<?php
    include 'db.php';
    $data = json_decode(file_get_contents("php://input"), true);

    $name     = $conn->real_escape_string($data['name']);
    $email    = $conn->real_escape_string($data['email']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    $check = $conn->query("SELECT id FROM users WHERE email='$email'");
    if ($check->num_rows>0) {
    echo json_encode(['status'=>'error','message'=>'Email ya registrado']);
    exit;
    }

    $conn->query("INSERT INTO users (name,email,password) VALUES ('$name','$email','$password')");
    echo json_encode(['status'=>'success']);
?>
