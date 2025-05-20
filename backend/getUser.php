<?php
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