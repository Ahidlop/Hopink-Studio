<?php
<<<<<<< Updated upstream
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
/>
=======
// backends/register.php
session_start();
header('Content-Type: application/json');

$db = new PDO('mysql:host=localhost;dbname=hopink_db;charset=utf8', 'root', '');
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(['status'=>'error','message'=>'Faltan datos']);
    exit;
}

$stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
if ($stmt->fetch()) {
    echo json_encode(['status'=>'error','message'=>'Email ya registrado']);
    exit;
}

// inserta con contraseña hasheada
$hash = password_hash($data['password'], PASSWORD_DEFAULT);
$stmt = $db->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
if ($stmt->execute([$data['name'], $data['email'], $hash])) {
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'error','message'=>'Error al registrar']);
}
>>>>>>> Stashed changes
