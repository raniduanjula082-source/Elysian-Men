# Authentication & Security Documentation

## Overview

The Elysian Men backend implements JWT (JSON Web Token) based authentication for secure user management.

## Architecture

### Components

1. **Security Layer**
   - `SecurityConfig.java` - Spring Security configuration
   - `JwtUtil.java` - JWT token generation and validation
   - `JwtAuthenticationFilter.java` - Request filter for JWT validation
   - `CustomUserDetailsService.java` - User loading for authentication

2. **Service Layer** (Interface + Implementation)
   - `IAuthService.java` - Authentication service interface
   - `AuthServiceImpl.java` - Authentication logic implementation
   - `IProductService.java` - Product service interface  
   - `ProductServiceImpl.java` - Product logic implementation

3. **DTOs**
   - **Request**: `LoginRequest`, `RegisterRequest`
   - **Response**: `AuthResponse`, `UserResponse`, `ApiResponse<T>`

4. **Models**
   - `User.java` - User entity with roles and profile info
   - `Product.java` - Product entity

## Authentication Flow

### Registration
```
Client → POST /api/auth/register → AuthController
  ↓
AuthServiceImpl
  ↓
1. Validate email doesn't exist
2. Hash password with BCrypt
3. Create user with ROLE_USER
4. Generate JWT token
5. Return token + user info
```

### Login
```
Client → POST /api/auth/login → AuthController
  ↓
AuthServiceImpl
  ↓
1. Authenticate with Spring Security
2. Load user details
3. Generate JWT token
4. Return token + user info
```

### Protected Request
```
Client → GET /api/auth/me (with JWT in header)
  ↓
JwtAuthenticationFilter
  ↓
1. Extract JWT from "Authorization: Bearer {token}"
2. Validate token
3. Load user details
4. Set authentication in SecurityContext
  ↓
AuthController → Return user info
```

## API Endpoints

### Public Endpoints (No Auth Required)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/health` - Health check
- `GET /api/products` - Browse products
- `GET /api/products/{id}` - View product details

### Protected Endpoints (JWT Required)
- `GET /api/auth/me` - Get current user info
- (Future) `POST /api/orders` - Create order
- (Future) `GET /api/orders` - Get user's orders

## Request/Response Examples

### 1. Register New User

**Request:**
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+94771234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "type": "Bearer",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "timestamp": "2024-01-09T20:30:00"
}
```

### 2. Login

**Request:**
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "type": "Bearer",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "timestamp": "2024-01-09T20:31:00"
}
```

### 3. Get Current User (Protected)

**Request:**
```bash
GET http://localhost:8080/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+94771234567",
    "roles": ["USER"],
    "createdAt": "2024-01-09T20:30:00",
    "isActive": true,
    "emailVerified": false
  },
  "timestamp": "2024-01-09T20:32:00"
}
```

## Frontend Integration

### 1. Register User
```typescript
const register = async (userData) => {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  if (result.success) {
    // Store token in localStorage
    localStorage.setItem('token', result.data.token);
    return result.data;
  }
  throw new Error(result.message);
};
```

### 2. Login User
```typescript
const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const result = await response.json();
  if (result.success) {
    localStorage.setItem('token', result.data.token);
    return result.data;
  }
  throw new Error(result.message);
};
```

### 3. Make Authenticated Request
```typescript
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:8080/api/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};
```

## Security Configuration

### JWT Settings (application.properties)
```properties
jwt.secret=elysianmen-secret-key-2024-change-this-in-production-very-long-secret
jwt.expiration=86400000  # 24 hours in milliseconds
```

### Password Encryption
- Algorithm: **BCrypt**
- Work Factor: **10** (default)
- Automatically salted

### CORS
- Allowed Origin: `http://localhost:3000`
- Allowed Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Credentials: Enabled

## User Roles

Currently implemented roles:
- `USER` - Default role for registered users

Future roles:
- `ADMIN` - For admin panel access
- `VENDOR` - For product management

## Error Handling

### Registration Errors
- Email already exists: `400 Bad Request`
- Validation errors: `400 Bad Request`

### Login Errors
- Invalid credentials: `401 Unauthorized`
- Account disabled: `401 Unauthorized`

### Protected Endpoint Errors
- No token provided: `403 Forbidden`
- Invalid token: `403 Forbidden`
- Expired token: `401 Unauthorized`

## Best Practices

1. **Token Storage**
   - Frontend: Store in `localStorage` or `httpOnly` cookies
   - Never expose tokens in URLs or logs

2. **Token Expiration**
   - Default: 24 hours
   - Implement refresh token for better UX

3. **Password Requirements**
   - Minimum 6 characters (configurable)
   - Add complexity requirements in production

4. **HTTPS**
   - Always use HTTPS in production
   - Never send JWTs over HTTP

5. **Secret Key**
   - Change `jwt.secret` in production
   - Use environment variable
   - Minimum 256 bits (32 characters)

## Testing Authentication

See `API_TESTING.md` for curl examples and Postman collection.

## Future Enhancements

1. **Email Verification**
   - Send verification email on registration
   - Email verification endpoint

2. **Password Reset**
   - Forgot password flow
   - Reset token generation

3. **Refresh Tokens**
   - Long-lived refresh tokens
   - Token rotation strategy

4. **OAuth2 Integration**
   - Google Sign-In
   - Facebook Login

5. **Role-Based Access Control**
   - Method-level security with `@PreAuthorize`
   - Admin-only endpoints

6. **Rate Limiting**
   - Prevent brute force attacks
   - API rate limiting per user
