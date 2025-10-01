<?php
    // Load configuration from config.ini
    $config = parse_ini_file('config.ini', true);
    
    if (!$config) {
        die(json_encode(["success" => false, "message" => "Error loading configuration file"]));
    }
    
    $host = $config['database']['host'];
    $user = $config['database']['user'];
    $password = $config['database']['password'];
    $dbname = $config['database']['dbname'];

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]));
    }
?>