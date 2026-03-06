require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://gangrill-menu.vercel.app',
        /\.vercel\.app$/   // Allow any Vercel preview deployment
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Imports
const categoryRoutes = require('./routes/categoryRoutes');
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminCategoryRoutes = require('./routes/adminCategoryRoutes');
const adminMenuRoutes = require('./routes/adminMenuRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Import middleware

app.get("/", (req, res) => {
    res.send("Gangrill API Running");
});

// Mount Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/menu', menuRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin/categories', authMiddleware, adminCategoryRoutes); // Protected Category routes
app.use('/api/admin/menu', authMiddleware, adminMenuRoutes);           // Protected Menu routes

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gangrill';

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB via Mongoose");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("MongoDB connection Failed:", err);
});
