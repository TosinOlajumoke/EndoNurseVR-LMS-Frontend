import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, token } = useAuth();
  const location = useLocation(); // to know which page the user tried to access

  // Not logged in → redirect to login and store attempted page in state
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but role not allowed → unauthorized page
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized → render children
  return <>{children}</>;
}
