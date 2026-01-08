import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // If AuthContext is still loading (fetching user), show nothing or a spinner
  if (loading) return null; // or <Spinner /> component

  // Not logged in → redirect to login
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

  // Logged in but role is not allowed → unauthorized page
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authenticated and authorized → show child routes
  return <Outlet />;
}
