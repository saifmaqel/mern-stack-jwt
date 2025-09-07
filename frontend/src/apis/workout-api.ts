import axios from "axios";
import type {
  AddEditWorkout,
  CreateEditWorkoutResponse,
  GetAllWorkoutsResponse,
  GetWorkoutResponse,
} from "./types";

const resourceWorkouts = "workouts";

async function list(token: string): Promise<GetAllWorkoutsResponse> {
  const url = `/${resourceWorkouts}`;
  const fetched = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return fetched.data;
}
async function get(id: string, token: string): Promise<GetWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const fetched = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return fetched.data;
}
async function create(
  workout: AddEditWorkout,
  token: string
): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/create`;
  const body = workout;
  const fetched = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return fetched.data;
}
async function update(
  id: string,
  workout: AddEditWorkout,
  token: string
): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const body = workout;
  const fetched = await axios.put(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return fetched.data;
}
async function remove(
  id: string,
  token: string
): Promise<CreateEditWorkoutResponse> {
  const url = `/${resourceWorkouts}/${id}`;
  const fetched = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return fetched.data;
}

export const workoutsApi = {
  list,
  get,
  create,
  update,
  remove,
};
