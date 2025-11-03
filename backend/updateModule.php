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
    $active = isset($input['active']) ? intval($input['active']) : 1;

    // Add debugging
    error_log("Updating module ID: $id with active value: $active");

    // Add more debugging before the query
    error_log("Raw input data: " . json_encode($input));
    error_log("Parsed values:");
    error_log("  id: $id");
    error_log("  module_id: $module_id");
    error_log("  grade_level: $grade_level");
    error_log("  title: $title");
    error_log("  description: $description");
    error_log("  icon: $icon");
    error_log("  color: $color");
    error_log("  active: $active");

    // Fix the SQL query - add missing comma before WHERE
    $stmt = $conn->prepare(
        "UPDATE modules SET 
            module_id = ?, 
            grade_level = ?, 
            title = ?, 
            description = ?, 
            icon = ?, 
            color = ?, 
            active = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?"
    );

    if (!$stmt) {
        error_log("SQL Prepare Error: " . $conn->error);
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
        exit;
    }

    $stmt->bind_param(
        "ssssssii",  // 6 strings + 2 integers (active and id)
        $module_id,
        $grade_level,
        $title,
        $description,
        $icon,
        $color,
        $active,     // integer (0 or 1)
        $id          // integer (module ID)
    );

    if (!$stmt->execute()) {
        error_log("SQL Execute Error: " . $stmt->error);
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al actualizar el módulo: " . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit;
    }

    // Add debugging for affected rows
    $affected_rows = $stmt->affected_rows;
    error_log("Affected rows: $affected_rows");

    if ($affected_rows === 0) {
        error_log("Warning: No rows were updated. Module ID might not exist: $id");
    }

    // Return success response
    echo json_encode(["success" => true, "message" => "Módulo actualizado correctamente", "affected_rows" => $affected_rows]);
    
    $stmt->close();
    $conn->close();
?>