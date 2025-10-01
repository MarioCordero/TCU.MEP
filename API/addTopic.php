<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
    header("Content-Type: application/json; charset=utf-8");
    require_once "dbhandler.php";

    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['module_id']) || !isset($input['title']) || !isset($input['content'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan datos requeridos"]);
        exit;
    }

    $module_id = $input['module_id'];
    $title = $input['title'];
    $description = $input['description'] ?? '';
    $content = is_string($input['content']) ? $input['content'] : json_encode($input['content'], JSON_UNESCAPED_UNICODE);
    $order_in_module = isset($input['order_in_module']) ? intval($input['order_in_module']) : 0;

    $stmt = $conn->prepare("INSERT INTO topics (module_id, title, description, content, order_in_module) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $module_id, $title, $description, $content, $order_in_module);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "topic_id" => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al insertar el tópico"]);
    }
    $stmt->close();
    $conn->close();
?>