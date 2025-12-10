<?php
    require_once __DIR__ . '/cors.php';
    $whitelist = array(
        '127.0.0.1', 
        '::1', 
        'localhost', 
        'chemmaster.com'
    );
    $serverName = $_SERVER['SERVER_NAME'];
    if (in_array($serverName, $whitelist)) {
        $environment = 'development';
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
    } else {
        $environment = 'production';
        ini_set('display_errors', 0);
        error_reporting(0);
    }

    $configFile = __DIR__ . "/Config/{$environment}.ini";

    if (!file_exists($configFile)) {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "message" => "Server Error: Config file missing. Looking for: " . basename($configFile) . " in " . $serverName
        ]);
        exit();
    }

    $config = parse_ini_file($configFile, true);

    if (!$config) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Server Error: Config parse failed"]);
        exit();
    }

    try {
        $host = $config['database']['host'];
        $username = $config['database']['username'];
        $password = $config['database']['password'];
        $database = $config['database']['database'];

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $conn = new mysqli($host, $username, $password, $database);
        $conn->set_charset("utf8mb4");

    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Database connection error";
        if ($environment === 'development') {
            $errorMsg .= ": " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
        exit();
    }
?>