import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`.gray);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
      .yellow.bold,
  );

  // Connect to database
  connectDB().then(() => {
    console.log("📦 Database connection attempt completed".green);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`❌ Error: ${err.message}`.red);
  console.log("⚠️  Server continuing to run despite error".yellow);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...".yellow);
  server.close(() => {
    console.log("Process terminated".red);
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close(false, () => {
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});

export default app;
