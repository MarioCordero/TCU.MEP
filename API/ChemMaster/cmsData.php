<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    require_once "dbhandler.php";

    // Fetch modules
    $modulesResult = $conn->query("SELECT * FROM modules ORDER BY id ASC"); 
    $modules = [];
    while ($module = $modulesResult->fetch_assoc()) {
        $module_id = $module['module_id'];
        
        // DEBUG: Log the active field from database
        error_log("Module {$module['title']}: active field = " . var_export($module['active'], true) . " (type: " . gettype($module['active']) . ")");
        
        $topicsResult = $conn->query("SELECT * FROM topics WHERE module_id = '$module_id' ORDER BY order_in_module ASC");
        $topics = [];
        while ($topic = $topicsResult->fetch_assoc()) {
            $topics[] = $topic;
        }
        $module['topics'] = $topics;
        
        // Ensure active is properly typed
        $module['active'] = (int) $module['active'];
        
        $modules[] = $module;
    }
    echo json_encode([
        "success" => true,
        "cmsData" => [
            "modules" => $modules,
            "lastUpdated" => date("c"),
        ]
    ]);
    $conn->close();
?>