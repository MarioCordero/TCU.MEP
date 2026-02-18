<?php
    require_once 'dbhandler.php';
    try {
        $sqlModules = "SELECT * FROM modules ORDER BY id ASC";
        $resultModules = $conn->query($sqlModules);
        $modules = [];
        $modulesMap = [];
        while ($row = $resultModules->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['active'] = (bool)$row['active'];
            $row['features'] = !empty($row['features']) ? json_decode($row['features'], true) : [];
            $row['tools'] = !empty($row['tools']) ? json_decode($row['tools'], true) : [];
            $row['topics'] = [];
            $moduleId = (int)$row['id']; // Use module ID as key
            $modulesMap[$moduleId] = $row;
        }

        $sqlTopics = "SELECT * FROM topics ORDER BY order_in_module ASC";
        $resultTopics = $conn->query($sqlTopics);
        while ($row = $resultTopics->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['module_id'] = (int)$row['module_id']; // Ensure module_id is an integer
            $row['order_in_module'] = (int)$row['order_in_module'];
            if (isset($row['active'])) $row['active'] = (bool)$row['active'];
            
            $parentModuleId = $row['module_id']; // Use module_id instead of module_slug
            if (isset($modulesMap[$parentModuleId])) {
                $modulesMap[$parentModuleId]['topics'][] = $row;
            }
        }

        $finalModulesList = array_values($modulesMap);
        echo json_encode([
            "success" => true,
            "data" => [
                "modules" => $finalModulesList,
                "lastUpdated" => date("c"),
                "total_modules" => count($finalModulesList)
            ]
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al cargar el contenido.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>