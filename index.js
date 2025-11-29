import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MONGO_URL from .env or fallback local
const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:admin123@192.168.0.104:27017/db?authSource=admin";

console.log(MONGO_URL)

mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err.message));

// Health check
app.get("/", (req, res) => {
  res.send("Todo API running!");
});

// Routes
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));