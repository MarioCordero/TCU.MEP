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
    
    require_once "dbhandler.php";

    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['id']) || !isset($input['title']) || !isset($input['content'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan datos requeridos"]);
        exit;
    }

    $id = intval($input['id']);
    $title = $input['title'];
    $description = $input['description'] ?? '';
    $content = is_string($input['content']) ? $input['content'] : json_encode($input['content'], JSON_UNESCAPED_UNICODE);
    $order_in_module = isset($input['order_in_module']) ? intval($input['order_in_module']) : 0;

    $stmt = $conn->prepare("UPDATE topics SET title = ?, description = ?, content = ?, order_in_module = ? WHERE id = ?");
    $stmt->bind_param("sssii", $title, $description, $content, $order_in_module, $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al actualizar el tópico"]);
    }
    $stmt->close();
    $conn->close();
?>