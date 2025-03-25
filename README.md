# User Management API

## Description
This project is a **Node.js** API for user management, built with **Express.js** and **TypeScript**. User data is stored in a `data.json` file, and passwords are hashed using **bcrypt**.

## Installation and Setup

### 1. Clone the Repository
```sh
git clone <https://github.com/AvetisyanJen/crud-api-express-ts.git>
cd <PROJECT_NAME>
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Server
Run in development mode with **nodemon**:
```sh
npm run dev
```

Run normally:
```sh
npm start
```

The server will run at `http://localhost:3000`

## API Endpoints

### 1. Create a User
```http
POST /api/users
```
#### Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
#### Response:
```json
{
  "id": 1742913497300,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$hashedpassword",
  "createdAt": "2025-03-25T14:38:17.300Z"
}
```

### 2. Get All Users
```http
GET /api/users
```
#### Response:
```json
[
  {
    "id": 1742913497300,
    "name": "Artur",
    "email": "art@example.com",
    "createdAt": "2025-03-25T14:38:17.300Z"
  },
  {
    "id": 1742913519658,
    "name": "Armen",
    "email": "arm@example.com",
    "createdAt": "2025-03-25T14:38:39.658Z"
  }
]
```

### 3. Get a User by ID
```http
GET /api/users/:id
```
#### Response:
```json
{
  "id": 1742913497300,
  "name": "Artur",
  "email": "art@example.com",
  "createdAt": "2025-03-25T14:38:17.300Z"
}
```

### 4. Update a User (Partial)
```http
PATCH /api/users/:id
```
#### Request:
```json
{
  "name": "John Updated"
}
```
#### Response:
```json
{
  "id": 1742913497300,
  "name": "John Updated",
  "email": "john@example.com",
  "createdAt": "2025-03-25T14:38:17.300Z",
  "updatedAt": "2025-03-25T15:00:00.000Z"
}
```

### 5. Replace a User (Full Update)
```http
PUT /api/users/:id
```
#### Request:
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

### 6. Delete a User
```http
DELETE /api/users/:id
```
#### Response:
```json
{
  "message": "User deleted successfully"
}
```

## Testing with Postman
1. **Start the server** (`nodemon`). 
2. **Open Postman**.
3. **Create a new request** and select the appropriate HTTP method (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`).
4. Enter the request URL, e.g., `http://localhost:3000/api/users`.
5. If needed, add **request body** (for `POST`, `PATCH`, `PUT`).
6. Click **Send** to receive a response from the server.

## Project Structure
```
/project-root
│── src
│   ├── controllers
│   │   ├── userController.ts
│   ├── models
│   │   ├── user.ts
│   ├── routes
│   │   ├── userRoutes.ts
│   ├── services
│   │   ├── fileService.ts
│── data.json
│── server.ts
│── package.json
│── tsconfig.json
│── README.md
```

## Dependencies
- **express** – web framework for building the server
- **bcrypt** – for password hashing
- **body-parser** – parses JSON request bodies
- **nodemon** – automatically restarts the server on changes (for development)
