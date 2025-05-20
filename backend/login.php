<?php
<<<<<<< Updated upstream
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
=======
// backends/login.php
session_start();
header('Content-Type: application/json');

$db = new PDO('mysql:host=localhost;dbname=hopink_db;charset=utf8', 'root', '');
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $db->prepare("SELECT id,name,password FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($data['password'], $user['password'])) {
    echo json_encode(['status'=>'error','message'=>'Credenciales inválidas']);
    exit;
}

// guardamos en sesión
$_SESSION['user'] = [
  'id'    => $user['id'],
  'name'  => $user['name'],
  'email' => $data['email']
];

echo json_encode(['status'=>'success','user'=>$_SESSION['user']]);
>>>>>>> Stashed changes
