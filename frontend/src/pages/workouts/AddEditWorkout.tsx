import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { workoutsApi } from "../../apis/workout-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WORKOUT_QUERY_KEY,
  WORKOUTS_LIST_QUERY_KEY,
} from "../../utils/constants";
import type { GetAllWorkoutsResponse } from "../../apis/types";
import type { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

const AddEditWorkoutForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAuth();
  const queryClient = useQueryClient();

  const isEditPage = Boolean(id);

  const { data, isLoading } = useQuery({
    queryKey: [WORKOUT_QUERY_KEY, id],
    queryFn: async () => {
      if (!state.user?.token) {
        return Promise.reject(new Error("Missing auth token"));
      }
      const data = await workoutsApi.get(id!, state.user.token);
      return data;
    },
    enabled: isEditPage && Boolean(state.user?.token),
  });

  const [name, setName] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditPage && data) {
      setName(data.workout.name);
      setLoad(String(data.workout.load));
      setReps(String(data.workout.reps));
    } else {
      setName("");
      setLoad("");
      setReps("");
    }
  }, [isEditPage, data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (workout: {
      name: string | null;
      load: number;
      reps: number;
    }) => {
      if (!state.user?.token) {
        return Promise.reject(new Error("Missing auth token"));
      }
      if (isEditPage) return workoutsApi.update(id!, workout, state.user.token);
      else return workoutsApi.create(workout, state.user.token);
    },
    onSuccess: (response) => {
      if (!response.httpStatusOk) {
        setError(response.error ?? "Internal Server Error");
        return;
      }

      setName("");
      setLoad("");
      setReps("");

      queryClient.setQueryData<GetAllWorkoutsResponse>(
        [WORKOUTS_LIST_QUERY_KEY],
        (prev) => {
          if (!prev) return;

          if (!isEditPage) {
            return {
              ...prev,
              workouts: [...prev.workouts, response.workout],
            };
          } else if (isEditPage) {
            return {
              ...prev,
              workouts: prev.workouts.map((w) =>
                w._id === response.workout._id ? response.workout : w
              ),
            };
          }
          return prev;
        }
      );
      navigate("/");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      setError(error.response?.data.error ?? "Internal Server Error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name: name || null,
      load: parseInt(load),
      reps: parseInt(reps),
    });
  };

  if (isLoading) return <div>Loading ...</div>;

  if (isEditPage && !isLoading && !data?.workout)
    return <div>Workout Not Found</div>;

  return (
    <div className="form-page">
      <form className="create" onSubmit={handleSubmit}>
        <h3>{isEditPage ? "Edit an Existing Workout" : "Add a New Workout"}</h3>

        <label>Excersize Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Load (in kg)</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>Number of Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />
        {error && <div className="error">{error}</div>}
        <button>
          {isPending
            ? "Loading ..."
            : isEditPage
            ? "Edit Workout"
            : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddEditWorkoutForm;
