import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          {" "}
          <h2>Workouts</h2>
        </Link>
        <div className="links">
          <Link to="/workouts"> Workouts</Link>
          <Link to="/add"> Add Workout</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
