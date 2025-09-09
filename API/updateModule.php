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

    // --- TOPICS SYNC SECTION ---
    $topics = $input['topics'] ?? [];
    $topic_ids_in_request = [];

    foreach ($topics as $topic) {
        $topic_title = $topic['title'] ?? '';
        $topic_description = $topic['description'] ?? '';
        $topic_content = is_string($topic['content']) ? $topic['content'] : json_encode($topic['content'], JSON_UNESCAPED_UNICODE);
        $topic_order = isset($topic['order_in_module']) ? intval($topic['order_in_module']) : 0;

        if (isset($topic['id']) && $topic['id']) {
            // UPDATE existing topic
            $topic_id = intval($topic['id']);
            $update_stmt = $conn->prepare(
                "UPDATE topics SET title = ?, description = ?, content = ?, order_in_module = ? WHERE id = ? AND module_id = ?"
            );
            $update_stmt->bind_param("ssssss", $topic_title, $topic_description, $topic_content, $topic_order, $topic_id, $module_id);
            $update_stmt->execute();
            $update_stmt->close();
            $topic_ids_in_request[] = $topic_id;
        } else {
            // INSERT new topic
            $insert_stmt = $conn->prepare(
                "INSERT INTO topics (module_id, title, description, content, order_in_module) VALUES (?, ?, ?, ?, ?)"
            );
            $insert_stmt->bind_param("ssssi", $module_id, $topic_title, $topic_description, $topic_content, $topic_order);
            $insert_stmt->execute();
            $topic_ids_in_request[] = $insert_stmt->insert_id;
            $insert_stmt->close();
        }
    }

    // Optionally: Delete topics that are no longer present
    if (count($topic_ids_in_request) > 0) {
        $ids_str = implode(',', array_map('intval', $topic_ids_in_request));
        $delete_sql = "DELETE FROM topics WHERE module_id = ? AND id NOT IN ($ids_str)";
        $delete_stmt = $conn->prepare($delete_sql);
        $delete_stmt->bind_param("s", $module_id);
        $delete_stmt->execute();
        $delete_stmt->close();
    } else {
        // If no topics sent, delete all topics for this module
        $delete_stmt = $conn->prepare("DELETE FROM topics WHERE module_id = ?");
        $delete_stmt->bind_param("s", $module_id);
        $delete_stmt->execute();
        $delete_stmt->close();
    }

    $conn->close();

    echo json_encode(["success" => true]);
?>