import { Routes, Route } from "react-router";
import { PATHS } from "./PATHS";
import ConfirmEmail from "./pages/ConfirmEmail";
import Login from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={PATHS.AUTH} element={<Login />} />
        <Route path={PATHS.CONFIRM_EMAIL} element={<ConfirmEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.HOME} element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
