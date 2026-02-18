<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el ID del módulo"]);
        exit;
    }
    try {
        $id = (int)$input['id'];
        $slug = $input['slug'] ?? $input['module_id'] ?? ''; 
        $grade_level = $input['grade_level'] ?? '';
        $title = $input['title'] ?? '';
        $description = $input['description'] ?? '';
        $icon = $input['icon'] ?? '';
        $color = $input['color'] ?? '';

        $active = isset($input['active']) ? (int)$input['active'] : 1; 
        $sql = "UPDATE modules SET 
                    slug = ?, 
                    grade_level = ?, 
                    title = ?, 
                    description = ?, 
                    icon = ?, 
                    color = ?, 
                    active = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        // Types: s (slug), s (grade), s (title), s (desc), s (icon), s (color), i (active), i (id)
        $stmt->bind_param(
            "ssssssii",
            $slug,
            $grade_level,
            $title,
            $description,
            $icon,
            $color,
            $active,
            $id
        );
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la actualización: " . $stmt->error);
        }
        $affected_rows = $stmt->affected_rows;
        $stmt->close();
        echo json_encode([
            "success" => true, 
            "message" => "Módulo actualizado correctamente",
            "affected_rows" => $affected_rows
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al actualizar módulo.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>