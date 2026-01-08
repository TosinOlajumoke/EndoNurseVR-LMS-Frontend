import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      const userData = res.data.user;

      if (!userData) throw new Error("User not found");

      login(userData); // login based on user object only
      toast.success("✅ Login successful!");

      setTimeout(() => {
        if (from) navigate(from, { replace: true });
        else if (userData.role === "admin") navigate("/admin", { replace: true });
        else if (userData.role === "instructor") navigate("/instructor", { replace: true });
        else if (userData.role === "trainee") navigate("/trainee", { replace: true });
        else navigate("/unauthorized", { replace: true });
      }, 300);

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.error || err.message || "❌ Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="/forgot">Forgot Password?</Link>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}
