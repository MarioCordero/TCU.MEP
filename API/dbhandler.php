<?php
    $host = "localhost";
    $user = "mario";
    $password = "2003";
    $dbname = "ChemMaster";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]));
    }
?>