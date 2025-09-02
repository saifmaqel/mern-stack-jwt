import axios from "axios";
import type {
  AddEditWorkout,
  CreateEditWorkoutResponse,
  GetAllWorkoutsResponse,
  GetWorkoutResponse,
} from "./types";

const resourceWorkouts = "workouts";

async function list(): Promise<GetAllWorkoutsResponse> {
  const url = `/${resourceWorkouts}`;
  const fetched = await axios.get(url);
  return fetched.data;
}
async function get(id: string): Promise<GetWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const fetched = await axios.get(url);
  return fetched.data;
}
async function create(
  workout: AddEditWorkout
): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/create`;
  const body = workout;
  const fetched = await axios.post(url, body);
  return fetched.data;
}
async function update(
  id: string,
  workout: AddEditWorkout
): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const body = workout;
  const fetched = await axios.put(url, body);
  return fetched.data;
}
async function remove(id: string): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const fetched = await axios.delete(url);
  return fetched.data;
}

export const workoutsApi = {
  list,
  get,
  create,
  update,
  remove,
};
