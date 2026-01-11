<?php
    require_once 'dbhandler.php';
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el ID del módulo"]);
        exit;
    }
    $id = (int)$input['id'];
    try {
        // Verify module exists
        $sqlCheck = "SELECT id FROM modules WHERE id = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->bind_param("i", $id);
        $stmtCheck->execute();
        $resCheck = $stmtCheck->get_result();
        
        if ($resCheck->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "El módulo con ID $id no existe"]);
            $stmtCheck->close();
            exit;
        }
        $stmtCheck->close();

        // Check if module has associated topics using module_id
        $sqlCountTopics = "SELECT COUNT(*) as total FROM topics WHERE module_id = ?";
        $stmtCountTopics = $conn->prepare($sqlCountTopics);
        $stmtCountTopics->bind_param("i", $id);
        $stmtCountTopics->execute();
        $resCountTopics = $stmtCountTopics->get_result();
        $countData = $resCountTopics->fetch_assoc();
        $stmtCountTopics->close();

        if ($countData['total'] > 0) {
            http_response_code(409); 
            echo json_encode([
                "success" => false, 
                "message" => "No se puede eliminar: El módulo tiene {$countData['total']} temas asociados. Borra los temas primero."
            ]);
            exit;
        }

        // Delete the module
        $sqlDelete = "DELETE FROM modules WHERE id = ?";
        $stmtDelete = $conn->prepare($sqlDelete);
        $stmtDelete->bind_param("i", $id);

        if ($stmtDelete->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Módulo eliminado correctamente"
            ]);
        } else {
            throw new Exception("Error al ejecutar DELETE: " . $stmtDelete->error);
        }
        $stmtDelete->close();
    } catch (Exception $e) {
        http_response_code(500);
        $msg = "Error al eliminar módulo.";
        if (isset($environment) && $environment === 'development') $msg .= " " . $e->getMessage();
        echo json_encode(["success" => false, "message" => $msg]);
    }
?>