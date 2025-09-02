import express from "express";
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutsController.js";

const route = express.Router();

route.get("/", getAllWorkouts);
route.get("/:id", getWorkout);
route.post("/create", createWorkout);
route.put("/:id", updateWorkout);
route.delete("/:id", deleteWorkout);

export default route;
