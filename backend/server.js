// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.routes.js";
import Itemroutes from "./routes/Item.routes.js"
import cors from "cors"
// Load environment variables
dotenv.config(
    {
        path:'./.env'
    }
);

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Use user routes
app.use("/api", userRoutes);
app.use("/api", Itemroutes);

// Connect to MongoDB
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB()
// Start the server
export const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
