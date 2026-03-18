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
    $type = isset($data['type']) ? trim((string)$data['type']) : '';
    $question = isset($data['question']) ? trim((string)$data['question']) : '';
    $content = $data['content'] ?? null;
    $order_in_topic = isset($data['order_in_topic']) ? (int)$data['order_in_topic'] : null;

    $allowedTypes = ['quiz', 'match', 'word_soup', 'fill_blank', 'drag_drop'];

    if ($activity_id <= 0) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'activity_id es requerido']);
        exit;
    }

    if (!in_array($type, $allowedTypes, true)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'type inválido']);
        exit;
    }

    if (empty($question)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'question es requerido']);
        exit;
    }

    if ($content === null || $content === '') {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'content es requerido']);
        exit;
    }

    // Serialize content if needed
    if (is_array($content) || is_object($content)) {
        $content = json_encode($content, JSON_UNESCAPED_UNICODE);
    } else {
        $content = (string)$content;
        json_decode($content);
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'content debe ser JSON válido']);
            exit;
        }
    }

    // Build UPDATE query
    $updates = ['type = ?', 'question = ?', 'content = ?'];
    $params = [$type, $question, $content];
    $types = 'sss';

    if ($order_in_topic !== null) {
        $updates[] = 'order_in_topic = ?';
        $params[] = $order_in_topic;
        $types .= 'i';
    }

    $params[] = $activity_id;
    $types .= 'i';

    $sql = "UPDATE activities SET " . implode(', ', $updates) . " WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error preparando consulta: " . $conn->error);
    }

    $stmt->bind_param($types, ...$params);
    
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
        'message' => 'Actividad actualizada exitosamente'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ]);
    error_log("Error en updateActivity.php: " . $e->getMessage());
}

exit;
?>