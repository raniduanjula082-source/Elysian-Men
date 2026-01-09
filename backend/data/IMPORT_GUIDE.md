# MongoDB Data Import Guide

## Collections Overview

Your Elysian Men backend uses **2 main collections**:

### 1. **products** (25 items)
- Product catalog with shirts, shoes, bags, polos, denims, chinos, and accessories
- File: `data/products.json`

### 2. **users** (25 items)
- User accounts with authentication data
- File: `data/users.json`
- **Note**: Passwords are BCrypt hashed (default password for testing: `password123`)

---

## MongoDB Atlas Import Methods

### Method 1: Using MongoDB Compass (GUI - Recommended)

#### Step 1: Download MongoDB Compass
- Download from: https://www.mongodb.com/try/download/compass
- Install and open MongoDB Compass

#### Step 2: Connect to Atlas
1. Open MongoDB Compass
2. Use connection string from `application.properties`:
   ```
   mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen
   ```
3. Click "Connect"

#### Step 3: Import Products
1. Navigate to database: `elysianmen`
2. Create collection: `products` (if not exists)
3. Click on `products` collection
4. Click "ADD DATA" → "Import JSON or CSV file"
5. Select: `backend/data/products.json`
6. Click "Import"
7. ✅ You should see 25 products imported

#### Step 4: Import Users
1. Navigate to database: `elysianmen`
2. Create collection: `users` (if not exists)
3. Click on `users` collection
4. Click "ADD DATA" → "Import JSON or CSV file"
5. Select: `backend/data/users.json`
6. Click "Import"
7. ✅ You should see 25 users imported

---

### Method 2: Using MongoDB Shell (mongosh)

#### Step 1: Install mongosh
```bash
# Download from:
https://www.mongodb.com/try/download/shell
```

#### Step 2: Connect to Atlas
```bash
mongosh "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen"
```

#### Step 3: Import Products
```bash
# In mongosh:
use elysianmen

# Load and insert products
load('e:/project/elysianmen/backend/data/products.json')
```

Or use mongoimport:
```bash
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection products \
  --file "e:/project/elysianmen/backend/data/products.json" \
  --jsonArray
```

#### Step 4: Import Users
```bash
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection users \
  --file "e:/project/elysianmen/backend/data/users.json" \
  --jsonArray
```

---

### Method 3: Using MongoDB Atlas Web UI

#### Step 1: Login to Atlas
1. Go to: https://cloud.mongodb.com/
2. Login with your credentials
3. Navigate to your cluster

#### Step 2: Browse Collections
1. Click "Browse Collections"
2. Select database: `elysianmen`

#### Step 3: Import Products
1. Click "Create Collection" → Name: `products`
2. Click on `products` collection
3. Click "INSERT DOCUMENT"
4. Switch to "JSON View"
5. Copy-paste content from `products.json`
6. Click "Insert"

#### Step 4: Import Users
1. Create collection: `users`
2. Click on `users` collection
3. Click "INSERT DOCUMENT"
4. Switch to "JSON View"
5. Copy-paste content from `users.json`
6. Click "Insert"

---

## Method 4: Let Spring Boot Auto-Initialize (Easiest!)

Since you have `DataInitializer.java`, you can simply **run your Spring Boot application** and it will automatically populate the products collection!

### How it works:
1. Application starts
2. Checks if products exist
3. If `products.count() == 0`, it inserts all 44 products
4. Done! ✅

### To use this method:
```bash
cd backend
mvn spring-boot:run
```

**Note**: This only initializes products. You'll still need to manually import users or register them via the API.

---

## Verification

### Check if data imported successfully:

#### Using MongoDB Compass:
1. Connect to your cluster
2. Navigate to `elysianmen` database
3. Check `products` collection → Should have 25 documents
4. Check `users` collection → Should have 25 documents

#### Using mongosh:
```javascript
use elysianmen

// Count products
db.products.countDocuments()
// Should return: 25

// Count users
db.users.countDocuments()
// Should return: 25

// View sample product
db.products.findOne()

// View sample user
db.users.findOne()
```

#### Using Spring Boot API:
```bash
# After running the backend:
curl http://localhost:8080/api/products/count
# Should return: 25 (or more if auto-initialized)

curl http://localhost:8080/api/products
# Should return JSON array of products
```

---

## Test User Credentials

After importing users, you can login with these test accounts:

### Admin Account:
- Email: `admin@elysianmen.com`
- Password: `password123`
- Roles: `USER`, `ADMIN`

### Regular Users:
- Email: `john.doe@example.com`
- Password: `password123`
- Role: `USER`

**Note**: All test users have the same password: `password123`

---

## Collection Schemas

### Products Collection:
```json
{
  "_id": "string",
  "name": "string",
  "price": "number",
  "originalPrice": "number | null",
  "category": "string",
  "description": "string",
  "image": "string (URL)",
  "colors": ["string"],
  "sizes": ["string"],
  "fit": "string",
  "inStock": "boolean",
  "onSale": "boolean"
}
```

### Users Collection:
```json
{
  "_id": "ObjectId",
  "email": "string (unique)",
  "password": "string (BCrypt hash)",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "roles": ["string"],
  "createdAt": "Date",
  "updatedAt": "Date",
  "isActive": "boolean",
  "emailVerified": "boolean"
}
```

---

## Indexes to Create (Recommended)

### For users collection:
```javascript
use elysianmen

// Unique index on email
db.users.createIndex({ "email": 1 }, { unique: true })
```

### For products collection:
```javascript
// Index on category for faster filtering
db.products.createIndex({ "category": 1 })

// Index on price for range queries
db.products.createIndex({ "price": 1 })

// Index on inStock for filtering
db.products.createIndex({ "inStock": 1 })
```

Spring Boot will auto-create the unique email index due to `@Indexed(unique = true)` annotation in User.java.

---

## Troubleshooting

### Issue: "Duplicate key error"
**Solution**: Collection already has data. Either:
1. Drop the collection and import again
2. Use different `_id` values
3. Remove existing data first

### Issue: "Authentication failed"
**Solution**: Check your Atlas credentials in connection string

### Issue: "Network timeout"
**Solution**: 
1. Check your internet connection
2. Whitelist your IP in MongoDB Atlas
3. Check firewall settings

### Issue: "Invalid JSON format"
**Solution**: Ensure JSON files are valid. Use a JSON validator.

---

## Quick Commands Reference

```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen"

# Import products
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection products --file products.json --jsonArray

# Import users
mongoimport --uri "mongodb+srv://root:1234@elysianmen.jerkwlv.mongodb.net/elysianmen" \
  --collection users --file users.json --jsonArray

# Drop collections (if needed)
db.products.drop()
db.users.drop()

# Count documents
db.products.countDocuments()
db.users.countDocuments()
```

---

**After importing, start your backend and test the API!**

```bash
cd backend
mvn spring-boot:run
```

Then test:
```bash
curl http://localhost:8080/api/products
curl http://localhost:8080/api/health
```
