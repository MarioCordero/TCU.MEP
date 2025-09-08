<?php
    header("Access-Control-Allow-Origin: *");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once "dbhandler.php";
    header('Content-Type: application/json; charset=utf-8');

    // Fetch modules for grade 10
    $sql = "SELECT * FROM modules WHERE grade_level = '10' ORDER BY id ASC";
    $result = $conn->query($sql);

    $modules = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            // Decode JSON safely
            $row['features'] = isset($row['features']) && $row['features'] !== null
                ? json_decode($row['features'], true)
                : [];
            $row['tools'] = isset($row['tools']) && $row['tools'] !== null
                ? json_decode($row['tools'], true)
                : [];

            // Default icon fallback to avoid broken UI
            if (empty($row['icon'])) {
                $row['icon'] = 'Atom';
            }

            $modules[] = $row;
        }

        echo json_encode(["success" => true, "modules" => $modules], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => false, "message" => "Error fetching modules"]);
    }

    $conn->close();
?>