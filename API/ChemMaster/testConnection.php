<?php
// API/ChemMaster/test_connection.php

// 1. Intentamos cargar tu handler
require_once 'dbhandler.php';

// Si el script llega aquí, significa que dbhandler NO mató el proceso con un error.

$response = [
    "status" => "¡Conexión Exitosa! 🚀",
    "environment_detected" => $environment, // Debería decir 'development'
    "database_info" => null
];

// 2. Intentamos una consulta real para estar 100% seguros
try {
    // Pedimos la versión de MySQL
    $result = $conn->query("SELECT VERSION() as version");
    $row = $result->fetch_assoc();
    
    $response["database_info"] = [
        "mysql_version" => $row['version'],
        "host_info" => $conn->host_info
    ];
    
} catch (Exception $e) {
    $response["status"] = "Error en consulta de prueba";
    $response["error"] = $e->getMessage();
}

// Imprimimos el resultado bonito
echo json_encode($response, JSON_PRETTY_PRINT);
?>