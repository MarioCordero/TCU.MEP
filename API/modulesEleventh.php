<?php
    header("Access-Control-Allow-Origin: *");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once "dbhandler.php";
    header('Content-Type: application/json; charset=utf-8');

    $sql = "SELECT * FROM modules WHERE grade_level = 'grade-11' ORDER BY id ASC";
    $result = $conn->query($sql);

    $modules = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            // Decode JSON fields
            $row['features'] = json_decode($row['features'], true);
            $row['tools'] = json_decode($row['tools'], true);
            $modules[] = $row;
        }
        echo json_encode(["success" => true, "modules" => $modules]);
    } else {
        echo json_encode(["success" => false, "message" => "Error fetching modules"]);
    }

    $conn->close();
?>