import mongoose from "mongoose";
import { Workout } from "../models/workoutModel.js";
import { validateFields } from "../utils/utils.js";

export async function getAllWorkouts(_, res) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "all workouts", workouts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getWorkout(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json({ message: "get workout", workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createWorkout(req, res) {
  try {
    const { name, reps, load } = req.body;
    const errorMessage = validateFields(req.body, ["name", "reps", "load"]);
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }

    const createdWorkout = await Workout.create({ name, reps, load });
    res.status(200).json({
      message: "Workout created successfully",
      workout: createdWorkout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateWorkout(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const { name, reps, load } = req.body;
    const errorMessage = validateFields(req.body, ["name", "reps", "load"]);
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { name, reps, load },
      { new: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json({
      message: "Workout updated successfully",
      workout: updatedWorkout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteWorkout(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: "Not Found" });
    }
    res
      .status(200)
      .json({
        message: "Workout deleted successfully",
        workout: deletedWorkout,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
