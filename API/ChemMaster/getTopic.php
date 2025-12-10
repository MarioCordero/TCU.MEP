<?php
    require_once 'dbhandler.php';
    $slug = $_GET['slug'] ?? null;
    if (!$slug) {
        http_response_code(400); 
        echo json_encode(["success" => false, "message" => "Falta el slug del módulo"]);
        exit;
    }
    try {
        $sql = "SELECT * FROM topics WHERE module_slug = ? ORDER BY order_in_module ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $slug); 
        $stmt->execute();
        $result = $stmt->get_result();
        $topics = [];
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['order_in_module'] = (int)$row['order_in_module'];
            if (isset($row['active'])) $row['active'] = (bool)$row['active'];
            $topics[] = $row;
        }
        echo json_encode(["success" => true, "topics" => $topics]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error DB"]);
    }
?>