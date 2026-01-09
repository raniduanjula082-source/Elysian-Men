# Backend Structure - Complete Overview

## 📁 Project Structure

```
backend/
├── src/main/java/com/elysianmen/backend/
│   ├── config/                                 # Configuration classes
│   │   ├── CorsConfig.java                    # CORS configuration
│   │   ├── SecurityConfig.java                # Spring Security + JWT
│   │   └── DataInitializer.java               # Database seeding
│   │
│   ├── controller/                            # REST Controllers
│   │   ├── AuthController.java                # Authentication API
│   │   ├── ProductController.java             # Product API
│   │   └── HealthController.java              # Health check
│   │
│   ├── dto/                                   # Data Transfer Objects
│   │   ├── request/                           # Request DTOs
│   │   │   ├── LoginRequest.java              # Login payload
│   │   │   └── RegisterRequest.java           # Registration payload
│   │   └── response/                          # Response DTOs
│   │       ├── ApiResponse.java               # Generic wrapper
│   │       ├── AuthResponse.java              # Auth response
│   │       └── UserResponse.java              # User data response
│   │
│   ├── model/                                 # MongoDB Entities
│   │   ├── User.java                          # User entity
│   │   └── Product.java                       # Product entity
│   │
│   ├── repository/                            # MongoDB Repositories
│   │   ├── UserRepository.java                # User data access
│   │   └── ProductRepository.java             # Product data access
│   │
│   ├── security/                              # Security components
│   │   ├── JwtUtil.java                       # JWT generation/validation
│   │   ├── JwtAuthenticationFilter.java       # JWT filter
│   │   └── CustomUserDetailsService.java      # User loading
│   │
│   ├── service/                               # Service interfaces
│   │   ├── IAuthService.java                  # Auth service contract
│   │   ├── IProductService.java               # Product service contract
│   │   └── impl/                              # Service implementations
│   │        ├── AuthServiceImpl.java          # Auth logic
│   │       └── ProductServiceImpl.java        # Product logic
│   │
│   └── ElysianMenBackendApplication.java      # Main Spring Boot app
│
├── src/main/resources/
│   └── application.properties                  # Configuration
│
├── pom.xml                                     # Maven dependencies
├── README.md                                   # Setup guide
├── AUTHENTICATION.md                           # Auth documentation
├── API_TESTING.md                             # API examples
├── .gitignore                                 # Git ignore rules
└── start.bat                                  # Quick start script
```

## 🎯 Key Features Implemented

### 1. **JWT Authentication**
- ✅ User registration with BCrypt password hashing
- ✅ Login with JWT token generation
- ✅ Protected routes with JWT validation
- ✅ Custom UserDetailsService
- ✅ JWT authentication filter

### 2. **Service Layer Pattern**
- ✅ Interface-based services (`IAuthService`, `IProductService`)
- ✅ Implementation separation (`impl/` package)
- ✅ Dependency injection via interfaces
- ✅ Clean architecture principles

### 3. **DTO Pattern**
- ✅ Request DTOs with validation (`@Valid`, `@NotBlank`, `@Email`)
- ✅ Response DTOs without sensitive data
- ✅ Generic API response wrapper
- ✅ Separation of concerns

### 4. **Security**
- ✅ Spring Security integration
- ✅ BCrypt password encryption
- ✅ JWT secret key configuration
- ✅ CORS enabled for frontend
- ✅ Stateless session management
- ✅ Public and protected route definitions

### 5. **MongoDB Integration**
- ✅ User collection with unique email index
- ✅ Product collection with auto-initialization
- ✅ Custom query methods
- ✅ Spring Data MongoDB

## 📦 Dependencies Added

```xml
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT (JJWT) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

## 🔐 Authentication Endpoints

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+94771234567"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer {jwt_token}
```

## 📋 Product Endpoints (Public)

```http
GET /api/products                    # Get all products
GET /api/products?category=Shoes     # Filter by category
GET /api/products?minPrice=10000     # Filter by price
GET /api/products/{id}               # Get single product
POST /api/products                   # Create product (future: admin only)
GET /api/products/count              # Get product count
```

## 🗂️ Database Collections

### Users Collection
```javascript
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0",
  "email": "user@example.com",
  "password": "$2a$10$...",  // BCrypt hash
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+94771234567",
  "roles": ["USER"],
  "createdAt": "2024-01-09T20:30:00",
  "updatedAt": "2024-01-09T20:30:00",
  "isActive": true,
  "emailVerified": false
}
```

### Products Collection
```javascript
{
  "_id": "sh1",
  "name": "Heritage Oxford Walnut",
  "price": 38500.0,
  "category": "Shoes",
  "description": "Classic wingtip oxford...",
  "image": "https://...",
  "colors": ["Walnut"],
  "sizes": ["7", "8", "9", "10", "11"],
  "fit": "Standard",
  "inStock": true,
  "onSale": false
}
```

## ⚙️ Configuration

### application.properties
```properties
# Server
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/elysianmen

# JWT
jwt.secret=elysianmen-secret-key-2024-change-this-in-production
jwt.expiration=86400000  # 24 hours

# CORS
cors.allowed-origins=http://localhost:3000
```

## 🚀 Running the Application

### Prerequisites
1. Java 17+
2. Maven 3.6+
3. MongoDB running on `localhost:27017`

### Steps
```bash
# 1. Start MongoDB
net start MongoDB

# 2. Navigate to backend
cd backend

# 3. Install dependencies
mvn clean install

# 4. Run application
mvn spring-boot:run

# Or use quick start script
./start.bat
```

### Verify
```bash
# Health check
curl http://localhost:8080/api/health

# Get products
curl http://localhost:8080/api/products

# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## 📚 Documentation Files

1. **README.md** - General setup and overview
2. **AUTHENTICATION.md** - Complete auth documentation
3. **API_TESTING.md** - API testing examples
4. **PROJECT_OVERVIEW.md** - Full stack overview
5. **BACKEND_STRUCTURE.md** - This file

## 🔄 Design Patterns Used

1. **Interface-Implementation Pattern**
   - Services defined as interfaces
   - Implementations in `impl/` package
   - Enables easy mocking and testing

2. **DTO Pattern**
   - Separate request/response objects
   - Validation on request DTOs
   - No sensitive data in responses

3. **Repository Pattern**
   - Spring Data MongoDB repositories
   - Custom queries when needed

4. **Filter Pattern**
   - JWT authentication filter
   - Intercepts all requests
   - Validates and sets authentication

5. **Singleton Pattern**
   - Spring beans (@Service, @Component)
   - Configuration classes

## 🔜 Future Enhancements

1. **Cart & Orders**
   - Cart entity and repository
   - Order management
   - Order history

2. **Admin Panel**
   - ROLE_ADMIN routes
   - Product management endpoints
   - User management

3. **Email Service**
   - Email verification
   - Password reset
   - Order confirmations

4. **Payment Integration**
   - Stripe/PayPal integration
   - Payment processing
   - Transaction history

5. **Reviews & Ratings**
   - Product reviews
   - Rating system
   - Review moderation

## 📖 Learning Resources

- [Spring Security Docs](https://docs.spring.io/spring-security/reference/)
- [JWT.io](https://jwt.io/)
- [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/)
- [RESTful API Design](https://restfulapi.net/)

---

**Backend Version:** 1.0.0  
**Last Updated:** January 9, 2024  
**Architecture:** Layered (Controller → Service → Repository → Database)
