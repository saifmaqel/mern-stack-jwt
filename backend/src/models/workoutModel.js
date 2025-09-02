import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
