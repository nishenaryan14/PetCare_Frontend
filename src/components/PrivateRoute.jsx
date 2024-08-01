import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
