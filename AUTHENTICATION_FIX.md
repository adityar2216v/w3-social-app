# Authentication Setup Guide

## 🔴 Critical Issue Found

Your authentication is not working because the **MongoDB connection string is not configured**.

## ✅ How to Fix

### Step 1: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in or create a free account
3. Create a new cluster (or use an existing one)
4. Click **"Connect"** on your cluster
5. Choose **"Connect your application"**
6. Copy the connection string (it looks like this):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual database password
8. Replace `dbname` with your desired database name (e.g., `social-app`)

### Step 2: Update Your .env File

Open `backend/.env` and replace this line:
```
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

With your actual connection string:
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/social-app?retryWrites=true&w=majority
```

### Step 3: Restart the Backend

After updating the .env file:
```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: cluster.mongodb.net
Server running on port 5000
```

## ✅ What I've Already Fixed

1. ✅ **JWT_SECRET** - Generated a secure secret key for token signing
2. ✅ **Frontend API URL** - Already configured correctly (`http://localhost:5000/api`)
3. ✅ **CORS** - Backend is configured to accept requests from frontend
4. ✅ **Authentication Logic** - All auth controllers, middleware, and routes are properly set up

## 🧪 Testing Authentication

Once MongoDB is connected, you can test:

### 1. Signup
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get Current User (Protected Route)
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📝 Summary

**The only thing you need to do:**
1. Get a MongoDB connection string from MongoDB Atlas
2. Update `backend/.env` with your connection string
3. Restart the backend server

That's it! Your authentication will work perfectly after that.
