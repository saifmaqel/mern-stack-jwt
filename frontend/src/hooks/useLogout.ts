import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { WORKOUTS_LIST_QUERY_KEY } from "../utils/constants";

export const useLogout = () => {
  const { dispatch } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    queryClient.removeQueries({ queryKey: [WORKOUTS_LIST_QUERY_KEY] });
  }
  return {
    logout,
  };
};
