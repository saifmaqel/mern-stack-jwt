import { createContext, type Dispatch } from "react";

export interface User {
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}
