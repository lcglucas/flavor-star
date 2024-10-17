import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import SigninPage from "./pages/signin/Signin";
import SignupPage from "./pages/signup/Signup";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

function RequireAuth({ children }) {
  let auth = false;
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
