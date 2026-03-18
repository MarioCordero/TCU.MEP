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

    $topic_id = isset($data['topic_id']) ? (int)$data['topic_id'] : 0;
    $type = isset($data['type']) ? trim((string)$data['type']) : '';
    $question = isset($data['question']) ? trim((string)$data['question']) : null;
    $content = $data['content'] ?? null;
    $order_in_topic = isset($data['order_in_topic']) ? (int)$data['order_in_topic'] : null;

    $allowedTypes = ['quiz', 'match', 'word_soup', 'fill_blank', 'drag_drop'];

    if ($topic_id <= 0) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'topic_id es requerido y debe ser > 0']);
        exit;
    }

    if (!in_array($type, $allowedTypes, true)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'type inválido. Permitidos: ' . implode(', ', $allowedTypes)]);
        exit;
    }

    if ($content === null || $content === '') {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'content es requerido']);
        exit;
    }

    if (is_array($content) || is_object($content)) {
        $content = json_encode($content, JSON_UNESCAPED_UNICODE);
    } else {
        $content = (string)$content;
        // Validate JSON
        json_decode($content);
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'content debe ser JSON válido: ' . json_last_error_msg()]);
            exit;
        }
    }

    if ($order_in_topic === null) {
        $q = $conn->prepare("SELECT COALESCE(MAX(order_in_topic), 0) + 1 AS next_order FROM activities WHERE topic_id = ?");
        if (!$q) {
            throw new Exception("Error preparando consulta: " . $conn->error);
        }
        $q->bind_param('i', $topic_id);
        $q->execute();
        $res = $q->get_result();
        $row = $res->fetch_assoc();
        $order_in_topic = (int)($row['next_order'] ?? 1);
        $q->close();
    }

    $sql = "INSERT INTO activities (topic_id, type, question, content, order_in_topic) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Error preparando consulta INSERT: " . $conn->error);
    }

    $stmt->bind_param('isssi', $topic_id, $type, $question, $content, $order_in_topic);
    
    if (!$stmt->execute()) {
        throw new Exception("Error ejecutando consulta: " . $stmt->error);
    }

    $newId = $stmt->insert_id;
    $stmt->close();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Actividad creada exitosamente',
        'data' => [
            'id' => $newId,
            'topic_id' => $topic_id,
            'type' => $type,
            'question' => $question,
            'content' => $content,
            'order_in_topic' => $order_in_topic,
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ]);
    error_log("Error en addActivity.php: " . $e->getMessage());
}

exit;
?>