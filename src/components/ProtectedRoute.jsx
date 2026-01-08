// ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, token, loading } = useAuth();

  // ✅ While auth state is loading, don’t render anything
  if (loading) return null;

  // ❌ Not logged in → redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // ⚠️ Role is required but user role does not match → unauthorized
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authenticated and authorized → render child routes
  return <Outlet />;
}
