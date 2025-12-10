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
        $sqlGetSlug = "SELECT slug FROM modules WHERE id = ?";
        $stmtSlug = $conn->prepare($sqlGetSlug);
        $stmtSlug->bind_param("i", $id);
        $stmtSlug->execute();
        $resSlug = $stmtSlug->get_result();
        
        if ($resSlug->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "El módulo con ID $id no existe"]);
            exit;
        }

        $row = $resSlug->fetch_assoc();
        $slug = $row['slug']; 
        $stmtSlug->close();

        $sqlCheck = "SELECT COUNT(*) as total FROM topics WHERE module_slug = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->bind_param("s", $slug);
        $stmtCheck->execute();
        $resCheck = $stmtCheck->get_result();
        $countData = $resCheck->fetch_assoc();
        $stmtCheck->close();

        if ($countData['total'] > 0) {
            http_response_code(409); 
            echo json_encode([
                "success" => false, 
                "message" => "No se puede eliminar: El módulo tiene {$countData['total']} temas asociados. Borra los temas primero."
            ]);
            exit;
        }
        $sqlDelete = "DELETE FROM modules WHERE id = ?";
        $stmtDelete = $conn->prepare($sqlDelete);
        $stmtDelete->bind_param("i", $id);

        if ($stmtDelete->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Módulo eliminado correctamente (no tenía dependencias)"
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