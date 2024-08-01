import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedUserLocation = localStorage.getItem("userLocation");

    if (savedUser && savedIsLoggedIn) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setUserLocation(savedUserLocation ? JSON.parse(savedUserLocation) : null);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    if (userData.location) {
      setUserLocation(userData.location);
      localStorage.setItem("userLocation", JSON.stringify(userData.location));
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userLocation");
  };

  const updateUserLocation = (location) => {
    setUserLocation(location);
    localStorage.setItem("userLocation", JSON.stringify(location));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        userLocation,
        login,
        logout,
        updateUserLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
