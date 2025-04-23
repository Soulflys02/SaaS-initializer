import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { PATHS } from "./PATHS";

function App() {
  return (
    <Routes>
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
