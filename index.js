import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js";
import PropertyRoutes from "./routes/properties.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);
app.use("/api/property/", PropertyRoutes);

// Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to Mongo DB");
    } catch (err) {
        console.error("Failed to connect with mongo");
        console.error(err);
    }
};

const startServer = async () => {
    try {
        await connectDB();
        app.listen(8080, () => console.log("Server started at 8080"));
    } catch (error) {
        console.log(error);
    }
};

startServer();