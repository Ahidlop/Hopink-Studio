<?php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  header('Access-Control-Allow-Origin: http://localhost:4200');
  header('Access-Control-Allow-Credentials: true');
  header('Content-Type: application/json');

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
  }
  session_start();
  header('Content-Type: application/json');

  // Assume you stored the user array in $_SESSION['user'] on login
  if (!empty($_SESSION['user'])) {
      echo json_encode([
        'status' => 'success',
        'user'   => $_SESSION['user']
      ]);
  } else {
      echo json_encode([
        'status' => 'error'
      ]);
  }
?>