const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/Category");
const MenuItem = require("./models/MenuItem");

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/gangrill');
        console.log("Connected to MongoDB...");

        // Clear existing data
        await Category.deleteMany();
        await MenuItem.deleteMany();
        console.log("Cleared existing categories and menu items.");

        // 1. Create Categories
        const categoriesData = [
            { name: "Grill", description: "Freshly charcoal grilled chicken" },
            { name: "Shawarma", description: "Authentic Arabian wraps" },
            { name: "Burgers", description: "Juicy loaded burgers" },
            { name: "Drinks", description: "Refreshing beverages" }
        ];

        const insertedCategories = await Category.insertMany(categoriesData);
        console.log("Categories seeded!");

        // Helper to find category ID
        const getCatId = (name) => insertedCategories.find(c => c.name === name)._id;

        // 2. Create Menu Items
        const menuData = [
            {
                name: "Al-Faham Full Chicken",
                description: "Spicy Arabian spiced full chicken grilled over charcoal. Served with kubboos and garlic paste.",
                price: 550,
                image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=800&q=80",
                categoryId: getCatId("Grill"),
                isPopular: true,
                available: true
            },
            {
                name: "Pepper BBQ Half",
                description: "Half chicken marinated in crushed black pepper and yogurt, slow grilled.",
                price: 280,
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
                categoryId: getCatId("Grill"),
                isPopular: false,
                available: true
            },
            {
                name: "Special Meat Shawarma Roll",
                description: "Tender roasted meat strips wrapped in rumali roti with fries and toum.",
                price: 120,
                image: "https://images.unsplash.com/photo-1648981434945-8f72c0c7a518?w=800&q=80",
                categoryId: getCatId("Shawarma"),
                isPopular: true,
                available: true
            },
            {
                name: "Plate Shawarma",
                description: "Deconstructed shawarma served on a plate with extra meat, veggies, and bread.",
                price: 180,
                image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
                categoryId: getCatId("Shawarma"),
                isPopular: false,
                available: true
            },
            {
                name: "Gangrill Jumbo Burger",
                description: "Double chicken patty, double cheese, jalapeños, and secret grill sauce.",
                price: 220,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
                categoryId: getCatId("Burgers"),
                isPopular: true,
                available: true
            },
            {
                name: "Crispy Zinger",
                description: "Fried crispy chicken breast in a brioche bun with lettuce and mayo.",
                price: 160,
                image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&q=80",
                categoryId: getCatId("Burgers"),
                isPopular: false,
                available: false // Mocking an unavailable item
            },
            {
                name: "Fresh Lime Soda",
                description: "Sweet and salty refreshing lime.",
                price: 50,
                image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
                categoryId: getCatId("Drinks"),
                isPopular: false,
                available: true
            },
            {
                name: "Mango Mojito",
                description: "Mint-infused tropical mango cooler.",
                price: 90,
                image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
                categoryId: getCatId("Drinks"),
                isPopular: true,
                available: true
            }
        ];

        await MenuItem.insertMany(menuData);
        console.log("Menu Items seeded!");

        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDatabase();
