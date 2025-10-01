<?php
    // Determine environment (you can set this via environment variable or a simple config)
    $environment = getenv('APP_ENV') ?: 'development'; // Default to development

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
        $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>