<?php
    require_once 'dbhandler.php';
    $module_id = $_GET['module_id'] ?? null;
    
    if (!$module_id) {
        http_response_code(400); 
        echo json_encode(["success" => false, "message" => "Falta el parámetro module_id"]);
        exit;
    }
    
    try {
        $module_id = (int)$module_id;
        $sql = "SELECT * FROM topics WHERE module_id = ? ORDER BY order_in_module ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $module_id); 
        $stmt->execute();
        $result = $stmt->get_result();
        $topics = [];
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['module_id'] = (int)$row['module_id'];
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