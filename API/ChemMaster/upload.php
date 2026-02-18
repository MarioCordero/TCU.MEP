<?php
    require_once __DIR__ . '/dbhandler.php';
    $uploadDir = __DIR__ . '/uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
        chmod($uploadDir, 0755);
    }
    try {
        if (!isset($_FILES['file'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No se recibió ningún archivo bajo el nombre 'file'"]);
            exit;
        }

        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileError = $file['error'];
        
        if ($fileError !== UPLOAD_ERR_OK) {
            throw new Exception("Error en la carga del archivo (Código: $fileError)");
        }

        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowed = array('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt', 'txt', 'zip', 'rar');

        $maxSize = 50 * 1024 * 1024;
        if ($file['size'] > $maxSize) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "El archivo es demasiado grande (Máx 50MB)"]);
            exit;
        }

        if (!in_array($fileExt, $allowed)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Extensión no permitida ($fileExt)"]);
            exit;
        }

        $newFileName = uniqid("chem_", true) . "." . $fileExt;
        $destPath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpName, $destPath)) {    
            $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https://" : "http://";
            $host = $_SERVER['HTTP_HOST'];
            $currentDir = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
            $publicUrl = $protocol . $host . $currentDir . "/uploads/" . $newFileName;

            echo json_encode([
                "success" => true,
                "message" => "Archivo subido correctamente",
                "url" => $publicUrl
            ]);

        } else {
            throw new Exception("No se pudo mover el archivo a la carpeta destino. Verifica permisos 755 en " . $uploadDir);
        }

    } catch (Exception $e) {
        http_response_code(500);
        $msg = "Error interno al procesar la imagen.";
        
        if (isset($environment) && $environment === 'development') {
            $msg .= " Detalle: " . $e->getMessage();
        }
        
        echo json_encode(["success" => false, "message" => $msg]);
    }
?>