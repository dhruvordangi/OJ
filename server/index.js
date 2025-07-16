// Import modules
import dotenv from "dotenv";
dotenv.config({ path: './.env'});
import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/user.router.js";
import fileRoute from "./route/file.router.js"; // ✅ Ensure this file is correctly imported
import otpRouter from "./route/otp.router.js"; // Importing the otpRouter

// import authRoute from "./route/auth.route.js"; // ✅ Ensure this file contains the googleLogin route
import cors from "cors";
import cookieParser from "cookie-parser";
// Initialize Express
const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// ✅ Fix: Remove problematic headers that may block OAuth requests
// ❌ Don't manually set `Cross-Origin-Opener-Policy` for OAuth
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.static("public"));

// MongoDB Connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODBURI;


class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true; // Marks it as a known, expected error
    }
}

try {
    mongoose.connect(URI);
    console.log("Database connected ...");
} catch (error) {
    console.log("Error connecting to the database:", error);
}


// Routes

app.use("/user/", userRoute);
app.use("/user/", fileRoute); // ✅ Ensure fileRoute is defined and imported correctly
app.use("/", otpRouter); // Using the otpRouter
// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
