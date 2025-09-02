import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Layout = lazy(() => import("./pages/Layout"));
const Workouts = lazy(() => import("./pages/workouts/Workouts"));
const WorkoutDetail = lazy(() => import("./pages/workouts/WorkoutDetail"));
const AddEditWorkout = lazy(() => import("./pages/workouts/AddEditWorkout"));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={<div>Something went wrong loading this page.</div>}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="workouts" replace />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="/:id" element={<WorkoutDetail />} />
              <Route path="add" element={<AddEditWorkout />} />
              <Route path="edit/:id" element={<AddEditWorkout />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
