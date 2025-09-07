import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Navbar />
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
