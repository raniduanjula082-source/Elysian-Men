# MongoDB Collections Summary

## 📊 Collection Names

Your Elysian Men e-commerce backend uses **2 main collections**:

| Collection | Documents | Description |
|------------|-----------|-------------|
| `products` | 25 | Product catalog (shirts, shoes, bags, polos, denims, chinos, accessories) |
| `users` | 25 | User accounts with authentication data |

---

## 📁 Data Files Location

```
backend/data/
├── products.json        (25 products)
├── users.json          (25 users)
└── IMPORT_GUIDE.md     (Import instructions)
```

---

## 1. **products** Collection (25 items)

### Categories Distribution:
- **Shirts**: 3 items
- **Shoes**: 6 items  
- **Bags**: 3 items
- **Polos**: 4 items
- **Denims**: 3 items
- **Chinos**: 2 items
- **Accessories**: 4 items

### Sample Product:
```json
{
  "_id": "sh1",
  "name": "Heritage Oxford Walnut",
  "price": 38500.0,
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

### Fields:
- `_id` - Product ID (string)
- `name` - Product name
- `price` - Current price (LKR)
- `originalPrice` - Original price (null if not on sale)
- `category` - Product category
- `description` - Product description
- `image` - Product image URL
- `colors` - Available colors (array)
- `sizes` - Available sizes (array)
- `fit` - Fit type (Slim Fit, Regular Fit, etc.)
- `inStock` - Availability (boolean)
- `onSale` - Sale status (boolean)

---

## 2. **users** Collection (25 items)

### User Types:
- **Regular Users**: 23 users
- **Admin Users**: 2 users (including main admin)
- **Active Users**: 23 users
- **Inactive Users**: 2 users
- **Verified Emails**: 19 users
- **Unverified Emails**: 6 users

### Sample User:
```json
{
  "_id": {"$oid": "65a1b2c3d4e5f6a7b8c9d0e1"},
  "email": "john.doe@example.com",
  "password": "$2a$10$X5wFuCXX8TKqB8h8vN.oqO5p5j5jPJYxZoqZqZ3qZ4qZ5qZ6qZ7qZ",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+94771234567",
  "roles": ["USER"],
  "createdAt": {"$date": "2024-01-01T10:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T10:00:00.000Z"},
  "isActive": true,
  "emailVerified": true
}
```

### Fields:
- `_id` - MongoDB ObjectId
- `email` - User email (unique)
- `password` - BCrypt hashed password
- `firstName` - First name
- `lastName` - Last name
- `phone` - Phone number
- `roles` - User roles (array: USER, ADMIN)
- `createdAt` - Account creation date
- `updatedAt` - Last update date
- `isActive` - Account status
- `emailVerified` - Email verification status

### Test Credentials:
All users have the same password for testing: **`password123`**

**Admin Account:**
- Email: `admin@elysianmen.com`
- Password: `password123`
- Roles: `USER`, `ADMIN`

**Sample Regular Account:**
- Email: `john.doe@example.com`
- Password: `password123`
- Role: `USER`

---

## 🚀 Quick Import

### Option 1: Using MongoDB Compass (Easiest)
1. Download MongoDB Compass
2. Connect with: `mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen`
3. Import `products.json` into `products` collection
4. Import `users.json` into `users` collection

### Option 2: Using mongoimport
```bash
# Import products
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection products \
  --file backend/data/products.json \
  --jsonArray

# Import users
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection users \
  --file backend/data/users.json \
  --jsonArray
```

### Option 3: Let Spring Boot Auto-Initialize
The `DataInitializer.java` will automatically populate products when you run:
```bash
cd backend
mvn spring-boot:run
```

---

## 📋 Database Schema

### MongoDB Database: `elysianmen`

```
elysianmen/
├── products (collection)
│   ├── Index: _id (default)
│   ├── Index: category (recommended)
│   └── Index: price (recommended)
│
└── users (collection)
    ├── Index: _id (default)
    └── Index: email (unique) - auto-created by Spring Boot
```

---

## ✅ Verification

After importing, verify data:

```javascript
// Using mongosh
use elysianmen

db.products.countDocuments()  // Should return: 25
db.users.countDocuments()     // Should return: 25

// Test query
db.products.find({ category: "Shoes" }).count()  // Should return: 6
db.users.find({ roles: "ADMIN" }).count()        // Should return: 2
```

Or using the API:
```bash
curl http://localhost:8080/api/products/count
curl http://localhost:8080/api/products?category=Shoes
```

---

## 📝 Notes

1. **Passwords**: All test users have password `password123` (BCrypt hashed in JSON)
2. **Auto-initialization**: Products will auto-populate if collection is empty when backend starts
3. **Users**: Must be manually imported or registered via API
4. **Connection**: MongoDB Atlas connection string in `application.properties`
5. **Indexes**: Email unique index auto-created by Spring Boot

---

## 🔗 Related Files

- `backend/data/products.json` - Product data
- `backend/data/users.json` - User data
- `backend/data/IMPORT_GUIDE.md` - Detailed import instructions
- `backend/src/main/resources/application.properties` - MongoDB connection settings
- `backend/src/main/java/com/elysianmen/backend/config/DataInitializer.java` - Auto-initialization code

---

**Ready to import and run!** 🎉

See `IMPORT_GUIDE.md` for detailed instructions.
