# 🌐 W3 Social App

A modern, full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). Create posts, interact with the community, and connect with others in a beautiful, responsive interface.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based user authentication
- **Password Encryption** - bcrypt hashing with 10 salt rounds
- **Protected Routes** - Middleware-based route protection
- **Session Management** - Persistent login with localStorage

### 📱 Social Features
- **Create Posts** - Share text posts with optional images
- **Public Feed** - Browse all posts in chronological order
- **Like System** - Like and unlike posts with real-time updates
- **Comments** - Engage with posts through comments
- **User Profiles** - Customizable profile pictures and bios
- **Delete Posts** - Remove your own posts

### 🎨 User Interface
- **Material-UI Design** - Modern, clean interface
- **Responsive Layout** - Works seamlessly on all devices
- **Real-time Updates** - Instant UI feedback
- **Smooth Animations** - Polished user experience
- **Dark Mode Ready** - Prepared for theme switching

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express | ^5.2.1 | Web framework |
| MongoDB | Atlas | Cloud database |
| Mongoose | ^9.1.6 | MongoDB ODM |
| JWT | ^9.0.3 | Authentication |
| bcryptjs | ^3.0.3 | Password hashing |
| CORS | ^2.8.6 | Cross-origin requests |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.2.4 | UI library |
| Material-UI | ^7.3.7 | Component library |
| React Router | ^7.13.0 | Navigation |
| Axios | ^1.13.4 | HTTP client |
| Context API | Built-in | State management |

## 📁 Project Structure

```
w3-social-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── postController.js     # Post logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Post.js               # Post schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── postRoutes.js         # Post endpoints
│   ├── utils/
│   │   ├── jwtUtils.js           # Token utilities
│   │   └── passwordUtils.js      # Password utilities
│   ├── .env.example              # Environment template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation bar
    │   │   ├── PostCard.js       # Post display
    │   │   └── CommentBox.js     # Comment section
    │   ├── context/
    │   │   └── AuthContext.js    # Auth state
    │   ├── pages/
    │   │   ├── Login.js          # Login page
    │   │   ├── Signup.js         # Signup page
    │   │   ├── Feed.js           # Main feed
    │   │   └── CreatePost.js     # Create post
    │   ├── services/
    │   │   └── api.js            # API client
    │   ├── utils/
    │   │   └── dateUtils.js      # Date formatting
    │   ├── App.js                # Main app
    │   └── index.js              # Entry point
    ├── .env
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier works!)

### 1. Clone the Repository
```bash
git clone https://github.com/adityar2216v/w3-social-app.git
cd w3-social-app
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Update with your MongoDB URI and JWT secret
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret_key
JWT_EXPIRE=30d
NODE_ENV=development

# Start development server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

**Frontend will run on:** `http://localhost:3000`

## 🔑 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Hello, I'm John!" (optional)
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts
```http
GET /api/posts
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hello, World!",
  "image": "https://example.com/image.jpg" (optional)
}
```

#### Like/Unlike Post
```http
PUT /api/posts/:id/like
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/posts/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Great post!"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Protected Routes** - Middleware verification
- ✅ **Input Validation** - Server-side validation
- ✅ **CORS Protection** - Configured cross-origin policies
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **HTTP-only Tokens** - XSS protection ready

## 🎨 UI/UX Features

- 📱 **Fully Responsive** - Mobile, tablet, and desktop
- 🎭 **Material Design** - Modern, clean aesthetics
- ⚡ **Fast Loading** - Optimized performance
- 🔄 **Real-time Updates** - Instant feedback
- 🎯 **Intuitive Navigation** - Easy to use
- 💫 **Smooth Animations** - Polished interactions

## 📦 Deployment

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=production
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

### Deployment Platforms

- **Backend:** Render, Railway, Heroku, AWS, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (already cloud-based)

## 🐛 Troubleshooting

### Backend Issues

**Server won't start:**
- ✅ Check MongoDB connection string in `.env`
- ✅ Verify MongoDB Atlas IP whitelist includes your IP
- ✅ Ensure all dependencies are installed (`npm install`)
- ✅ Check if port 5000 is available

**Database connection fails:**
- ✅ Verify MongoDB URI format
- ✅ Check database user credentials
- ✅ Add your IP to MongoDB Atlas Network Access
- ✅ Ensure database name is correct

### Frontend Issues

**Can't connect to backend:**
- ✅ Ensure backend is running on port 5000
- ✅ Check `REACT_APP_API_URL` in `.env`
- ✅ Verify CORS is enabled in backend
- ✅ Check browser console for errors

**Authentication not working:**
- ✅ Clear browser localStorage
- ✅ Check JWT_SECRET is set in backend
- ✅ Verify token format in requests
- ✅ Check token expiration time

## 📚 Documentation

Additional documentation files:
- `AUTHENTICATION_FIX.md` - Authentication setup guide
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `API_TESTING_GUIDE.md` - API testing examples

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Aditya Raj Srivastava**
- GitHub: [@adityar2216v](https://github.com/adityar2216v)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- MongoDB Atlas for cloud database hosting
- The MERN stack community for excellent resources

---

<div align="center">

**Built with ❤️ using the MERN Stack**

⭐ Star this repo if you find it helpful!

</div>
