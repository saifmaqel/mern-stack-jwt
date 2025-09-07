import { useMutation } from "@tanstack/react-query";
import { userApis } from "../apis/auth-apis";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const useLogin = (isLogin: boolean) => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (userAuth: { email: string; password: string }) =>
      isLogin ? userApis.login(userAuth) : userApis.signup(userAuth),
    onSuccess(data) {
      if (!data.httpStatusOk) return;

      const user = { email: data.email, token: data.token };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      navigate("/workouts");
    },
    onError(error: AxiosError<{ error: string }>) {
      return error;
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};
