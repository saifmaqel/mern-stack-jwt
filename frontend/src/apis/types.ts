export interface ResponseObject {
  message: string;
  httpStatus?: number;
  httpStatusOk: boolean;
  error?: string;
}

export interface Workout {
  _id: string;
  name: string;
  reps: number;
  load: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllWorkoutsResponse extends ResponseObject {
  workouts: Workout[];
}
export interface GetWorkoutResponse extends ResponseObject {
  workout: Workout;
}
export interface CreateEditWorkoutResponse extends ResponseObject {
  workout: Workout;
}
export interface DeleteWorkoutResponse extends ResponseObject {
  workout: Workout;
}

export interface AddEditWorkout {
  name: string | null;
  load: number;
  reps: number;
}
