import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // Wait while AuthContext is loading user data
  if (loading) return <div>Loading...</div>;

  // Not logged in → redirect to login page
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  // Role not allowed → redirect to unauthorized
  if (roles && !roles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;

  // User is authenticated → render children
  return <>{children}</>;
}
