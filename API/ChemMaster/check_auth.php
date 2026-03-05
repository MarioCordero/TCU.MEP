<?php
// check_auth.php
function getAuthorizedUser($conn) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        $sql = "SELECT user_id FROM cms_sessions WHERE token = ? AND expires_at > NOW()";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($session = $res->fetch_assoc()) {
            return $session['user_id'];
        }
    }
    
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "No autorizado"]);
    exit;
}