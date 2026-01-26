<?php
    require_once __DIR__ . '/dbhandler.php';
    $uploadDir = __DIR__ . '/uploads/';
    try {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->filename) || empty($data->filename)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No se recibió el parámetro 'filename'"]);
            exit;
        }
        $fileName = basename($data->filename);
        $filePath = $uploadDir . $fileName;
        if (!file_exists($filePath)) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "El archivo no existe o ya fue eliminado"]);
            exit;
        }
        if (unlink($filePath)) {    
            echo json_encode([
                "success" => true,
                "message" => "Archivo eliminado correctamente"
            ]);
        } else {
            throw new Exception("No se pudo eliminar el archivo. Verifique permisos en la carpeta uploads.");
        }
    } catch (Exception $e) {
        http_response_code(500);
        $msg = "Error interno al procesar la eliminación.";
        if (isset($environment) && $environment === 'development') {
            $msg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $msg]);
    }
?>