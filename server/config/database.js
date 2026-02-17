import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...".cyan);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    console.log(`📊 Database Name: ${conn.connection.name}`.green);

    return conn;
  } catch (error) {
    console.error("❌ Database connection failed:".red);
    console.error(`Error: ${error.message}`.red);

    console.log("⚠️  Continuing without database connection...".yellow);
    return null;
  }
};

export default connectDB;
