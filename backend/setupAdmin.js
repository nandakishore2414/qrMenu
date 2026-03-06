const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("Connected to MongoDB via Mongoose");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("gangrill123", salt);

    const admin = new Admin({
        username: "admin",
        password: hashedPassword
    });

    await admin.save();
    console.log("Admin account created! Username: admin | Password: gangrill123");
    process.exit();
}).catch(err => {
    console.error("MongoDB connection Failed:", err);
    process.exit(1);
});
