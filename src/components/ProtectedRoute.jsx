import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user: contextUser, token } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check if user info exists in localStorage
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}
