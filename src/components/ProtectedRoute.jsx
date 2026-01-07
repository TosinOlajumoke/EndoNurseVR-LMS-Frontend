import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // Optional spinner

  if (!token) {
    // Save current location to redirect after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
