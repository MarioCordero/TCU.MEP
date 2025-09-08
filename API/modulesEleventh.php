<?php
    header("Access-Control-Allow-Origin: *");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once "dbhandler.php";
    header('Content-Type: application/json; charset=utf-8');

    // Fetch modules for grade 11
    $sql = "SELECT * FROM modules WHERE grade_level = '11' ORDER BY id ASC";
    $result = $conn->query($sql);

    $modules = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            // ✅ Decode JSON safely — fallback to empty array if null or invalid
            $row['features'] = isset($row['features']) && $row['features'] !== null
                ? json_decode($row['features'], true)
                : [];
            $row['tools'] = isset($row['tools']) && $row['tools'] !== null
                ? json_decode($row['tools'], true)
                : [];

            // ✅ Default icon fallback — avoids Lucide "string.replace" crashes
            if (empty($row['icon']) || !is_string($row['icon'])) {
                $row['icon'] = 'BookOpen'; // Safe default icon
            }

            $modules[] = $row;
        }

        echo json_encode(
            ["success" => true, "modules" => $modules],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    } else {
        echo json_encode(["success" => false, "message" => "Error fetching modules"]);
    }

    $conn->close();
?>