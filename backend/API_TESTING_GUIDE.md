# API Testing Guide

## Prerequisites
1. Update `.env` file with your MongoDB Atlas connection string
2. Start the server: `npm run dev`
3. Use Postman, Thunder Client, or any API testing tool

---

## 1. SIGNUP - Register New User

**Endpoint:** `POST http://localhost:5000/api/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Software developer and tech enthusiast",
  "profilePicture": "https://i.pravatar.cc/150?img=12"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "username": "johndoe",
      "email": "john@example.com",
      "bio": "Software developer and tech enthusiast",
      "profilePicture": "https://i.pravatar.cc/150?img=12",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2. LOGIN - User Login

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "username": "johndoe",
      "email": "john@example.com",
      "bio": "Software developer and tech enthusiast",
      "profilePicture": "https://i.pravatar.cc/150?img=12",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**IMPORTANT:** Save the token from the response. You'll need it for protected routes.

---

## 3. GET CURRENT USER

**Endpoint:** `GET http://localhost:5000/api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "65f1234567890abcdef12345",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software developer and tech enthusiast",
    "profilePicture": "https://i.pravatar.cc/150?img=12",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 4. CREATE POST

**Endpoint:** `POST http://localhost:5000/api/posts`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body (JSON) - Text Only:**
```json
{
  "content": "Just deployed my first MERN stack application! 🚀"
}
```

**Body (JSON) - With Image:**
```json
{
  "content": "Beautiful sunset at the beach today! 🌅",
  "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "65f9876543210fedcba98765",
    "user": {
      "_id": "65f1234567890abcdef12345",
      "username": "johndoe",
      "profilePicture": "https://i.pravatar.cc/150?img=12"
    },
    "content": "Just deployed my first MERN stack application! 🚀",
    "image": null,
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## 5. GET ALL POSTS (Public Feed)

**Endpoint:** `GET http://localhost:5000/api/posts`

**Headers:** None required (public route)

**Expected Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65f9876543210fedcba98765",
      "user": {
        "_id": "65f1234567890abcdef12345",
        "username": "johndoe",
        "profilePicture": "https://i.pravatar.cc/150?img=12",
        "bio": "Software developer and tech enthusiast"
      },
      "content": "Just deployed my first MERN stack application! 🚀",
      "image": null,
      "likes": [],
      "comments": [],
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

## 6. LIKE POST

**Endpoint:** `PUT http://localhost:5000/api/posts/:postId/like`

**Example:** `PUT http://localhost:5000/api/posts/65f9876543210fedcba98765/like`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:** None required

**Expected Response (200) - First Click (Like):**
```json
{
  "success": true,
  "message": "Post liked",
  "data": {
    "_id": "65f9876543210fedcba98765",
    "user": {
      "_id": "65f1234567890abcdef12345",
      "username": "johndoe",
      "profilePicture": "https://i.pravatar.cc/150?img=12",
      "bio": "Software developer and tech enthusiast"
    },
    "content": "Just deployed my first MERN stack application! 🚀",
    "image": null,
    "likes": ["65f1234567890abcdef12345"],
    "comments": [],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:05:00.000Z"
  }
}
```

**Expected Response (200) - Second Click (Unlike):**
```json
{
  "success": true,
  "message": "Post unliked",
  "data": {
    "_id": "65f9876543210fedcba98765",
    "likes": [],
    ...
  }
}
```

---

## 7. ADD COMMENT

**Endpoint:** `POST http://localhost:5000/api/posts/:postId/comment`

**Example:** `POST http://localhost:5000/api/posts/65f9876543210fedcba98765/comment`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "text": "Congratulations! This looks amazing! 🎉"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "_id": "65f9876543210fedcba98765",
    "user": {
      "_id": "65f1234567890abcdef12345",
      "username": "johndoe",
      "profilePicture": "https://i.pravatar.cc/150?img=12",
      "bio": "Software developer and tech enthusiast"
    },
    "content": "Just deployed my first MERN stack application! 🚀",
    "image": null,
    "likes": [],
    "comments": [
      {
        "_id": "65fa111111111111111111111",
        "user": {
          "_id": "65f1234567890abcdef12345",
          "username": "johndoe",
          "profilePicture": "https://i.pravatar.cc/150?img=12"
        },
        "text": "Congratulations! This looks amazing! 🎉",
        "createdAt": "2024-01-15T11:10:00.000Z",
        "updatedAt": "2024-01-15T11:10:00.000Z"
      }
    ],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:10:00.000Z"
  }
}
```

---

## 8. DELETE POST

**Endpoint:** `DELETE http://localhost:5000/api/posts/:postId`

**Example:** `DELETE http://localhost:5000/api/posts/65f9876543210fedcba98765`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:** None required

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Note:** Only the post owner can delete their posts.

---

## Testing Workflow

1. **Register 2-3 users** using different emails
2. **Login with each user** and save their tokens
3. **Create posts** with different users
4. **Get public feed** to see all posts
5. **Like posts** from different users
6. **Add comments** from different users
7. **Delete a post** (only works for post owner)

---

## Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Please provide username, email, and password"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Post not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error creating post"
}
```
