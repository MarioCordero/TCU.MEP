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

if (!$activity_id) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'activity_id es requerido']);
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

// Delete the activity
$delete_sql = "DELETE FROM activities WHERE id = ?";
$delete_stmt = $conn->prepare($delete_sql);

if (!$delete_stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error preparando consulta']);
    exit;
}

$delete_stmt->bind_param('i', $activity_id);

if ($delete_stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Actividad eliminada correctamente',
        'activity_id' => $activity_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al eliminar la actividad']);
}
$delete_stmt->close();