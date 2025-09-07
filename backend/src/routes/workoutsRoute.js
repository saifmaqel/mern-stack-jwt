import express from "express";
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutsController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const route = express.Router();
// fires before all routes
route.use(requireAuth);

route.get("/", getAllWorkouts);
route.get("/:id", getWorkout);
route.post("/create", createWorkout);
route.put("/:id", updateWorkout);
route.delete("/:id", deleteWorkout);

export default route;
