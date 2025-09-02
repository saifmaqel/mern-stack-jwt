import { Link, useNavigate } from "react-router-dom";
import type { GetAllWorkoutsResponse, Workout } from "../apis/types";
import { workoutsApi } from "../apis/workout-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { WORKOUTS_LIST_QUERY_KEY } from "../utils/constants";

type WorkoutCardProps = {
  workout: Workout;
};

function WorkoutsCard({ workout }: WorkoutCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => workoutsApi.remove(workout._id),
    onSuccess: (response) => {
      if (!response.httpStatusOk) {
        throw new Error(response.message);
      }

      queryClient.setQueryData<GetAllWorkoutsResponse>(
        [WORKOUTS_LIST_QUERY_KEY],
        (prev) => {
          if (!prev) return;
          return {
            ...prev,
            workouts: prev.workouts.filter(
              (w) => w._id === response.workout._id
            ),
          };
        }
      );
      navigate("/");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      throw new Error(error.message);
    },
  });

  function deleteWorkout(e: React.MouseEvent) {
    e.preventDefault();
    mutate();
  }
  return (
    <Link to={`/edit/${workout._id}`}>
      <div className="workout-card">
        <h4>{workout.name}</h4>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>{new Date(workout.createdAt).toLocaleDateString()}</p>
        <span onClick={deleteWorkout}>
          {isPending ? "loading ..." : "delete"}
        </span>
      </div>
    </Link>
  );
}

export default WorkoutsCard;
