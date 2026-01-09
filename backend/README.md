# Elysian Men - Backend

Spring Boot backend application for the Elysian Men e-commerce platform.

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **MongoDB** - Database
- **Maven** - Build tool
- **Lombok** - Reduce boilerplate code

## Prerequisites

Before running the backend, ensure you have:

1. **Java 17** or higher installed
2. **Maven 3.6+** installed
3. **MongoDB** installed and running on `localhost:27017`

## Installation & Setup

### 1. Install MongoDB

If you don't have MongoDB installed:

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Or using Chocolatey:
choco install mongodb
```

**Start MongoDB Service:**
```bash
# Windows (as Administrator):
net start MongoDB

# Or manually:
mongod
```

### 2. Clone and Build

```bash
cd backend
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Products

#### Get All Products (with filters)
```
GET /api/products
```

**Query Parameters:**
- `category` - Filter by category (Shirts, Polos, Denims, Chinos, Bags, Shoes, Accessories)
- `availability` - Filter by availability (In Stock, Out of Stock, All)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort products (Default, Price: Low to High, Price: High to Low, Newest)

**Example:**
```
GET /api/products?category=Shoes&minPrice=20000&maxPrice=40000&sortBy=Price: Low to High
```

#### Get Product by ID
```
GET /api/products/{id}
```

#### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 25000,
  "category": "Shirts",
  "description": "Product description",
  "image": "https://image-url.com/image.jpg",
  "colors": ["Blue", "White"],
  "sizes": ["S", "M", "L"],
  "fit": "Slim Fit",
  "inStock": true,
  "onSale": false
}
```

#### Bulk Create Products
```
POST /api/products/bulk
Content-Type: application/json

[{...}, {...}]
```

#### Get Product Count
```
GET /api/products/count
```

## Database

The application uses MongoDB with the following configuration:

- **Database Name:** `elysianmen`
- **Collection:** `products`
- **Connection URI:** `mongodb://localhost:27017/elysianmen`

### Data Initialization

When the application starts for the first time, it automatically populates the database with sample products from the `DataInitializer` class. This includes:

- 3 Shirts
- 9 Shoes
- 9 Bags
- 8 Polos
- 4 Denims
- 6 Accessories
- 2 Chinos
- 3 Sale items

You can modify or remove the sample data in `DataInitializer.java`.

## Configuration

Edit `src/main/resources/application.properties` to customize:

```properties
# Server Port
server.port=8080

# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/elysianmen
spring.data.mongodb.database=elysianmen

# CORS - Frontend URL
cors.allowed-origins=http://localhost:3000

# Logging
logging.level.com.elysianmen=DEBUG
```

## Project Structure

```
src/main/java/com/elysianmen/backend/
├── config/
│   ├── CorsConfig.java           # CORS configuration
│   └── DataInitializer.java      # Database initialization
├── controller/
│   └── ProductController.java    # REST API endpoints
├── model/
│   └── Product.java              # Product entity
├── repository/
│   └── ProductRepository.java    # MongoDB repository
├── service/
│   └── ProductService.java       # Business logic
└── ElysianMenBackendApplication.java  # Main application
```

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` (the frontend). To change this, modify the `cors.allowed-origins` property in `application.properties`.

## Development

### Hot Reload

Spring Boot DevTools is included, so changes to Java files will automatically restart the application.

### Testing the API

You can test the API using:

**cURL:**
```bash
curl http://localhost:8080/api/products
```

**Browser:**
```
http://localhost:8080/api/products
```

**Postman/Insomnia:**
Import the endpoints and test with various parameters.

## Troubleshooting

### MongoDB Connection Error

If you see `MongoSocketOpenException`, ensure MongoDB is running:

```bash
# Check MongoDB status
mongod --version

# Start MongoDB
net start MongoDB   # Windows
mongosh            # Test connection
```

### Port Already in Use

If port 8080 is already in use, change it in `application.properties`:

```properties
server.port=8081
```

Don't forget to update the frontend's `API_BASE_URL` as well!

## License

This project is part of the Elysian Men e-commerce platform.
