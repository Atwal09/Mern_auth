import express from "express";
import mongoose from "mongoose";
import dns from "dns"; // custom DNS for MongoDB SRV
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Fix DNS issues (useful on some Windows / ISP networks)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

// Routes
app.use("/api/auth", authRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});