import React, { createContext, useState, useEffect } from "react";

// Criação do Context
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedJwt = localStorage.getItem("jwt");

    if (storedUser && storedJwt) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("jwt", jwt);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
