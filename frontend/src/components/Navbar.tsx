import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { state } = useAuth();
  const { logout } = useLogout();
  return (
    <header>
      <div className="container">
        <Link to="/">
          {" "}
          <h2>Workouts</h2>
        </Link>
        <div className="links">
          {state.user && (
            <>
              <span>{state.user?.email}</span>
              <button onClick={logout}>Log out</button>
            </>
          )}
          <Link to="/workouts"> Workouts</Link>
          <Link to="/workouts/add"> Add Workout</Link>
          {!state.user && (
            <>
              <Link to="/login"> Log in</Link>
              <Link to="/signup"> Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
