<?php
// Permite llamadas desde Angular en localhost:4200
  header('Access-Control-Allow-Origin: http://localhost:4200');
  // Permite enviar cookies de sesión
  header('Access-Control-Allow-Credentials: true');
  // Métodos HTTP permitidos
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  // Cabeceras permitidas en la petición
  header('Access-Control-Allow-Headers: Content-Type');

  //Muestra errores por consola 
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  // Define que la respuesta será JSON
  header('Content-Type: application/json');

  // Arranca la sesión PHP
  session_start();
  if (isset($_SESSION['user'])) {
    // Si el usuario está logueado, devolvemos sus datos
    echo json_encode(['status'=>'success','user'=>$_SESSION['user']]);
  } else {
    //Sino error
    echo json_encode(['status'=>'error']);
  }
?>