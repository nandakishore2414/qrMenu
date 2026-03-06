const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Get all categories (Public)
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

module.exports = router;
