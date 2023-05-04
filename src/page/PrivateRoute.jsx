import React from "react";
import { useGlobalContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
