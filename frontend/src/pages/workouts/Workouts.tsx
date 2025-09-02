import { useQuery } from "@tanstack/react-query";
import { WORKOUTS_LIST_QUERY_KEY } from "../../utils/constants";
import { workoutsApi } from "../../apis/workout-api";
import WorkoutsCard from "../../components/WorkoutsCard";

function Workouts() {
  const { data, isLoading } = useQuery({
    queryKey: [WORKOUTS_LIST_QUERY_KEY],
    queryFn: async () => {
      const data = await workoutsApi.list();
      return data;
    },
  });

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="workouts-list">
      {/* <div className="workouts"> */}
      {data &&
        data.workouts.map((workout) => {
          return <WorkoutsCard key={workout._id} workout={workout} />;
        })}
      {/* </div> */}
    </div>
  );
}

export default Workouts;
