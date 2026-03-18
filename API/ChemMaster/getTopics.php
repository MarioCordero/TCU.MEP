<?php
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

try {
    require_once __DIR__ . '/cors.php';
    require_once __DIR__ . '/dbhandler.php';

    $module_id = isset($_GET['module_id']) ? (int)$_GET['module_id'] : 0;

    if ($module_id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'module_id es requerido']);
        exit;
    }

    $checkStmt = $conn->prepare("SELECT id FROM modules WHERE id = ?");
    $checkStmt->bind_param('i', $module_id);
    $checkStmt->execute();
    if ($checkStmt->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Módulo no encontrado']);
        $checkStmt->close();
        exit;
    }
    $checkStmt->close();

    $sql = "SELECT id, module_id, title, description, content, order_in_module
            FROM topics
            WHERE module_id = ?
            ORDER BY order_in_module ASC";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error preparando consulta: " . $conn->error);
    }

    $stmt->bind_param('i', $module_id);
    if (!$stmt->execute()) {
        throw new Exception("Error ejecutando consulta: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $topics = [];

    while ($row = $result->fetch_assoc()) {
        $topics[] = $row;
    }

    $stmt->close();

    http_response_code(200);
    echo json_encode($topics);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    error_log("Error en getTopics.php: " . $e->getMessage());
}

exit;
?>