import React, { useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { AuthContext, authReducer } from "./constants";
import { useNavigate } from "react-router-dom";

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const Navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const userLocalState = localStorage.getItem("user");
    if (!userLocalState) {
      // Navigate("/login");
      return;
    }
    dispatch({ type: "LOGIN", payload: JSON.parse(userLocalState) });
  }, [Navigate]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
