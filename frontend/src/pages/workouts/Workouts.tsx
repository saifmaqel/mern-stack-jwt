import { useQuery } from "@tanstack/react-query";
import { WORKOUTS_LIST_QUERY_KEY } from "../../utils/constants";
import { workoutsApi } from "../../apis/workout-api";
import WorkoutsCard from "../../components/WorkoutsCard";
import { useAuth } from "../../hooks/useAuth";

function Workouts() {
  const { state } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [WORKOUTS_LIST_QUERY_KEY],
    queryFn: async () => {
      if (!state.user?.token) {
        return Promise.reject(new Error("Missing auth token"));
      }
      const data = await workoutsApi.list(state.user.token!);
      return data;
    },
    enabled: Boolean(state.user?.token),
  });

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="workouts-list">
      {data &&
        data.workouts.map((workout) => {
          return <WorkoutsCard key={workout._id} workout={workout} />;
        })}
    </div>
  );
}

export default Workouts;
