<?php
    require_once 'dbhandler.php';

    $module_id = $_GET['module_id'] ?? null;

    if (!$module_id) {
        http_response_code(400); 
        echo json_encode([
            "success" => false, 
            "message" => "Falta el parámetro obligatorio: module_id"
        ]);
        exit;
    }

    try {
        $sql = "SELECT * FROM topics WHERE module_slug = ? ORDER BY order_in_module ASC";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta: " . $conn->error);
        }
        $stmt->bind_param("s", $module_id); // Geting module_id as string
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
        }
        $result = $stmt->get_result();
        $topics = [];
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id']; 
            $row['order_in_module'] = (int)$row['order_in_module'];
            if (isset($row['active'])) {
                $row['active'] = (bool)$row['active'];
            }

            $topics[] = $row;
        }
        $stmt->close();
        echo json_encode([
            "success" => true, 
            "topics" => $topics
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al obtener los temas.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode([
            "success" => false, 
            "message" => $errorMsg
        ]);
    }
?>