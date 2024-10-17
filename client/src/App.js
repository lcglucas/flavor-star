import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import SigninPage from "./pages/signin/Signin";
import SignupPage from "./pages/signup/Signup";
import RestaurantList from "./pages/restaurants/RestaurantList";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <RestaurantList />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

function RequireAuth({ children }) {
  let auth = true;
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
