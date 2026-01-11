<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['module_id']) || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan datos (module_id, title)"]);
        exit;
    }
    try {
        $module_id = (int)$input['module_id'];
        $title = $input['title'];
        $description = $input['description'] ?? '';
        $content = isset($input['content']) 
            ? (is_string($input['content']) ? $input['content'] : json_encode($input['content'], JSON_UNESCAPED_UNICODE))
            : '';
            
        $order_in_module = isset($input['order_in_module']) ? (int)$input['order_in_module'] : 0;
        
        // Verify module exists
        $checkModule = $conn->prepare("SELECT id FROM modules WHERE id = ?");
        $checkModule->bind_param("i", $module_id);
        $checkModule->execute();
        $checkResult = $checkModule->get_result();
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "El módulo no existe"]);
            $checkModule->close();
            exit;
        }
        $checkModule->close();
        
        $sql = "INSERT INTO topics (module_id, title, description, content, order_in_module, created_at) 
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("Error preparando INSERT: " . $conn->error);

        // Types: i (module_id), s (title), s (desc), s (content), i (order)
        $stmt->bind_param("isssi", $module_id, $title, $description, $content, $order_in_module);

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