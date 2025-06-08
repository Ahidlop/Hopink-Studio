<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");

    $host = "localhost";
    $user = "root";       
    $password = "";  
    $db = "hopink_db";   

    $conn = new mysqli($host, $user, $password, $db);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
    }

    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    $products = [];

    if ($result->num_rows > 0) {
        // Guardamos cada producto en el array
        while($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
    }

    // Devolvemos los productos como JSON
    echo json_encode($productos);
    $conn->close();
?>
