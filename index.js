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
//MONGO_URL='mongodb://admin:admin123@mongo-service:27017/admin?authSource=admin'
//const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:admin123@192.168.0.104:27017/db?authSource=admin";

const USER_NAME=process.env.USER_NAME
const PASSWORD=process.env.PASSWORD
const HOST=process.env.HOST
const MONGO_HOST_PORT = process.env.MONGO_HOST_PORT
const MONGO_URL = `mongodb://${USER_NAME}:${PASSWORD}@${HOST}:${MONGO_HOST_PORT}/db?authSource=admin`

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