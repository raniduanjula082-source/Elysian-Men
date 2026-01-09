# API Testing Guide

This document provides example API calls for testing the Elysian Men backend.

## Base URL
```
http://localhost:8080/api
```

## Health Check

### Check if backend is running
```bash
curl http://localhost:8080/api/health
```

**Response:**
```json
{
  "status": "UP",
  "application": "Elysian Men Backend",
  "version": "1.0.0"
}
```

## Product Endpoints

### 1. Get All Products
```bash
curl http://localhost:8080/api/products
```

### 2. Get Products by Category
```bash
# Get all Shoes
curl "http://localhost:8080/api/products?category=Shoes"

# Get all Shirts
curl "http://localhost:8080/api/products?category=Shirts"

# Get all Bags
curl "http://localhost:8080/api/products?category=Bags"
```

### 3. Filter by Price Range
```bash
# Products between Rs. 10,000 and Rs. 30,000
curl "http://localhost:8080/api/products?minPrice=10000&maxPrice=30000"

# Products under Rs. 10,000
curl "http://localhost:8080/api/products?maxPrice=10000"

# Products over Rs. 30,000
curl "http://localhost:8080/api/products?minPrice=30000"
```

### 4. Filter by Availability
```bash
# Only in-stock products
curl "http://localhost:8080/api/products?availability=In+Stock"

# Only out-of-stock products
curl "http://localhost:8080/api/products?availability=Out+of+Stock"
```

### 5. Sort Products
```bash
# Sort by price: Low to High
curl "http://localhost:8080/api/products?sortBy=Price:+Low+to+High"

# Sort by price: High to Low
curl "http://localhost:8080/api/products?sortBy=Price:+High+to+Low"

# Sort by newest
curl "http://localhost:8080/api/products?sortBy=Newest"
```

### 6. Combined Filters
```bash
# Shoes between Rs. 30,000-50,000, sorted by price
curl "http://localhost:8080/api/products?category=Shoes&minPrice=30000&maxPrice=50000&sortBy=Price:+Low+to+High"

# In-stock Polos under Rs. 15,000
curl "http://localhost:8080/api/products?category=Polos&availability=In+Stock&maxPrice=15000"
```

### 7. Get Single Product
```bash
# Get product by ID
curl http://localhost:8080/api/products/sh1
curl http://localhost:8080/api/products/b2
curl http://localhost:8080/api/products/p5
```

### 8. Get Product Count
```bash
curl http://localhost:8080/api/products/count
```

### 9. Create New Product
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "id": "custom1",
    "name": "Custom Product",
    "price": 15000,
    "category": "Accessories",
    "description": "A custom product for testing",
    "image": "https://example.com/image.jpg",
    "colors": ["Black", "Brown"],
    "sizes": ["OS"],
    "fit": "Standard",
    "inStock": true,
    "onSale": false
  }'
```

### 10. Bulk Create Products
```bash
curl -X POST http://localhost:8080/api/products/bulk \
  -H "Content-Type: application/json" \
  -d '[
    {
      "id": "bulk1",
      "name": "Bulk Product 1",
      "price": 12000,
      "category": "Shirts",
      "description": "First bulk product",
      "image": "https://example.com/image1.jpg",
      "colors": ["Blue"],
      "sizes": ["M", "L"],
      "fit": "Slim Fit",
      "inStock": true,
      "onSale": false
    },
    {
      "id": "bulk2",
      "name": "Bulk Product 2",
      "price": 15000,
      "category": "Polos",
      "description": "Second bulk product",
      "image": "https://example.com/image2.jpg",
      "colors": ["Red"],
      "sizes": ["S", "M"],
      "fit": "Regular Fit",
      "inStock": true,
      "onSale": true
    }
  ]'
```

## Testing with Browser

You can also test GET endpoints directly in your browser:

1. **Health Check:**
   ```
   http://localhost:8080/api/health
   ```

2. **All Products:**
   ```
   http://localhost:8080/api/products
   ```

3. **Shoes Category:**
   ```
   http://localhost:8080/api/products?category=Shoes
   ```

4. **Products under Rs. 10,000:**
   ```
   http://localhost:8080/api/products?maxPrice=10000
   ```

5. **Single Product:**
   ```
   http://localhost:8080/api/products/sh1
   ```

## Testing with Frontend

Once both frontend and backend are running:

1. **Start Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend runs on: http://localhost:8080

2. **Start Frontend (in another terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

3. **Visit Shop Page:**
   ```
   http://localhost:3000/#/shop
   ```

The frontend will automatically fetch products from the backend and display them!

## Expected Response Format

### Product Object
```json
{
  "id": "sh1",
  "name": "Heritage Oxford Walnut",
  "price": 38500.0,
  "originalPrice": null,
  "category": "Shoes",
  "description": "Classic wingtip oxford in premium calfskin leather...",
  "image": "https://shoes.lk/cdn/shop/files/227.png?v=1766916199&width=360",
  "colors": ["Walnut"],
  "sizes": ["7", "8", "9", "10", "11"],
  "fit": "Standard",
  "inStock": true,
  "onSale": false
}
```

### Product List
```json
[
  { /* product 1 */ },
  { /* product 2 */ },
  { /* product 3 */ }
]
```

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Ensure backend is running on port 8080
- Check `application.properties` has `cors.allowed-origins=http://localhost:3000`
- Verify `@CrossOrigin` annotation is present in controllers

### Empty Product List
If API returns `[]`:
- Check if database was initialized (look for "Database initialized" in console logs)
- Verify MongoDB is running: `mongosh`
- Check database: 
  ```
  mongosh
  use elysianmen
  db.products.find()
  ```

### Connection Refused
If you can't connect to the API:
- Ensure Spring Boot is running: `mvn spring-boot:run`
- Check if port 8080 is available
- Try: `curl http://localhost:8080/api/health`
