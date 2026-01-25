<?php
    // Cargamos el dbhandler que ya maneja CORS y Entornos (dev/prod)
    require_once __DIR__ . '/dbhandler.php';

    // Definimos la carpeta de destino
    $uploadDir = __DIR__ . '/uploads/';

    // Creamos la carpeta si no existe
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    try {
        // Validamos que se haya enviado un archivo
        if (!isset($_FILES['file'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No se recibió ningún archivo bajo el nombre 'file'"]);
            exit;
        }

        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileError = $file['error'];
        
        // Validar errores de carga de PHP
        if ($fileError !== UPLOAD_ERR_OK) {
            throw new Exception("Error en la carga del archivo (Código: $fileError)");
        }

        // Extraer extensión y validar que sea imagen
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowed = array('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg');

        if (!in_array($fileExt, $allowed)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Extensión no permitida ($fileExt)"]);
            exit;
        }

        // Generar nombre único para evitar colisiones en Hostinger
        $newFileName = uniqid("chem_", true) . "." . $fileExt;
        $destPath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpName, $destPath)) {
            
            // Construir la URL pública dinámicamente según el entorno
            // Si es localhost usamos el server name, si no la URL de producción
            $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https://" : "http://";
            $baseUrl = $protocol . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
            
            // La URL final que BlockNote guardará en el JSON
            $publicUrl = $baseUrl . "/uploads/" . $newFileName;

            echo json_encode([
                "success" => true,
                "message" => "Imagen subida correctamente",
                "url" => $publicUrl
            ]);

        } else {
            throw new Exception("No se pudo mover el archivo a la carpeta destino. Verifica permisos 755.");
        }

    } catch (Exception $e) {
        http_response_code(500);
        $msg = "Error interno al procesar la imagen.";
        
        // Solo mostramos el error detallado si estamos en desarrollo
        if (isset($environment) && $environment === 'development') {
            $msg .= " Detalle: " . $e->getMessage();
        }
        
        echo json_encode(["success" => false, "message" => $msg]);
    }
?>