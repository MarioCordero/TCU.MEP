<?php
// Load config
$configFile = __DIR__ . "/config/development.ini";
$config = parse_ini_file($configFile, true);

echo "Config loaded:\n";
print_r($config);

// Test connection with the CORRECT config keys
$host = $config['database']['host'];
$username = $config['database']['username'];
$password = $config['database']['password'];
$database = $config['database']['database'];

echo "\nTrying to connect with:\n";
echo "Host: $host\n";
echo "Username: $username\n";
echo "Database: $database\n";
echo "Password: " . (empty($password) ? "EMPTY" : "SET") . "\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Database connection successful!\n";
    
    // Test simple queries with proper syntax
    $stmt1 = $pdo->query("SELECT DATABASE() as current_db");
    $result1 = $stmt1->fetch(PDO::FETCH_ASSOC);
    
    $stmt2 = $pdo->query("SELECT CURRENT_USER() as current_user");  // Fixed: CURRENT_USER() instead of USER()
    $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
    
    echo "Connected to database: " . $result1['current_db'] . "\n";
    echo "Connected as user: " . $result2['current_user'] . "\n";
    
    // Test if there are any tables
    $stmt3 = $pdo->query("SHOW TABLES");
    $tables = $stmt3->fetchAll(PDO::FETCH_COLUMN);
    
    if (empty($tables)) {
        echo "\n📋 Database is empty (no tables found)\n";
        echo "You may need to create tables for your CMS data.\n";
    } else {
        echo "\n📋 Tables in database: " . implode(", ", $tables) . "\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Database query failed: " . $e->getMessage() . "\n";
}
?>