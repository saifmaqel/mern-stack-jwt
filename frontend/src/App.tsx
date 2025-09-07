import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const Layout = lazy(() => import("./pages/Layout"));
const Workouts = lazy(() => import("./pages/workouts/Workouts"));
const WorkoutDetail = lazy(() => import("./pages/workouts/WorkoutDetail"));
const AddEditWorkout = lazy(() => import("./pages/workouts/AddEditWorkout"));

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ErrorBoundary
          fallback={<div>Something went wrong loading this page.</div>}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="workouts" replace />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/workouts/:id" element={<WorkoutDetail />} />
                <Route path="/workouts/add" element={<AddEditWorkout />} />
                <Route path="/workouts/edit/:id" element={<AddEditWorkout />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
