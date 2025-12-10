<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el ID del tópico"]);
        exit;
    }
    try {
        $stmt = $conn->prepare("DELETE FROM topics WHERE id = ?");
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        $stmt->bind_param("i", $id); // Integer
        if (!$stmt->execute()) {
            throw new Exception("Error ejecutando la eliminación: " . $stmt->error);
        }
        $stmt->close();
        echo json_encode([
            "success" => true, 
            "message" => "Tópico eliminado correctamente"
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al eliminar el tópico.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>