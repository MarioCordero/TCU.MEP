<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/dbhandler.php';

header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }

    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'JSON inválido']);
        exit;
    }

    $activity_id = isset($data['activity_id']) ? (int)$data['activity_id'] : 0;

    if ($activity_id <= 0) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'activity_id es requerido']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM activities WHERE id = ?");
    if (!$stmt) {
        throw new Exception("Error preparando consulta: " . $conn->error);
    }

    $stmt->bind_param('i', $activity_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Error ejecutando consulta: " . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Actividad no encontrada']);
        $stmt->close();
        exit;
    }

    $stmt->close();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Actividad eliminada exitosamente'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ]);
    error_log("Error en deleteActivity.php: " . $e->getMessage());
}

exit;
?>