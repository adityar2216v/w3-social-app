# Deployment Guide

## 📋 Pre-Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Environment variables configured
- [ ] All dependencies installed
- [ ] API tested locally
- [ ] CORS configured for production domain

### Frontend
- [ ] API URL updated for production
- [ ] All dependencies installed
- [ ] App tested locally
- [ ] Production build tested

---

## 🌐 Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Backend Deployment

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
cd backend
heroku create your-app-name-backend
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

6. **Your backend URL**: `https://your-app-name-backend.herokuapp.com`

#### Frontend Deployment

1. **Update API URL**
   - Edit `frontend/.env`
   - Set `REACT_APP_API_URL=https://your-app-name-backend.herokuapp.com/api`

2. **Build for Production**
```bash
cd frontend
npm run build
```

3. **Deploy to Netlify/Vercel** (see below)

---

### Option 2: Render.com (Free Tier Available)

#### Backend Deployment

1. **Create account** at https://render.com
2. **New Web Service**
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`

3. **Your backend URL**: `https://your-app-name.onrender.com`

#### Frontend Deployment

1. **Update API URL** in `frontend/.env`
2. **New Static Site** on Render
   - Build Command: `npm run build`
   - Publish Directory: `build`

---

### Option 3: Vercel (Frontend) + Render (Backend)

#### Backend on Render
Follow Render.com instructions above

#### Frontend on Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Set Environment Variable**
   - In Vercel dashboard, add `REACT_APP_API_URL`

4. **Redeploy**
```bash
vercel --prod
```

---

### Option 4: DigitalOcean/AWS (Advanced)

#### Backend on DigitalOcean Droplet

1. **Create Ubuntu Droplet**
2. **SSH into server**
3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install PM2**
```bash
sudo npm install -g pm2
```

5. **Clone repository**
```bash
git clone your-repo-url
cd backend
npm install
```

6. **Set environment variables**
```bash
nano .env
# Add your variables
```

7. **Start with PM2**
```bash
pm2 start server.js --name social-app
pm2 startup
pm2 save
```

8. **Configure Nginx** (reverse proxy)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

#### Frontend on Vercel/Netlify
Follow instructions above

---

## 🔒 Production Security Checklist

### Backend
- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS for specific domains only
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add helmet.js for security headers
- [ ] Sanitize user inputs
- [ ] Enable MongoDB Atlas IP whitelist

### Frontend
- [ ] Remove console.logs
- [ ] Minify and optimize build
- [ ] Enable HTTPS
- [ ] Use environment variables for API URLs
- [ ] Add error boundaries
- [ ] Implement proper error handling

---

## 🚀 Performance Optimization

### Backend
1. **Add compression**
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add rate limiting**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

3. **Add helmet for security**
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Frontend
1. **Code splitting**
```javascript
const Feed = React.lazy(() => import('./pages/Feed'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));
```

2. **Image optimization**
   - Use WebP format
   - Lazy load images
   - Add loading placeholders

3. **Caching**
   - Configure service workers
   - Add browser caching headers

---

## 🔧 Environment Variables Reference

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_EXPIRE=30d
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 📊 Monitoring & Logging

### Backend Logging
```bash
npm install morgan
```

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Error Tracking
- Use **Sentry** for error tracking
- Set up **LogRocket** for session replay
- Configure **PM2** logs for server monitoring

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend && npm install
        cd ../frontend && npm install
    
    - name: Run tests
      run: |
        cd backend && npm test
        cd ../frontend && npm test
    
    - name: Deploy to production
      run: |
        # Add your deployment commands here
```

---

## 🆘 Common Deployment Issues

### Issue: CORS errors in production
**Solution**: Update CORS configuration in `server.js`
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### Issue: Environment variables not loading
**Solution**: 
- Verify variables are set in hosting platform
- Check variable names match exactly
- Restart the application

### Issue: MongoDB connection timeout
**Solution**:
- Add current IP to MongoDB Atlas whitelist
- Use 0.0.0.0/0 for production (not recommended for security)
- Check connection string format

### Issue: Build fails on Vercel/Netlify
**Solution**:
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Clear cache and rebuild

---

## 📱 Mobile Responsiveness

The app is already responsive thanks to Material-UI, but test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet devices
- Different screen sizes

---

## 🎯 Post-Deployment Steps

1. **Test all features** in production
2. **Monitor error logs** for the first 24 hours
3. **Set up analytics** (Google Analytics, Mixpanel)
4. **Configure backups** for MongoDB
5. **Set up monitoring** (UptimeRobot, Pingdom)
6. **Document API** (Swagger/Postman)
7. **Create user documentation**

---

## 📈 Scaling Considerations

### When to scale:
- More than 1000 concurrent users
- Database queries slowing down
- High server CPU/memory usage

### How to scale:
1. **Database**: Use MongoDB sharding
2. **Backend**: Deploy multiple instances with load balancer
3. **Frontend**: Use CDN (Cloudflare, CloudFront)
4. **Caching**: Implement Redis for session storage
5. **Media**: Use S3/Cloudinary for image hosting

---

## ✅ Final Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and working
- [ ] Authentication working
- [ ] All features tested in production
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Error monitoring set up
- [ ] Backups configured
- [ ] Documentation complete

---

**Congratulations! Your app is now live! 🎉**
