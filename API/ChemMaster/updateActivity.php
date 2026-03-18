<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/dbhandler.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Get JSON body
$input = json_decode(file_get_contents('php://input'), true);

$activity_id = isset($input['activity_id']) ? (int) $input['activity_id'] : 0;
$type = isset($input['type']) ? trim($input['type']) : '';
$question = isset($input['question']) ? trim($input['question']) : '';
$content = isset($input['content']) ? $input['content'] : '';
$order_in_topic = isset($input['order_in_topic']) ? (int) $input['order_in_topic'] : 0;

// Validation
if (!$activity_id) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'activity_id es requerido']);
    exit;
}

if (!$type || !in_array($type, ['quiz', 'match', 'drag_drop', 'fill_blank', 'word_soup'])) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'tipo de actividad inválido']);
    exit;
}

if (!$question) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'question es requerido']);
    exit;
}

// Convert content to JSON string if it's an array/object
if (is_array($content) || is_object($content)) {
    $content = json_encode($content, JSON_UNESCAPED_UNICODE);
} else if (!is_string($content)) {
    $content = (string) $content;
}

// Verify content is valid JSON
if (!json_decode($content)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'content debe ser un JSON válido']);
    exit;
}

// Verify activity exists
$verify_sql = "SELECT id FROM activities WHERE id = ?";
$verify_stmt = $conn->prepare($verify_sql);
$verify_stmt->bind_param('i', $activity_id);
$verify_stmt->execute();
$verify_result = $verify_stmt->get_result();

if ($verify_result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Actividad no encontrada']);
    exit;
}
$verify_stmt->close();

// Update the activity
$update_sql = "
    UPDATE activities 
    SET 
        type = ?,
        question = ?,
        content = ?,
        order_in_topic = ?,
        updated_at = NOW()
    WHERE id = ?
";

$update_stmt = $conn->prepare($update_sql);

if (!$update_stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error preparando consulta']);
    exit;
}

$update_stmt->bind_param('sssii', $type, $question, $content, $order_in_topic, $activity_id);

if ($update_stmt->execute()) {
    // Fetch updated activity
    $fetch_sql = "
        SELECT 
            id,
            topic_id,
            type,
            question,
            content,
            order_in_topic,
            created_at,
            updated_at
        FROM activities 
        WHERE id = ?
    ";
    
    $fetch_stmt = $conn->prepare($fetch_sql);
    $fetch_stmt->bind_param('i', $activity_id);
    $fetch_stmt->execute();
    $fetch_result = $fetch_stmt->get_result();
    $updated_activity = $fetch_result->fetch_assoc();
    $fetch_stmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Actividad actualizada correctamente',
        'data' => [
            'id' => (int) $updated_activity['id'],
            'topic_id' => (int) $updated_activity['topic_id'],
            'type' => $updated_activity['type'],
            'question' => $updated_activity['question'],
            'content' => json_decode($updated_activity['content']),
            'order_in_topic' => (int) $updated_activity['order_in_topic'],
            'created_at' => $updated_activity['created_at'],
            'updated_at' => $updated_activity['updated_at']
        ]
    ]);
    $update_stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al actualizar la actividad']);
    $update_stmt->close();
}