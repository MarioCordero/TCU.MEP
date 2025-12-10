<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['module_slug']) || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan datos (module_slug, title)"]);
        exit;
    }
    try {
        $module_slug = $input['module_slug'];
        $title = $input['title'];
        $description = $input['description'] ?? '';
        $content = isset($input['content']) 
            ? (is_string($input['content']) ? $input['content'] : json_encode($input['content'], JSON_UNESCAPED_UNICODE))
            : '';
            
        $order_in_module = isset($input['order_in_module']) ? (int)$input['order_in_module'] : 0;
        $active = isset($input['active']) ? (int)$input['active'] : 1;
        $sql = "INSERT INTO topics (module_slug, title, description, content, order_in_module, active, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("Error preparando INSERT: " . $conn->error);
        // Types: s (slug), s (title), s (desc), s (content), i (order), i (active)
        $stmt->bind_param("ssssii", $module_slug, $title, $description, $content, $order_in_module, $active);
        if (!$stmt->execute()) throw new Exception("Error ejecutando INSERT: " . $stmt->error);
        $newId = $stmt->insert_id;
        $stmt->close();
        echo json_encode([
            "success" => true, 
            "message" => "Tema creado exitosamente",
            "id" => $newId
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        $msg = "Error al crear tema.";
        if (isset($environment) && $environment === 'development') $msg .= " " . $e->getMessage();
        echo json_encode(["success" => false, "message" => $msg]);
    }
?>