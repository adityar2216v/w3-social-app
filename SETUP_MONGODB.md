# ⚠️ IMPORTANT: MongoDB Setup Required

## Before running the application, you MUST set up MongoDB Atlas:

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (free tier M0)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/socialapp?retryWrites=true&w=majority`

### Step 3: Update backend/.env
Replace line 2 in `backend/.env`:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/socialapp?retryWrites=true&w=majority
```

### Step 4: Update JWT Secret
Replace line 3 in `backend/.env` with a random string (minimum 32 characters):
```
JWT_SECRET=my_super_secret_key_12345_change_this_to_something_random
```

### Step 5: Whitelist IP Address
In MongoDB Atlas:
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

---

## Once MongoDB is configured, run:

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

---

## Quick Test Without MongoDB (Optional)

If you want to test the frontend UI without setting up MongoDB:
1. Just start the frontend: `cd frontend && npm start`
2. You can view the UI, but login/signup won't work until MongoDB is configured

---

## Need Help?

Watch this video: https://www.youtube.com/watch?v=084rmLU1UgA
(MongoDB Atlas Setup Tutorial)
