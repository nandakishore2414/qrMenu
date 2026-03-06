const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Add Category (Protected) - Mock protection for now
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: "Failed to create category" });
    }
});

// Edit Category (Protected)
router.put("/:id", async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: "Failed to update category" });
    }
});

// Delete Category (Protected)
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete category" });
    }
});

module.exports = router;
