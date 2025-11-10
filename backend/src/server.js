import express from "express";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workoutsRoute.js";
import userRoutes from "./routes/userRouter.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";
import root from "./routes/root.js";
import pingRoute from "./routes/ping.js";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

// midlleware
app.use("/", express.static(path.join(process.cwd(), "public")));
app.use("/", root);
app.use(cors());
app.use(express.json());
// Free databases are deleted by automation after 14 days of inactivity.
// app.use(rateLimiter);

// routes
app.use("/api/ping", pingRoute);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/user", userRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running in port ", process.env.PORT);
    setInterval(() => {
      fetch(`https://workouts-api-t67z.onrender.com/api/ping`)
        .then((res) => console.log("Pinged self to stay awake:", res.status))
        .catch((err) => console.error("Ping failed:", err));
    }, 14 * 60 * 1000);
  });
});
