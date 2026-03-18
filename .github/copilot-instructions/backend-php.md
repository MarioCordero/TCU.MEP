---
name: PHP Backend Rules
applyTo: "API/ChemMaster/**/*.php"
---
# PHP Backend Guidelines

## 🔒 Security & Imports
- **Every endpoint MUST start with:**
  ```php
  <?php
  require_once 'dbhandler.php';
  require_once 'cors.php';
  ```
- **Database:** Use Prepared Statements for ALL queries. **NEVER** concatenate SQL strings.
- **Config:** Never hardcode credentials. Load from `Config/development.ini` (handled by dbhandler.php).
- **Credentials:** Always use `password_hash()` and `password_verify()` for authentication.

## 📝 Input Validation Pattern
```php
// 1. Validate HTTP Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// 2. Parse & Validate Input
$input = json_decode(file_get_contents("php://input"), true);
$field = trim($input['field'] ?? '');

if (empty($field)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Field 'field' is required"]);
    exit;
}
```

## 🔑 Authentication (Bearer Token)
- Protected endpoints MUST validate tokens using `check_auth.php`:
  ```php
  require_once 'check_auth.php';
  $user_id = getAuthorizedUser($conn);  // Exits with 401 if invalid
  ```
- Token format: `Authorization: Bearer <token>` (32-byte hex string from `random_bytes(32)`)
- Session duration: 24 hours (`expires_at > NOW()`)

## 📤 File Upload Rules (upload.php pattern)
- **Allowed extensions:** jpg, jpeg, png, gif, webp, svg, pdf, mp4, webm, mp3, wav, ogg, docx, doc, xlsx, xls, pptx, ppt, txt, zip, rar
- **Max file size:** 50MB
- **File naming:** Use `uniqid("prefix_", true) . "." . $ext` (prevents collisions & path traversal)
- **Directory:** `__DIR__ . '/uploads/'` (create if missing with `mkdir($dir, 0755, true)`)
- **Public URL:** Construct from `$_SERVER['HTTPS']`, `$_SERVER['HTTP_HOST']`, and current path

## 📊 Response Format (Strict JSON)
**ALL responses must follow this structure:**
```php
echo json_encode([
    "success" => true|false,           // bool: Operation status
    "message" => "Human-readable text", // string: Always include
    "data"    => null|array|object     // mixed: Only if success=true or needed for errors
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
```

## 🔢 HTTP Status Codes
| Code | Scenario | Example |
|------|----------|---------|
| 200 | Success (implicit, default) | Data retrieval successful |
| 400 | Bad request | Missing fields, invalid input |
| 401 | Unauthorized | Invalid/expired token |
| 405 | Method not allowed | POST required but GET sent |
| 409 | Conflict | Duplicate slug/unique field |
| 500 | Server error | Database connection, exceptions |

## 💾 Database Type Casting
Always cast database results to correct types:
```php
$row['id']     = (int)$row['id'];
$row['active'] = (bool)$row['active'];  // 1 -> true, 0 -> false
$row['score']  = (float)$row['score'];
$row['json_field'] = !empty($row['json_field']) 
    ? json_decode($row['json_field'], true) 
    : [];
```

## ⚠️ Error Handling Pattern
```php
try {
    // Validate input first
    // Prepare statements
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Query prep error: " . $conn->error);
    
    // Bind, execute, fetch
    $stmt->execute();
    // ... process results
    $stmt->close();
    
    // Return success response
    echo json_encode(["success" => true, "message" => "Operation successful", "data" => $data]);

} catch (Exception $e) {
    http_response_code(500);
    $msg = "Operation failed.";
    // Only expose details in development
    if (isset($environment) && $environment === 'development') {
        $msg .= " Details: " . $e->getMessage();
    }
    echo json_encode(["success" => false, "message" => $msg]);
}
```

## 🏗️ Architecture
- **Stateless:** Each endpoint operates independently; no session variables.
- **Modular:** Reuse helpers like `getAuthorizedUser()`, `is_slug_unique()`, etc.
- **Single Responsibility:** One action per file (getModules, addModule, updateModule, deleteModule)