const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Get all menu items (Public)
router.get("/", async (req, res) => {
    try {
        const items = await MenuItem.find().populate("categoryId");
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});

module.exports = router;
