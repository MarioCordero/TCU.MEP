# ChemMaster API Documentation

A RESTful API for managing chemistry education modules, topics, and learning content.

---

## Base URL

```
http://localhost/path/to/API/ChemMaster/
```

---

## Endpoints Overview

### Modules

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getModules.php` | Get all modules for a specific grade level |
| POST | `/addModule.php` | Create a new module |
| POST/PUT | `/updateModule.php` | Update an existing module |
| POST | `/deleteModule.php` | Delete a module |

### Topics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getTopic.php` | Get all topics for a specific module |
| POST | `/addTopic.php` | Create a new topic |
| POST/PUT | `/updateTopic.php` | Update an existing topic |
| POST | `/deleteTopic.php` | Delete a topic |

### Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getAllContent.php` | Get all modules with their topics in a nested structure |
| POST | `/upload.php` | Upload files (images, videos, documents, etc.) |
| POST | `/deleteFile.php` | Delete uploaded files |

---

## Detailed Endpoint Documentation

### 1. Get Modules by Grade

**GET** `/getModules.php`

Retrieves all modules for a specific grade level.

**Query Parameters:**
- `grade` (required): Grade level (e.g., "10", "11", "12")

**Example Request:**
```
GET /getModules.php?grade=10
```

**Example Response:**
```json
{
  "success": true,
  "modules": [
    {
      "id": 1,
      "slug": "atomic-structure",
      "title": "Atomic Structure",
      "grade_level": "10",
      "description": "Introduction to atomic structure",
      "icon": "Atom",
      "color": "from-blue-500 to-blue-600",
      "active": true,
      "features": [],
      "tools": []
    }
  ]
}
```

---

### 2. Create Module

**POST** `/addModule.php`

Creates a new module.

**Required Fields:**
- `slug` (string): Unique identifier for the module
- `title` (string): Module title
- `grade_level` (string): Grade level

**Optional Fields:**
- `description` (string): Module description
- `icon` (string): Icon name (default: "Book")
- `color` (string): Gradient color class (default: "from-blue-500 to-blue-600")
- `active` (boolean): Active status (default: 1)

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/addModule.php \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "electrochemistry",
    "title": "Electrochemistry",
    "grade_level": "12",
    "description": "Study of electron transfer reactions",
    "icon": "Zap",
    "color": "from-yellow-500 to-orange-600",
    "active": 1
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Módulo creado exitosamente",
  "module_id": 5
}
```

---

### 3. Update Module

**POST/PUT** `/updateModule.php`

Updates an existing module.

**Required Fields:**
- `id` (integer): Module ID

**Optional Fields:**
- `slug` (string)
- `title` (string)
- `grade_level` (string)
- `description` (string)
- `icon` (string)
- `color` (string)
- `active` (boolean)

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/updateModule.php \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Advanced Atomic Structure",
    "description": "Updated description"
  }'
```

---

### 4. Delete Module

**POST** `/deleteModule.php`

Deletes a module and all associated topics.

**Required Fields:**
- `id` (integer): Module ID

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/deleteModule.php \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

### 5. Get Topics for Module

**GET** `/getTopic.php`

Retrieves all topics for a specific module.

**Query Parameters:**
- `module_id` (required): Module ID

**Example Request:**
```
GET /getTopic.php?module_id=1
```

**Example Response:**
```json
{
  "success": true,
  "topics": [
    {
      "id": 1,
      "module_id": 1,
      "title": "Subatomic Particles",
      "description": "Understanding protons, neutrons, and electrons",
      "content": "<p>Rich HTML content here</p>",
      "order_in_module": 0,
      "active": true
    }
  ]
}
```

---

### 6. Create Topic

**POST** `/addTopic.php`

Creates a new topic within a module.

**Required Fields:**
- `module_id` (integer): Parent module ID
- `title` (string): Topic title

**Optional Fields:**
- `description` (string): Topic description
- `content` (string/object): Rich HTML content or JSON object
- `order_in_module` (integer): Order position (default: 0)

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/addTopic.php \
  -H "Content-Type: application/json" \
  -d '{
    "module_id": 1,
    "title": "Electron Configuration",
    "description": "How electrons are arranged in atoms",
    "content": "<p>Detailed content about electron configuration</p>",
    "order_in_module": 1
  }'
```

---

### 7. Update Topic

**POST/PUT** `/updateTopic.php`

Updates an existing topic.

**Required Fields:**
- `id` (integer): Topic ID

**Optional Fields:**
- `title` (string)
- `description` (string)
- `content` (string/object)
- `order_in_module` (integer)
- `active` (boolean)

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/updateTopic.php \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Topic Title",
    "content": "<p>Updated content</p>"
  }'
```

---

### 8. Delete Topic

**POST** `/deleteTopic.php`

Deletes a topic.

**Required Fields:**
- `id` (integer): Topic ID

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/deleteTopic.php \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

### 9. Get All Content

**GET** `/getAllContent.php`

Retrieves all modules with their topics in a nested structure.

**Example Request:**
```
GET /getAllContent.php
```

**Example Response:**
```json
{
  "success": true,
  "modules": [
    {
      "id": 1,
      "slug": "atomic-structure",
      "title": "Atomic Structure",
      "grade_level": "10",
      "description": "Introduction to atomic structure",
      "icon": "Atom",
      "color": "from-blue-500 to-blue-600",
      "active": true,
      "features": [],
      "tools": [],
      "topics": [
        {
          "id": 1,
          "module_id": 1,
          "title": "Subatomic Particles",
          "description": "Understanding particles",
          "content": "...",
          "order_in_module": 0,
          "active": true
        }
      ]
    }
  ]
}
```

---

### 10. Upload File

**POST** `/upload.php`

Uploads a file to the server.

**Form Data:**
- `file` (file, required): The file to upload

**Allowed Formats:**
- Images: jpg, jpeg, png, gif, webp, svg
- Videos: mp4, webm
- Audio: mp3, wav, ogg
- Documents: pdf, docx, doc, xlsx, xls, pptx, ppt, txt, zip, rar

**Max File Size:** 50MB

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/upload.php \
  -F "file=@/path/to/image.png"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Archivo subido exitosamente",
  "filename": "image_1708345123.png",
  "path": "uploads/image_1708345123.png"
}
```

---

### 11. Delete File

**POST** `/deleteFile.php`

Deletes an uploaded file.

**Required Fields:**
- `filename` (string): Name of the file to delete (from uploads folder)

**Example Request:**
```bash
curl -X POST http://localhost/API/ChemMaster/deleteFile.php \
  -H "Content-Type: application/json" \
  -d '{"filename": "image_1708345123.png"}'
```

---

## Error Handling

All endpoints return JSON responses with a `success` field:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Description of the error"
}
```

### Common HTTP Status Codes

- `200 OK`: Successful request
- `400 Bad Request`: Missing or invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Database or server error

---

## CORS

CORS headers are configured in `cors.php` to allow cross-origin requests.

---

## Database Connection

Database configuration is managed in `dbhandler.php`. Ensure it's configured with correct credentials before using the API.

---

## Testing

Use the included `testConnection.php` file to verify database connectivity.

```bash
curl http://localhost/API/ChemMaster/testConnection.php
```
