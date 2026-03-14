<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/dbhandler.php';

header('Content-Type: application/json; charset=utf-8');

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
    echo json_encode(['success' => false, 'message' => 'topic_id es requerido']);
    exit;
}

if (!in_array($type, $allowedTypes, true)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'type inválido']);
    exit;
}

if ($content === null || $content === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'content es requerido']);
    exit;
}

// content puede llegar como objeto/array o string JSON
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

// Si no mandan orden, calcular siguiente dentro del tópico
if ($order_in_topic === null) {
    $q = $conn->prepare("SELECT COALESCE(MAX(order_in_topic), 0) + 1 AS next_order FROM activities WHERE topic_id = ?");
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
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error preparando consulta']);
    exit;
}

$stmt->bind_param('isssi', $topic_id, $type, $question, $content, $order_in_topic);
$ok = $stmt->execute();

if (!$ok) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error insertando actividad']);
    $stmt->close();
    exit;
}

$newId = $stmt->insert_id;
$stmt->close();

echo json_encode([
    'success' => true,
    'message' => 'Actividad creada',
    'data' => [
        'id' => $newId,
        'topic_id' => $topic_id,
        'type' => $type,
        'question' => $question,
        'content' => $content,
        'order_in_topic' => $order_in_topic
    ]
]);