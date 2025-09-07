import { useContext } from "react";
import { AuthContext } from "../context/constants";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
