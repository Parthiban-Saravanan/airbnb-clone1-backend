import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js";
import PropertyRoutes from "./routes/properties.js";
import errorHandler from "./middlewares/errorHandler.js"; // Correct import

dotenv.config();

const app = express(); // Make sure to initialize the express app

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);
app.use("/api/property/", PropertyRoutes);

// Global error handler
app.use(errorHandler);

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB");
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

const startServer = async () => {
    try {
        await connectDB();
        app.listen(8080, () => console.log("Server started at http://localhost:8080"));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();