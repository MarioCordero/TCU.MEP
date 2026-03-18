<?php
    require_once __DIR__ . '/cors.php';
    require_once 'dbhandler.php';
    
    $input = json_decode(file_get_contents("php://input"), true);
    
    // Validate required fields
    if (!$input || !isset($input['title']) || !isset($input['grade_level'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields: title, grade_level"]);
        exit;
    }
    
    try {
        $grade_level = $input['grade_level'];
        $title = $input['title'];
        $description = $input['description'] ?? '';
        $icon = $input['icon'] ?? 'Book';
        $color = $input['color'] ?? 'from-blue-500 to-blue-600';
        $active = isset($input['active']) ? (int)$input['active'] : 1;
        
        // Insert new module (no slug)
        $sql = "INSERT INTO modules (grade_level, title, description, icon, color, active, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        
        // Types: s (grade), s (title), s (desc), s (icon), s (color), i (active)
        $stmt->bind_param(
            "sssssi",
            $grade_level,
            $title,
            $description,
            $icon,
            $color,
            $active
        );
        
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la inserción: " . $stmt->error);
        }
        
        $new_id = $conn->insert_id;
        $stmt->close();
        
        echo json_encode([
            "success" => true, 
            "message" => "Módulo creado correctamente",
            "id" => $new_id
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al crear módulo.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>