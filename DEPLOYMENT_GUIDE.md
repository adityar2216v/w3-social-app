# 🚀 Deployment Guide - W3 Social App

This guide will help you deploy your MERN stack application to production.

## 📋 Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Database Setup (MongoDB Atlas)](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Testing](#post-deployment-testing)

---

## 🗄️ Database Setup (MongoDB Atlas)

Your MongoDB Atlas is already configured! Just ensure:

### ✅ Current Setup
- Database: `task1.jljhbvn.mongodb.net`
- Connection: Working ✅
- IP Whitelist: Configured ✅

### 🔒 Production Security
For production, update Network Access:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to **Network Access**
3. Add your deployment platform's IPs:
   - For **Render**: Add `0.0.0.0/0` (or specific IPs)
   - For **Railway**: Add `0.0.0.0/0` (or specific IPs)

---

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

Your backend is already production-ready! Just verify:

**File: `backend/server.js`**
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 2: Deploy to Render

1. **Go to [Render](https://render.com/)**
2. **Sign up/Login** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your repository:** `w3-social-app`
5. **Configure the service:**
   ```
   Name: w3-social-app-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

6. **Add Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://srivastavaadityaraj751_db_user:fRhNnXn2taZoYcth@task1.jljhbvn.mongodb.net/?appName=task1
   JWT_SECRET=a8f3c9e2b7d4f1a6e9c3b8d2f5a7e4c1b9d6f3a8e2c7b4d1f6a9e3c8b5d2f7a4
   JWT_EXPIRE=30d
   NODE_ENV=production
   ```

7. **Click "Create Web Service"**

8. **Wait for deployment** (2-3 minutes)

9. **Your backend URL will be:**
   ```
   https://w3-social-app-backend.onrender.com
   ```

### Step 3: Test Backend

```bash
# Test health endpoint
curl https://w3-social-app-backend.onrender.com/api/health
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update Frontend API URL

Before deploying, you need to update the API URL to point to your deployed backend.

**File: `frontend/.env`** (for production)
```env
REACT_APP_API_URL=https://w3-social-app-backend.onrender.com/api
```

**Important:** You'll set this in Vercel's environment variables.

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com/)**
2. **Sign up/Login** with GitHub
3. **Click "Add New" → "Project"**
4. **Import your repository:** `w3-social-app`
5. **Configure the project:**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

6. **Add Environment Variable:**
   ```
   REACT_APP_API_URL=https://w3-social-app-backend.onrender.com/api
   ```

7. **Click "Deploy"**

8. **Wait for deployment** (2-3 minutes)

9. **Your frontend URL will be:**
   ```
   https://w3-social-app.vercel.app
   ```

### Step 3: Update Backend CORS

After deployment, update your backend to allow requests from your Vercel domain.

**File: `backend/server.js`**
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://w3-social-app.vercel.app'
  ],
  credentials: true
}));
```

Commit and push this change:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push origin main
```

Render will automatically redeploy.

---

## 🔐 Environment Variables Summary

### Backend (Render)
```env
PORT=5000
MONGODB_URI=mongodb+srv://srivastavaadityaraj751_db_user:fRhNnXn2taZoYcth@task1.jljhbvn.mongodb.net/?appName=task1
JWT_SECRET=a8f3c9e2b7d4f1a6e9c3b8d2f5a7e4c1b9d6f3a8e2c7b4d1f6a9e3c8b5d2f7a4
JWT_EXPIRE=30d
NODE_ENV=production
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://w3-social-app-backend.onrender.com/api
```

---

## 🧪 Post-Deployment Testing

### 1. Test Backend
```bash
# Health check
curl https://w3-social-app-backend.onrender.com/api/health

# Should return:
# {"status":"OK","message":"Server is running"}
```

### 2. Test Frontend
1. Visit: `https://w3-social-app.vercel.app`
2. Try to signup/login
3. Create a post
4. Like and comment on posts

### 3. Check Logs

**Render (Backend):**
- Go to your service dashboard
- Click "Logs" tab
- Check for errors

**Vercel (Frontend):**
- Go to your project dashboard
- Click "Deployments"
- Click on latest deployment
- Check "Build Logs" and "Function Logs"

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check MongoDB connection string
- Verify environment variables are set
- Check Render logs for errors

**CORS errors**
- Ensure frontend URL is in CORS whitelist
- Check if credentials are enabled

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Verify `REACT_APP_API_URL` is correct
- Check if backend is running
- Inspect browser console for errors

**Environment variables not working**
- Ensure variables start with `REACT_APP_`
- Redeploy after adding variables
- Clear cache and hard reload

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Automatic Deployment:**
   - Render will automatically redeploy backend
   - Vercel will automatically redeploy frontend

---

## 📊 Monitoring

### Render
- View real-time logs
- Monitor CPU and memory usage
- Set up alerts for downtime

### Vercel
- Analytics dashboard
- Performance metrics
- Error tracking

---

## 💰 Cost

### Free Tier Limits

**Render (Free):**
- 750 hours/month
- Sleeps after 15 min of inactivity
- Wakes up on request (cold start ~30s)

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- No sleep time

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared cluster
- Perfect for development

---

## 🎯 Production Checklist

Before going live, ensure:

- [ ] Environment variables are set correctly
- [ ] MongoDB IP whitelist includes deployment IPs
- [ ] CORS is configured for production domain
- [ ] JWT_SECRET is secure and unique
- [ ] Error handling is implemented
- [ ] Logging is configured
- [ ] HTTPS is enabled (automatic on Render/Vercel)
- [ ] API rate limiting is considered
- [ ] Database backups are enabled

---

## 🚀 Alternative Deployment Options

### Backend Alternatives
- **Railway** - Similar to Render, easy setup
- **Heroku** - Classic PaaS (paid)
- **AWS Elastic Beanstalk** - More control
- **DigitalOcean App Platform** - Simple deployment

### Frontend Alternatives
- **Netlify** - Similar to Vercel
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable option
- **Firebase Hosting** - Google's platform

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check MongoDB Atlas status
5. Review CORS configuration

---

## 🎉 Success!

Once deployed, your application will be live at:
- **Frontend:** `https://w3-social-app.vercel.app`
- **Backend:** `https://w3-social-app-backend.onrender.com`

Share your app with the world! 🌍

---

**Last Updated:** 2026-02-06  
**Deployment Status:** Ready for Production ✅
