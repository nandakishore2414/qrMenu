const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { upload } = require("../config/cloudinary");

// Add Menu Item
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, categoryId, isPopular, available } = req.body;

        let imageUrl = "";
        if (req.file && req.file.path) {
            imageUrl = req.file.path; // Cloudinary URL
        }

        const newItem = new MenuItem({
            name,
            description,
            price: Number(price),
            image: imageUrl,
            categoryId,
            isPopular: isPopular === 'true',
            available: available !== 'false'
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create menu item" });
    }
});

// Edit Menu Item
router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, categoryId, isPopular, available } = req.body;

        const updateData = {
            name,
            description,
            price: Number(price),
            categoryId,
            isPopular: isPopular === 'true',
            available: available !== 'false'
        };

        if (req.file && req.file.path) {
            updateData.image = req.file.path;
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to update menu item" });
    }
});

// Update Availability (PATCH)
router.patch("/availability/:id", async (req, res) => {
    try {
        const { available } = req.body;
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { available },
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to update availability" });
    }
});

// Delete Menu Item
router.delete("/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu item deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete menu item" });
    }
});

module.exports = router;
