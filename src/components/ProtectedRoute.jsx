import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // 🔹 Wait until auth state is loaded
  if (loading) return null; // or a spinner

  // 🔹 Not logged in → redirect to login
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

  // 🔹 Role check
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Authenticated and authorized → show nested routes
  return <Outlet />;
}
