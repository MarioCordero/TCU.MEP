<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['id']) || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan datos requeridos (id, title)"]);
        exit;
    }
    try {
        $id = (int)$input['id'];
        $title = $input['title'];
        $description = $input['description'] ?? '';
        $order_in_module = isset($input['order_in_module']) ? (int)$input['order_in_module'] : 0;
        $content = isset($input['content']) 
            ? (is_string($input['content']) ? $input['content'] : json_encode($input['content'], JSON_UNESCAPED_UNICODE))
            : '';

        $active = isset($input['active']) ? (int)$input['active'] : 1;
        $sql = "UPDATE topics SET 
                    title = ?, 
                    description = ?, 
                    content = ?, 
                    order_in_module = ?, 
                    active = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        // Types: s(title), s(desc), s(content), i(order), i(active), i(id)
        $stmt->bind_param(
            "sssiii", 
            $title, 
            $description, 
            $content, 
            $order_in_module,
            $active,
            $id
        );
        if (!$stmt->execute()) {
            throw new Exception("Error ejecutando la actualización: " . $stmt->error);
        }
        $affected_rows = $stmt->affected_rows;
        $stmt->close();
        echo json_encode([
            "success" => true, 
            "message" => "Tópico actualizado correctamente",
            "affected_rows" => $affected_rows
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al actualizar el tópico.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>