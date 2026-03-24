<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/dbhandler.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$topic_id = isset($_GET['topic_id']) ? (int) $_GET['topic_id'] : 0;
$module_id = isset($_GET['module_id']) ? (int) $_GET['module_id'] : 0;

if ($module_id > 0 && $topic_id <= 0) {
    // Get all activities for a module (across all topics)
    $sql = "
        SELECT 
            a.id,
            a.topic_id,
            a.type,
            a.question,
            a.content,
            a.order_in_topic,
            a.created_at,
            a.updated_at,
            t.id as topic_id_num
        FROM activities a
        INNER JOIN topics t ON t.id = a.topic_id
        WHERE t.module_id = ?
        ORDER BY t.id ASC, a.order_in_topic ASC, a.id ASC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $module_id);
    
} else if ($topic_id > 0 && $module_id > 0) {
    // Get activities for specific topic in module (validation)
    $sql = "
        SELECT 
            a.id,
            a.topic_id,
            a.type,
            a.question,
            a.content,
            a.order_in_topic,
            a.created_at,
            a.updated_at
        FROM activities a
        INNER JOIN topics t ON t.id = a.topic_id
        WHERE a.topic_id = ? AND t.module_id = ?
        ORDER BY a.order_in_topic ASC, a.id ASC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $topic_id, $module_id);
    
} else if ($topic_id > 0) {
    // Get activities for topic only
    $sql = "
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
        WHERE topic_id = ?
        ORDER BY order_in_topic ASC, id ASC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $topic_id);
} else {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'topic_id o module_id es requerido']);
    exit;
}

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error preparando consulta']);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

$activities = [];
$total_points = 0;
$points_per_activity = 10; // Default: 10 points per activity

while ($row = $result->fetch_assoc()) {
    $activities[] = [
        'id' => (int) $row['id'],
        'topic_id' => (int) $row['topic_id'],
        'type' => $row['type'],
        'question' => $row['question'],
        'content' => $row['content'],
        'order_in_topic' => (int) $row['order_in_topic'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at'],
        'points' => $points_per_activity
    ];
    $total_points += $points_per_activity;
}

$stmt->close();

echo json_encode([
    'success' => true,
    'data' => $activities,
    'total_points' => $total_points,
    'activity_count' => count($activities)
]);