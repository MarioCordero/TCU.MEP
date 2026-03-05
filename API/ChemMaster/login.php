<?php
  require_once 'dbhandler.php';

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido. Use POST."]);
    exit;
  }

  $body = json_decode(file_get_contents('php://input'), true);

  $username = trim($body['username'] ?? '');
  $password = trim($body['password'] ?? '');

  if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Usuario y contraseña son requeridos."]);
    exit;
  }

  try {
    $sql = "SELECT id, username, password_hash, full_name, last_login, created_at FROM cms_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
      throw new Exception("Error preparando la consulta: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if (!$user || !password_verify($password, $user['password_hash'])) {
      http_response_code(401);
      echo json_encode(["success" => false, "message" => "Credenciales inválidas."]);
      exit;
    }

    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+24 hours'));

    $sessionStmt = $conn->prepare("INSERT INTO cms_sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
    $sessionStmt->bind_param("iss", $user['id'], $token, $expires);
    $sessionStmt->execute();

    // Update last_login timestamp
    $updateStmt = $conn->prepare("UPDATE cms_users SET last_login = NOW() WHERE id = ?");
    if ($updateStmt) {
      $updateStmt->bind_param("i", $user['id']);
      $updateStmt->execute();
      $updateStmt->close();
    }

    unset($user['password_hash']);

    echo json_encode([
      "success" => true,
      "message" => "Login exitoso.",
      "token"   => $token,
      "user" => [
        "id" => (int) $user['id'],
        "username" => $user['username'],
        "full_name" => $user['full_name'],
        "last_login" => $user['last_login'],
        "created_at" => $user['created_at'],
      ]
    ], JSON_UNESCAPED_UNICODE);

  } catch (Exception $e) {
    http_response_code(500);
    $errorMsg = "Error en el servidor.";
    if (isset($environment) && $environment === 'development') {
      $errorMsg .= " Detalle: " . $e->getMessage();
    }
    echo json_encode(["success" => false, "message" => $errorMsg]);
    exit;
  }