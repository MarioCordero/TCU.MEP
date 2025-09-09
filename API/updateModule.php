<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    header("Content-Type: application/json; charset=utf-8");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once "dbhandler.php";

    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el ID del módulo"]);
        exit;
    }

    // Prepare fields
    $id = intval($input['id']);
    $module_id = $input['module_id'] ?? '';
    $grade_level = $input['grade_level'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $icon = $input['icon'] ?? '';
    $color = $input['color'] ?? '';

    // Update the module
    $stmt = $conn->prepare(
        "UPDATE modules SET 
            module_id = ?, 
            grade_level = ?, 
            title = ?, 
            description = ?, 
            icon = ?, 
            color = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?"
    );

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta"]);
        exit;
    }

    $stmt->bind_param(
        "ssssssi",
        $module_id,
        $grade_level,
        $title,
        $description,
        $icon,
        $color,
        $id
    );

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al actualizar el módulo"]);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();
?>