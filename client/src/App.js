import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import SigninPage from "./pages/signin/Signin";
import SignupPage from "./pages/signup/Signup";
import RestaurantList from "./pages/restaurants/RestaurantList";
import CreateRestaurant from "./pages/restaurants/CreateRestaurant";
import Header from "./components/layout/Header";
import { UserContext } from "./context/UserContext";
import { USER_OWNER } from "./utils/const";

function App() {
  const { isAuthenticated, isAuthLoading } = useContext(UserContext);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <Header />}
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
          <Route
            path="/new-restaurant"
            element={
              <RequireAuth>
                <CheckRole>
                  <CreateRestaurant />
                </CheckRole>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

function RequireAuth({ children }) {
  const { isAuthenticated } = useContext(UserContext);

  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function CheckRole({ children }) {
  const { user } = useContext(UserContext);

  let location = useLocation();

  if (user?.role !== USER_OWNER) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
