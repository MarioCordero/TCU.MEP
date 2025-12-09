<?php
    header('Access-Control-Allow-Origin: *'); // Or specify your domain: 'http://localhost:5173'
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    header('Content-Type: application/json; charset=utf-8');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $module_id = $_GET['module_id'] ?? '';
    if (!$module_id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta module_id"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM topics WHERE module_id = ?");
    $stmt->bind_param("s", $module_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $topics = [];
    while ($row = $result->fetch_assoc()) {
        $topics[] = $row;
    }
    $stmt->close();
    $conn->close();

    echo json_encode(["success" => true, "topics" => $topics]);
?>