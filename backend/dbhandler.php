<?php
    // CORS headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json');

    // Handle preflight OPTIONS request
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Hardcode environment - change this manually when needed
    $environment = 'production'; // or 'development' , 'production'

    // Load the appropriate config file
    $configFile = __DIR__ . "/config/{$environment}.ini";

    if (!file_exists($configFile)) {
        die("Configuration file not found: {$configFile}");
    }

    $config = parse_ini_file($configFile, true);

    if (!$config) {
        die("Failed to parse configuration file: {$configFile}");
    }

    // Database configuration
    $host = $config['database']['host'];
    $username = $config['database']['username'];
    $password = $config['database']['password'];
    $database = $config['database']['database'];

    try {
        // Create MySQLi connection
        $conn = new mysqli($host, $username, $password, $database);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        // Set charset
        $conn->set_charset("utf8");
        
    } catch (Exception $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>