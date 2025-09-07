import express from "express";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workoutsRoute.js";
import userRoutes from "./routes/userRouter.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

// midlleware
app.use(express.json());
app.use(rateLimiter);
app.use(cors());

// routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/user", userRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running in port ", process.env.PORT);
  });
});
