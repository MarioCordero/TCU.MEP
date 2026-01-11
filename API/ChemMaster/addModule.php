<?php
    require_once 'dbhandler.php';
    
    $input = json_decode(file_get_contents("php://input"), true);
    
    // Validate required fields
    if (!$input || !isset($input['slug']) || !isset($input['title']) || !isset($input['grade_level'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields: slug, title, grade_level"]);
        exit;
    }
    
    try {
        $slug = $input['slug'];
        $grade_level = $input['grade_level'];
        $title = $input['title'];
        $description = $input['description'] ?? '';
        $icon = $input['icon'] ?? 'Book';
        $color = $input['color'] ?? 'from-blue-500 to-blue-600';
        $active = isset($input['active']) ? (int)$input['active'] : 1;
        
        // Check if slug already exists
        $check_sql = "SELECT id FROM modules WHERE slug = ?";
        $check_stmt = $conn->prepare($check_sql);
        if (!$check_stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        
        $check_stmt->bind_param("s", $slug);
        $check_stmt->execute();
        $result = $check_stmt->get_result();
        
        if ($result->num_rows > 0) {
            http_response_code(409);
            echo json_encode(["success" => false, "message" => "Módulo con este slug ya existe"]);
            $check_stmt->close();
            exit;
        }
        $check_stmt->close();
        
        // Insert new module
        $sql = "INSERT INTO modules (slug, grade_level, title, description, icon, color, active, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        
        // Types: s (slug), s (grade), s (title), s (desc), s (icon), s (color), i (active)
        $stmt->bind_param(
            "ssssssi",
            $slug,
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
            "id" => $new_id,
            "slug" => $slug
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