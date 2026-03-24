<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/dbhandler.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$grade = isset($_GET['grade']) ? (int) $_GET['grade'] : 0;

if ($grade !== 10 && $grade !== 11) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Grade must be 10 or 11']);
    exit;
}

// Get total activities per module for the given grade
$sql = "
    SELECT 
        m.id as module_id,
        m.title as module_title,
        COUNT(a.id) as activity_count
    FROM modules m
    LEFT JOIN topics t ON m.id = t.module_id
    LEFT JOIN activities a ON t.id = a.topic_id
    WHERE m.grade_level = ?
    GROUP BY m.id, m.title
    ORDER BY m.id ASC
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error preparing query']);
    exit;
}

$stmt->bind_param('i', $grade);
$stmt->execute();
$result = $stmt->get_result();

$by_module = [];
$total_activities = 0;

while ($row = $result->fetch_assoc()) {
    $activity_count = (int) $row['activity_count'];
    $by_module[(int) $row['module_id']] = $activity_count;
    $total_activities += $activity_count;
}

$stmt->close();

echo json_encode([
    'success' => true,
    'data' => [
        'grade' => $grade,
        'total_activities' => $total_activities,
        'by_module' => $by_module
    ]
]);
