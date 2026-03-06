# Gangrill QR Code Digital Menu - Deployment Guide

This full-stack MERN application consists of a React frontend and a Node.js backend. 
Below are the steps to deploy the application for production use: **Vercel** for the Frontend, and **Render** for the Backend.

## 1. Backend Deployment (Render)
Render is great for hosting Node.js + Express backends.

### Steps:
1. Create a GitHub repository for the backend or push the entire project.
2. Log into [Render.com](https://render.com) and click **New -> Web Service**.
3. Connect your GitHub repository and select the `backend` folder (or project root if separated).
4. **Environment Details**:
    - **Language**: Node
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
5. **Environment Variables**:
    Add the following in Render's environment section, updating placeholders with your actual values:
    - `MONGO_URI` = `mongodb+srv://<username>:<password>@cluster.mongodb.net/gangrill`
    - `JWT_SECRET` = `your_strong_secret_key`
    - `CLOUDINARY_CLOUD_NAME` = `<your_cloud_name>`
    - `CLOUDINARY_API_KEY` = `<your_api_key>`
    - `CLOUDINARY_API_SECRET` = `<your_api_secret>`
6. Deploy the service. Render will provide a URL (e.g., `https://gangrill-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

Vercel provides blazing-fast edge deployments perfectly suited for React (Vite).

### Steps:
1. Before deploying, update the API URLs in the frontend code (`src/pages/HomeMenu.jsx`, `Dashboard.jsx`, `Login.jsx`) from `http://localhost:5000` to the **Render URL** you generated above.
    > *Pro-Tip: You can extract this into an environment variable `VITE_API_URL`.*
2. Push your code to GitHub.
3. Log into [Vercel.com](https://vercel.com) and click **Add New Project**.
4. Import your GitHub repository.
5. In the **Framework Preset**, ensure it detects **Vite**.
6. **Root Directory**: Select the `frontend` folder (if your repo contains both frontend and backend).
7. If needed, configure the Build Command: `npm run build` and Output Directory: `dist`.
8. Click **Deploy**. Vercel will give you a domain `https://gangrill-menu.vercel.app`.

---

## 3. Database Setup (MongoDB Atlas)
1. Ensure your MongoDB Atlas Network Access is set to `0.0.0.0/0` (Allow access from anywhere) so Render can connect to it.
2. Before giving the app to staff, run your admin setup script locally against the remote database to create the default user.
   ```bash
   MONGO_URI="mongodb+srv://..." node backend/setupAdmin.js
   ```

## 4. QR Code Printing
- A script called `generateQR.js` is available in the backend folder.
- Simply run `node generateQR.js` to output `gangrill-qr.png`. This QR code will redirect users perfectly to the production Vite frontend!
