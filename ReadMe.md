# Authentication API

A simple authentication REST API built with **Node.js, Express, MongoDB, JWT, Argon2, and HttpOnly Cookies**.

## Features

- User registration and login
- Password hashing with Argon2
- JWT authentication
- JWT stored in an HttpOnly cookie
- Protected user routes
- Input validation with `express-validator`
- MongoDB integration
- Logout by clearing the authentication cookie

## Technologies

- Node.js
- Express
- MongoDB
- JSON Web Token (`jsonwebtoken`)
- Argon2
- Cookie Parser
- Express Validator
- Dotenv
- Nodemon

## Project Structure

```text
authentication-api/
├── config/
│   └── db.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── routes/
│   ├── auth-routes.js
│   └── user-routes.js
├── server.js
├── package.json
└── .env
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```env
PORT=your_port_number
MONGODB_URI=your_mongodb_url #(eg. mongodb://127.0.0.1:27017)
DB_NAME=your_database_name
JWT_SESSION_SECRET=your_secret_key
```

### 3. Start the server

Development mode:

```bash
npm run dev
```

Or:

```bash
node server.js
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check server status |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Login and create JWT cookie |
| `POST` | `/api/auth/logout` | Clear JWT cookie |
| `GET` | `/api/user/` | Get authenticated user |

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "username": "john123",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "username": "john123",
  "password": "password123"
}
```

On successful login, the server creates a JWT and stores it in the `accessToken` **HttpOnly cookie**.

### Protected Route

```http
GET /api/user/
```

The `accessToken` cookie must be present and contain a valid JWT.

### Logout

```http
POST /api/auth/logout
```

The `accessToken` cookie is cleared.

## Security Notes

- Passwords are never stored as plain text.
- JWTs are stored in an HttpOnly cookie.
- Do not commit `.env` or expose `JWT_SESSION_SECRET`.
- The current cookie configuration is intended for local HTTP development. Use HTTPS and `secure: true` in production.