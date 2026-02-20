<?php
    header('Access-Control-Allow-Origin: *'); // Or specify your domain: 'http://localhost:5173'
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
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