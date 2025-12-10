<?php
    require_once 'dbhandler.php';
    $grade = $_GET['grade'] ?? null;
    if (!$grade) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el parámetro 'grade' (ej: ?grade=10)"]);
        exit;
    }
    try {
        $sql = "SELECT * FROM modules WHERE grade_level = ? ORDER BY id ASC";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $conn->error);
        }
        $stmt->bind_param("s", $grade); // "s" string
        if (!$stmt->execute()) {
            throw new Exception("Error ejecutando la consulta");
        }
        $result = $stmt->get_result();
        $modules = [];
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['active'] = (bool)$row['active']; // 1 -> true, 0 -> false
            $row['features'] = !empty($row['features']) ? json_decode($row['features'], true) : [];
            $row['tools']    = !empty($row['tools'])    ? json_decode($row['tools'], true)    : [];
            if (empty($row['icon'])) {
                $row['icon'] = ($grade === '10') ? 'Atom' : 'BookOpen';
            }
            $modules[] = $row;
        }
        $stmt->close();
        echo json_encode(
            ["success" => true, "modules" => $modules], 
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    } catch (Exception $e) {
        http_response_code(500);
        $errorMsg = "Error al obtener módulos.";
        if (isset($environment) && $environment === 'development') {
            $errorMsg .= " Detalle: " . $e->getMessage();
        }
        echo json_encode(["success" => false, "message" => $errorMsg]);
    }
?>