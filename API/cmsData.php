<?php
    header("Access-Control-Allow-Origin: *");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once "dbhandler.php";
    header('Content-Type: application/json; charset=utf-8');

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
            $topic['content'] = json_decode($topic['content'], true);
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