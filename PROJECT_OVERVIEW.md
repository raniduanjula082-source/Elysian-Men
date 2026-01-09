# Elysian Men - Full Stack Application

## Project Structure

```
elysianmen/
├── frontend/                      # React + TypeScript + Vite
│   ├── pages/                     # Shop, Product, Cart, etc.
│   ├── components/                # Reusable UI components
│   ├── services/                  # API service layer
│   ├── constants.ts              # Product data constants
│   ├── types.ts                  # TypeScript types
│   └── package.json
│
└── backend/                       # Spring Boot + MongoDB
    ├── src/main/java/com/elysianmen/backend/
    │   ├── config/
    │   │   ├── CorsConfig.java           # CORS setup
    │   │   └── DataInitializer.java      # Database seeding
    │   ├── controller/
    │   │   ├── ProductController.java    # Product API endpoints
    │   │   └── HealthController.java     # Health check endpoint
    │   ├── model/
    │   │   └── Product.java              # Product entity
    │   ├── repository/
    │   │   └── ProductRepository.java    # MongoDB repository
    │   ├── service/
    │   │   └── ProductService.java       # Business logic
    │   └── ElysianMenBackendApplication.java
    ├── src/main/resources/
    │   └── application.properties        # Configuration
    ├── pom.xml                           # Maven dependencies
    ├── README.md                         # Setup guide
    ├── API_TESTING.md                   # API testing guide
    └── start.bat                        # Quick start script
```

## Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **Port:** 3000

### Backend
- **Spring Boot 3.2.1** - Framework
- **Java 17** - Programming language
- **MongoDB** - NoSQL database
- **Maven** - Build tool
- **Lombok** - Code generation
- **Port:** 8080

## Quick Start

### Prerequisites
1. ✅ Java 17+
2. ✅ Maven 3.6+
3. ✅ Node.js 16+
4. ✅ MongoDB

### Start Backend
```bash
cd backend
mvn spring-boot:run
```
Server: http://localhost:8080

### Start Frontend
```bash
cd frontend
npm run dev
```
Client: http://localhost:3000

## API Endpoints

### Health Check
- `GET /api/health` - Check backend status

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `POST /api/products/bulk` - Bulk create products
- `GET /api/products/count` - Get total count

### Query Parameters
- `category` - Filter by category
- `availability` - Filter by stock status
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sortBy` - Sort order

## Database Schema

### Product Collection (MongoDB)
```json
{
  "_id": "sh1",
  "name": "Heritage Oxford Walnut",
  "price": 38500.0,
  "originalPrice": null,
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

## Categories
- Shirts (3 products)
- Shoes (9 products)
- Bags (9 products)
- Polos (11 products)
- Denims (4 products)
- Accessories (6 products)
- Chinos (2 products)

Total: 44 products (automatically seeded on first run)

## Features Implemented

### Backend
✅ RESTful API with Spring Boot
✅ MongoDB integration
✅ Product filtering & sorting
✅ CORS configuration
✅ Auto database initialization
✅ Health check endpoint
✅ Comprehensive error handling

### Frontend
✅ Product catalog with images
✅ Category filtering
✅ Price range filtering
✅ Sort by price
✅ Responsive design
✅ Wishlist functionality
✅ Product detail pages
✅ Fallback to local data

## Development Workflow

1. **Install Dependencies:**
   ```bash
   # Backend
   cd backend
   mvn clean install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Start MongoDB:**
   ```bash
   net start MongoDB  # Windows
   mongod            # macOS/Linux
   ```

3. **Run Applications:**
   - Backend: `mvn spring-boot:run` (in backend folder)
   - Frontend: `npm run dev` (in frontend folder)

4. **Test API:**
   ```bash
   curl http://localhost:8080/api/health
   curl http://localhost:8080/api/products
   ```

5. **Open Browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/products

## Configuration Files

### Backend (`application.properties`)
```properties
server.port=8080
spring.data.mongodb.uri=mongodb://localhost:27017/elysianmen
cors.allowed-origins=http://localhost:3000
```

### Frontend (`productService.ts`)
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Next Steps

### Potential Enhancements
1. **Authentication & Authorization**
   - User registration/login
   - JWT tokens
   - Protected routes

2. **Cart & Checkout**
   - Shopping cart API
   - Order management
   - Payment integration

3. **Admin Panel**
   - Product management
   - Order tracking
   - Analytics dashboard

4. **Search**
   - Full-text search
   - Elasticsearch integration
   - Autocomplete

5. **Reviews & Ratings**
   - Product reviews
   - Rating system
   - User feedback

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Backend
- Package: `mvn clean package`
- Run JAR: `java -jar target/backend-0.0.1-SNAPSHOT.jar`

### Frontend
- Build: `npm run build`
- Preview: `npm run preview`

## Support

For issues or questions:
1. Check README.md in respective folders
2. Review API_TESTING.md for API examples
3. Verify MongoDB is running
4. Check application logs

---

**Built with ❤️ for Elysian Men**
